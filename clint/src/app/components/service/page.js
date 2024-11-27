import React, { forwardRef } from "react";
import { FaCamera, FaPrint, FaKeyboard } from "react-icons/fa";
import "./Service.css";
import { useRouter } from "next/navigation";

const RaiService = forwardRef((props, ref) => {
  const router = useRouter()
  const services = [
    {
      id: 1,
      title: "Photo Printing",
      icon: "/camera_.png",
      description:
        "High-quality photo printing services to preserve your precious memories.",
      buttonText: "Learn More",
      link: "photo-service",
      theme: "btn-back-orange ",
    },
    {
      id: 2,
      title: "Print Services",
      icon: "/print_.png",
      description:
        "Fast and reliable document printing for all your business or personal needs.",
      buttonText: "Start Printing",
      link: "print-service",
      theme: "btn-back-black ",
    },
    {
      id: 3,
      title: "Online Form Filling",
      icon: "/paper_.png",
      description:
        "Assistance with filling out online forms quickly and accurately.",
      buttonText: "Apply Now",
      link: "form-service",
      theme: "btn-back-yellow",
    },
  ];
  return (
    <section
      ref={ref}
      style={{ height: "100vh" }}
      className="py-12 px-10 bg-gray-50"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-6 h-80 bg-white rounded-2xl shadow-md text-center "
            >
              <div className="block-container w-14 h-14 mb-5 ">
                <div className={`btn-back rounded-xl ${service.theme}`} />
                <div className="btn-front rounded-xl flex justify-center items-center">
                  <img
                    src={service.icon}
                    alt="threads"
                    className="w-1/2 h-1/2 "
                  />
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <button
                onClick={()=>{router.push(`${service.link}`)} }
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
