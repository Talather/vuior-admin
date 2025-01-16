'use client';

import TableContext from '@/components/table/context';
import { ChevronDownIcon } from '@/icons/chevronDown';
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
} from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import styles from './footer.module.css';

export default function TableFooterComponent({ initialPage, pageSize, pagination, paginationFilter, total }) {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [pageSizes, setPageSizes] = useState(new Set([pageSize || 10]));
  const pageSizeValue = Array.from(pageSizes)[0];
  const { selectedSurvey, selectedCompany, selectedSort, selectedOrder } = useContext(TableContext);

  function handleCurrentPage(page) {
    const params = new URLSearchParams(searchParams);
    if (selectedSurvey) params.set('survey', selectedSurvey);
    if (selectedCompany) params.set('company', selectedCompany);
    if (selectedSort) params.set('sort', selectedSort);
    if (selectedOrder) params.set('order', selectedOrder);
    params.set('page', page);
    router.replace(`${pathName}?${params.toString()}`);
  }

  function handlePageSize(size) {
    const params = new URLSearchParams(searchParams);
    params.set('size', size);
    params.set('page', '1');
    router.replace(`${pathName}?${params.toString()}`);
  }

  useEffect(() => {
    const page = searchParams.get('page');
    if (page) setPage(parseInt(page, 10));
  }, [searchParams]);

  return (
    <>
      <div className={styles.bottomActions}>
        {paginationFilter &&
          <>
            <label>Results per page</label>
            <ButtonGroup color={'primary'} radius={'sm'} size={'sm'}>
              <Button>{pageSizeValue}</Button>
              <Dropdown placement={'bottom-end'} radius={'sm'}>
                <DropdownTrigger>
                  <Button isIconOnly={true}>
                    <ChevronDownIcon />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label={'Items Per Page'} disallowEmptySelection={true} selectedKeys={pageSizes}
                  selectionMode={'single'} onAction={key => handlePageSize(key)} onSelectionChange={setPageSizes}>
                  <DropdownItem key={1}>1</DropdownItem>
                  <DropdownItem key={10}>10</DropdownItem>
                  <DropdownItem key={20}>20</DropdownItem>
                  <DropdownItem key={30}>30</DropdownItem>
                  <DropdownItem key={50}>50</DropdownItem>
                  <DropdownItem key={100}>100</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </ButtonGroup>
          </>
        }
        {pagination &&
          <Pagination isCompact={true} initialPage={initialPage} page={page} showControls={true} size={'sm'}
            total={total} variant={'light'} onChange={handleCurrentPage} />}
      </div>
    </>
  );
}
