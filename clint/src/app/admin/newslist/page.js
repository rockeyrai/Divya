"use client";
import NewsForm from "@/app/components/newsform";
import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import './Newslist.css'

const NewsList = () => {
  const [allNews, setAllNews] = useState([]);
  const [add, setAdd] = useState(false);

  // Fetch all news articles
  const fetchNews = async () => {
    try {
      const res = await fetch("http://localhost:8000/newslist"); // Update endpoint accordingly
      const data = await res.json();
      setAllNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [allNews]);

  const addPopUp = () => {
    setAdd((current) => !current);
  };

  const removeNews = async (id) => {
    try {
      console.log("Removing news with ID:", id); // Log the ID being sent
  
      const response = await fetch("http://localhost:8000/removenews", {  // Adjust the URL as needed
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Send the correct `_id`
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Backend Error Message:", errorMessage); // Log backend error
        throw new Error("Failed to remove news");
      }
  
      console.log("News removed successfully");
      await fetchNews(); // Refresh the news list
    } catch (error) {
      console.error("Error removing news:", error);
    }
  };
  

  return (
    <div>
      <div className="flex justify-between">
      <h1>All News Articles</h1>
      <div>
        <PlusCircle className="cursor-pointer w-8 h-8" onClick={addPopUp} />
        {add && <NewsForm />}
      </div>

      </div>

      <div className="news-list">

        <div className="listproduct-format-main">
          <p>Image</p>
          <p>Title</p>
          <p>Source</p>
          <p>Date</p>
          <p>Description</p>
          <p>Remove</p>
        </div>
        <div className="newslist-allnews">
          <hr />
          {allNews.map((news) => (
            <div key={news._id}>
              <div className=" listproduct-format-main listproduct-format ">
                <img
                  src={news.image || "default_image.png"} // Fallback for missing image
                  alt="News"
                  className="newslist-image"
                />
                <p>{news.title || "Untitled"}</p>{" "}
                {/* Fallback for missing title */}
                <p>{news.source || "Unknown"}</p>{" "}
                {/* Fallback for missing source */}
                <p>
                  {news.date ? new Date(news.date).toLocaleDateString() : "N/A"}
                </p>{" "}
                {/* Fallback for missing date */}
                <p>
                  {news.content
                    ? news.content.slice(0, 50)
                    : "No description"}
                  ...
                </p>{" "}
                {/* Fallback for missing description */}
                <img
                  onClick={() => removeNews(news._id)}
                  className="remove-icon"
                  src="/delete_.png"
                  alt="remove"
                />
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsList;
