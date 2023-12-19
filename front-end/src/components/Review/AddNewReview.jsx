import { useParams, useSearchParams } from 'react-router-dom';
import React, {useState} from 'react';

import Overall from '@material-symbols/svg-500/outlined/star.svg?react';
import Workload from '@material-symbols/svg-500/outlined/work.svg?react';
import Difficulty from '@material-symbols/svg-500/outlined/trending_up.svg?react';
import Review from '@material-symbols/svg-500/outlined/edit.svg?react';
import {submitReview} from "../../services/ReviewService.js";

function AddNewReview() {
    const { courseCode } = useParams();
    const [searchParams] = useSearchParams();
    const courseName = searchParams.get('courseName');

    const [overallRating, setOverallRating] = useState('');
    const [difficultyRating, setDifficultyRating] = useState('');
    const [workloadRating, setWorkloadRating] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [email, setEmail] = useState('');

    const isFormValid = overallRating && difficultyRating && workloadRating && reviewText && email;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isFormValid) {
            console.error("Form is incomplete");
            return; // Exit early if form is not valid
        }
        try {
            // Create an object with review data
            const reviewData = {
                courseCode: courseCode,
                reviewRating: overallRating,
                reviewDifficulty: difficultyRating,
                reviewWorkload: workloadRating,
                reviewText: reviewText,
                email: email + "@wgu.edu"
            };

            // Call the submitReview function from the service
            await submitReview(reviewData);

            alert("Review submitted successfully. Please check your email to verify.");
        } catch (error) {
            if (error.response && error.response.data) {
                alert('Error: ' + error.response.data);
            } else {
                alert('An error occurred during verification.');
            }
        }
    };



    const renderRating = (name, rating, setRating) => (
        <div className="flex flex-row gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex flex-col gap-2 items-center">
                    <h1 className="border-b-primary border-b font-extrabold">{num}</h1>
                    <input
                        type="radio"
                        name={name}
                        className="radio radio-primary"
                        value={num}
                        onChange={(e) => setRating(e.target.value)}
                        checked={rating === String(num)}
                    />
                </div>
            ))}
        </div>
    );


    return (
        <div className="flex items-center justify-center flex-col my-2 py-2">
            <div className="text-2xl flex flex-col items-center justify-center my-4">
                <h1 className="border-b-primary border-b">{courseCode} - {courseName}</h1>
            </div>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
                {/* Overall Rating */}
                <section className="w-full h-44 flex justify-center items-center flex-col border border-primary py-4">
                    <Overall className="fill-primary h-10 w-10" />
                    <h1 className="font-extrabold">Overall Rating</h1>
                    {renderRating('overallRating', overallRating, setOverallRating)}
                </section>
                {/* Difficulty Rating */}
                <section className="w-full h-44 flex justify-center items-center flex-col border border-primary py-4">
                    <Difficulty className="fill-primary h-10 w-10" />
                    <h1 className="font-extrabold">Difficulty Rating</h1>
                    {renderRating('difficultyRating', difficultyRating, setDifficultyRating)}
                </section>
                {/* Workload Rating */}
                <section className="w-full h-44 flex justify-center items-center flex-col border border-primary py-4">
                    <Workload className="fill-primary h-10 w-10" />
                    <h1 className="font-extrabold">Workload Rating</h1>
                    {renderRating('workloadRating', workloadRating, setWorkloadRating)}
                </section>
                {/* Review Text */}
                <section className="w-full h-56 flex justify-center items-center flex-col border border-primary gap-2">
                    <Review className="fill-primary h-10 w-10"/>
                    <h1 className="font-extrabold">Review</h1>
                    <textarea
                        className="textarea textarea-bordered textarea-secondary h-1/2 w-3/4"
                        placeholder="Be Respectful..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    ></textarea>
                </section>
                {/* Email Input */}
                <section className="w-full h-fit flex justify-center items-center flex-col border border-primary gap-4">
                    <div className="mt-1 flex flex-wrap gap-4">
                        <div className="flex shrink-0">
                            <input
                                required
                                type="text"
                                placeholder="mSmith3"
                                className="p-2 bg-transparent border border-primary rounded-l-md w-full max-w-xs"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <span className="flex items-center border border-primary rounded-r-md px-2">
                                @wgu.edu
                            </span>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={`btn btn-accent w-1/2 mb-2 ${!isFormValid && 'btn-disabled'}`}
                        disabled={!isFormValid}
                    >
                        Send Email Verification
                    </button>
                </section>
            </form>
        </div>
    );
}

export default AddNewReview;
