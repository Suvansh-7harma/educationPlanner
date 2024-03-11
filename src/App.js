
// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState('');
  const [studyHours, setStudyHours] = useState({});

  useEffect(() => {
    const storedSubjects = localStorage.getItem('subjects');
    if (storedSubjects) {
      setSubjects(JSON.parse(storedSubjects));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  const handleAddSubject = () => {
    if (newSubject.trim() !== '') {
      setSubjects([...subjects, newSubject]);
      setNewSubject('');
    }
  };

  const handleRemoveSubject = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects.splice(index, 1);
    setSubjects(updatedSubjects);
  };

  const handleStudyHoursChange = (index, value) => {
    const updatedStudyHours = { ...studyHours };
    updatedStudyHours[index] = value;
    setStudyHours(updatedStudyHours);
  };

  return (
    <div className="App">
      <h1>Education Planner</h1>
      <div>
        <input
          type="text"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="Enter subject name"
        />
        <button onClick={handleAddSubject}>Add Subject</button>
      </div>
      <div>
        {subjects.map((subject, index) => (
          <div key={index}>
            <span>{subject}</span>
            <input
              type="number"
              value={studyHours[index] || ''}
              onChange={(e) => handleStudyHoursChange(index, e.target.value)}
            />
            <button onClick={() => handleRemoveSubject(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
