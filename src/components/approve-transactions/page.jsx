// 'use client';

// import { useEffect, useState } from 'react';
// import { useAuth } from '@/context/AuthContext';
// import ScrollLayout from '@/components/layout/scroll';
// import TableWrapperComponent from '@/components/table/wrapper';
// import { fetchPaymentHistoryForSpecificUser } from '@/lib/clientControllers/userSpecificAssets';
// import { fetchPendingBillsWithUserDetails } from '@/lib/clientControllers/userSpecificAssets';

// const PaymentsHistory = () => {
//   const { user } = useAuth();
//   const [paymentDocs, setPaymentDocs] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPaymentHistory = async () => {
//       if (!user?.id) return;

//       setLoading(true);
//       setError(null);

//       try {
//         const creditDocs = []; // Example data. Replace with real fetch logic.
//         // Example: await fetchPaymentHistoryForSpecificUser(user.id)
//         setPaymentDocs(creditDocs);
//       } catch (err) {
//         console.error('Error fetching payment history:', err);
//         setError('Failed to fetch payment history. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPaymentHistory();
//   }, [user]);

//   const columns = [
//     {
//       key: 'name',
//       label: 'Name',
//       sortable: true,
//     },
//     {
//       key: 'email',
//       label: 'Email',
//       sortable: true,
//     },
//     {
//       key: 'gender',
//       label: 'Gender',
//       sortable: true,
//     },
//     {
//       key: 'school',
//       label: 'School Name',
//       sortable: true,
//     },
//     {
//       key: 'action',
//       label: 'Action',
//     },
//   ];

//   const customFields = [
//     {
//       name: 'action',
//       value: 'administratorManagement',
//     },
//     {
//       name: 'key',
//       value: '$_id',
//     },
//   ];

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
//   );
// };

// export default PaymentsHistory;

















'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ScrollLayout from '@/components/layout/scroll';
import TableWrapperComponent from '@/components/table/wrapper';
import { fetchPendingBillsWithUserDetails } from '@/lib/clientControllers/userSpecificAssets';

// Function to convert all fields of an object to strings
const convertFieldsToString = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, String(value)])
  );
};

const PaymentsHistory = () => {
  const { user } = useAuth();
  const [pendingBills, setPendingBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingBills = async () => {
      if (!user?.id) return;

      setLoading(true);
      setError(null);

      try {
        const bills = await fetchPendingBillsWithUserDetails();
        // Ensure all fields are strings
        const convertedBills = bills.map(convertFieldsToString);
        setPendingBills(convertedBills);
      } catch (err) {
        console.error('Error fetching pending bills:', err);
        setError('Failed to fetch pending bills. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingBills();
  }, [user]);

  return (
    // <ScrollLayout title="Pending Bills Management">
      <div className="mt-6 bg-white p-5 rounded-xl shadow">
        <h3 className="text-center text-2xl font-semibold text-gray-800 md:text-4xl mb-6">
          Pending Bills
        </h3>

        {loading ? (
          <p className="text-lg text-gray-600 text-center">Loading bills...</p>
        ) : error ? (
          <p className="text-lg text-red-500 text-center">{error}</p>
        ) : pendingBills.length > 0 ? (
          <div className="overflow-x-auto">
            <table className=" rounded-t-lg min-w-full table-auto  border border-red-200 ">
              <thead className="bg-buttonGpt rounded-t-lg rounded-tl-xl rounded-tr-xl">
                <tr>
                  <th className="rounded-tl-xl px-4 py-4 text-left text-white">Name</th>
                  <th className="px-4 py-4 text-left text-white">Amount</th>
                  <th className="px-4 py-4 text-left text-white">Due Date</th>
                  <th className="px-4 py-4 text-left text-white">Status</th>
                  <th className="rounded-tr-xl px-4 py-4 text-center text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingBills.map((bill) => (
                  <tr key={bill.user_id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{bill.name}</td>
                    <td className="border px-4 py-2">{bill.amount}</td>
                    <td className="border px-4 py-2">{bill.dueDate}</td>
                    <td className="border px-4 py-2 capitalize">{bill.status}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        className="px-3 py-1 text-white bg-buttonGpt rounded hover:bg-green-600"
                        onClick={() => console.log('Approve clicked', bill)}
                      >
                        Approve
                      </button>
                      <button
                        className="ml-2 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                        onClick={() => console.log('Decline clicked', bill)}
                      >
                        Decline
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-lg text-gray-600 text-center">
            No pending bills available.
          </p>
        )}
      </div>
    // </ScrollLayout>
  );
};

export default PaymentsHistory;
