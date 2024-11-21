"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Navbar.css";
import { useRouter } from "next/navigation";

const RaiNavbar = ({ scrollToSection }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize useNavigate
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
    <nav className="navbar">
      <h1 onClick={() => router.push('/')} className="cursor-pointer">Divya</h1>
      <div className="flex items-center w-[50%] justify-between">
        <ul className="flex items-center gap-3 cursor-pointer">
          <li onClick={() => scrollToSection("hero")}>Home</li>
          <li onClick={() => scrollToSection("news")}>News</li>
          <li onClick={() => scrollToSection("service")}>Service</li>
          <li onClick={() => scrollToSection("footer")}>Contact</li>
        </ul>
        <h2>Welcome, {userData.fullName}</h2>
      </div>
    </nav>
  );
};

export default RaiNavbar;
