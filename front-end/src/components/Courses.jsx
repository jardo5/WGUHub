import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Courses() {
    const [courses, setCourses] = useState([]);
    const [loadedCourses, setLoadedCourses] = useState(0);

    useEffect(() => {
        // Fetch initial set of courses
        fetchCourses(2);
    }, []);

    const fetchCourses = (amount) => {
        axios.get('http://localhost:8080/api/courses') // Replace with your API URL
            .then(response => {
                // Assuming the backend returns an array of courses
                const newCourses = response.data.slice(loadedCourses, loadedCourses + amount);
                setCourses([...courses, ...newCourses]);
                setLoadedCourses(loadedCourses + amount);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    };

    const loadMoreCourses = () => {
        fetchCourses(2);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map(course => (
                    <div key={course.course_id} className="bg-secondary rounded-lg shadow-md overflow-hidden">
                        <div className="p-4">
                            <p className="text-gray-600">{course.course_code}</p>
                            <h3 className="text-xl font-semibold text-gray-800">{course.course_name}</h3>
                            <p className="text-gray-600">Credits: {course.course_credits}</p>
                            <Link to={`/course/${course.course_code}`} className="text-indigo-600 hover:text-indigo-800">View Reviews</Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-4">
                <button onClick={loadMoreCourses} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Load More</button>
            </div>
        </div>
    );
}

export default Courses;
