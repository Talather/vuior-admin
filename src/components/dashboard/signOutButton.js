// 'use client';

// // import { signOut } from '@/lib/actions/auth';
// import { Link } from '@nextui-org/react';
// import Image from 'next/image';
// import styles from './signOutButton.module.css';
// import { signOut } from "firebase/auth"
// import { auth } from '@/lib/firebaseAuthConfig'
// import { useRouter } from "next/navigation"
// import Cookies from "js-cookie"
// export default function SignOutButtonComponent() {
//  const router = useRouter()
//   const handleLogout = async () => {
//     try {
//       console.log("chal bahir hoja")

//       await signOut(auth)

//        document.cookie = `auth_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
//       localStorage.removeItem("firebaseAuthToken")

//        Cookies.remove("auth_token", { path: "/" })
      
     
//       console.log("User has been logged out.")
//        router.push("/sign-in")
//       // Optionally, redirect the user or perform other actions
//     } catch (error) {
//       console.error("Error logging out:", error)
//     }
//   }


//   return (
//     <Link className={styles.sidebarLink}
//       onClick={async () => handleLogout()}
//     >
//       <Image alt={'Logout Icon'} height={20} src={'/svg/logout.svg'} width={20} />
//       Logout
//     </Link>
//   );
// }
