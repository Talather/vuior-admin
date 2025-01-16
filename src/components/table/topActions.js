'use client';

// import CategoryFilterComponent from '@/components/category/filter';
// import CompanyFilterComponent from '@/components/company/filter';
// import DashboardContext from '@/components/dashboard/context';
// import SurveyFilterComponent from '@/components/survey/filter';
import TableContext from '@/components/table/context';
// import GroupNameModalComponent from '@/components/table/group-name';
import { downloadLink } from '@/components/table/table';
// import TopicFilterComponent from '@/components/topic/filter';
// import { createSurveyInvitation } from '@/lib/form-actions/surveyInvitation';
// import { fetchUrl } from '@/lib/utils';
import { Button, Input, Link, Tooltip, useDisclosure } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useContext, useEffect, useState } from 'react';
// import { useDebouncedCallback } from 'use-debounce';
import styles from './topActions.module.css';

export default function TableTopActionsComponent({
  create,
  createText,
  filters,
  individualComparison,
  individualComparisonDownloadActionUrl,
  groupComparison,
  groupComparisonDownloadActionUrl,
  label,
  search,
  shareSurvey,
  sendSurvey,
  topActions,
  survey,
}) {
  // const searchParams = useSearchParams();
  // const params = new URLSearchParams(searchParams);

  // const companyParam = params.get('company');
  // const [groupComparisonLoading, setGroupComparisonLoading] = useState(false);
  // const [individualComparisonLoading, setIndividualComparisonLoading] = useState(false);
  // const [groupAverageLoading, setGroupAverageLoading] = useState(false);
  // const pathName = usePathname();
  // const router = useRouter();
  // const { selectedCompany, selectedRows, setSelectedRows } = useContext(TableContext);
  // const { setError, setSuccess } = useContext(DashboardContext);
  // const surveyParam = params.get('survey');
  // const [surveyShareHref, setSurveyShareHref] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  // const { isOpen, onClose, onOpen } = useDisclosure();

  // const handleCreateSurveyInvitation = async (surveyInvitationCreate) => {
  //   setIsLoading(true);
  //   const response = await createSurveyInvitation(surveyInvitationCreate);
  //   setIsLoading(false);
  //   if (response?.error) setError('An error occurred while sending Survey Invitation. Please try again.');
  //   else setSuccess('Survey Invitation(s) sent successfully.');
  //   router.back();
  // };

  // const handleSearch = useDebouncedCallback((query) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (query) params.set('query', query);
  //   else params.delete('query');
  //   params.set('page', '1');
  //   router.replace(`${pathName}?${params.toString()}`);
  // }, 300);

  // let surveyId = '';
  // let adminId = '';

  // if (survey) {
  //   surveyId = survey._id;
  //   adminId = survey.createdBy._id;
  // }

  // useEffect(() => {
  //   const array = Array.from(selectedRows);
  //   if (array[0]) {
  //     setSurveyShareHref(`/dashboard/surveys/share/${array[0]}`);
  //   } else {
  //     setSurveyShareHref('');
  //   }
  // }, [selectedRows]);

  // async function handleGroupComparisonDownload(formData) {
  //   onClose();
  //   setGroupComparisonLoading(true);
  //   let selectedIds = Array.from(selectedRows);
  //   let res = await fetch(fetchUrl(`${groupComparisonDownloadActionUrl}?id1=${selectedIds[0]}&id2=${selectedIds[1]}`), {
  //     body: JSON.stringify({ groupName: formData.groupName }), method: 'POST',
  //   });
  //   let report = `${res.headers.get('fileName')}`
  //   if (res.status === 200) {
  //     await downloadLink(res, report);
  //   }
  //   setGroupComparisonLoading(false);
  // }

  // async function handleIndividualComparisonDownload() {
  //   setIndividualComparisonLoading(true);
  //   let selectedIds = Array.from(selectedRows);
  //   let res = await fetch(fetchUrl(`${individualComparisonDownloadActionUrl}?id1=${selectedIds[0]}&id2=${selectedIds[1]}`), { method: 'POST' });
  //   let report = `${res.headers.get('fileName')}`;
  //   if (res.status === 200) {
  //     await downloadLink(res, report);
  //   }
  //   setIndividualComparisonLoading(false);
  // }

  // async function handleGroupAverageDownload(formData) {
  //   onClose();
  //   setGroupAverageLoading(true);
  //   let selectedIds = Array.from(selectedRows);
  //   let res = await fetch(fetchUrl('/reports/group-average-report'), {
  //     body: JSON.stringify({ selectedIds: selectedIds, groupName: formData.groupName }),
  //     method: 'POST',
  //   });
  //   let report = `${res.headers.get('fileName')}.pdf`;
  //   if (res.status === 200) {
  //     await downloadLink(res, report);
  //     setSelectedRows(new Set([]));
  //   }
  //   setGroupAverageLoading(false);
  // }

  // const handleOpen = useCallback(() => {
  //   onOpen();
  // }, [onOpen]);
  // label==="Videos"  ? label="Quizzes" :label=label
  return (
    <div></div>
    // <div className={styles.topActions}>
    //   {Object.keys(filters).length ? <div className={styles.filterWrapper}>
    //     <label>Filter By:</label>
    //     {filters.category && <CategoryFilterComponent />}
    //     {filters.company && <CompanyFilterComponent />}
    //     {filters.survey && <SurveyFilterComponent />}
    //     {filters.topic && <TopicFilterComponent />}
    //   </div> : null}
    //   {search && <Input className={styles.searchInput} defaultValue={searchParams.get('query')?.toString()} label={''}
    //     labelPlacement={'outside'} placeholder={'Search'} radius={'sm'} size={'sm'} variant={'bordered'}
    //     onChange={(e) => handleSearch(e.target.value)} />}
    //   {create && <Link className={styles.createLink} href={`${label.toLowerCase()}/create`}>
    //     {createText}
    //   </Link>}
    //   {shareSurvey && <Link className={styles.shareLink} href={surveyShareHref} isDisabled={!surveyShareHref}
    //     size={'sm'}>Share</Link>}
    //   {sendSurvey &&
    //     <Button color={'primary'} isLoading={isLoading}
    //       isDisabled={!selectedCompany && !Array.from(selectedRows).length} radius={'sm'} size={'sm'}
    //       onClick={() => handleCreateSurveyInvitation({
    //         adminId,
    //         companyId: selectedCompany,
    //         employeeIds: Array.from(selectedRows),
    //         surveyId,
    //       })}>Send</Button>}
    //   {groupComparison &&
    //     <Tooltip content={'Please select a Company, Survey and Two shared surveys to compare.'}
    //       hidden={companyParam && surveyParam && Array.from(selectedRows).length === 2}>
    //     <span>
    //     <Button color={'primary'} isDisabled={!companyParam || !surveyParam || Array.from(selectedRows).length !== 2}
    //       isLoading={groupComparisonLoading} radius={'sm'} onClick={handleOpen} size={'sm'}>Comparison</Button>
    //     </span>
    //     </Tooltip>
    //   }
    //   {individualComparison &&
    //     <Tooltip content={'Please select a Company, Survey and Two completed surveys to compare.'}
    //       hidden={companyParam && surveyParam && Array.from(selectedRows).length === 2}>
    //     <span>
    //     <Button color={'primary'} isDisabled={!companyParam || !surveyParam || Array.from(selectedRows).length !== 2}
    //       isLoading={individualComparisonLoading} radius={'sm'} onClick={handleIndividualComparisonDownload}
    //       size={'sm'}>Comparison</Button>
    //     </span>
    //     </Tooltip>
    //   }
    //   {individualComparison &&
    //     <Tooltip content={'Please select a Company, Survey and Two or more completed surveys to calculate Average.'}
    //       hidden={companyParam && surveyParam && Array.from(selectedRows).length >= 2}>
    //     <span>
    //     <Button color={'primary'} isDisabled={!companyParam || !surveyParam || Array.from(selectedRows).length < 2}
    //       isLoading={groupAverageLoading} radius={'sm'} onClick={handleOpen} size={'sm'}>Group Average</Button>
    //     </span>
    //     </Tooltip>
    //   }
    //   <GroupNameModalComponent isOpen={isOpen} onClose={onClose}
    //     onSubmit={groupComparison ? handleGroupComparisonDownload : handleGroupAverageDownload} />
    //   {topActions}

    // </div>
  );
}