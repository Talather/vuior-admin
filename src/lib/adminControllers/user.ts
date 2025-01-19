
import { admin,DB } from '../adminSDk';
// import { DB } from "../firebaseAdmin"
const deleteUserAccount = async (userId:any) => {
  try {
  
    await DB.collection("users").doc(userId).delete()
    await admin.auth().deleteUser(userId);
    console.log(`User deleted from Firebase Authentication: ${userId}`);

    // You can add additional steps to delete user data from Firestore if needed
    
   return { success: true,message:"User is deleted" };
  } catch (error) {
    console.error("Error deleting user account:", error);
    return { success: false, error:"Error deleting user account:"};
  }
};
















// export const deleteSchool = async (id) => {
//   try {
//     // const schoolsSnapshot = await db
//     //   .collection("organizations")
//     //   .where("schoolId", "==", id)
//     //   .get()

//     // for (const doc of schoolsSnapshot.docs) {
//     //   const orgId = doc.id
//     //   await db.collection("organizations").doc(orgId).delete()
//     // }

//     await db.collection("schools").doc(id).delete()
//     return `School with ID: ${id} deleted successfully`
//   } catch (error) {
//     // throw new Error(`Failed to delete school: ${error.message}`)
//   }
// }

export default deleteUserAccount;