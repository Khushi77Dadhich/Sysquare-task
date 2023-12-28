import React from 'react';
import { useExamFormContext } from './ExamFormProvider';

const DisplayData = () => {
  const { submittedData } = useExamFormContext();

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thTdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  return (
    <div>
      {/* Display submitted data in a table */}
      <h2>Submitted Data</h2>
      {submittedData.length > 0 && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Name</th>
              <th style={thTdStyle}>Subjects</th>
              <th style={thTdStyle}>Marks</th>
            </tr>
          </thead>
          <tbody>
            {submittedData.map((data, index) => (
              <tr key={index}>
                <td style={thTdStyle}>{data.name}</td>
                <td style={thTdStyle}>{data.selectedSubjects.join(', ')}</td>
                <td style={thTdStyle}>
                  {Object.entries(data.subjectMarks).map(([subject, marks]) => (
                    <div key={subject}>
                      {subject}: {marks}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DisplayData;
