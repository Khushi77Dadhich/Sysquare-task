import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  // State variables to store user input (username and password)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Function to handle form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Check authentication logic (e.g., against a database)
    if (username === 'user' && password === '1234') {
      // For simplicity, set loggedIn to true if authentication is successful
      setLoggedIn(true);
      alert('Login successful!');
      navigate('/candidate');
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Login Page</h1>
      {loggedIn ? (
        <p style={styles.loggedInMessage}>You are logged in. Redirecting...</p>
      ) : (
        <form style={styles.form} onSubmit={handleLogin}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="username">
              Username:
            </label>
            <input
              style={styles.input}
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">
              Password:
            </label>
            <input
              style={styles.input}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button style={styles.button} type="submit">
              Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
  },
  heading: {
    color: '#333333',
    marginBottom: '20px',
  },
  loggedInMessage: {
    color: 'green',
  },
  form: {
    width: '300px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    marginBottom: '8px',
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
  button: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    padding: '10px',
    fontSize: '16px',
    width: '100%',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Login;
