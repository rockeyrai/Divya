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
  const [login,setLogin] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = JSON.parse(localStorage.getItem("user"));
  
        if (!token || !storedUser || !storedUser.phoneNumber) {
          throw new Error("No user logged in");
        }
  
        const response = await axios.get(
          `http://localhost:8000/userdata/${storedUser.phoneNumber}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        setUserData(response.data); // Update the user data state
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);
  
  // Separate useEffect for handling login state
  useEffect(() => {
    if (userData) {
      setLogin(true); // Set login to true if userData exists
    } else {
      setLogin(false); // Set login to false otherwise
    }
  }, [userData]); // Triggered whenever userData changes
  

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

  const goToLoginPage = () => {
    router.push("/login");
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
      <DropdownMenu className="z-30 absolute">
        <DropdownMenuTrigger asChild>
          <Button onClick={!login ? goToLoginPage : null}>
            {login ? "user" : "login"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          {login && (
            <>
              <DropdownMenuLabel>{userData?.fullName}</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setLogin(false)}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </nav>
  );
};

export default RaiNavbar;
