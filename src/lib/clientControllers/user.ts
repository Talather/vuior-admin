import {
  collection,
  query,
  getDocs,
  where,
  doc,
  getDoc
} from "firebase/firestore";
import { db } from "../firebaseConfig"; // Import Firebase config

const fetchAllUsers = async () => {
    try {
      console.log("userfetchhit")
    // Create a query to get all users from the 'users' collection
    const usersQuery = query(collection(db, "users"));

    // Execute the query to fetch user documents
    const querySnapshot = await getDocs(usersQuery);

    // Map over the query snapshot to extract user data into an array
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Fetched Users:", users); // Debugging: Log fetched users

    return users; // Return the array of users
  } catch (error) {
    console.error("Error fetching users:", error); // Improved error logging
    throw new Error("Failed to fetch users"); // Clearer error message
  }
};



const getUserById = async (userId:any) => {
  try {
    // Reference to the user document
    const userDocRef = doc(db, "users", userId); // Assuming 'users' is the collection name
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      console.log("User Data:", userDoc.data());
      return userDoc.data();
    } else {
      console.log("No such user found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};





import { getFirestore,  updateDoc } from "firebase/firestore";
import { AnyARecord } from "dns";
// import { User } from "./types"; // Replace with the actual path to your User interface

/**
//  * Updates a user's data in Firestore.
//  * @param userId - The ID of the user to update.
//  * @param updatedData - The new data to update the user with.
//  * @returns Promise<void> - Resolves when the update is successful.
//  * @throws Error - Throws an error if the update fails.
//  */
export const updateUser = async (userId: string, updatedData: any): Promise<any> => {
  if (!userId) throw new Error("User ID is required to update user.");
  if (!updatedData) throw new Error("Updated data is required to update user.");

  try {
    console.log(userId,"bhrwa",updatedData)
    const db = getFirestore();
    const userDocRef = doc(db, "users", userId);

    // Ensure createdAt remains unchanged
    const { createdAt, ...dataToUpdate } = updatedData;

    // Update the user document
    await updateDoc(userDocRef, {
      ...dataToUpdate,
      updatedAt: new Date().toISOString(), // Optional: Track when the user was last updated
    });

    console.log("User updated successfully.");
     return { success: true, message: 'User updated successfully' };
   
  } catch (error) {
    console.error("Error updating user:", error);
     return { success: true, message: 'User updated successfully' };
   
    throw error;
  }
};



// import { admin,DB } from '../adminSDk';
// // import { DB } from "../firebaseAdmin"
// const deleteUserAccount = async (userId:any) => {
//   try {
  
//     await DB.collection("users").doc(userId).delete()
//     await admin.auth().deleteUser(userId);
//     console.log(`User deleted from Firebase Authentication: ${userId}`);

//     // You can add additional steps to delete user data from Firestore if needed
    
//    return { success: true,message:"User is deleted" };
//   } catch (error) {
//     console.error("Error deleting user account:", error);
//     return { success: false, error:"Error deleting user account:"};
//   }
// };






// // export const deleteSchool = async (id) => {
// //   try {
// //     // const schoolsSnapshot = await db
// //     //   .collection("organizations")
// //     //   .where("schoolId", "==", id)
// //     //   .get()

// //     // for (const doc of schoolsSnapshot.docs) {
// //     //   const orgId = doc.id
// //     //   await db.collection("organizations").doc(orgId).delete()
// //     // }

// //     await db.collection("schools").doc(id).delete()
// //     return `School with ID: ${id} deleted successfully`
// //   } catch (error) {
// //     // throw new Error(`Failed to delete school: ${error.message}`)
// //   }
// // }

// export default deleteUserAccount;
 
export {fetchAllUsers,getUserById}