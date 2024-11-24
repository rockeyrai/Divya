"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Navbar.css";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const RaiNavbar = ({ scrollToSection }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize router

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

  const handleNavigation = (section) => {
    if (
      typeof window !== "undefined" &&
      window.location.pathname === "/about-us"
    ) {
      // Redirect to home and scroll after load
      router.push("/");
    } else {
      scrollToSection(section);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <nav className="navbar">
      <h1 onClick={() => router.push("/")} className="cursor-pointer">
        Divya
      </h1>
      <div className="flex items-center w-[30%] justify-between">
        <ul className="flex items-center gap-3 cursor-pointer">
          <li onClick={() => handleNavigation("hero")}>Home</li>
          <li onClick={() => handleNavigation("news")}>News</li>
          <li onClick={() => handleNavigation("service")}>Service</li>
          <li onClick={() => handleNavigation("footer")}>Contact</li>
        </ul>
        <DropdownMenu className="z-30 absolute ">
          <DropdownMenuTrigger asChild>
            <Button>User</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuLabel> {userData?.fullName}</DropdownMenuLabel>
            <DropdownMenuItem>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default RaiNavbar;
