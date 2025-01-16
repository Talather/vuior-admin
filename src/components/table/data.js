import TableComponent from '@/components/table/table';

export default async function TableDataComponent({
  columns,
  customFields,
  deleteAction,
  downloadActionUrl,
  label,
  model,
  pagination,
  paginationFilter,
  searchParams,
  selectionMode,
  serverFn,
  sortBy,
  user
}) {
  const currentPage = searchParams?.page;
  let pageSize = searchParams?.size;
  if (pageSize) pageSize = parseInt(pageSize, 10);
  if (pageSize < 1) pageSize = 10;
  const searchKeyword = searchParams?.query;
  const data = await serverFn({
    // category: searchParams?.category,
    // company: searchParams?.company,
    // currentPage,
    // customFields,
    // pageSize,
    // searchKeyword,
    // sortBy: searchParams?.sort ? searchParams.sort : sortBy,
    // sortOrder: searchParams?.order,
    // survey: searchParams?.survey,
    // topic: searchParams?.topic,
    // user:searchParams?.user
  });
  console.log("lrwa",data)
  return (
    <TableComponent columns={columns} deleteAction={deleteAction} downloadActionUrl={downloadActionUrl}
      initialPage={data.currentPage} label={label} model={model} pageSize={data.pageSize} pagination={pagination}
      paginationFilter={paginationFilter} rows={data.list} selectionMode={selectionMode} total={data.totalPages} />
  );
}