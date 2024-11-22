import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Validation schema using Yup
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
});

const NewsForm = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const initialValues = {
    title: "",
    content: "",
    source: "",
    date: "",
    image: null,
  };

  const handleImagePreview = (file) => {
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (values, { resetForm }) => {
    let uploadedImageUrl;

    // Create FormData for image upload
    const formData = new FormData();
    formData.append("product", values.image);

    try {
      // Upload the image
      const imageResponse = await fetch("http://localhost:8000/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const imageResult = await imageResponse.json();
      if (imageResult.success) {
        uploadedImageUrl = imageResult.image_url;
      } else {
        alert("Image upload failed.");
        return;
      }

      // Prepare the news data
      const newsData = {
        ...values,
        image: uploadedImageUrl, // Use the uploaded image URL
      };

      // Submit the news data
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={newsValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="space-y-4 p-4 max-w-[50%] gap-5 mx-auto h-96 bg-red-400 rounded-md fixed inset-0 flex  mt-20">
          <div className="w-1/2 h-40">
            <div>
              <label htmlFor="title" className="block font-medium">
                Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div>
              <label htmlFor="content" className="block font-medium">
                Content
              </label>
              <Field
                as="textarea"
                id="content"
                name="content"
                rows="5"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="content"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div>
              <label htmlFor="source" className="block font-medium">
                Source
              </label>
              <Field
                type="text"
                id="source"
                name="source"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="source"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>
          </div>

          <div className="w-1/2 h-40">
            <div className="flex flex-col">
              <label htmlFor="date" className="block font-medium">
                Date
              </label>
              <Field
                type="date"
                id="date"
                name="date"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="date"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div>
              <label htmlFor="file-input" className="block font-medium">
                Image
              </label>
              <input
                type="file"
                id="file-input"
                name="image"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files[0];
                  setFieldValue("image", file);
                  handleImagePreview(file);
                }}
              />
              <label htmlFor="file-input">
                <img
                  src={previewImage || "/upload_area.svg"}
                  alt="Preview"
                  className="w-full h-40 object-contain cursor-pointer"
                />
              </label>
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>
            <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Submit News
          </button>
          </div>


        </Form>
      )}
    </Formik>
  );
};

export default NewsForm;
