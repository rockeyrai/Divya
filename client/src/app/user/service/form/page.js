"use client"
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const MyForm = () => {
  // Validation schema
  const validationSchema = Yup.object({
    photo: Yup.mixed()
      .required("Photo is required")
      .test("fileSize", "File too large", (value) => {
        return value && value.size <= 2 * 1024 * 1024; // 2MB size limit
      }),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .max(200, "Description can't exceed 200 characters")
      .required("Description is required"),
    formName: Yup.string().required("Form name is required"),
  });

  // Initial values
  const initialValues = {
    photo: null,
    description: "",
    formName: "",
  };

  // Handle form submission
  const onSubmit = (values) => {
    console.log("Form Data:", values);
    alert("Form Submitted Successfully!");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          {/* Form Name */}
          <div>
            <label htmlFor="formName">Form Name:</label>
            <Field type="text" id="formName" name="formName" />
            <ErrorMessage name="formName" component="div" className="error" />
          </div>

          {/* Photo */}
          <div>
            <label htmlFor="photo">Photo:</label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={(event) => {
                setFieldValue("photo", event.currentTarget.files[0]);
              }}
            />
            <ErrorMessage name="photo" component="div" className="error" />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description">Description:</label>
            <Field
              as="textarea"
              id="description"
              name="description"
              placeholder="Enter description"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="error"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button type="submit">Submit</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
