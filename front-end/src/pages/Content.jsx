import React, { useState, useEffect } from 'react';
import {useLocation, Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import Courses from './Courses.jsx';
import CourseReview from './Review/CourseReview.jsx';
import Filter from '../components/MainPage/Filter.jsx';
import CourseSearch from '../components/MainPage/CourseSearch.jsx';
import AddNewReview from './Review/AddNewReview.jsx';
import VerifyReview from './Review/VerfiyReview.jsx';
import SecretLogin from './Admin/SecretLogin.jsx';
import Dashboard from './Admin/Dashboard.jsx';
import { isAuthenticated } from '../utils/useAuth.js';

function Content({ setSelectedDegreeId, selectedDegreeId }) {
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    const isMainSearchPage = location.pathname === '/';
    const navigate = useNavigate();

    useEffect(() => {
        // Check authentication here and redirect if not authenticated
        if (!isAuthenticated()) {
            navigate('/secretlogin'); // You may need to import navigate from 'react-router-dom'
        }
    }, []);

    return (
        <div className="">
            {isMainSearchPage && (
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
                <Route path="/secretlogin" element={<SecretLogin />} />
                <Route path="/admin/dashboard/*" element={
                        isAuthenticated() ? (
                            <Dashboard />
                        ) : (
                            <Navigate to="/secretlogin" />
                        )
                    }
                />
            </Routes>
        </div>
    );
}

export default Content;
