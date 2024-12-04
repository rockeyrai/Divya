'use client';
import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [allNews, setAllNews] = useState([]); // Initialize as an empty array
  const [userData, setUserData] = useState([]); // Initialize as an empty array for consistency
  const [loading, setLoading] = useState(true); // Initialize as true

  const fetchNews = async () => {
    try {
      const res = await fetch('http://localhost:8000/newslist');
      if (!res.ok) throw new Error('Failed to fetch news');
      const data = await res.json();
      setAllNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:8000/user');
      if (!res.ok) throw new Error('Failed to fetch user data');
      const data = await res.json();
      setUserData(data); // Assume userData is an array
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchNews(), fetchData()]);
      setLoading(false); // Set loading to false after both fetches are complete
    };
    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Users: {userData.length}</p> {/* Display the number of users */}

      <p>Total News: {allNews.length}</p> {/* Display the number of news items */}
    </div>
  );
};

export default Dashboard;
