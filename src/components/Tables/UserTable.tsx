
"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { PlusCircle } from "lucide-react";
import Table from "./Table";
import ButtonDefault from "../Buttons/ButtonDefault";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Users } from "@/types/user";
import { fetchAllUsers } from "@/lib/clientControllers/user";
import CustomAutoComplete from '@/components/Autocomplete/code'
import { ChevronDown } from "lucide-react";
const UserTable = () => {
  const router = useRouter();
  const [users, setUsers] = useState<Users[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<Users[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("firstName"); // Default sorting
  const [isAscending, setIsAscending] = useState<boolean>(true); // Flag to track ascending/descending sorting
   const [isOpen, setIsOpen] = useState(false);


  const autocompleteOptions = ["firstName", "lastName", "email", "availableCredits", "role", "dob"];

  const handleNavigateToUserDetails = (id: string) => {
    router.push(`/users/${id}`);
  };

  const convertFieldsToString = useCallback((obj: any): any => {
    if (typeof obj !== "object" || obj === null) {
      return String(obj);
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => convertFieldsToString(item));
    }

    const result: Record<string, any> = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = convertFieldsToString(obj[key]);
      }
    }
    return result;
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const fetchedUsers: Users[] = await fetchAllUsers();
        const filteredUsers = fetchedUsers.map(convertFieldsToString);
        setUsers(filteredUsers); // Set all users
        setFilteredUsers(filteredUsers); // Initially, display all users
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchUsers();
    }
  }, [user, convertFieldsToString]);

  useEffect(() => {
    const searchUsers = () => {
      const searchFilteredUsers = users.filter((user) =>
        `${user.firstName} ${user.lastName} ${user.email}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(searchFilteredUsers);
    };

    searchUsers();
  }, [searchTerm, users]);

  useEffect(() => {
    const sortUsers = () => {
      const sortedUsers = [...filteredUsers].sort((a, b) => {
        let compareResult = 0;

        if (sortBy === "firstName") {
          const firstNameA = a?.firstName ? a?.firstName.toString() : "";
          const firstNameB = b?.firstName ? b?.firstName.toString() : "";
          compareResult = firstNameA.localeCompare(firstNameB);
        }
        if (sortBy === "availableCredits") {
          compareResult = (a?.availableCredits || 0) - (b?.availableCredits || 0);
        }
        if (sortBy === "role") {
          const roleA = a?.role ? a.role.toString() : "";
          const roleB = b?.role ? b.role.toString() : "";
          compareResult = roleA.localeCompare(roleB);
        }
        if (sortBy === "dob") {
          const dobA = new Date(a?.dob).getTime();
          const dobB = new Date(b?.dob).getTime();
          compareResult = dobA - dobB;
        }

        return isAscending ? compareResult : -compareResult;
      });
      setFilteredUsers(sortedUsers);
    };

    sortUsers();
  }, [sortBy, isAscending]);

  const deleteUser = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/users/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== id));
      showNotification();
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  const handleAutocompleteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSortBy(value);

    if (autocompleteOptions.includes(value)) {
      setSortBy(value);
    }
  };

  if (isLoading) {
    return <div className="py-4 text-center">Loading users...</div>;
  }

  if (error) {
    return <div className="py-4 text-center text-red-500">{error}</div>;
  }
   













  const columns = [
    {
      key: "user",
      header: "User",
      align: "center",
      render: (user: Users) => (
        <div className="flex items-center">
          <div>
            <h5 className="text-dark dark:text-white">
              {user.name || `${user.firstName} ${user.lastName}`}
            </h5>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      align: "center",
      render: (user: Users) => <p>{user.email}</p>,
    },
    {
      key: "address",
      header: "Address",
      align: "center",
      render: (user: Users) => <p>{user.address || "N/A"}</p>,
    },
    {
      key: "availableCredits",
      header: "Available Credits",
      align: "center",
      render: (user: Users) => <p>{user.availableCredits || "N/A"}</p>,
    },
    {
      key: "dob",
      header: "Date of Birth",
      align: "center",
      render: (user: Users) => <p>{user.dob || "N/A"}</p>,
    },
    {
      key: "location",
      header: "Location",
      align: "center",
      render: (user: Users) => <p>{user.timeZone || "N/A"}</p>,
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      render: (user: Users) => (
        <div className="flex items-center space-x-3">
          <button
            className="bg-buttonGpt text-white rounded-lg shadow-4 px-3 py-2 text-center hover:bg-opacity-90 transition-all"
            onClick={() => handleNavigateToUserDetails(user.id)}
            aria-label="View item"
          >
            View
          </button>
          <Link
            href={`/users/${user.id}/edit`}
            className="bg-blue-600 text-white rounded-lg shadow-4 px-3 py-2 text-center hover:bg-opacity-90 transition-all"
            aria-label="Edit item"
          >
            Edit
          </Link>
          <button
            className="bg-red-600 text-white rounded-lg shadow-4 px-3 py-2 text-center hover:bg-opacity-90 transition-all"
            onClick={() => deleteUser(user.id)}
            aria-label="Delete item"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];




  
  return (
    <>
      {isVisible && <div className="notification success">User Deleted Successfully</div>}



      <div className="space-y-4">




       
        {/* <div className="mb-4 "> */}
          {/* <input
            list="sortOptions"
            placeholder="Sort by (First Name, Role, etc.)"
            value={sortBy}
            onChange={handleAutocompleteChange}
            className="w-full p-2 border rounded-lg"
          />
          <datalist id="sortOptions">
            {autocompleteOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </datalist> */}


        









<div className="flex flex-row justify-end">

          
          <div className="text-sm font-medium text-gray-700  mr-5">
          <label htmlFor="sortOrder">Sort Options:</label>
          <select
            id="sortOptions"
            className="mt-2 w-full p-2 border rounded-lg text-gray-800 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-buttonGpt focus:border-buttonGpt"
            value={sortBy}
            onChange={(e) => { handleAutocompleteChange }}
          >
           
              



               {autocompleteOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
               ))}
              



          </select>
        </div>


        {/* </div> */}
        {/* <div className="mb-4">
          <label htmlFor="sortOrder">Sort Order:</label>
          <select
            id="sortOrder"
            className="w-full p-2 border rounded-lg"
            value={isAscending ? "ascending" : "descending"}
            onChange={(e) => setIsAscending(e.target.value === "ascending")}
          >
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div> */}
        <div className="relative mb-4">
  {/* Label */}
  <label
    htmlFor="sortOrder"
    className="block text-sm font-medium text-gray-700 mb-2"
  >
    Sort Order:
  </label>

  {/* Styled Dropdown */}
  <div className="relative">
    <select
      id="sortOrder"
      className="w-full p-2 border rounded-lg text-gray-800 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-buttonGpt focus:border-buttonGpt"
      value={isAscending ? "ascending" : "descending"}
      onChange={(e) => setIsAscending(e.target.value === "ascending")}
    >
      <option value="ascending">Ascending</option>
      <option value="descending">Descending</option>
    </select>

    {/* Dropdown Icon */}
    <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg> */}
    </div>
  </div>
          </div>

          </div>















           <div className="mb-4 ">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>






        































        <Table data={filteredUsers} columns={columns} />
        {/* <Link href="/users/add" className="flex items-center text-white bg-blue-500 p-3 rounded-md">
          <PlusCircle className="mr-2" />
          Add User
        </Link> */}
      </div>
    </>
  );
};

export default UserTable;
