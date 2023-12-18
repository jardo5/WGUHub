import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Emote from '@material-symbols/svg-500/outlined/emoticon.svg?react';
import _ from 'lodash';
import { fetchCourses, searchCourses } from '../../services/CourseService.js'; // Import the CourseService functions

function Courses({ selectedDegreeId, searchTerm }) {
    const [courses, setCourses] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreCourses = async (from, to) => {
        try {
            const newCourses = await fetchCourses(selectedDegreeId, searchTerm, from, to);
            setCourses(prevCourses => from === 0 ? newCourses : [...prevCourses, ...newCourses]);
            setHasMore(newCourses.length > 0);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const debouncedSearch = useCallback(
        _.debounce(async term => {
            if (term) {
                try {
                    const response = await searchCourses(term, 25);
                    setCourses(response);
                    setHasMore(false);
                } catch (error) {
                    console.error('Error searching courses:', error);
                }
            } else if (selectedDegreeId) {
                fetchMoreCourses(0, 25);
            } else {
                setCourses([]);
                setHasMore(true);
                fetchMoreCourses(0, 25);
            }
        }, 500),
        [selectedDegreeId]
    );

    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm, debouncedSearch]);

    const loadMoreCourses = () => {
        fetchMoreCourses(courses.length, courses.length + 25);
    };

    return (
        <div className="container mx-auto p-4">
            <InfiniteScroll
                dataLength={courses.length}
                next={loadMoreCourses}
                hasMore={hasMore}
                loader={
                    <div className="flex justify-center items-center py-5">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                }
                endMessage={<p className="flex flex-col items-center fill-accent text-accent my-12"><Emote /> No more courses to load.</p>}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.map(course => (
                        <div key={course.courseId} className="bg-secondary rounded-lg shadow-md overflow-hidden">
                            <div className="p-4">
                                <p className="text-gray-600">{course.courseCode}</p>
                                <h3 className="text-xl font-semibold text-gray-800">{course.courseName}</h3>
                                <p className="text-gray-600">Credits: {course.courseCredits}</p>
                                <Link to={`/course/${course.courseCode}`} className="text-indigo-600 hover:text-indigo-800">View Reviews</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
}

export default Courses;
