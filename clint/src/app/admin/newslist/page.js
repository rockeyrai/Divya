"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Newslist.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Joystick } from "lucide-react";

const newsValidationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters long"),
  content: Yup.string()
    .required("Content is required")
    .min(20, "Content must be at least 20 characters long"),
  source: Yup.string()
    .required("Source is required")
    .min(3, "Source must be at least 3 characters long"),
  date: Yup.date()
    .required("Date is required")
    .max(new Date(), "Date cannot be in the future"),
  image: Yup.mixed().required("News image is required"),
  tags: Yup.array().min(1, "At least one tag is required"),
});

const TagsInput = ({ values, setFieldValue }) => {
  const [tag, setTag] = useState("");

  const addTag = (e) => {
    e.preventDefault();
    if (tag.trim() && !values.tags.includes(tag)) {
      setFieldValue("tags", [...values.tags, tag]);
      setTag("");
    }
  };

  const removeTag = (index) => {
    const newTags = values.tags.filter((_, i) => i !== index);
    setFieldValue("tags", newTags);
  };

  return (
    <div>
      <label htmlFor="tags" className="block font-medium">
        Tags
      </label>
      <div className="flex items-center gap-2 mb-2">
        <input
          type="text"
          id="tags"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Add a tag"
          className="border p-2 rounded flex-1"
        />
        <button
          type="button"
          onClick={addTag}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {values.tags.map((t, index) => (
          <div
            key={index}
            className="bg-gray-200 px-3 py-1 rounded flex items-center gap-1"
          >
            <span>{t}</span>
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="text-red-500 font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <ErrorMessage
        name="tags"
        component="div"
        className="text-red-600 text-sm"
      />
    </div>
  );
};

const NewsList = () => {
  const [allNews, setAllNews] = useState([]);
  const [add, setAdd] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const initialValues = {
    title: "",
    content: "",
    source: "",
    date: "",
    image: null,
    tags: [],
  };

  const handleImagePreview = (file) => {
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (values, { resetForm }) => {
    let uploadedImageUrl;
    const formData = new FormData();
    console.log("Image being sent:", values.image);
    formData.append("news", values.image);




    try {
      const imageResponse = await fetch("http://localhost:8000/uploadnews", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const imageResult = await imageResponse.json();


      if (imageResult.success) {
        uploadedImageUrl = imageResult.image_urls;
      } else {
        alert("Image upload failed.");
        return;
      }

      const newsData = {
        ...values,
        image: uploadedImageUrl[0],
      };


      const newsResponse = await axios.post(
        "http://localhost:8000/addnews",
        newsData
      );
      if (newsResponse.status === 200 || newsResponse.status === 201) {
        alert("News added successfully!");
        resetForm();
        setPreviewImage(null);
      } else {
        alert("Failed to add news.");
      }
    } catch (error) {
      console.error("Error adding news:", error);
      alert(
        `Error adding news: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const fetchNews = async () => {
    try {
      const res = await fetch("http://localhost:8000/newslist");
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
      const response = await fetch("http://localhost:8000/removenews", {
        method: "POST",
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

      await fetchNews();
    } catch (error) {
      console.error("Error removing news:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1>All News Articles</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add News</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[80%] md:max-w-[50%] mx-auto">
            <DialogHeader>
              <DialogTitle>Add News</DialogTitle>
              <DialogDescription>
                Fill out the form below to add a news item.
              </DialogDescription>
            </DialogHeader>
            <Formik
              initialValues={initialValues}
              validationSchema={newsValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Field
                        as={Input}
                        id="title"
                        name="title"
                        placeholder="Enter news title"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    <div>
                      <Label htmlFor="source">Source</Label>
                      <Field
                        as={Input}
                        id="source"
                        name="source"
                        placeholder="Enter news source"
                      />
                      <ErrorMessage
                        name="source"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="content">Content</Label>
                      <Field
                        as="textarea"
                        id="content"
                        name="content"
                        rows="4"
                        className="w-full border p-2 rounded"
                        placeholder="Enter news content"
                      />
                      <ErrorMessage
                        name="content"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    <TagsInput values={values} setFieldValue={setFieldValue} />

                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Field as={Input} type="date" id="date" name="date" />
                      <ErrorMessage
                        name="date"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    <div>
                      <Label htmlFor="file-input">Image</Label>
                      <input
                        type="file"
                        id="file-input"
                        name="image"
                        className="hidden"
                        onChange={(event) => {
                          const file = event.target.files[0];
                          console.log("Selected File:", file); // Debug
                          setFieldValue("image", file);
                          handleImagePreview(file);
                        }}
                      />
                      <label htmlFor="file-input">
                        <img
                          src={previewImage || "/upload_area.svg"}
                          alt="Preview"
                          className="w-full h-20 object-contain cursor-pointer"
                        />
                      </label>
                      <ErrorMessage
                        name="image"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button type="submit" className="bg-green-600 text-white">
                      Add News
                    </Button>
                    <Button type="button" onClick={addPopUp}>
                      Cancel
                    </Button>
                  </DialogFooter>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableCaption>A list of news articles</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allNews.map((newsItem) => (
            <TableRow key={newsItem._id}>
              <TableCell>{newsItem.title}</TableCell>
              <TableCell>{newsItem.source}</TableCell>
              <TableCell>{newsItem.date}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => removeNews(newsItem._id)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default NewsList;
