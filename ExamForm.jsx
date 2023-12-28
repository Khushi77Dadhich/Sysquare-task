import React, { useState } from 'react';
import { useExamFormContext } from './ExamFormProvider';
import { Link } from 'react-router-dom';

export const ExamForm = () => {
  const { submittedData, addSubmittedData } = useExamFormContext();
  const [name, setName] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [subjectMarks, setSubjectMarks] = useState({});
  const subjects = ['Math', 'Science', 'English', 'History']; // Add more subjects as needed

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubjectChange = (subject) => {
    const isSelected = selectedSubjects.includes(subject);

    if (isSelected) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const handleMarksChange = (subject, marks) => {
    setSubjectMarks({
      ...subjectMarks,
      [subject]: marks,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Combine the collected data and add it to the submittedData array
    const data = {
      name,
      selectedSubjects,
      subjectMarks,
    };
    addSubmittedData(data);

    // Clear the form fields after submission
    setName('');
    setSelectedSubjects([]);
    setSubjectMarks({});
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Candidate Form</h1>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="name">
            Name:
          </label>
          <input
            style={styles.input}
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <p style={styles.subjectsTitle}>Select Subjects:</p>
          {subjects.map((subject) => (
            <div key={subject} style={styles.subjectContainer}>
              <input
                style={styles.checkbox}
                type="checkbox"
                id={subject}
                checked={selectedSubjects.includes(subject)}
                onChange={() => handleSubjectChange(subject)}
              />
              <label style={styles.label} htmlFor={subject}>
                {subject}
              </label>
              {selectedSubjects.includes(subject) && (
                <input
                  style={styles.marksInput}
                  type="number"
                  placeholder="Enter marks"
                  onChange={(e) => handleMarksChange(subject, e.target.value)}
                  required
                />
              )}
            </div>
          ))}
        </div>
        <div style={styles.formGroup}>
          <button style={styles.submitButton} type="submit">
            Submit
          </button>
        </div>
      </form>
      <Link style={styles.link} to="/display">
        View Data Table
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  heading: {
    color: '#333333',
    marginBottom: '20px',
  },
  form: {
    width: '300px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    margin: '0 auto',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '14px',
    color: '#555555',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #cccccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  subjectsTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  subjectContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  checkbox: {
    marginRight: '10px',
  },
  marksInput: {
    width: '70px',
    marginLeft: '10px',
    padding: '5px',
    fontSize: '14px',
    border: '1px solid #cccccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    padding: '10px',
    fontSize: '16px',
    width: '100%',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  link: {
    display: 'block',
    marginTop: '20px',
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '14px',
  },
};

export default ExamForm;
