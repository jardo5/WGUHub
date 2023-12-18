import React, { useState, useEffect } from 'react';
import FilterSVG from '@material-symbols/svg-500/outlined/filter_alt.svg?react';
import Cancel from '@material-symbols/svg-500/outlined/cancel.svg?react';
import {fetchDegreeNames} from "../../services/DegreeService.js";

function Filter({ onDegreeSelect }) {
    const [originalDegrees, setOriginalDegrees] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [selectedDegree, setSelectedDegree] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        if (isDropdownOpen) {
            const fetchDegreesData = async () => {
                try {
                    const degreeNames = await fetchDegreeNames();
                    setOriginalDegrees(degreeNames);
                    setDegrees(degreeNames);
                } catch (error) {
                    console.error('Error fetching degrees:', error);
                }
            };

            fetchDegreesData();
        }
    }, [isDropdownOpen]);


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSearchChange = (event) => {
        const term = event.target.value.toLowerCase();
        const filteredDegrees = originalDegrees.filter(degree =>
            degree.degreeName.toLowerCase().includes(term)
        );
        setDegrees(filteredDegrees);
    };

    const handleDegreeClick = (degree) => {
        setSelectedDegree(degree);
        onDegreeSelect(degree.degreeId);
    };

    const handleCancelClick = () => {
        setSelectedDegree(null);
        onDegreeSelect(null);
    };

    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <FilterSVG tabIndex={0} role="button" className="fill-secondary h-10 w-10" onClick={toggleDropdown}></FilterSVG>
            {isDropdownOpen && (
                <ul tabIndex={0} className="no-scrollbar dropdown-content menu flex-nowrap p-2 shadow bg-base-100 rounded-box my-2 w-80 h-56 overflow-y-auto">
                    <div className="justify-center flex">
                        <div className="form-control">
                            <input
                                type="text"
                                placeholder="Search Degree"
                                className="input input-bordered w-56 m-4 h-10 md:w-auto"
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>

                    {selectedDegree && (
                        <div className="flex w-full justify-center">
                            <div className="text-white w-full p-2 my-1 rounded-xl flex flex-row justify-evenly items-center badge-accent bg-accent overflow-y-clip">
                                {selectedDegree.degreeName}
                                <button onClick={handleCancelClick} className="m-2">
                                    <Cancel className="fill-base-100 h-6 w-6"></Cancel>
                                </button>
                            </div>
                        </div>
                    )}

                    {degrees.map((degree, index) => (
                        <li className="py-2 rounded-xl my-1 gap-2 bg-primary" key={index} onClick={() => handleDegreeClick(degree)}>
                            <a className="text-white">{degree.degreeName}</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Filter;
