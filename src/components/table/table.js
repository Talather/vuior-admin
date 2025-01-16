'use client';
import DashboardContext from '@/components/dashboard/context';
import TableContext from '@/components/table/context';
import TableFooterComponent from '@/components/table/footer';
import GroupNameModalComponent from '@/components/table/group-name';
import styles from '@/components/table/wrapper.module.css';
import { fetchUrl, transformDate } from '@/lib/utils';
import {
  Button,
  Checkbox,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useContext, useEffect, useState } from 'react';


export async function downloadLink(res, fileName) {
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

export default function TableComponent({
  columns,
  deleteAction,
  downloadActionUrl,
  initialPage,
  label,
  model = 'Item',
  pageSize,
  pagination,
  paginationFilter,
  rows,
  selectionMode = 'none',
  total,
}) {
  const [item, setItem] = useState(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [reportLoading, setReportLoading] = useState('');
  const [sortDescriptor, setSortDescriptor] = React.useState({});
  const {
    selectedRows,
    setSelectedCompany,
    setSelectedRows,
    setSelectedSort,
    setSelectedOrder,
  } = useContext(TableContext);
  const { setError, setSuccess } = useContext(DashboardContext);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  
  const downloadAction = useCallback(async (id, formData) => {
    let report;
    let response;
    setReportLoading(id);
    switch (downloadActionUrl) {
      case '/reports/individual-report':
        response = await fetch(`${fetchUrl(downloadActionUrl)}?id=${id}`, { method: 'POST' });
        report = `${response.headers.get('fileName')}.pdf`;
        break;
      case '/reports/group-average-report':
        response = await fetch(`${fetchUrl(downloadActionUrl)}?id=${id}`, {
          body: JSON.stringify({ selectedIds: [], groupName: formData.groupName }),
          method: 'POST',
        });
        report = `${response.headers.get('fileName')}.pdf`;
        break;
    }
    if (response.status === 200) {
      await downloadLink(response, report);
    } else {
      setError('An error occurred while downloading report. Please try again.');
    }
    setReportLoading('');
  }, [downloadActionUrl, setError]);

  const handleClose = () => {
    setItem(null);
    onClose();
  };



  const handleDelete = useCallback(async () => {
    console.log("churail",item)
    const id = item;
    if (!id) return;

    onClose();
    const response = await deleteAction(id);
    if (response.success) {
      setSuccess(response.success);
    } else if (response.error) {
      setError(response.error);
    }
  }, [deleteAction, item, onClose, setError, setSuccess]);




  const handleOpen = useCallback((id) => {
    setItem(id);
    onOpen();
  }, [onOpen]);

  const handleSelectionChange = (keys) => {
    let selectedIds = Array.from(selectedRows);
    if (keys === 'all') {
      keys = rows.map(item => item.id);
      setSelectedRows(selectedIds.concat(keys));
    } else if (keys.anchorKey === undefined && keys.size === 0) {
      let rs = rows.map(item => item.id);
      const newIds = [];
      selectedIds.forEach((e) => {
          if (!rs.includes(e)) {
            newIds.push(e);
          }
        },
      );
      setSelectedRows(newIds);
    } else {
      setSelectedCompany(null);
      setSelectedRows(keys);
    }
  };

  const handleSort = (sortDescriptor) => {
    setSortDescriptor(sortDescriptor);
    const params = new URLSearchParams(searchParams);
    setSelectedSort(sortDescriptor.column);
    params.set('sort', sortDescriptor.column);

    let direction;
    switch (sortDescriptor.direction) {
      case 'ascending':
        direction = 'asc';
        break;
      case 'descending':
        direction = 'desc';
        break;
      default:
        direction = 'ascending';
    }
    params.set('order', direction);
    setSelectedOrder(direction);
    router.replace(`${pathName}?${params.toString()}`);
  };

  const onSubmit = async (formData) => {
    onClose();
    await downloadAction(item, formData);
  };

  const renderCell = useCallback((item, key) => {
    let value = item[key];
    if (key === 'createdAt' || key === 'updatedAt') {
      return transformDate(value);
    }

    const wrapper = (className, href) => {
      return <div className={className}>
        {href==="quiz" ? <div></div> : <Link className={styles.actionLink} color={'primary'} href={href} size={'sm'}>Edit</Link>}
        <Button color={'danger'} radius={'sm'} size={'sm'} variant={'bordered'}
          onPress={() => handleOpen(item.id)}>Delete</Button>
      </div>;
    };
    switch (key) {
      case 'category':
        return value.name || '';
      case 'category.topic':
        return item.category.topic.name || '';
      case 'company':
        return value.name || '';
      case 'createdBy':
        return `${value.firstName} ${value.lastName}`;
      case 'employee':
        return `${value.firstName} ${value.lastName}`;
      case 'employee.position':
        return item.employee.position || '';
      case 'employee.segment':
        return item.employee.segment || '';
      case 'employee.company':
        return item.employee.company.name || '';
      case 'question':
        return value.name || '';
      case 'subcategory':
        return value.name || '';
      case 'survey':
        return value.name || '';
      case 'topic':
        return value.name || '';
    }
    switch (value) {
      case "schoolsManagement":
        return wrapper(
          "flex gap-2 items-center justify-end",
          `/dashboard/schools/update/${item.id}`
        )

      case "administratorsManagement":
        return wrapper(
          "flex gap-2 items-center justify-end",
          `/dashboard/administrators/update/${item.id}`
        )

      case "quizzesManagement":
        return wrapper(
          "flex gap-2 items-center justify-end",
          "quiz"
          // `/dashboard/quizzes/update/${item.id}`
        )

      case "gradesManagement":
        return wrapper(
          "flex gap-2 items-center justify-end",
          `/dashboard/grades/update/${item.id}`
        )

      case "categoryManagement":
        return wrapper(
          "flex gap-2 items-center justify-end",
          `/dashboard/categories/update/${item.key}`
        )
      case "checkbox":
        return <Checkbox color={"primary"} key={item.key} />
      case "companyManagement":
        return wrapper(
          "flex gap-2 items-center justify-end",
          `/dashboard/companies/update/${item.key}`
        )
      case "completedSurvey":
        return (
          <div className="flex gap-2 items-center justify-end">
            <Button
              color={"primary"}
              isLoading={item.id === reportLoading}
              radius={"sm"}
              size={"sm"}
              variant={"bordered"}
              onClick={() => downloadAction(item.id)}
            >
              Download
            </Button>
            <Button
              color={"danger"}
              radius={"sm"}
              size={"sm"}
              variant={"bordered"}
              onPress={() => handleOpen(item.id)}
            >
              Delete
            </Button>
          </div>
        )
      case "employeeManagement":
        return wrapper(
          "flex gap-2 items-center justify-end",
          `/dashboard/employees/update/${item.key}`
        )

      case "studentsManagement":
        return wrapper(
          "flex gap-2 items-center justify-end",
          `/dashboard/students/update/${item.id}`
        )
      case "recentSurveys":
        return (
          <div className="flex gap-2 items-center justify-end">
            <Button
              color={"primary"}
              radius={"sm"}
              size={"sm"}
              variant={"bordered"}
            >
              Download
            </Button>
          </div>
        )
      case "sharedSurvey":
        return (
          <div className="flex gap-2 items-center justify-end">
            <Button
              color={"primary"}
              isLoading={item.id === reportLoading}
              radius={"sm"}
              size={"sm"}
              variant={"bordered"}
              onClick={() => handleOpen(item.id)}
            >
              Group Average
            </Button>
          </div>
        )
      case "subcategoryManagement":
        return wrapper(
          "flex gap-2 items-center justify-end",
          `/dashboard/subcategories/update/${item.key}`
        )
      case "surveyManagement":
        return wrapper(
          "flex gap-2 items-center justify-end",
          `/dashboard/surveys/update/${item.key}`
        )
      case "topicManagement":
        return wrapper(
          "flex gap-2 items-center justify-end",
          `/dashboard/topics/update/${item.key}`
        )
      default:
        return value
    }
  }, [downloadAction, handleOpen, reportLoading]);

  useEffect(() => {
    if (searchParams.get('sort') && searchParams.get('order')) {
      setSortDescriptor({
        column: searchParams.get('sort'),
        direction: searchParams.get('order') === 'asc' ? 'ascending' : 'descending',
      });
    }
  }, [searchParams]);

  return (
    <>
      <Table aria-label={`Table for ${label}`}
        bottomContent={<TableFooterComponent initialPage={initialPage} pageSize={pageSize} pagination={pagination}
          paginationFilter={pagination && paginationFilter} total={total} />} color={'primary'} isStriped={true}
        radius={'sm'} selectedKeys={selectedRows} selectionMode={selectionMode} sortDescriptor={sortDescriptor}
        onSelectionChange={(keys) => handleSelectionChange(keys)} onSortChange={(sd) => handleSort(sd)}>
        <TableHeader columns={columns}>
          {(column) => <TableColumn align={"center"
            
          } allowsSorting={column.sortable} key={column.key}>
            {column.key === 'action' &&
              <div className={'flex items-center justify-end'} style={{ marginRight: '45px' }}>{column.label}</div>}
            {column.key !== 'action' && column.label}</TableColumn>}
        </TableHeader>
        <TableBody emptyContent={`No ${label} to display.`} items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>


      {/* {label === 'Shared Surveys' ?
        <GroupNameModalComponent isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} setItem={setItem} /> : */}
        <Modal radius={'sm'} size={'xs'} isOpen={isOpen} onClose={handleClose}>
          <ModalContent>
            {(handleClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Confirm Delete</ModalHeader>
                <ModalBody>
                  <p>Are you sure you want to delete this {model}?</p>
                </ModalBody>
                <ModalFooter>
                  <Button color={'default'} variant="light" onPress={handleClose}>
                    Cancel
                  </Button>
                  <Button color={'danger'} onPress={handleDelete}>
                    Delete
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
      </Modal>
        {/* } */}
    </>
  );
}