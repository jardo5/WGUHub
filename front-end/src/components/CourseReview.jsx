import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

import Overall from '@material-symbols/svg-500/outlined/star.svg?react';
import Workload from '@material-symbols/svg-500/outlined/work.svg?react';
import Difficulty from '@material-symbols/svg-500/outlined/trending_up.svg?react';

import VerifiedUser from '@material-symbols/svg-500/outlined/verified_user.svg?react';
import {fetchCourseByCourseCode} from "../services/CourseService.js";
import {fetchReviewsByCourseCode} from "../services/ReviewService.js";



function CourseReview() {
    const { courseCode } = useParams();
    const [course, setCourse] = useState({});
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [averageDifficulty, setAverageDifficulty] = useState(0);
    const [averageWorkload, setAverageWorkload] = useState(0);

    useEffect(() => {
        // Fetch reviews using courseCode
        fetchReviewsByCourseCode(courseCode)
            .then(data => {
                setReviews(data.reviews);
                setAverageRating(data.averageRating);
                setAverageDifficulty(data.averageDifficulty);
                setAverageWorkload(data.averageWorkload);
            })
            .catch(error => console.error('Error fetching reviews:', error));

        // Fetch course using courseCode
        fetchCourseByCourseCode(courseCode)
            .then(data => setCourse(data))
            .catch(error => console.error('Error fetching course:', error));
    }, [courseCode]);

    return (
        <div className="flex items-center justify-center flex-col my-2 py-2">
            <h1 className="text-2xl">
                {course.courseCode} - {course.courseName}
            </h1>
            <div className="flex flex-row items-center justify-center my-2">
                <div className="flex flex-col p-2 mx-2 items-center gap-1 ">
                    <Overall className="fill-primary h-10 w-10" />
                    <h1>Overall</h1>
                    <span className="badge badge-outline badge-primary">{averageRating.toFixed(2)} / 5</span>
                </div>
                <div className="flex flex-col p-2 mx-2 items-center gap-1">
                    <Difficulty className="fill-primary h-10 w-10" />
                    <h1>Difficulty</h1>
                    <span className="badge badge-outline badge-primary">{averageDifficulty.toFixed(2)} / 5</span>
                </div>
                <div className="flex flex-col p-2 mx-2 items-center gap-1">
                    <Workload className="fill-primary h-10 w-10" />
                    <h1>Workload</h1>
                    <span className="badge badge-outline badge-primary">{averageWorkload.toFixed(2)} / 5</span>
                </div>
            </div>
            <div className="text-xl flex-col border-b border-primary flex justify-start mb-4 items-center gap-2">
                <h1 className="">
                    Credits: {course.courseCredits}
                </h1>
            </div>
            <div>
                {reviews.map((review, index) => (
                    <div key={review.reviewId || index} className="p-4 m-2 border border-primary rounded">
                        <div className="flex flex-row justify-between border-b border-primary mb-2 pb-1">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <VerifiedUser className="fill-primary h-6 w-6 inline-block" />
                                Verified User
                            </h2>
                            <h3 className="text-md font-light flex items-center">
                                {review.reviewDate}
                            </h3>
                        </div>
                        <p>{review.reviewText}</p>
                        <div className="flex flex-row items-center gap-2 mt-4">
                            <span className="badge badge-outline badge-primary">Rating: {review.reviewRating} / 5</span>
                            <span className="badge badge-outline badge-primary">Difficulty: {review.reviewDifficulty} / 5</span>
                            <span className="badge badge-outline badge-primary">Workload: {review.reviewWorkload} / 5</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseReview;
