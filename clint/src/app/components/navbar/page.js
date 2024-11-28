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
  const [login, setLogin] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [homeChange, setHomeChange] = useState([]);
  
  const fetchChange = async () => {
    try {
      const res = await fetch("http://localhost:8000/homeui"); // Update endpoint accordingly
      if (!res.ok) throw new Error("Failed to fetch Change");
      const change = await res.json();
      setHomeChange(change);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!token || !storedUser || !storedUser.phoneNumber) {
          // No logged-in user; set userData to null and stop loading
          setUserData(null);
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:8000/user/${storedUser.phoneNumber}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUserData(response.data || null); // Handle empty response gracefully
      } catch (err) {
        console.error("Error fetching user data:", err);
        setUserData(null); // Ensure userData is null in case of an error
        setError(err.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchChange();
  }, []);

  // Separate useEffect for handling login state
  useEffect(() => {
    setLogin(!!userData); // Set login state based on userData
  }, [userData]);

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

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Reset state
    setUserData(null);
    setLogin(false);
  };

  return (
    <nav className="navbar">
      <h1 onClick={() => router.push("/")} className="cursor-pointer">
        Divya
      </h1>
      <h1>{homeChange.navbarColor}</h1>
      <div className="flex items-center w-[30%] justify-between">
        <ul className="flex items-center gap-3 cursor-pointer">
          <li onClick={() => handleNavigation("hero")}>Home</li>
          <li onClick={() => handleNavigation("news")}>News</li>
          <li onClick={() => handleNavigation("service")}>Service</li>
          <li onClick={() => handleNavigation("footer")}>Contact</li>
        </ul>
        {login ? (
          <DropdownMenu className="z-40 absolute">
            <DropdownMenuTrigger asChild>
              <Button>User</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              {login && (
                <>
                  <DropdownMenuLabel>
                    {userData ? userData.fullName : "User"}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={!login ? goToLoginPage : null}>login</Button>
        )}
      </div>
    </nav>
  );
};

export default RaiNavbar;
