import React, { forwardRef, useEffect, useState } from "react";
import "./Service.css";
import { useRouter } from "next/navigation";

const RaiService = forwardRef((props, ref) => {
  const [homeChange, setHomeChange] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // Track user login status
  const router = useRouter();

  const fetchChange = async () => {
    try {
      const res = await fetch("http://localhost:8000/homeui"); // Adjust endpoint as needed
      if (!res.ok) throw new Error("Failed to fetch Change");
      const change = await res.json();
      setHomeChange(change[0]); // Store the fetched object directly
    } catch (error) {
      console.error("Error fetching change:", error);
    }
  };

  // Simulate checking login status (replace with actual logic)
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token"); // Example: Check token in localStorage
      setIsUserLoggedIn(!!token); // Set to true if token exists
    };
    fetchChange();
    checkLoginStatus();
  }, []);

  const handleServiceClick = (link) => {
    if (isUserLoggedIn) {
      router.push(link); // Navigate to service link if logged in
    } else {
      router.push("/login"); // Redirect to login page if not logged in
    }
  };

  const services = [
    {
      id: 1,
      title: "Photo Printing",
      icon: "/camera_.png",
      description:
        "High-quality photo printing services to preserve your precious memories.",
      buttonText: "Learn More",
      link: "user/service/photo",
      theme: "btn-back-orange ",
    },
    {
      id: 2,
      title: "Print Services",
      icon: "/print_.png",
      description:
        "Fast and reliable document printing for all your business or personal needs.",
      buttonText: "Start Printing",
      link: "user/service/print",
      theme: "btn-back-black ",
    },
    {
      id: 3,
      title: "Online Form Filling",
      icon: "/paper_.png",
      description:
        "Assistance with filling out online forms quickly and accurately.",
      buttonText: "Apply Now",
      link: "user/service/form",
      theme: "btn-back-yellow",
    },
  ];

  return (
    <section
      ref={ref}
      style={{ height: "100vh", backgroundColor: homeChange.bodyColor }}
      className="py-12 px-10"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-6 h-80 rounded-2xl shadow-md text-center"
              style={{ backgroundColor: homeChange.cardColor }}
            >
              <div className="block-container w-14 h-14 mb-5 ">
                <div className={`btn-back rounded-xl ${service.theme}`} />
                <div className="btn-front rounded-xl flex justify-center items-center">
                  <img
                    src={service.icon}
                    alt="threads"
                    className="w-1/2 h-1/2"
                  />
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <button
                onClick={() => handleServiceClick(service.link)} // Use the conditional navigation function
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                {service.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default RaiService;
