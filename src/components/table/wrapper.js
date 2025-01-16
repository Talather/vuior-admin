import { TableProvider } from '@/components/table/context';
import TableDataComponent from '@/components/table/data';
import TableSkeletonComponent from '@/components/table/skeleton';
import TableComponent from '@/components/table/table';
import TableTitleComponent from '@/components/table/title';
import TableTopActionsComponent from '@/components/table/topActions';
import { Suspense } from 'react';

export default async function TableWrapperComponent({
  checkbox,
  columns,
  create,
  createText,
  customFields = [],
  deleteAction,
  downloadActionUrl,
  filters = {},
  individualComparison,
  individualComparisonDownloadActionUrl,
  groupComparison,
  groupComparisonDownloadActionUrl,
  label,
  model,
  pagination,
  paginationFilter = true,
  search,
  searchParams,
  selectionMode,
  serverFn,
  sendSurvey,
  shareSurvey,
  topActions,
  sortBy,
  survey,
}) {
  return (
    <TableProvider>
      <TableTopActionsComponent create={create} createText={createText} filters={filters}
        groupComparison={groupComparison} groupComparisonDownloadActionUrl={groupComparisonDownloadActionUrl}
        individualComparison={individualComparison}
        individualComparisonDownloadActionUrl={individualComparisonDownloadActionUrl} label={label} search={search}
        sendSurvey={sendSurvey} shareSurvey={shareSurvey} topActions={topActions} survey={survey} />
      <TableTitleComponent checkbox={checkbox} label={label} searchParams={searchParams}></TableTitleComponent>
      <div>






        {serverFn ?
          <Suspense fallback={<TableSkeletonComponent size={searchParams?.size} />}><TableDataComponent
            columns={columns} customFields={customFields} deleteAction={deleteAction}
            downloadActionUrl={downloadActionUrl} label={label} model={model} pagination={pagination}
            paginationFilter={paginationFilter} searchParams={searchParams} selectionMode={selectionMode}
            serverFn={serverFn} sortBy={sortBy} /></Suspense> :
          <TableComponent columns={columns} deleteAction={deleteAction} downloadActionUrl={downloadActionUrl}
            initialPage={1} label={label} model={model} pageSize={10} pagination={pagination}
            paginationFilter={paginationFilter} rows={[]} total={1} />}
        


        
      </div>
    </TableProvider>
  );
}
