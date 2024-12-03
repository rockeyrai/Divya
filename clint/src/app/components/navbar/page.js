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
  const [homeChange, setHomeChange] = useState({ navbarColor: "#ffffff" }); // Default color
  const router = useRouter();

  // Fetch home data from backend
  const fetchChange = async () => {
    try {
      const res = await fetch("http://localhost:8000/homeui"); // Adjust endpoint as needed
      if (!res.ok) throw new Error("Failed to fetch Change");
      const change = await res.json();
      setHomeChange(change[0]); // Store the fetched object directly
    } catch (error) {
      console.error("Error fetching change:", error);
    }
  };

  // Refresh JWT token
  const refreshToken = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        token: localStorage.getItem("refreshToken"),
      });
      const { token } = res.data;
      localStorage.setItem("token", token);
      return token;
    } catch (err) {
      console.error("Failed to refresh token:", err);
      handleLogout(); // Logout if refresh fails
    }
  };

  // Fetch user data
  const fetchUserData = async () => {
    try {
      console.log("Fetching user data...");
      const token = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!token || !storedUser?.phoneNumber) {
        console.log("No user logged in.");
        setUserData(null);
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${storedUser.phoneNumber}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Fetched User Data:", response.data);
      setUserData(response.data || null);
    } catch (err) {
      if (err.response?.status === 401) {
        const newToken = await refreshToken();
        if (newToken) {
          fetchUserData(); // Retry with refreshed token
        }
      } else {
        console.error("Error fetching user data:", err);
        setError(err.message || "Failed to fetch user data");
        setUserData(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // Logout functionality
  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUserData(null);
  };

  // Fetch data on component mount
  useEffect(() => {
    console.log("Component mounted, fetching data...");
    fetchUserData();
    fetchChange();
  }, []);

  // Debugging state updates
  useEffect(() => {
    console.log("Updated homeChange:", homeChange);
  }, [homeChange]);

  // Navigation handling
  const handleNavigation = (section) => {
    if (window.location.pathname === "/about-us") {
      router.push("/");
    } else {
      scrollToSection(section);
    }
  };

  return (
    <nav className="navbar" style={{ backgroundColor: homeChange.navbarColor }}>
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
        {userData ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>User</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{userData.fullName || "User"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => router.push("/login")}>Login</Button>
        )}
      </div>
    </nav>
  );
};

export default RaiNavbar;
