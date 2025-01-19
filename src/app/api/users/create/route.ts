import { NextResponse } from 'next/server';
import { doc, getDoc,deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import deleteUserAccount from '@/lib/adminControllers/user';

interface Params {
  params: {
    id: string;
  };
}

export async function POST(req: Request, { params }: Params) {
  const { id } = params; // Extracting the user ID from the request params

  try {
    const deleteDoc=await deleteUserAccount(id)

    // console.log('User data:', userData);

    return NextResponse.json(deleteDoc);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// Delete a user by ID (DELETE)
// export async function DELETE(req: Request, { params }: Params) {
//     const { id } = params; // Extracting the user ID from the request params
  
//     try {
//       const userDoc = doc(db, 'users', id); // Reference to the specific user document
//       const userSnapshot = await getDoc(userDoc);
  
//       if (!userSnapshot.exists()) {
//         return NextResponse.json(
//           { error: 'User not found' },
//           { status: 404 }
//         );
//       }
  
//       await deleteDoc(userDoc); // Delete the user document
//       console.log(`User with ID ${id} deleted successfully.`);
  
//       return NextResponse.json(
//         { message: 'User deleted successfully' },
//         { status: 200 }
//       );
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       return NextResponse.json(
//         { error: 'Failed to delete user' },
//         { status: 500 }
//       );
//     }
//   }