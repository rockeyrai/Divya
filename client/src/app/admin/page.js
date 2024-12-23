"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AlignRight } from "lucide-react";

// Validation schema using Yup
const homeValidationSchema = Yup.object().shape({
  homeImage: Yup.array().of(
    Yup.mixed().test("fileType", "Only image files are allowed", (value) => {
      return (
        value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      );
    })
  ),

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
  const [homeChange, setHomeChange] = useState([]); // Initialize as null
  let [initialValues, setInitialValues] = useState({
    homeImage: [],
    navbarColor: "#ffffff",
    bodyColor: "#ffffff",
    cardColor: "#ffffff",
    contact: "98064676",
    contactEmail: "",
    location: "",
    previousImage: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchChange = async () => {
    try {
      const res = await fetch("http://localhost:8000/homeui"); // Adjust endpoint as needed
      if (!res.ok) throw new Error("Failed to fetch Change");
      const change = await res.json();
      setHomeChange(change[0]); // Store the fetched object directly
      setLoading(false);
    } catch (error) {
      console.error("Error fetching change:", error);
    }
  };

  useEffect(() => {
    fetchChange(); // Fetch data on component mount
  }, []); // Empty dependency array to only run once

  useEffect(() => {
    if (homeChange && homeChange.navbarColor) {
      // Check if homeChange is populated
      console.log(homeChange.navbarColor); // Check the content of homeChange

      setInitialValues({
        homeImage: [homeChange.image], // Empty array for new uploads
        previousImage: homeChange.image || "",
        navbarColor: `${homeChange.navbarColor}` || "#ffffff",
        bodyColor: `${homeChange.bodyColor}` || "#ffffff",
        cardColor: `${homeChange.cardColor}` || "#ffffff",
        contact: `${homeChange.contact}` || "",
        contactEmail: `${homeChange.contactEmail}` || "",
        location: `${homeChange.location}` || "",
      });
      // Trigger alert after homeChange updates
    }
  }, [homeChange]); // Runs only when homeChange is updated
  // Dependency on homeChange

  const handleImagePreview = (files) => {
    const newPreviewImages = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(newPreviewImages);
  };

  const handleSubmit = async (values, { resetForm }) => {
    const recordId = homeChange._id;

    if (!recordId) {
      alert("No record ID found to update.");
      return;
    }

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
    } else if (values.previousImage) {
      formData.append("previousImage", values.previousImage);
    } else {
      alert("No image selected or available to submit.");
      return; // Exit if no image is available
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

      if (imageResponse.ok) {
        // Parse the JSON response
        console.log("Image upload response:", imageResult); // Log the full response

        if (imageResult.success) {
          const uploadedImageUrl = imageResult?.image_urls; // Safely access the image_url
         // Should alert the correct image URL if it exists

          // Proceed with the form submission if the image upload was successful
          alert(`Working with homeData:`,  values.navbarColor);
          const homeData = {
            navbarColor: values.navbarColor,
            bodyColor: values.bodyColor,
            cardColor: values.cardColor,
            contact: values.contact,
            contactEmail: values.contactEmail,
            location: values.location,
            homeImage: uploadedImageUrl, // Use uploaded image URL here
          };

          // alert(`Working with homeData: ${JSON.stringify(homeData)}`)

          // Send the rest of the data including homeImage URL
          const response = await axios.patch(
            `http://localhost:8000/homeui/${recordId}`,
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

  const removeHomeImage = async (imageUrl) => {
    try {
      const fileName = imageUrl.split("/").pop();
  
      const response = await fetch(`http://localhost:8000/homeui/${fileName}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Backend Error Message:", errorMessage);
        throw new Error(errorMessage || "Failed to remove home image");
      }
  
      console.log("Home image removed successfully");
      await fetchChange(); // Refresh the news list or UI
    } catch (error) {
      console.error("Error removing home image:", error.message || error);
    }
  };
  
  

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={homeValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-4 p-4 max-w-[80%] md:max-w-[50%] gap-5 mx-auto bg-gray-200 rounded-md fixed inset-0 flex mt-20">
          {/* Home images */}
          <div className="w-1/2">
            <div>
              <label
                htmlFor="file-input"
                className="cursor-pointer flex flex-col"
              >
                image
                <input
                  type="file"
                  id="homeImage"
                  name="homeImage"
                  multiple
                  onChange={async (event) => {
                    // Wait for removeHomeImage to complete
                    await removeHomeImage(homeChange.homeImage[0]);
                    const files = Array.from(event.target.files); // Get selected files
                    setFieldValue("homeImage", files); // Set formik value for homeImage
                    handleImagePreview(files); // Update preview images
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
                        className="h-10 w-10 object-contain cursor-pointer"
                      />
                    ))}
                  </div>
                ) : initialValues.previousImage ? (
                  <img
                    src={initialValues.previousImage}
                    alt="Previous uploaded"
                    className="w-full h-20 object-contain cursor-pointer"
                  />
                ) : (
                  <img
                    src="/image_.png"
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
                className="w-full h-10 border p-2 rounded"
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
                className="w-full h-10 border p-2 rounded"
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
                className="w-full h-10 border p-2 rounded"
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
