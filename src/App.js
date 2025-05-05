import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authentication from './components/login';
import ToDoApp1 from './components/todo'; // or your actual component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/todo" element={< ToDoApp1/>} />
      </Routes>
    </Router>
  );
}

export default App;
