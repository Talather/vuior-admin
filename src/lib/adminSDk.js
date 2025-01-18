// lib/firebase-admin.js
import admin from 'firebase-admin';

// Initialize Firebase Admin
if (!admin.apps.length) {


var serviceAccount = require("./vuior-3c7ff-firebase-adminsdk-48yie-c51f6ce85a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
} else {
  admin.app(); 
}

 const DB = admin.firestore()
export { admin,DB };
