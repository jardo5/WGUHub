import React, {useState} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Content from './pages/Content.jsx';

function App() {
    const [selectedDegreeId, setSelectedDegreeId] = useState(null);

    return (
        <Router>
            <div className="h-full w-full flex flex-col bg-base-200 overflow-x-clip">
                <Navbar/>
                <Content
                    selectedDegreeId={selectedDegreeId}
                    setSelectedDegreeId={setSelectedDegreeId}
                />
            </div>
        </Router>
    );
}

export default App;
