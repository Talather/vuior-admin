// "use client";

// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { useFormState, useFormStatus } from "react-dom";
// import { updateUser } from "@/lib/clientControllers/user";
// import { getUserById } from "@/lib/clientControllers/user";

// const initialState = {
//   success: false,
//   error: "",
//   message: undefined,
// };

// interface User {
//   address: string;
//   availableCredits: number;
//   avatar: string;
//   createdAt: Date;
//   dob: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   name: string;
//   phoneNo: string;
//   profileLink: string;
//   redeemedReferralCode: boolean;
//   referralCode: string;
//   role: string;
//   timeZone: string;
// }

// function SubmitButton() {
//   const { pending } = useFormStatus();

//   return (
//     <button
//       type="submit"
//       disabled={pending}
//       className="inline-flex items-center justify-center gap-2.5 bg-green px-10 py-3.5 text-center font-medium text-white hover:bg-opacity-90 disabled:opacity-50 lg:px-8 xl:px-10"
//     >
//       {pending ? "Updating..." : "Update"}
//     </button>
//   );
// }

// const EditNewUser = () => {
//   const router = useRouter();
//   const { id } = useParams();
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [_, formAction] = useFormState((state: any, formData: FormData) => updateUser(id as string, formData), initialState);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         setIsLoading(true);
//         const u : any= await getUserById(id);
//         setUser(u);
//       } catch (err) {
//         console.error("Error fetching user:", err);
//         setError("Failed to load user data. Please try again.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUser();
//   }, [id]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const formData = new FormData(e.target as HTMLFormElement);
//     formData.append("userId", String(id));
//     formAction(formData);
//   };

//   useEffect(() => {
//     if (_.success) {
//       setTimeout(() => {
//         router.push("/users");
//       }, 2000);
//     }
//   }, [_.success, router]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value, type, checked } = e.target;
//     setUser((prevUser) =>
//       prevUser
//         ? {
//             ...prevUser,
//             [name]: type === "checkbox" ? checked : value,
//           }
//         : null
//     );
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <>
//       {_.success && (
//         <div className="flex w-full rounded-[10px] border-l-6 border-green bg-green-light-7 px-7 py-8 dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
//           <h5 className="mb-2 font-bold leading-[22px] text-[#004434] dark:text-[#34D399]">
//             User Updated Successfully
//           </h5>
//           <p className="text-[#637381]">Congratulations! User has been updated successfully.</p>
//         </div>
//       )}
//       <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
//         <form onSubmit={handleSubmit}>
//           {_.error && (
//             <div className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800" role="alert">
//               {_.error}
//             </div>
//           )}
//           <div className="grid grid-cols-1 gap-5.5 p-6.5 md:grid-cols-2">
//             {[
//               { label: "First Name", name: "firstName", type: "text" },
//               { label: "Last Name", name: "lastName", type: "text" },
//               { label: "Email", name: "email", type: "email" },
//               { label: "Phone Number", name: "phoneNo", type: "text" },
//               { label: "Date of Birth", name: "dob", type: "date" },
//               { label: "Address", name: "address", type: "text" },
//               { label: "Available Credits", name: "availableCredits", type: "number" },
//               { label: "Profile Link", name: "profileLink", type: "url" },
//               { label: "Referral Code", name: "referralCode", type: "text" },
//               { label: "Time Zone", name: "timeZone", type: "text" },
//             ].map((field) => (
//               <div key={field.name}>
//                 <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">{field.label}</label>
//                 <input
//                   type={field.type}
//                   name={field.name}
//                   value={user?.[field.name] || ""}
//                   onChange={handleChange}
//                   className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-green active:border-green dark:border-dark-3 dark:bg-dark-2 dark:text-white"
//                 />
//               </div>
//             ))}
//             <div>
//               <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">Role</label>
//               <select
//                 name="role"
//                 value={user?.role || ""}
//                 onChange={handleChange}
//                 className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-green active:border-green dark:border-dark-3 dark:bg-dark-2 dark:text-white"
//               >
//                 <option value="" disabled>
//                   Select Role
//                 </option>
//                 <option value="user">User</option>
//                 <option value="admin">Admin</option>
//               </select>
//             </div>
//             <div>
//               <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
//                 Redeemed Referral Code
//               </label>
//               <input
//                 type="checkbox"
//                 name="redeemedReferralCode"
//                 checked={user?.redeemedReferralCode || false}
//                 onChange={handleChange}
//                 className="h-4 w-4"
//               />
//             </div>
//           </div>
//           <div className="p-6.5">
//             <SubmitButton />
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default EditNewUser;

















































