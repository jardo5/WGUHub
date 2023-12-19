import React, { useState } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import Courses from './MainPage/Courses.jsx';
import CourseReview from './Review/CourseReview.jsx';
import Filter from './MainPage/Filter.jsx';
import CourseSearch from './MainPage/CourseSearch.jsx';
import AddNewReview from "./Review/AddNewReview.jsx";
import VerifyReview from "./Review/VerfiyReview.jsx";

function Content({ setSelectedDegreeId, selectedDegreeId }) {
    const [searchTerm, setSearchTerm] = useState(''); // State to handle search term
    const location = useLocation();
    const isCoursePage = location.pathname.startsWith('/course/');

    return (
        <div className="">
            {!isCoursePage && (
                <div className="flex flex-row w-full justify-center items-center">
                    <CourseSearch setSearchTerm={setSearchTerm} />
                    <Filter onDegreeSelect={setSelectedDegreeId} />
                </div>
            )}
            <Routes>
                <Route exact path="/" element={<Courses selectedDegreeId={selectedDegreeId} searchTerm={searchTerm} />} />
                <Route path="/course/:courseCode" element={<CourseReview />} />
                <Route path="/course/:courseCode/new" element={<AddNewReview />} />
                <Route path="/verify" element={<VerifyReview />} />
            </Routes>
        </div>
    );
}

export default Content;
