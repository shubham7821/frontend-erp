
"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState({ _id: "", isAdmin: false });
  const logout = async () => {
    try {
        await axios.get("/api/users/logout");
        toast.success("Logout successful");
        router.push("/user/login");
    } catch (error: unknown) {
        // We need to check if the error is an instance of Error
        if (error instanceof Error) {
            console.error(error.message);
            toast.error(error.message);  // Display the error message if it's an instance of Error
        } else {
            console.error("An unexpected error occurred.");
            toast.error("An unexpected error occurred.");  // Provide a generic error message otherwise
        }
    }
};

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setData(res.data.data);
  };

  const goToUserTask = () => {
    if (data.isAdmin) {
      router.push(`/user/${data._id}`);
    } else {
      router.push(`/user/profile/${data._id}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-lg mb-2">
          {data._id ? `ID: ${data._id}` : "No ID Available"}
        </h2>
        <hr />
        <button
          onClick={logout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4 w-full"
        >
          Logout
        </button>
        <button
          onClick={goToUserTask}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mt-4 w-full"
        >
          Go to {data.isAdmin ? "Approve" : "Registration"} Employee
        </button>
        {!data.isAdmin && (
          <button
            onClick={() => router.push(`/user/comments/${data._id}`)}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full mt-4 w-full"
          >
            View comments
          </button>
        )}
      </div>
    </div>
  );
}
