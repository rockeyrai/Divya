'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";

const RaiNavbar = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve the token and user from localStorage
        const token = localStorage.getItem("token");
        const storedUser = JSON.parse(localStorage.getItem("user"));
  
        // Check if user data exists in localStorage
        if (!token || !storedUser || !storedUser.phoneNumber) {
          throw new Error("No user logged in");
        }
  
        // Fetch user data from the backend
        const response = await axios.get(
          `http://localhost:8000/userdata/${storedUser.phoneNumber}`, // Correct URL
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        // Update the user data state
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);
  
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <nav className="p-4 bg-blue-500 text-white">
      <h2>Welcome, {userData.fullName}</h2>
      <p>Email: {userData.email}</p>
    </nav>
  );
};

export default RaiNavbar;
