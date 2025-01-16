'use client';

import { createContext, useState } from 'react';

const DashboardContext = createContext({});

export const DashboardProvider = ({ children }) => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  return (
    <DashboardContext.Provider value={{ error, setError, setSuccess, success }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;