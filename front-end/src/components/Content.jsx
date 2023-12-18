import React, { useState } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import Courses from './MainPage/Courses.jsx';
import CourseReview from './CourseReview.jsx';
import Filter from './MainPage/Filter.jsx';
import CourseSearch from './MainPage/CourseSearch.jsx'; // Import CourseSearch

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
                <Route path="/course/:courseId" element={<CourseReview />} />
            </Routes>
        </div>
    );
}

export default Content;
