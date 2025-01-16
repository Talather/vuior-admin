'use client';

import { createContext, useState } from 'react';

const TableContext = createContext({});

export const TableProvider = ({ children }) => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedRows, setSelectedRows] = useState(new Set([]));
  const [selectedOrder, setSelectedOrder] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [selectedSurvey, setSelectedSurvey] = useState('');

  return (
    <TableContext.Provider value={{
      selectedCompany,
      selectedOrder,
      selectedRows,
      selectedSort,
      selectedSurvey,
      setSelectedCompany,
      setSelectedOrder,
      setSelectedRows,
      setSelectedSort,
      setSelectedSurvey,
    }}>
      {children}
    </TableContext.Provider>
  );
};

export default TableContext;