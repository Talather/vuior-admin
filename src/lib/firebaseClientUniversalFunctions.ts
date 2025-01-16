import { getFirestore, doc, getDoc } from "firebase/firestore";
import { FirebaseApp, initializeApp } from "firebase/app";

// Initialize Firebase app
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID};

const app: FirebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Universal function to populate reference field
export async function populateReference(
  referenceField: any, // Reference field in the main object
  tableName: string, // The collection name of the referenced document
  mainObject: any // The main object where the referenced data will be populated
): Promise<any> {
  try {
    // Get reference field from main object (assume it's a reference)
    const reference = mainObject[referenceField];
    if (!reference) {
      console.log(`No reference found in the field: ${referenceField}`);
      return mainObject; // Return the main object without modification
    }

    // Get the referenced document ID from the reference field
    const docRef = doc(db, tableName, reference.id); // Assuming the reference contains an `id` field
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const referencedData = docSnap.data(); // Get the referenced data
      const populatedObject = {
        ...mainObject,
        [referenceField]: referencedData, // Attach the referenced data to the main object
      };
      return populatedObject;
    } else {
      console.log(`No document found for reference: ${reference.id}`);
      return mainObject; // Return the main object without modification
    }
  } catch (error) {
    console.error("Error populating reference:", error);
    return mainObject; // Return the main object in case of error
  }
}
