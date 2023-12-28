import React from 'react';
import { Link } from 'react-router-dom';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useExamFormContext } from './ExamFormProvider';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Helper function to calculate total marks for a student
const getTotalMarks = (subjectMarks) => {
  return Object.values(subjectMarks).reduce((total, marks) => total + Number(marks), 0);
};

// Helper function to calculate the distribution of marks for each subject
const getSubjectMarksDistribution = (students) => {
  const distribution = {};

  students.forEach((student) => {
    Object.entries(student.subjectMarks).forEach(([subject, marks]) => {
      if (!distribution[subject]) {
        distribution[subject] = {};
      }

      if (distribution[subject][marks]) {
        distribution[subject][marks]++;
      } else {
        distribution[subject][marks] = 1;
      }
    });
  });

  return distribution;
};

const AddCandidate = () => {
  const { submittedData } = useExamFormContext();
  console.log(submittedData);

  const lineState = {
    labels: ['Students', 'Marks Obtained'],
    datasets: [
      {
        label: 'Marks',
        backgroundColor: ['tomato'],
        hoverBackgroundColor: ['rgb(197, 72, 49)'],
        data: submittedData.map((data) => getTotalMarks(data.subjectMarks)),
      },
    ],
  };

  const subjectMarksDistribution = getSubjectMarksDistribution(submittedData);

  // Pie chart data for overall distribution
  const overallData = {
    labels: Object.keys(subjectMarksDistribution).reduce(
      (labels, subject) => labels.concat(Object.keys(subjectMarksDistribution[subject])),
      []
    ),
    datasets: [
      {
        data: Object.values(subjectMarksDistribution)
          .map((marks) => Object.values(marks))
          .reduce((arr, marks) => arr.concat(marks), []),
        backgroundColor: [
          'red',
          'orange',
          'yellow',
          'green',
          'blue',
          'purple',
          'pink',
          'brown',
        ],
      },
    ],
  };

  // Line chart data for subject-wise distribution
  const subjectPieCharts = Object.keys(subjectMarksDistribution).map((subject) => {
    const data = {
      labels: Object.keys(subjectMarksDistribution[subject]),
      datasets: [
        {
          data: Object.values(subjectMarksDistribution[subject]),
          backgroundColor: [
            'red',
            'orange',
            'yellow',
            'green',
            'blue',
            'purple',
            'pink',
            'brown',
          ],
        },
      ],
    };

    return (
      <div
        key={subject}
        className="pieChart"
        style={{ height: '500px', width: '500px', margin: '100px auto', textAlign: 'center' }}
      >
        <h3>{subject} Marks Distribution</h3>
        <Doughnut data={data} options={{ maintainAspectRatio: false }} />
      </div>
    );
  });

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/exam" style={{ textDecoration: 'none', color: 'black', marginBottom: '20px' }}>
        Add
      </Link>
      {/* Display submitted data in a table */}
      <h2 style={{ textAlign: 'center' }}>Submitted Data</h2>
      {submittedData.length > 0 && (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px',
          }}
        >
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Subjects</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Marks</th>
            </tr>
          </thead>
          <tbody>
            {submittedData.map((data, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{data.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {data.selectedSubjects.join(', ')}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
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
      {/* Overall Pie Chart */}
      <div
        className="pieChart"
        style={{ height: '500px', width: '500px', margin: '100px auto', textAlign: 'center' }}
      >
        <h3>Overall Marks Distribution</h3>
        <Doughnut data={overallData} options={{ maintainAspectRatio: false }} />
      </div>
      {/* Line Chart */}
      <div
        className="lineChart"
        style={{ height: '200px', width: '500px', margin: '150px auto', textAlign: 'center' }}
      >
        <Line data={lineState} options={{ maintainAspectRatio: false }} />
      </div>
      {/* Subject-wise Pie Charts */}
      {subjectPieCharts}
    </div>
  );
};

export default AddCandidate;
