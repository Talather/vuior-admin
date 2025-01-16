'use client';

import TableContext from '@/components/table/context';
import styles from '@/components/table/title.module.css';
import { Checkbox } from '@nextui-org/react';
import { useContext, useEffect, useState } from 'react';

export default function TableTitleComponent({ checkbox, label, searchParams }) {
  const [searchCompany, setSearchCompany] = useState(null);
  const { selectedCompany, setSelectedCompany, setSelectedRows } = useContext(TableContext);

  const handleCheckboxChange = (isSelected) => {
    if (isSelected) {
      setSelectedCompany(searchCompany);
      setSelectedRows([]);
    } else {
      setSelectedCompany(null);
    }
  };

  useEffect(() => {
    setSearchCompany(searchParams?.company);
  }, [searchParams?.company]);

  return (
    <h1 className={styles.label}>{label} {checkbox &&
      <Checkbox className={styles.checkbox} isDisabled={!searchCompany} isSelected={!!selectedCompany}
        onValueChange={(isSelected) => handleCheckboxChange(isSelected)}>{checkbox}</Checkbox>}</h1>
  );
}