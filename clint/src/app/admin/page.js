'use client';
import React, { useEffect, useState } from 'react';

const Admin = () => {
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
    fetchChange(); // Pass a function, not an object
  }, []);

  return (
    <div>
      {homeChange.length > 0 ? (
        homeChange.map((item, index) => (
          <div key={index}>
            <p>{JSON.stringify(item)}</p>
          </div>
        ))
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
};

export default Admin;
