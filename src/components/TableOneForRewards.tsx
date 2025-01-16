'use client'
// const paymentData = [
//   {
//     billName: "Electricity",
//     paymentDate: "2024-12-20",
//     earlyByDays: 5,
//     amount: "$120",
//     paymentStatus: "Pending",
//   },
//   {
//     billName: "Amazon",
//     paymentDate: "2024-12-22",
//     earlyByDays: 3,
//     amount: "$50",
//     paymentStatus: "Completed",
//   },
//   {
//     billName: "Internet",
//     paymentDate: "2024-12-21",
//     earlyByDays: 7,
//     amount: "$80",
//     paymentStatus: "Completed",
//   },
//   {
//     billName: "Water",
//     paymentDate: "2024-12-23",
//     earlyByDays: 2,
//     amount: "$30",
//     paymentStatus: "Completed",
//   },
//   {
//     billName: "Gas",
//     paymentDate: "2024-12-19",
//     earlyByDays: 6,
//     amount: "$45",
//     paymentStatus: "Completed",
//   },
// ];

// const TablePayments = () => {
//   return (
//     <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
//       <h4 className="mb-10 font-bold text-body-2xlg text-dark dark:text-white">
//         Payments Overview
//       </h4>

//       <div className="flex flex-col">
//         {/* Table Headers */}
//         <div className="grid grid-cols-5 text-button-gpt">
//           <div className="px-2 pb-3.5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Bill Name
//             </h5>
//           </div>
//           <div className="px-2 pb-3.5 text-center">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Payment Date
//             </h5>
//           </div>
//           <div className="px-2 pb-3.5 text-center">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Early By (Days)
//             </h5>
//           </div>
//           <div className="px-2 pb-3.5 text-center">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Amount
//             </h5>
//           </div>
//           <div className="px-2 pb-3.5 text-center">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Status
//             </h5>
//           </div>
//         </div>

//         {/* Table Rows */}
//         {paymentData.map((payment, key) => (
//           <div
//             className={`grid grid-cols-5 ${
//               key === paymentData.length - 1
//                 ? ""
//                 : "border-b border-stroke dark:border-dark-3"
//             }`}
//             key={key}
//           >
//             {/* Bill Name */}
//             <div className="flex items-center gap-3.5 px-2 py-4">
//               <p className="font-medium text-dark dark:text-white">
//                 {payment.billName}
//               </p>
//             </div>

//             {/* Payment Date */}
//             <div className="flex items-center justify-center px-2 py-4">
//               <p className="font-medium text-dark dark:text-white">
//                 {payment.paymentDate}
//               </p>
//             </div>

//             {/* Early By (Days) */}
//             <div className="flex items-center justify-center px-2 py-4">
//               <p className="font-medium text-dark dark:text-white">
//                 {payment.earlyByDays}
//               </p>
//             </div>

//             {/* Amount */}
//             <div className="flex items-center justify-center px-2 py-4">
//               <p className="font-medium text-green-light-1">{payment.amount}</p>
//             </div>

//             {/* Payment Status */}
//             <div className="flex items-center justify-center px-2 py-4">
//               <p
//                 className={`font-medium ${
//                   payment.paymentStatus === "Completed"
//                     ? "text-green-600"
//                     : "text-yellow-500"
//                 }`}
//               >
//                 {payment.paymentStatus}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TablePayments;

// // export default TableRewards;































































































// import React from 'react'

// // Define the type for a single payment document
// interface PaymentDoc {
//   amount: number
//   date: string // Use string to handle formatted date directly
//   savings: number
//   status: string
//   type: string
//   userId: string
//   billIds?: any
//   creditApplied?:number
// }

// // Define the props for the component
// interface TablePaymentsProps {
//   paymentDocs: PaymentDoc[]
// }

// const TablePayments: React.FC<TablePaymentsProps> = ({ paymentDocs }) => {
//   console.log('Payment Data:', paymentDocs)

