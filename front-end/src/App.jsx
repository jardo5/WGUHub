import React from 'react';
import Navbar from "./components/navbar.jsx";
import Courses from "./components/courses.jsx";



function App() {
    return (
        <div className="h-full w-full flex flex-col">
            <Navbar />
            <Courses />
        </div>
    );
}

export default App;
