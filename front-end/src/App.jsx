import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import Courses from "./components/Courses.jsx";
import CourseReview from "./components/CourseReview.jsx";
import SearchFunctions from "./components/SearchFunctions.jsx";
import Filter from "./components/Filter.jsx";


function App() {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDegreeId, setSelectedDegreeId] = useState(null);

    const handleDegreeSelect = (degreeId) => {
        setSelectedDegreeId(degreeId);
    };

    return (
        <Router>
            <div className="h-full w-full flex flex-col">
                <Navbar />
                <div className="flex flex-row justify-center items-center">
                    <SearchFunctions setSearchTerm={setSearchTerm} />
                    <Filter onDegreeSelect={handleDegreeSelect} />
                </div>
                <Routes>
                    <Route exact path="/" element={<Courses searchTerm={searchTerm} selectedDegreeId={selectedDegreeId} />} />
                    <Route path="/course/:courseId" element={<CourseReview />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
