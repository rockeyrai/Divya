"use client";
import NewsForm from "@/app/components/newsform";
import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

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
  }, []);

  const addPopUp = () => {
    setAdd((current) => !current);
  };

  return (
    <div>
      <div>
        <PlusCircle className="cursor-pointer w-8 h-8" onClick={addPopUp} />
        {add && <NewsForm />}
      </div>
      <div className="news-list">
        <h1>All News Articles</h1>
        <div className="newslist-header">
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
            <div key={news.id || news._id || news.title}>
              <div className="newslist-item">
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
                  {news.description
                    ? news.description.slice(0, 50)
                    : "No description"}
                  ...
                </p>{" "}
                {/* Fallback for missing description */}
                <img
                  onClick={() => removeNews(news.id)}
                  className="newslist-remove-icon"
                  src="cross_icon.png"
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
