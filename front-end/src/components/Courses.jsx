import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Emote from '@material-symbols/svg-500/outlined/emoticon.svg?react';
import _ from 'lodash';

function Courses({ searchTerm }) {
    const [courses, setCourses] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const fetchCourses = async (from, to) => {
        try {
            const response = await axios.get('http://localhost:8080/api/courses');
            const newCourses = response.data.slice(from, to);

            setCourses(prevCourses => from === 0 ? newCourses : [...prevCourses, ...newCourses]);
            setHasMore(newCourses.length > 0);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const debouncedSearch = useCallback(_.debounce(async (term) => {
        if (term) {
            try {
                const response = await axios.get(`http://localhost:8080/api/courses/search?searchTerm=${term}`);
                setCourses(response.data.slice(0, 10));
                setHasMore(false);
            } catch (error) {
                console.error('Error searching courses:', error);
            }
        } else {
            // Reset the state for infinite scroll when search term is cleared
            setCourses([]);
            setHasMore(true);
            fetchCourses(0, 10);
        }
    }, 500), []);

    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm, debouncedSearch]);

    const loadMoreCourses = () => {
        fetchCourses(courses.length, courses.length + 10);
    };

    return (
        <div className="container mx-auto p-4">
            <InfiniteScroll
                dataLength={courses.length}
                next={loadMoreCourses}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p className="flex flex-col items-center fill-accent text-accent my-12"><Emote /> No more courses to load.</p>}
            >
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
            </InfiniteScroll>
        </div>
    );
}

export default Courses;
