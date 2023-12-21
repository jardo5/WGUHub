package com.wguhub.Services;

import com.wguhub.DTOs.CourseReviewSummaryDTO;
import com.wguhub.DTOs.InitialReviewDTO;
import com.wguhub.DTOs.ReviewDTO;
import com.wguhub.DTOs.ReviewUpdateDTO;
import com.wguhub.Models.Course;
import com.wguhub.Models.Review;
import com.wguhub.Models.UnverifiedReview;
import com.wguhub.Models.User;
import com.wguhub.Repository.CourseRepository;
import com.wguhub.Repository.ReviewRepository;
import com.wguhub.Repository.UnverifiedReviewRepository;
import com.wguhub.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.DoubleSummaryStatistics;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@SuppressWarnings("SpringJavaAutowiredFieldsWarningInspection")
@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UnverifiedReviewRepository unverifiedReviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EmailService emailService;

    public CourseReviewSummaryDTO getReviewsByCourseCode(String courseCode) {
        List<Review> reviews = reviewRepository.findByCourseCourseCode(courseCode);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yyyy");

        List<ReviewDTO> reviewDTOs = reviews.stream()
                .map(review -> convertToReviewDTO(review, formatter))
                .collect(Collectors.toList());

        DoubleSummaryStatistics ratingStats = reviewDTOs.stream()
                .mapToDouble(ReviewDTO::getReviewRating)
                .summaryStatistics();
        DoubleSummaryStatistics difficultyStats = reviewDTOs.stream()
                .mapToDouble(ReviewDTO::getReviewDifficulty)
                .summaryStatistics();
        DoubleSummaryStatistics workloadStats = reviewDTOs.stream()
                .mapToDouble(ReviewDTO::getReviewWorkload)
                .summaryStatistics();

        CourseReviewSummaryDTO summaryDTO = new CourseReviewSummaryDTO();
        summaryDTO.setReviews(reviewDTOs);
        summaryDTO.setAverageRating(ratingStats.getAverage());
        summaryDTO.setAverageDifficulty(difficultyStats.getAverage());
        summaryDTO.setAverageWorkload(workloadStats.getAverage());

        return summaryDTO;
    }

    //Convert Review entity to ReviewDTO for Date formatting
    private ReviewDTO convertToReviewDTO(Review review, DateTimeFormatter formatter) {
        ReviewDTO dto = new ReviewDTO();
        dto.setReviewId(review.getReviewId());
        dto.setReviewRating(review.getReviewRating());
        dto.setReviewDifficulty(review.getReviewDifficulty());
        dto.setReviewWorkload(review.getReviewWorkload());
        dto.setReviewText(review.getReviewText());

        if (review.getReviewDate() != null) {
            String formattedDate = review.getReviewDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime().format(formatter);
            dto.setReviewDate(formattedDate);
        }


        return dto;
    }

    @Transactional
    public void processInitialReview(InitialReviewDTO reviewDTO) throws Exception {
        Optional<User> userOptional = userRepository.findByUserEmail(reviewDTO.getEmail());
        User user = userOptional.orElseGet(() -> createUser(reviewDTO.getEmail()));

        if (hasSubmittedReview(user.getUserId(), reviewDTO.getCourseCode())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You have already submitted a review for this course.");
        }

        UnverifiedReview unverifiedReview = createUnverifiedReview(user, reviewDTO);
        unverifiedReviewRepository.save(unverifiedReview);
        emailService.sendVerificationEmail(user.getUserEmail(), unverifiedReview.getVerificationToken());
    }

    private User createUser(String email) {
        User newUser = new User();
        newUser.setUserEmail(email);
        String username = email.split("@")[0];
        newUser.setUserName(username);
        newUser.setEmailVerified(false);
        newUser.setUserRole("USER");
        newUser.setEmailVerificationToken(generateVerificationToken());
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(newUser);
    }

    private boolean hasSubmittedReview(Integer userId, String courseCode) {
        return reviewRepository.existsByUserUserIdAndCourseCourseCode(userId, courseCode)
                || unverifiedReviewRepository.existsByUserUserIdAndCourseCourseCode(userId, courseCode);
    }

    private UnverifiedReview createUnverifiedReview(User user, InitialReviewDTO reviewDTO) {
        UnverifiedReview unverifiedReview = new UnverifiedReview();
        unverifiedReview.setUser(user);

        Optional<Course> courseOptional = courseRepository.findByCourseCode(reviewDTO.getCourseCode());
        courseOptional.ifPresentOrElse(
                unverifiedReview::setCourse,
                () -> {
                    throw new IllegalArgumentException("Course not found for the provided courseCode");
                }
        );

        unverifiedReview.setReviewRating(reviewDTO.getReviewRating());
        unverifiedReview.setReviewDifficulty(reviewDTO.getReviewDifficulty());
        unverifiedReview.setReviewWorkload(reviewDTO.getReviewWorkload());
        unverifiedReview.setReviewText(reviewDTO.getReviewText());
        unverifiedReview.setVerificationToken(generateVerificationToken());
        unverifiedReview.setTokenCreationTime(LocalDateTime.now());
        return unverifiedReview;
    }

    private String generateVerificationToken() {
        return UUID.randomUUID().toString();
    }

    @Transactional
    public void verifyReview(String token) throws Exception {

        Optional<UnverifiedReview> unverifiedReviewOptional = unverifiedReviewRepository.findByVerificationToken(token);


        if (!unverifiedReviewOptional.isPresent()) {
            throw new Exception("Invalid or expired verification token");
        }

        UnverifiedReview unverifiedReview = unverifiedReviewOptional.get();
        LocalDateTime tokenCreationTime = unverifiedReview.getTokenCreationTime();

        if (tokenCreationTime.plusHours(24).isBefore(LocalDateTime.now())) {
            throw new Exception("Verification token has expired");
        }

        // Transfer data from UnverifiedReview to Review
        Review verifiedReview = transferToVerifiedReview(unverifiedReview);

        // Save the verified review
        try {
            reviewRepository.save(verifiedReview);

            updateUserEmailVerificationStatus(unverifiedReview.getUser());

            // Optionally, delete the unverified review record
            unverifiedReviewRepository.delete(unverifiedReview);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred during the review verification process.");
        }
    }

    private void updateUserEmailVerificationStatus(User user) {
        user.setEmailVerified(true);
        userRepository.save(user);
    }

    private Review transferToVerifiedReview(UnverifiedReview unverifiedReview) {
        Review review = new Review();
        review.setUser(unverifiedReview.getUser());
        review.setCourse(unverifiedReview.getCourse());
        review.setReviewRating(unverifiedReview.getReviewRating());
        review.setReviewDifficulty(unverifiedReview.getReviewDifficulty());
        review.setReviewWorkload(unverifiedReview.getReviewWorkload());
        review.setReviewText(unverifiedReview.getReviewText());
        review.setReviewDate(Timestamp.valueOf(LocalDateTime.now())); // Set the review date to now

        // Set other fields as needed
        return review;
    }

    @Transactional
    public void updateReview(int reviewId, ReviewUpdateDTO reviewUpdateDTO) throws Exception {
        Optional<Review> reviewOptional = reviewRepository.findById(reviewId);
        if (reviewOptional.isPresent()) {
            Review review = reviewOptional.get();
            review.setReviewText(reviewUpdateDTO.getReviewText());
            reviewRepository.save(review);
        } else {
            throw new Exception("Review not found with id: " + reviewId);
        }
    }

    @Transactional
    public void deleteReview(int reviewId) throws Exception {
        Optional<Review> reviewOptional = reviewRepository.findById(reviewId);
        if (reviewOptional.isPresent()) {
            Review review = reviewOptional.get();
            reviewRepository.delete(review);
        } else {
            throw new Exception("Review not found with id: " + reviewId);
        }
    }
}



