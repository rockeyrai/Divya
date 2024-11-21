'use client'
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const LoginForm = ({ setUser }) => {
  const router = useRouter();

  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const initialValues = {
    phoneNumber: "",
    password: "",
  };

  const onSubmit = async (values) => {
    try {
      const { data } = await axios.post('http://localhost:8000/login', values);
  
      // Check if login was successful
      if (data.token && data.user) {
        // Save user data and token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
  
        // Navigate to the home page
        router.push(`/`);
        toast.success("Login successful!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.msg || "Login failed. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-gray-700 font-semibold">
                  Phone Number
                </label>
                <Field
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-semibold">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Login
              </button>
            </Form>
          </Formik>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
