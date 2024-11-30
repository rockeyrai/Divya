"use client";
import NewsForm from "@/app/components/newsform";
import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import "./Newslist.css";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

  const removeNews = async (id) => {
    try {
      console.log("Removing news with ID:", id); // Log the ID being sent

      const response = await fetch("http://localhost:8000/removenews", {
        // Adjust the URL as needed
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


        <Table>
          <TableCaption>A list of your News.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allNews.map((invoice) => (
              <TableRow key={invoice._id}>
                <TableCell className="font-medium">
                  <img src={invoice.image}/>
                </TableCell>
                <TableCell>{invoice.title}</TableCell>
                <TableCell>{invoice.content}</TableCell>
                <TableCell>{invoice.tags}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell className="text-right">
                <img
onClick={() => removeNews(news._id)}
className="remove-icon"
src="/delete_.png"
alt="remove"
/> 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

    </div>
  );
};

export default NewsList;