//   return (
//     <div className='rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card'>
//       <h4 className='mb-10 font-bold text-body-2xlg text-dark dark:text-white'>
//         Payment History
//       </h4>

//       {paymentDocs.length > 0 ? (
//         <div className='flex flex-col'>
//           {/* Table Headers */}
//           <div className='grid grid-cols-6 text-button-gpt'>
//             <div className='px-2 pb-3.5 text-center'>
//               <h5 className='text-sm font-medium uppercase xsm:text-base'>
//                 Date
//               </h5>
//             </div>
//             <div className='px-2 pb-3.5 text-center'>
//               <h5 className='text-sm font-medium uppercase xsm:text-base'>
//                 Amount
//               </h5>
//             </div>
//             <div className='px-2 pb-3.5 text-center'>
//               <h5 className='text-sm font-medium uppercase xsm:text-base'>
//                 Savings
//               </h5>
//             </div>
//             <div className='px-2 pb-3.5 text-center'>
//               <h5 className='text-sm font-medium uppercase xsm:text-base'>
//                 Type
//               </h5>
//             </div>
//             <div className='px-2 pb-3.5 text-center'>
//               <h5 className='text-sm font-medium uppercase xsm:text-base'>
//                 Status
//               </h5>
//             </div>
//             <div className='px-2 pb-3.5 text-center'>
//               <h5 className='text-sm font-medium uppercase xsm:text-base'>
//                 User ID
//               </h5>
//             </div>
//           </div>

//           {/* Table Rows */}
//           {paymentDocs.map((payment, key) => (
//             <div
//               className={`grid grid-cols-6 ${
//                 key === paymentDocs.length - 1
//                   ? ''
//                   : 'border-b border-stroke dark:border-dark-3'
//               }`}
//               key={key}
//             >
//               {/* Date */}
//               <div className='flex items-center justify-center px-2 py-4'>
//                 <p className='font-medium text-dark dark:text-white'>
//                   {payment.date}
//                 </p>
//               </div>
//               {/* Amount */}
//               <div className='flex items-center justify-center px-2 py-4'>
//                 <p className='font-medium text-dark dark:text-white'>
//                   ${payment?.amount || ''}
//                 </p>
//               </div>
//               {/* Savings */}
//               <div className='flex items-center justify-center px-2 py-4'>
//                 <p className='font-medium text-dark dark:text-white'>
//                   {isNaN(payment.savings)
//                     ? 'N/A'
//                     : `$${payment?.savings?.toFixed(2)}`}
//                 </p>
//               </div>
//               {/* Type */}
//               <div className='flex items-center justify-center px-2 py-4'>
//                 <p className='font-medium text-dark dark:text-white'>
//                   {payment?.type}
//                 </p>
//               </div>
//               {/* Status */}
//               <div className='flex items-center justify-center px-2 py-4'>
//                 <p
//                   className={`font-medium ${
//                     payment.status === 'Completed'
//                       ? 'text-green-600'
//                       : 'text-yellow-500'
//                   }`}
//                 >
//                   {payment?.status}
//                 </p>
//               </div>
//               {/* User ID */}
//               <div className='flex items-center justify-center px-2 py-4'>
//                 <p className='font-medium text-dark dark:text-white'>
//                   {truncateString(payment?.userId, 15)}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className='text-center text-black dark:text-white'>
//           No payment history available.
//         </p>
//       )}
//     </div>
//   )
// }

// export default TablePayments

// function truncateString (str: string, maxLength: number) {
//   return str.length > maxLength ? str.slice(0, maxLength) + '...' : str
// }

import React from 'react';

// Define the type for a single payment document
interface PaymentDoc {
  id:any;

  amount: number;
  date: string; // Use string to handle formatted date directly
  savings: number;
  status: string;
  type: string;
  userId: string;
  billIds?: string[];
  creditApplied?: number;
  userName:any;
  billDueDate:any;
  billDetails:any;
  userDetails:any;
  billName:any;
}

