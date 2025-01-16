import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
  query,
  where,
  getDocs,
  orderBy,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig"; // Import Firebase config

// Create a new bill in Firestore

// Fetch bills for a specific user
const fetchBillsForSpecificUser = async (userId) => {
  try {
    // Convert user_id to a DocumentReference
    const userRef = doc(db, "users", userId);

    // Create a query to get bills where the user_id field matches the user reference
    const billsQuery = query(
      collection(db, "bills"),
      where("user_id", "==", userRef)
    );

    // Execute the query to fetch bills
    const querySnapshot = await getDocs(billsQuery);

    // Create an array of bills from the querySnapshot
    const bills = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return bills; // Return the array of bills
  } catch (error) {
    console.error("Error fetching bills:", error);
    throw new Error("Error fetching bills");
  }
};

// Fetch bills for a specific user
const fetchDocumentsForSpecificUser = async (userId) => {
  try {
    console.log("userId");
    // Convert user_id to a DocumentReference
    const userRef = doc(db, "users", userId);

    // Create a query to get bills where the user_id field matches the user reference
    const documentsQuery = query(
      collection(db, "documents"),
      where("userId", "==", userId)
    );

    // Execute the query to fetch bills
    const querySnapshot = await getDocs(documentsQuery);

    // Create an array of bills from the querySnapshot
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return documents; // Return the array of bills
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw new Error("Error fetching documents");
  }
};

// Update an existing bill with new data

// Fetch bills for a specific user
const fetchCreditHistoryForSpecificUser = async (userId) => {
  try {
    const creditHistoryQuery = query(
      collection(db, "creditHistory"),
      where("userId", "==", userId),
      orderBy("date", "desc") // Sort by date in descending order
    );

    // Execute the query to fetch credit history
    const querySnapshot = await getDocs(creditHistoryQuery);

    // Create an array of credit history records from the querySnapshot
    const creditHistory = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return creditHistory; // Return the sorted array of credit history
  } catch (error) {
    console.error("Error fetching credit history:", error);
    throw new Error("Error fetching credit history");
  }
};





const fetchPaymentHistoryForSpecificUser = async userId => {
  try {
    const creditHistoryQuery = query(
      collection(db, 'paymentHistory'),
      where('userId', '==', userId),
      orderBy('date', 'desc') // Sort by date in descending order
    )

    // Execute the query to fetch credit history
    const querySnapshot = await getDocs(creditHistoryQuery)

    // Create an array of credit history records from the querySnapshot
    const creditHistory = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return creditHistory // Return the sorted array of credit history
  } catch (error) {
    console.error('Error fetching credit history:', error)
    throw new Error('Error fetching credit history')
  }
}


const fetchPendingBillsWithUserDetails = async () => {
  try {
    console.log('faarig')
    // Query to fetch all unpaid bills
    const billsQuery = query(
      collection(db, 'paymentHistory'),
      where('status', '==', 'Pending')
    )

    // Execute the query to fetch bills
    const billsSnapshot = await getDocs(billsQuery)

    // Extract bill data and fetch user details for each bill
    const billsWithUserDetails = await Promise.all(
      billsSnapshot.docs.map(async billDoc => {
        const billData = billDoc.data()
        const userId = billData.userId // Extract user_id from the bill





         const timestamp = billData.date // Replace with your field name
        billData.date = timestamp.toDate().toString()
        billData.date=billData.date.split("GMT")[0].trim()
        



        // Fetch user details using the user_id
        const userRef = doc(db, 'users', userId)
        const userSnapshot = await getDoc(userRef)
        const userDetails = userSnapshot.exists() ? userSnapshot.data() : null




          const billRef = doc(db, 'bills', billData.billIds[0])
        const billSnapshot = await getDoc(billRef)
        const billDetails = billSnapshot.exists() ? billSnapshot.data() : null
        


        //  const timestampi = billDetails.due_date // Replace with your field name
        // let dueDate = timestampi.toDate().toString()
        // dueDate=dueDate.split("GMT")[0].trim()

        return {
          id: billDoc.id,
          ...billData,
          userDetails,
           userName:`${userDetails.firstName} ${userDetails.lastName}`,
           billDueDate:billDetails.dueDate,
           
           // Attach user details to the bill
           billName:billDetails.name,
          billDetails
        }
      })
    )


    //  currentPage,
    //   list: administrators,
    //   pageSize,
    //   totalPages: Math.ceil(totalRecords / pageSize),
    //   totalRecords,


console.log("bhrwa",billsWithUserDetails)

    return billsWithUserDetails // Return the bills with user details

  //  let pageSize=20
  //   return { currentPage:1,
  //     list:  billsWithUserDetails,
  //     pageSize,
  //     totalPages: Math.ceil(billsWithUserDetails.length / pageSize),
  //    totalRecords: billsWithUserDetails.length}
  } catch (error) {
    console.error('Error fetching bills with user details:', error)
    throw new Error('Error fetching bills with user details')
  }
}



const fetchPaymentHistoryForAll = async () => {
  try {
    console.log('faarig')
    // Query to fetch all unpaid bills
    const billsQuery = query(
      collection(db, 'paymentHistory'),
      // where('status', '==', 'Pending')
    )

    // Execute the query to fetch bills
    const billsSnapshot = await getDocs(billsQuery)

    // Extract bill data and fetch user details for each bill
    const billsWithUserDetails = await Promise.all(
      billsSnapshot.docs.map(async billDoc => {
        const billData = billDoc.data()
        const userId = billData.userId // Extract user_id from the bill





         const timestamp = billData.date // Replace with your field name
        billData.date = timestamp.toDate().toString()
        billData.date=billData.date.split("GMT")[0].trim()
        



        // Fetch user details using the user_id
        const userRef = doc(db, 'users', userId)
        const userSnapshot = await getDoc(userRef)
        const userDetails = userSnapshot.exists() ? userSnapshot.data() : null




          const billRef = doc(db, 'bills', billData.billIds[0])
        const billSnapshot = await getDoc(billRef)
        const billDetails = billSnapshot.exists() ? billSnapshot.data() : null
        


        //  const timestampi = billDetails.due_date // Replace with your field name
        // let dueDate = timestampi.toDate().toString()
        // dueDate=dueDate.split("GMT")[0].trim()

        return {
          id: billDoc.id,
          ...billData,
          userDetails,
           userName:`${userDetails.firstName} ${userDetails.lastName}`,
           billDueDate:billDetails.dueDate,
           
           // Attach user details to the bill
           billName:billDetails.name,
          billDetails
        }
      })
       )


    //  currentPage,
    //   list: administrators,
    //   pageSize,
    //   totalPages: Math.ceil(totalRecords / pageSize),
    //   totalRecords,


console.log("bhrwa",billsWithUserDetails)

    return billsWithUserDetails // Return the bills with user details

  //  let pageSize=20
  //   return { currentPage:1,
  //     list:  billsWithUserDetails,
  //     pageSize,
  //     totalPages: Math.ceil(billsWithUserDetails.length / pageSize),
  //    totalRecords: billsWithUserDetails.length}
  } catch (error) {
    console.error('Error fetching bills with user details:', error)
    throw new Error('Error fetching bills with user details')
  }
}


export {
  fetchBillsForSpecificUser,
  fetchDocumentsForSpecificUser,
  fetchCreditHistoryForSpecificUser,
  fetchPaymentHistoryForSpecificUser,
  fetchPendingBillsWithUserDetails,
  fetchPaymentHistoryForAll
};
