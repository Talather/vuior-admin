'use client';

import DashboardContext from '@/components/dashboard/context';
import { useContext, useEffect, useState } from 'react';

export default function MessageComponent() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { error, setError, setSuccess, success } = useContext(DashboardContext);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setTimeout(() => {
        setError(null);
        setErrorMessage(null);
      }, 5000);
    }

    if (success) {
      setSuccessMessage(success);
      setTimeout(() => {
        setSuccess(null);
        setSuccessMessage(null);
      }, 5000);
    }
  }, [error, setError, setSuccess, success]);

  return (
    <>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
    </>
  );
}