// Define the props for the component
interface TablePaymentsProps {
  paymentDocs: PaymentDoc[];
}

const TablePayments: React.FC<TablePaymentsProps> = ({ paymentDocs }) => {
  console.log('Payment Data:', paymentDocs);

  return (
    <div className='rounded-[10px] bg-white px-4  pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card'>
      <h4 className='mb-10 font-bold text-body-2xlg text-dark dark:text-white'>
        Payment History
      </h4>

      {paymentDocs.length > 0 ? (
        <div className='flex flex-col'>
          {/* Table Headers */}
          <div className='grid grid-cols-8 text-button-gpt'>
            <div className='px-2 pb-3.5 text-center'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Date
              </h5>
            </div>
            <div className='px-2 pb-3.5 text-center'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Amount
              </h5>
            </div>
            <div className='px-2 pb-3.5 text-center'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Savings
              </h5>
            </div>
            <div className='px-2 pb-3.5 text-center'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Credit Applied
              </h5>
            </div>
            <div className='px-2 pb-3.5 text-center'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Type
              </h5>
            </div>
            <div className='px-2 pb-3.5 text-center'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Status
              </h5>
            </div>
            <div className='px-2 pb-3.5 text-center'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                User
              </h5>
            </div>
            <div className='px-2 pb-3.5 text-center'>
              <h5 className='text-sm font-medium uppercase xsm:text-base'>
                Bill
              </h5>
            </div>
          </div>

          {/* Table Rows */}
          {paymentDocs.map((payment, key) => (
            <div
              className={`grid grid-cols-8 ${
                key === paymentDocs.length - 1
                  ? ''
                  : 'border-b border-stroke dark:border-dark-3'
              }`}
              key={key}
            >
              {/* Date */}
              <div className='flex items-center justify-center px-2 py-4'>
                <p className='font-medium text-dark dark:text-white'>
                  {payment.date}
                </p>
              </div>
              {/* Amount */}
              <div className='flex items-center justify-center px-2 py-4'>
                <p className='font-medium text-dark dark:text-white'>
                  ${payment?.amount || ''}
                </p>
              </div>
              {/* Savings */}
              <div className='flex items-center justify-center px-2 py-4'>
                <p className='font-medium text-dark dark:text-white'>
                 
                  
                    {truncateString(`$${payment?.savings}`,5)}
                </p>
              </div>
              {/* Credit Applied */}
              <div className='flex items-center justify-center px-2 py-4'>
                <p className='font-medium text-dark dark:text-white'>
                  {payment.creditApplied ?? 'N/A'}
                </p>
              </div>
              {/* Type */}
              <div className='flex items-center justify-center px-2 py-4'>
                <p className='font-medium text-dark dark:text-white'>
                  {payment?.type}
                </p>
              </div>
              {/* Status */}
              <div className='flex items-center justify-center px-2 py-4'>
                <p
                  className={`font-medium ${
                    payment.status === 'Completed'
                      ? 'text-green-600'
                      : 'text-yellow-500'
                  }`}
                >
                  {payment?.status}
                </p>
              </div>
              {/* User ID */}
              <div className='flex items-center justify-center px-2 py-4'>
                <p className='font-medium text-dark dark:text-white'>
                  {truncateString(payment?.userName, 15)}
                </p>
              </div>
              {/* Bill IDs */}
              <div className='flex flex-col items-center justify-center px-2 py-4'>
                {payment.billIds && payment.billIds.length > 0 ? (
                  payment.billIds.map((id: string, index: number) => (
                    <p
                      key={index}
                      className='font-medium text-dark dark:text-white'
                    >
                      {truncateString(payment?.billName, 15)}
                    </p>
                  ))
                ) : (
                  <p className='font-medium text-dark dark:text-white'>N/A</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center text-black dark:text-white'>
          No payment history available.
        </p>
      )}
    </div>
  );
};

export default TablePayments;

function truncateString(str: string, maxLength: number) {
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
}
