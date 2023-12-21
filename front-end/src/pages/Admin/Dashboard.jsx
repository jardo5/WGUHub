import React, {useCallback, useEffect, useState} from 'react';
import CourseSearch from "../../components/MainPage/CourseSearch.jsx";
import {fetchCourses, searchCourses} from "../../services/CourseService.js";
import {deleteReviewSend, fetchReviewsByCourseCode, updateReview} from "../../services/ReviewService.js";
import _ from "lodash";
import ConfirmModal from "../../components/ConfirmModal.jsx";


import DropDownArrow from '@material-symbols/svg-500/outlined/arrow_drop_down.svg?react';

function Dashboard() {
    const [courses, setCourses] = useState([]);
    const [currentCourseIndex, setCurrentCourseIndex] = useState(0);

    const [searchTerm, setSearchTerm] = useState('');
    const [expandedCourseId, setExpandedCourseId] = useState(null);

    const [reviews, setReviews] = useState([]);
    const [editingReviewId, setEditingReviewId] = useState(null);

    const [editingReviewText, setEditingReviewText] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedReviewId, setSelectedReviewId] = useState(null);


    const fetchMoreCourses = async (from, to) => {
        try {
            const newCourses = await fetchCourses(searchTerm, from, to);
            setCourses(prevCourses => from === 0 ? newCourses : [...prevCourses, ...newCourses]);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const debouncedSearch = useCallback(
        _.debounce(async term => {
            if (term) {
                try {
                    const response = await searchCourses(term, 1);
                    setCourses(response);
                } catch (error) {
                    console.error('Error searching courses:', error);
                }
            } else {
                setCourses([]);
                fetchMoreCourses(0, 1);
            }
        }, 500),
        []
    );

    useEffect(() => {
        debouncedSearch(searchTerm);
        setCurrentCourseIndex(0);
    }, [searchTerm, debouncedSearch]);

    const goToNextCourse = () => {
        setCurrentCourseIndex(i => (i < courses.length - 1 ? i + 1 : i));
    };

    const goToPreviousCourse = () => {
        setCurrentCourseIndex(i => (i > 0 ? i - 1 : i));
    };

    const toggleCourseReviews = async (courseCode) => {
        if (expandedCourseId === courseCode) {
            setExpandedCourseId(null);
            setReviews([]);
        } else {
            setExpandedCourseId(courseCode);
            try {
                const data = await fetchReviewsByCourseCode(courseCode);
                setReviews(data.reviews || []);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setReviews([]);
            }
        }
    };


    const editReview = (reviewId, reviewText) => {
        setEditingReviewId(reviewId);
        setEditingReviewText(reviewText);
    };

    const cancelEdit = () => {
        setEditingReviewId(null);
        setEditingReviewText("");
    };


    const saveReview = async (reviewId) => {
        const reviewToUpdate = {
            reviewText: editingReviewText,
        };

        try {
            await updateReview(reviewId, reviewToUpdate);
            const updatedReviews = reviews.map(review => review.reviewId === reviewId ? {...review, ...reviewToUpdate} : review);
            setReviews(updatedReviews);
            setEditingReviewId(null);
            setEditingReviewText("");
        } catch (error) {
            console.error('Error updating review:', error);
        }
    };

    const requestDeleteReview = (reviewId) => {
        setSelectedReviewId(reviewId);
        setShowConfirmModal(true);
    };

    const confirmDeleteReview = async () => {
        try {
            await deleteReviewSend(selectedReviewId);
            const updatedReviews = reviews.filter(review => review.reviewId !== selectedReviewId);
            setReviews(updatedReviews);
            console.log(`Review ${selectedReviewId} deleted`);
        } catch (error) {
            console.error('Error deleting review:', error);
        }
        setShowConfirmModal(false);
    };


    return (
        <div className="container mx-auto p-4 text-gray-700">
            <CourseSearch setSearchTerm={setSearchTerm}/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.length > 0 && (
                    <div key={courses[currentCourseIndex].courseId}
                         className="bg-secondary rounded-lg shadow-md overflow-hidden">
                        <div className="p-4">
                            <p className="text-gray-700">{courses[currentCourseIndex].courseCode} - {reviews.length} Reviews</p>
                            <h3 className="text-xl font-semibold text-gray-700">{courses[currentCourseIndex].courseName}</h3>
                            <p className="text-gray-700">Credits: {courses[currentCourseIndex].courseCredits}</p>
                            <button onClick={() => toggleCourseReviews(courses[currentCourseIndex].courseCode)}
                                    className="text-indigo-600 hover:text-indigo-800 flex items-center">
                                <p>Edit Reviews</p>
                                <DropDownArrow className="w-6 h-6 fill-current"/>
                            </button>
                        </div>
                        {expandedCourseId === courses[currentCourseIndex].courseCode && (
                            <div className="reviews">
                                {reviews.map((review, index) => (
                                    <div key={review.reviewId || index}
                                         className="p-4 m-2 border border-primary h-fit rounded">
                                        <div
                                            className="flex flex-row justify-between border-b border-primary mb-2 pb-1">
                                            <h2 className="text-xl font-bold flex items-center gap-2">
                                                {editingReviewId !== review.reviewId ? (
                                                    <>
                                                        <button className="btn btn-xs btn-error"
                                                                onClick={() => requestDeleteReview(review.reviewId)}>Delete
                                                        </button>
                                                        <button className="btn btn-xs btn-warning"
                                                                onClick={() => editReview(review.reviewId, review.reviewText)}>Modify
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button className="btn btn-xs btn-success"
                                                                onClick={() => saveReview(review.reviewId)}>Save
                                                        </button>
                                                        <button className="btn btn-xs btn-error"
                                                                onClick={cancelEdit}>Cancel
                                                        </button>
                                                    </>
                                                )}
                                            </h2>
                                            <h3 className="text-md font-light flex items-center">
                                                {review.reviewDate}
                                            </h3>
                                        </div>
                                        {editingReviewId !== review.reviewId ? (
                                            <p className="break-words">{review.reviewText}</p>
                                        ) : (
                                            <textarea
                                                className="textarea textarea-bordered w-full"
                                                value={editingReviewText}
                                                onChange={(e) => setEditingReviewText(e.target.value)}
                                            />
                                        )}
                                        <div className="flex flex-row justify-center gap-2 mt-4">
                                            <div className="flex flex-col items-center">
                                                <h3 className="font-bold">Overall</h3>
                                                <span
                                                    className="badge badge-outline badge-primary">{review.reviewRating} / 5</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <h3 className="font-bold">Difficulty</h3>
                                                <span
                                                    className="badge badge-outline badge-primary">{review.reviewDifficulty} / 5</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <h3 className="font-bold">Workload</h3>
                                                <span
                                                    className="badge badge-outline badge-primary">{review.reviewWorkload} / 5</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                <div className="flex justify-center gap-2">
                    <button className="btn btn-active btn-primary w-1/3 text-gray-700"
                            onClick={goToPreviousCourse}>Previous
                    </button>
                    <button className="btn btn-active btn-secondary w-1/3 text-gray-700" onClick={goToNextCourse}>Next
                    </button>
                </div>
            </div>
            {showConfirmModal && (
                <ConfirmModal
                    className="absolute top-0 left-0"
                    title="Confirm Deletion"
                    description="Are you sure you want to delete this review?"
                    onConfirm={confirmDeleteReview}
                    onCancel={() => setShowConfirmModal(false)}
                />
            )}
        </div>

    );
}

export default Dashboard;
