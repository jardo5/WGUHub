// CourseReview.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { dummyReviews, dummyCourses } from '../utils/dummyData.js';

function courseReview() {
    const { courseId } = useParams();
    const course = dummyCourses.find(c => c.code === courseId);
    const reviews = course ? dummyReviews[course.id] || [] : [];

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">
                Reviews for Course {course ? `${course.code} - ${course.name}` : courseId}
            </h2>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className="bg-secondary p-4 rounded-lg shadow mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-semibold text-gray-800">Overall: {review.review_rating} / 5</span>
                            <span className="text-sm text-gray-800">{review.review_date}</span>
                        </div>
                        <p className="mb-2 text-gray-800"><strong>Difficulty:</strong> {review.review_difficulty} / 5</p>
                        <p className="mb-2 text-gray-800"><strong>Workload:</strong> {review.review_workload} hours / week</p>
                        <p className="italic text-gray-600">"{review.review_text}"</p>
                    </div>
                ))
            ) : (
                <p>No reviews available for this course.</p>
            )}
        </div>
    );
}

export default courseReview;
