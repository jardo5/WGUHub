import React, { useState, useEffect } from 'react';
import FilterSVG from '@material-symbols/svg-500/outlined/filter_alt.svg?react';

function Filter() {

    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <FilterSVG tabIndex={0} role="button" className="fill-secondary h-10 w-10"></FilterSVG>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box my-2 w-80">
                <h1 key="title" className="flex items-center justify-center">Sort By Degree</h1>
                    <li>
                        <a className="text-white">Degree</a>
                    </li>
            </ul>
        </div>
    );
}

export default Filter;
