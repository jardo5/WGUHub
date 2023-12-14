import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import Courses from "./components/Courses.jsx";
import CourseReview from "./components/CourseReview.jsx";

function App() {
    return (
        <Router>
            <div className="h-full w-full flex flex-col">
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Courses />} />
                    <Route path="/course/:courseId" element={<CourseReview />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
