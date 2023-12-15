import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import Courses from "./components/Courses.jsx";
import CourseReview from "./components/CourseReview.jsx";
import SearchFunctions from "./components/SearchFunctions.jsx";


function App() {

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Router>
            <div className="h-full w-full flex flex-col">
                <Navbar />
                <SearchFunctions setSearchTerm={setSearchTerm} />
                <Routes>
                    <Route exact path="/" element={<Courses searchTerm={searchTerm} />} />
                    <Route path="/course/:courseId" element={<CourseReview />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
