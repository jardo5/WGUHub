import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { dummyReviews, dummyCourses } from '../utils/dummyData.js';

import Overall from '@material-symbols/svg-500/outlined/star.svg?react';
import Workload from '@material-symbols/svg-500/outlined/work.svg?react';
import Difficulty from '@material-symbols/svg-500/outlined/trending_up.svg?react';

import VerifiedUser from '@material-symbols/svg-500/outlined/verified_user.svg?react';



function CourseReview() {
    const { courseCode } = useParams();
    const [course, setCourse] = useState({});
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Fetch course data by courseCode to get the courseId
        fetch(`http://localhost:8080/api/courses/code/${courseCode}`)
            .then(response => response.json())
            .then(data => {
                setCourse(data);
                fetchReviews(data.courseId);
            })
            .catch(error => console.error('Error fetching course:', error));
    }, [courseCode]);

    const fetchReviews = (courseId) => {
        fetch(`http://localhost:8080/api/reviews/course/${courseId}`)
            .then(response => response.json())
            .then(data => setReviews(data))
            .catch(error => console.error('Error fetching reviews:', error));
    };

    return (
        <div className="flex items-center justify-center flex-col my-2 py-2">
            <h1 className="text-2xl">
                {course.code} - {course.name}
            </h1>
            <div className="flex flex-row items-center justify-center my-2">
                <div className="flex flex-col p-2 mx-2 items-center gap-1 ">
                    <Overall className="fill-primary h-10 w-10" />
                    <h1>Overall</h1>
                    <span className="badge badge-outline badge-primary">2.55 / 5</span>
                </div>
                <div className="flex flex-col p-2 mx-2 items-center gap-1">
                    <Difficulty className="fill-primary h-10 w-10" />
                    <h1>Difficulty</h1>
                    <span className="badge badge-outline badge-primary">2.54 / 5</span>
                </div>
                <div className="flex flex-col p-2 mx-2 items-center gap-1">
                    <Workload className="fill-primary h-10 w-10" />
                    <h1>Workload</h1>
                    <span className="badge badge-outline badge-primary">1.53 / 5</span>
                </div>
            </div>
            <div className="text-xl flex-col border-b border-primary flex justify-start mb-4 items-center gap-2">
                <h1 className="">
                    Credits: {course.credits}
                </h1>
            </div>
            <div>
                {reviews.map(review => (
                    <div key={review.review_id} className="p-4 m-2 border border-primary rounded">
                        <div className="flex flex-row justify-between border-b border-primary mb-2 pb-1">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <VerifiedUser className="fill-primary h-6 w-6 inline-block" />
                                Verified User
                            </h2>
                            <h3 className="text-md font-light flex items-center">
                                {review.review_date}
                            </h3>
                        </div>
                        <p>{review.review_text}</p>
                        <div className="flex flex-row items-center gap-2 mt-4">
                            <span className="badge badge-outline badge-primary">Rating: {review.review_rating} / 5</span>
                            <span className="badge badge-outline badge-primary">Difficulty: {review.review_difficulty} / 5</span>
                            <span className="badge badge-outline badge-primary">Workload: {review.review_workload} / 5</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseReview;