"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { updateUser, getUserById } from "@/lib/clientControllers/user";

interface User {
  address: string;
  availableCredits: number;
  avatar: string;
  createdAt: Date;
  dob: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  phoneNo: string;
  profileLink: string;
  redeemedReferralCode: boolean;
  referralCode: string;
  role: string;
  timeZone: string;
}

const initialState = {
  success: false,
  error: "",
  message: undefined,
};

const formFields = [
  { label: "First Name", name: "firstName", type: "text" },
  { label: "Last Name", name: "lastName", type: "text" },
  { label: "Email", name: "email", type: "email" },
  { label: "Phone Number", name: "phoneNo", type: "text" },
  { label: "Date of Birth", name: "dob", type: "date" },
  { label: "Address", name: "address", type: "text" },
  { label: "Available Credits", name: "availableCredits", type: "number" },
  { label: "Profile Link", name: "profileLink", type: "url" },
  { label: "Referral Code", name: "referralCode", type: "text" },
  { label: "Time Zone", name: "timeZone", type: "text" },
];

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2.5 bg-green px-10 py-3.5 text-center font-medium text-white hover:bg-opacity-90 disabled:opacity-50 lg:px-8 xl:px-10"
    >
      {pending ? "Updating..." : "Update"}
    </button>
  );
};

const EditNewUser = () => {
  const router = useRouter();
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const [formState, formAction] = useFormState((state, formData) => updateUser(id as string, formData), initialState);
const [formState, formAction] = useFormState((state, formData) => {
  console.log("FormData in useFormState callback:", Object.fromEntries(formData.entries()));
  return updateUser(id as string, Object.fromEntries(formData.entries()));
}, initialState);
  
  useEffect(() => {
  console.log("Form state updated kanjar:", formState);
  }, [formState]); 
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const userData = await getUserById(id);
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to load user data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log("mamu",formData.entries())
    formData.append("userId", String(id));
    formAction(formData);
  };

  useEffect(() => {
    if (formState.success) {
      setTimeout(() => {
        router.push("/users");
      }, 2000);
    }
  }, [formState.success, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setUser((prevUser) =>
      prevUser
        ? {
            ...prevUser,
            [name]: type === "checkbox" ? checked : value,
          }
        : null
    );
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {formState.success && (
        <div className="flex w-full rounded-[10px] border-l-6 border-green bg-green-light-7 px-7 py-8 dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
          <h5 className="mb-2 font-bold leading-[22px] text-[#004434] dark:text-[#34D399]">
            User Updated Successfully
          </h5>
          <p className="text-[#637381]">Congratulations! User has been updated successfully.</p>
        </div>
      )}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <form onSubmit={handleSubmit}>
          {formState.error && (
            <div className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800" role="alert">
              {formState.error}
            </div>
          )}
          <div className="grid grid-cols-1 gap-5.5 p-6.5 md:grid-cols-2">
            {formFields.map((field) => (
              <div key={field.name}>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={user?.[field.name] || ""}
                  onChange={handleChange}
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-green active:border-green dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                />
              </div>
            ))}
            <div>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">Role</label>
              <select
                name="role"
                value={user?.role || ""}
                onChange={handleChange}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-green active:border-green dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Redeemed Referral Code
              </label>
              <input
                type="checkbox"
                name="redeemedReferralCode"
                checked={user?.redeemedReferralCode || false}
                onChange={handleChange}
                className="h-4 w-4"
              />
            </div>
          </div>
          <div className="p-6.5">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNewUser;

