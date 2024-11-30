"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Validation schema using Yup
const homeValidationSchema = Yup.object().shape({
  homeImage: Yup.array()
    .of(
      Yup.mixed().test("fileType", "Only image files are allowed", (value) => {
        return (
          value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
        );
      })
    )
    .required("At least one image is required"),

  navbarColor: Yup.string()
    .matches(/^#[0-9A-Fa-f]{6}$/, "Invalid color code")
    .required("Navbar color is required"),

  bodyColor: Yup.string()
    .matches(/^#[0-9A-Fa-f]{6}$/, "Invalid color code")
    .required("Body color is required"),

  cardColor: Yup.string()
    .matches(/^#[0-9A-Fa-f]{6}$/, "Invalid color code")
    .required("Card color is required"),

  contact: Yup.string()
    .matches(/^\d+$/, "Contact must be a valid number")
    .required("Contact is required"),

  contactEmail: Yup.string()
    .email("Invalid email format")
    .required("Contact email is required"),

  location: Yup.string()
    .min(5, "Location must be at least 5 characters")
    .max(100, "Location must be less than 100 characters")
    .required("Location is required"),
});

const HomeForm = () => {
  const [previewImages, setPreviewImages] = useState([]);

  const initialValues = {
    homeImage: [],
    navbarColor: "#ffffff",
    bodyColor: "#ffffff",
    cardColor: "#ffffff",
    contact: "",
    contactEmail: "",
    location: "",
  };
  const handleImagePreview = (files) => {
    const newPreviewImages = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(newPreviewImages);
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log("Formik values on submit:", values); // Debugging

    const formData = new FormData();

    // Append other fields from values
    formData.append("navbarColor", values.navbarColor);
    formData.append("bodyColor", values.bodyColor);
    formData.append("cardColor", values.cardColor);
    formData.append("contact", values.contact);
    formData.append("contactEmail", values.contactEmail);
    formData.append("location", values.location);

    // Append image files if they exist
    if (values.homeImage && values.homeImage.length > 0) {
      values.homeImage.forEach((file) => {
        formData.append("homeImage", file);
      });
    } else {
      console.error("No homeImage files selected");
      return; // Don't proceed if no image is selected
    }

    try {
      // Upload the images first
      const imageResponse = await fetch("http://localhost:8000/uploadhome", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
      const imageResult = await imageResponse.json();

      alert(JSON.stringify(imageResult, null, 2));

      if (imageResponse.ok) {
        // Parse the JSON response
        console.log("Image upload response:", imageResult); // Log the full response

        if (imageResult.success) {
          const uploadedImageUrl = imageResult?.image_urls; // Safely access the image_url
          alert(uploadedImageUrl); // Should alert the correct image URL if it exists

          // Proceed with the form submission if the image upload was successful
          const homeData = {
            navbarColor: values.navbarColor,
            bodyColor: values.bodyColor,
            cardColor: values.cardColor,
            contact: values.contact,
            contactEmail: values.contactEmail,
            location: values.location,
            homeImage: uploadedImageUrl, // Use uploaded image URL here
          };

          console.log(`Working with homeData:`, homeData); // Debugging

          // Send the rest of the data including homeImage URL
          const response = await axios.post(
            "http://localhost:8000/homeui",
            homeData
          );

          if (response.status === 200 || response.status === 201) {
            alert("Form submitted successfully!");
            resetForm();
            setPreviewImages([]); // Clear the preview images after submission
          } else {
            alert("Failed to submit form.");
          }
        } else {
          alert("Image upload failed.");
        }
      } else {
        alert("Image upload failed.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        `Error submitting form: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={homeValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-4 p-4 max-w-[80%] md:max-w-[50%] gap-5 mx-auto bg-gray-200 rounded-md fixed inset-0 flex mt-20">
          {/* Home images */}
          <div>
            <div>
              <label htmlFor="file-input" className="cursor-pointer flex flex-col">
                image
                <input
                  type="file"
                  id="homeImage"
                  name="homeImage"
                  multiple
                  onChange={(event) => {
                    const files = Array.from(event.target.files);
                    setFieldValue("homeImage", files);
                    handleImagePreview(files); // Updates preview images
                  }}
                  style={{ display: "none" }} // Hide the default file input
                />
                <label htmlFor="homeImage" className="file-label">
                  Choose File
                </label>
                {/* Display image previews */}
                {previewImages.length > 0 ? (
                  <div className="image-grid">
                  {previewImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Preview ${index}`}
                      className="w-full h-20 object-contain cursor-pointer"
                    />
                  ))}
                </div>
                
                ) : (
                  <img
                    src="/upload_area.svg"
                    alt="Upload area"
                    className="w-full h-20 object-contain cursor-pointer"
                  />
                )}
              </label>

              <ErrorMessage
                name="homeImage"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Navbar Color */}
            <div>
              <label htmlFor="navbarColor" className="block font-medium">
                Navbar Color
              </label>
              <Field
                type="color"
                id="navbarColor"
                name="navbarColor"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="navbarColor"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Body Color */}
            <div>
              <label htmlFor="bodyColor" className="block font-medium">
                Body Color
              </label>
              <Field
                type="color"
                id="bodyColor"
                name="bodyColor"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="bodyColor"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Card Color */}
            <div>
              <label htmlFor="cardColor" className="block font-medium">
                Card Color
              </label>
              <Field
                type="color"
                id="cardColor"
                name="cardColor"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="cardColor"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>
          </div>
          <div>
            {/* Contact */}
            <div>
              <label htmlFor="contact" className="block font-medium">
                Contact
              </label>
              <Field
                type="text"
                id="contact"
                name="contact"
                placeholder="Enter contact number"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="contact"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Contact Email */}
            <div>
              <label htmlFor="contactEmail" className="block font-medium">
                Contact Email
              </label>
              <Field
                type="email"
                id="contactEmail"
                name="contactEmail"
                placeholder="Enter contact email"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="contactEmail"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block font-medium">
                Location
              </label>
              <Field
                type="text"
                id="location"
                name="location"
                placeholder="Enter location"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default HomeForm;

// const [homeChange, setHomeChange] = useState([]);
// const fetchChange = async () => {
//   try {
//     const res = await fetch("http://localhost:8000/homeui"); // Update endpoint accordingly
//     if (!res.ok) throw new Error("Failed to fetch Change");
//     const change = await res.json();
//     setHomeChange(change);
//   } catch (error) {
//     setError(error.message);
//   }
// };

// useEffect(() => {
//   fetchChange(); // Pass a function, not an object
// }, []);
