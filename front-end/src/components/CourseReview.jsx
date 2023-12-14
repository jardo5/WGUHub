// CourseReview.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { dummyReviews, dummyCourses } from '../utils/dummyData.js';

function courseReview() {
    const { courseId } = useParams();
    const course = dummyCourses.find(c => c.code === courseId);
    const reviews = course ? dummyReviews[course.id] || [] : [];

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">
                Reviews for Course {course ? `${course.code} - ${course.name}` : courseId}
            </h2>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className="bg-secondary p-4 rounded-lg shadow mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-semibold text-gray-800">Overall: {review.review_rating} / 5</span>
                            <span className="text-sm text-gray-800">{review.review_date}</span>
                        </div>
                        <p className="mb-2 text-gray-800"><strong>Difficulty:</strong> {review.review_difficulty} / 5</p>
                        <p className="mb-2 text-gray-800"><strong>Workload:</strong> {review.review_workload} hours / week</p>
                        <p className="italic text-gray-600">"{review.review_text}"</p>
                    </div>
                ))
            ) : (
                <p>No reviews available for this course.</p>
            )}
        </div>
    );
}

export default courseReview;

/*

B.S. Business Administration - Accounting
B.S. Business Administration - Healthcare Management
B.S. Business Administration - Human Resource Management
B.S. Business Administration - Information Technology Management
B.S. Business Administration - Management
B.S. Business Administration - Marketing
Master of Business Administration
MBA Information Technology Management
MBA Healthcare Management
M.S. Management and Leadership
M.S. Accounting


B.S. Nursing (Prelicensure)
B.S. Nursing (RN to BSN)
B.S. Health Information Management
B.S. Health Services Coordination
M.S. Nursing - Family Nurse Practitioner
M.S. Nursing - Psychiatric Mental Health Nurse Practitioner
M.S. Nursing - Education
M.S. Nursing - Leadership and Management
M.S. Nursing - Nursing Informatics
M.S. Nursing - Education (RN to MSN)
M.S. Nursing - Leadership and Management (RN to MSN)
M.S. Nursing - Nursing Informatics (RN to MSN)
Master of Health Leadership
Post-Master's Certificate, Nursing - Education
Post-Master's Certificate, Nursing - Leadership and Management


B.S. Cloud Computing (AWS Track)
B.S. Cloud Computing (Azure Track)
B.S. Cloud Computing (Multi-Cloud Track)
B.S. Computer Science
B.S. Cybersecurity and Information Assurance
B.S. Data Management/Data Analytics
B.S. Information Technology
B.S. Network Operations and Security
B.S. Software Development (Java Track)
B.S. Software Development (C# Track)
M.S. Cybersecurity and Information Assurance
M.S. Data Analytics
M.S. Information Technology Management


B.A. Educational Studies
B.A. Elementary Education
B.A. Special Education and Elementary Education (Dual Licensure)
B.A. Special Education (Mild to Moderate)
B.S. Mathematics Education (Middle Grades)
B.S. Mathematics Education (Secondary)
B.S. Science Education (Middle Grades)
B.S. Science Education (Secondary Biological Science)
B.S. Science Education (Secondary Chemistry)
B.S. Science Education (Secondary Earth Science)
B.S. Science Education (Secondary Physics)
M.A. Teaching, Elementary Education
M.A. Teaching, English Education (Secondary)
M.A. Teaching, Mathematics Education (Middle Grades)
M.A. Teaching, Mathematics Education (Secondary)
M.A. Teaching, Science Education (Secondary)
M.A. Teaching, Special Education
M.S. Curriculum and Instruction
M.S. Educational Leadership
M.S. Learning Experience Design and Educational Technology (K-12 and Adult Learner)
M.S. Learning Experience Design and Educational Technology (Adult Learner)
M.S. Learning Experience Design and Educational Technology (K-12 Learner)
M.A. English Language Learning (ELL) (PreK-12)
M.Ed. Instructional Design
M.Ed. Learning and Technology
M.A. Mathematics Education (K-6)
M.A. Mathematics Education (Middle Grades)
M.A. Mathematics Education (Secondary)
M.A. Science Education (Middle Grades)
M.A. Science Education (Secondary Biological Science)
M.A. Science Education (Secondary Chemistry)
M.A. Science Education (Secondary Earth Science)
M.A. Science Education (Secondary Physics)
Endorsement Preparation Program, English Language Learning (ELL) (PreK-12)
 */
