import React from 'react';

function CourseSearch({setSearchTerm}) {
    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
    };

    return (
        <div className="justify-center flex">
            <div className="form-control">
                <input
                    type="text"
                    placeholder="Search By Code or Name"
                    className="input input-bordered w-56 m-4 h-10 md:w-auto"
                    onChange={handleSearchChange}
                />
            </div>
        </div>
    );
}

export default CourseSearch;
