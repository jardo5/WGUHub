import React, { useState, useEffect } from 'react';

function TestAPI() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/test')
            .then(response => response.text())
            .then(data => setMessage(data))
            .catch(err => console.error("Error fetching data: ", err));
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold underline">Response from Backend:</h1>
            <p>{message}</p>

            <button className="btn btn-primary">Button</button>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Card title</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>

            {/* Font test */}
            <p className="font-ubuntu font-medium">Font Test - Medium</p>
            <p className="font-ubuntu font-normal">Font Test - Normal</p>
            <p className="font-ubuntu font-light">Font Test - Light</p>
            <p className="font-ubuntu font-bold">Font Test - Bold</p>

            <div className="dropdown mb-72">
                <div tabIndex={0} role="button" className="btn m-1">
                    Theme
                    <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
                    <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="darkTheme" value="darkTheme"/></li>
                    <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="lightTheme" value="lightTheme"/></li>
                    <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="winter" value="winter"/></li>
                </ul>
            </div>
        </div>
    );
}

export default TestAPI;
