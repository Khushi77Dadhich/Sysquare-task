// ExamFormProvider.js
import React, { createContext, useContext, useState } from 'react';

const ExamFormContext = createContext();

export const ExamFormProvider = ({ children }) => {
  const [submittedData, setSubmittedData] = useState([]);

  const addSubmittedData = (data) => {
    setSubmittedData([...submittedData, data]);
  };

  const contextValue = {
    submittedData,
    addSubmittedData,
  };

  return (
    <ExamFormContext.Provider value={contextValue}>
      {children}
    </ExamFormContext.Provider>
  );
};

export const useExamFormContext = () => {
  return useContext(ExamFormContext);
};
