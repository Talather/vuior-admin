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

const UserTable = () => {
  const router = useRouter();
  const [users, setUsers] = useState<Users[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);

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
        setUsers(filteredUsers);
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

  const columns = [
    {
      key: "user",
      header: "User",
       align:'center',
      render: (user: Users) => (
        <div className="flex items-center">
          {/* <div className="mr-3 flex-shrink-0">
            <Image
              src={user.avatar || "/default-avatar.png"}
              alt={`${user.name || `${user.firstName} ${user.lastName}`}'s avatar`}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div> */}
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
      align:'center',
      render: (user: Users) => <p>{user.email}</p>,
    },
    {
      key: "address",
      header: "Address",
        align:'center',

      render: (user: Users) => <p>{user.address || "N/A"}</p>,
    },
    {
      key: "availableCredits",
      header: "Available Credits",
        align:'center',
      render: (user: Users) => <p>{user.availableCredits || "N/A"}</p>,
    },
    {
      key: "dob",
      header: "Date of Birth",
        align:'center',

      render: (user: Users) => <p>{user.dob || "N/A"}</p>,
    },
    {
      key: "location",
      header: "Location",
        align:'center',
      render: (user: Users) => <p>{user.timeZone || "N/A"}</p>,
    },
    {
      key: "actions",
      header: "Actions",
        align:'center',
      render: (user: Users) => (
        <div className="flex items-center space-x-3">
  {/* View Button */}
  <button
    className="bg-buttonGpt text-white rounded-lg shadow-4 px-3 py-2 text-center hover:bg-opacity-90 transition-all"
    onClick={() => handleNavigateToUserDetails(user.id)}
    aria-label="View item"
  >
    View
  </button>
  
  {/* Edit Button */}
  <Link
    href={`/users/${user.id}/edit`}
    className="bg-blue-600 text-white rounded-lg shadow-4 px-3 py-2 text-center hover:bg-opacity-90 transition-all"
    aria-label="Edit item"
  >
    Edit
  </Link>
  
  {/* Delete Button */}
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

  if (isLoading) {
    return <div className="py-4 text-center">Loading users...</div>;
  }

  if (error) {
    return <div className="py-4 text-center text-red-500">{error}</div>;
  }

  return (
    <>
      {isVisible && (
        <div className="notification success">User Deleted Successfully</div>
      )}
      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
          <ButtonDefault label="Create User" link="/users/create">
            <PlusCircle className="h-4 w-4" />
          </ButtonDefault>
        </div>
        <Table  data={users} columns={columns} />
      </div>
    </>
  );
};

export default UserTable;
