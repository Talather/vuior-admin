// 'use client'


// import { useEffect, useState } from 'react'
// import { useAuth } from '@/context/AuthContext'
// import TableOne from '@/components/TableOneForRewards'
// import { fetchPaymentHistoryForAll } from '@/lib/clientControllers/userSpecificAssets'

// interface PaymentDoc {
//   amount: number
//   date: any
//   savings: any
//   status: string
//   type: string
//   userId: string

//   billIds?: any
//   creditApplied?:number

// }




// const PaymentsHistory = () => {
//   const { user } = useAuth()
//   const [paymentDocs, setPaymentDocs] = useState<PaymentDoc[] | null>(null)
//   const [loading, setLoading] = useState<boolean>(false)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchPaymentHistory = async () => {
//       if (!user?.id) return

//       setLoading(true)
//       setError(null)

//       try {
//         const creditDocs: any =await fetchPaymentHistoryForAllUsers()
          
//         setPaymentDocs(creditDocs)
//       } catch (err) {
//         console.error('Error fetching payment history:', err)
//         setError('Failed to fetch payment history. Please try again later.')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchPaymentHistory()
//   }, [user])

//   return (
//     <div className='mt-6 bg-white'>
//       {/* Header Section */}
//       <div className='text-center'>
//         <h3 className='text-2xl font-semibold text-gray-800 md:text-4xl'>
//           Record of Previous Transactions
//         </h3>
//       </div>

//       {/* Content Section */}
//       <div className='flex items-center justify-center mt-8'>
//         {loading ? (
//           <p className='text-lg text-gray-600'>Loading payment history...</p>
//         ) : error ? (
//           <p className='text-lg text-red-500'>{error}</p>
//         ) : paymentDocs && paymentDocs.length > 0 ? (
//           <div className='w-full max-w-4xl p-4 border border-gray-200 rounded-lg shadow-lg'>
//             <TableOne paymentDocs={paymentDocs} />
//           </div>
//         ) : (
//           <p className='text-lg text-gray-600'>No payment history available.</p>
//         )}
//       </div>
//     </div>
//   )
// }

// export default PaymentsHistory
















// 'use client';

// import { useEffect, useState } from 'react';
// import { useAuth } from '@/context/AuthContext';
// import TableOne from '@/components/TableOneForRewards';
// import { fetchPaymentHistoryForAll } from '@/lib/clientControllers/userSpecificAssets';

// interface PaymentDoc {
//   [key: string]: any; // Flexible interface to handle dynamic keys
// }

// const PaymentsHistory = () => {
//   const { user } = useAuth();
//   const [paymentDocs, setPaymentDocs] = useState<PaymentDoc[] | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   // Utility function to convert all fields of an object to strings
//   const convertFieldsToString = (obj: any): any => {
//     if (typeof obj !== 'object' || obj === null) {
//       return String(obj); // Convert primitive values to string
//     }

//     if (Array.isArray(obj)) {
//       return obj.map((item) => convertFieldsToString(item));
//     }

//     const result: any = {};
//     for (const key in obj) {
//       if (obj.hasOwnProperty(key)) {
//         result[key] = convertFieldsToString(obj[key]); // Recursive conversion
//       }
//     }
//     return result;
//   };

//   useEffect(() => {
//     const fetchPaymentHistory = async () => {
//       // if (!user?.id) return;

//       // setLoading(true);
//       // setError(null);

//       try {
//         const rawPaymentDocs: any = await fetchPaymentHistoryForAll();
//         // Convert all fields to strings
//         const transformedDocs = rawPaymentDocs.map((doc: any) => convertFieldsToString(doc));
//         setPaymentDocs(transformedDocs);
//       } catch (err) {
//         console.error('Error fetching payment history:', err);
//         setError('Failed to fetch payment history. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPaymentHistory();
//   }, [user]);

//   return (
//     <div className='mt-6 '>
//       {/* Header Section */}
//       <div className='text-center'>
//         <h3 className='text-2xl font-semibold text-gray-800 md:text-4xl '>
//           Record of Previous Transactions
//         </h3>
//       </div>

//       {/* Content Section */}
//       <div className='flex items-center justify-center mt-8 px-4'>
//         {loading ? (
//           <p className='text-lg text-gray-600'>Loading payment history...</p>
//         ) : error ? (
//           <p className='text-lg text-red-500'>{error}</p>
//         ) : paymentDocs && paymentDocs.length > 0 ? (
//           <div className='w-full  border border-gray-200 rounded-lg shadow-lg'>
//             <TableOne paymentDocs={paymentDocs} />
//           </div>
//         ) : (
//           <p className='text-lg text-gray-600'>No payment history available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentsHistory;













































'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import TableOne from '@/components/TableOneForRewards';
import { fetchPaymentHistoryForAll } from '@/lib/clientControllers/userSpecificAssets';
import { ClipLoader } from 'react-spinners'; // For loading spinner

interface PaymentDoc {
  [key: string]: any; // Flexible interface to handle dynamic keys
}

const PaymentsHistory = () => {
  const { user } = useAuth();
  const [paymentDocs, setPaymentDocs] = useState<PaymentDoc[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Utility function to convert all fields of an object to strings
  const convertFieldsToString = (obj: any): any => {
    if (typeof obj !== 'object' || obj === null) {
      return String(obj); // Convert primitive values to string
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => convertFieldsToString(item));
    }

    const result: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = convertFieldsToString(obj[key]); // Recursive conversion
      }
    }
    return result;
  };

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      setLoading(true); // Start loading when the API call begins
      setError(null);

      try {
        const rawPaymentDocs: any = await fetchPaymentHistoryForAll();
        // Convert all fields to strings
        const transformedDocs = rawPaymentDocs.map((doc: any) => convertFieldsToString(doc));
        setPaymentDocs(transformedDocs);
      } catch (err) {
        console.error('Error fetching payment history:', err);
        setError('Failed to fetch payment history. Please try again later.');
      } finally {
        setLoading(false); // Stop loading after the API call finishes
      }
    };

    fetchPaymentHistory();
  }, [user,convertFieldsToString]);

  return (
    <div className="mt-6">
      {/* Header Section */}
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-gray-800 md:text-4xl mt-10">
          Record of Previous Transactions
        </h3>
      </div>

      {/* Content Section */}
      <div className="flex items-center justify-center mt-8 px-4">
        {loading ? (
          <ClipLoader size={60} color="#10a37f" /> // Using ClipLoader for a spinner
        ) : error ? (
          <p className="text-lg text-red-500">{error}</p>
        ) : paymentDocs && paymentDocs.length > 0 ? (
          <div className="w-full border border-gray-200 rounded-lg shadow-lg">
            <TableOne paymentDocs={paymentDocs} />
          </div>
        ) : (
          <p className="text-lg text-gray-600">No payment history available.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentsHistory;
