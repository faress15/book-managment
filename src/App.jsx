// src/App.jsx
import React from 'react';
import SignUp from './SignUp';
import Login from './Login';

const App = () => {
    return (
        <div>
            <h1>Library Management System</h1>
            <SignUp />
            <Login />
        </div>
    );
};

export default App;

