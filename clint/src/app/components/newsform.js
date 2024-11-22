import React from "react";
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
  date: Yup.date().required("Date is required").max(new Date(), "Date cannot be in the future"),
  image: Yup.string()
    .required("Image URL is required")
    .url("Must be a valid URL"),
});

const NewsForm = () => {
  const initialValues = {
    title: "",
    content: "",
    source: "",
    date: "",
    image: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post("http://localhost:8000/news", values);
      alert("News added successfully!");
      resetForm();
    } catch (error) {
      alert(`Error adding news: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={newsValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
       <Form className="space-y-4 p-4 max-w-lg mx-auto bg-red-400 rounded-md mt-20 h-auto fixed inset-0 flex flex-col ">
          <div>
            <label htmlFor="title" className="block font-medium">Title</label>
            <Field
              type="text"
              id="title"
              name="title"
              className="w-full border p-2 rounded"
            />
            <ErrorMessage name="title" component="div" className="text-red-600 text-sm" />
          </div>

          <div>
            <label htmlFor="content" className="block font-medium">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows="5"
              className="w-full border p-2 rounded"
            />
            <ErrorMessage name="content" component="div" className="text-red-600 text-sm" />
          </div>

          <div>
            <label htmlFor="source" className="block font-medium">Source</label>
            <Field
              type="text"
              id="source"
              name="source"
              className="w-full border p-2 rounded"
            />
            <ErrorMessage name="source" component="div" className="text-red-600 text-sm" />
          </div>

          <div>
            <label htmlFor="date" className="block font-medium">Date</label>
            <Field
              type="date"
              id="date"
              name="date"
              className="w-full border p-2 rounded"
            />
            <ErrorMessage name="date" component="div" className="text-red-600 text-sm" />
          </div>

          <div>
            <label htmlFor="image" className="block font-medium">Image URL</label>
            <Field
              type="text"
              id="image"
              name="image"
              className="w-full border p-2 rounded"
            />
            <ErrorMessage name="image" component="div" className="text-red-600 text-sm" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit News"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default NewsForm;
