'use client'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [userData , setUserData]= useState([])


  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8000/user");
      const data = await res.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {JSON.stringify(userData)}
    </div>
  )
}

export default page
