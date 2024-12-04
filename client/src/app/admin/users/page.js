'use client';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';

const AdminUser = () => {
  const [userData, setUserData] = useState([]); // Initialize as an array

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:8000/user'); // Replace with your backend URL
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      setUserData(data); // Directly set the fetched array
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removeUser = async (id) => {
    alert('remove is workin')
    try {
      const response = await fetch(`http://localhost:8000/user/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Backend Error Message:", errorMessage);
        throw new Error("Failed to remove news");
      }

      await fetchData();
    } catch (error) {
      console.error("Error removing news:", error);
    }
  };

  return (
        <Table>
        <TableCaption>A list of news articles</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Action</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.map((data) => (
            <TableRow key={data._id}>
              <TableCell>{data.fullName}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>{data.phoneNumber}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => removeUser(data._id)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  
  );
};

export default AdminUser;
