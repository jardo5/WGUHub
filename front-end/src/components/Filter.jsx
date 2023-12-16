import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterSVG from '@material-symbols/svg-500/outlined/filter_alt.svg?react';


function Filter({ onDegreeSelect }) {
    const [originalDegrees, setOriginalDegrees] = useState([]);
    const [degrees, setDegrees] = useState([]);

    useEffect(() => {
        const fetchDegrees = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/degrees/names');
                setOriginalDegrees(response.data); // Set original degrees
                setDegrees(response.data); // Also set degrees for initial render
            } catch (error) {
                console.error('Error fetching degrees:', error);
            }
        };

        fetchDegrees();
    }, []);

    const handleSearchChange = (event) => {
        const term = event.target.value.toLowerCase();
        const filteredDegrees = originalDegrees.filter(degree =>
            degree.degreeName.toLowerCase().includes(term)
        );
        setDegrees(filteredDegrees);
    };

    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <FilterSVG tabIndex={0} role="button" className="fill-secondary h-10 w-10"></FilterSVG>
            <ul tabIndex={0} className="dropdown-content menu flex-nowrap p-2 shadow bg-base-100 rounded-box my-2 w-80 h-56 overflow-y-auto">
                <h1 key="title" className="flex items-center justify-center">Sort By Degree</h1>

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

                {degrees.map((degree, index) => (
                    <li key={index} onClick={() => onDegreeSelect(degree.degreeId)}>
                        <a className="text-white">{degree.degreeName}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Filter;

