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
            <h1>Response from Backend:</h1>
            <p>{message}</p>

            <p className="font-ubuntu font-medium">Font Test</p>

            <p className="font-ubuntu font-normal">Font Test</p>

            <p className="font-ubuntu font-light">Font Test</p>

            <p className="font-ubuntu font-bold">Font Test</p>
        </div>
    );
}

export default TestAPI;
