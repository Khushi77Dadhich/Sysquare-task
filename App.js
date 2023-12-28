import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ExamFormProvider } from './ExamFormProvider';
import { ReactDOM } from 'react';
import './App.css';
import { Login } from "./Login";
import { ExamForm } from "./ExamForm";
import DisplayData from './DisplayData';
import AddCandidate from './AddCandidate';
//import { Try2 } from "./Try2";

function App() {
  return (
    <>
    <ExamFormProvider>
    <Router>
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/candidate" element={<AddCandidate />} />
    <Route path="/exam" element={<ExamForm />} />
    <Route path="/display" element={<DisplayData />} />
  </Routes>
    </Router>
    </ExamFormProvider>
    </>
   
  );
}

export default App;
