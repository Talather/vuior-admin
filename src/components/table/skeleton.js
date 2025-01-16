import { Skeleton } from '@nextui-org/react';

export default function TableSkeletonComponent({ size = 10 }) {
  if (size > 100) size = 100;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-[40px]" />
        <div className="flex flex-col gap-2 p-[5px]">
          {Array.from({ length: size }).map((_value, index) => <Skeleton key={index} className="h-[30px] my-[5px]" />)}
        </div>
      </div>
      <div className="flex justify-end gap-10 p-[10px]">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-8 w-[180px]" />
      </div>
    </div>
  );
}