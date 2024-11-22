"use client"; 
import React from "react"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { motion } from "framer-motion";
import { Calendar, Mail, MapPin, Phone, Users } from "lucide-react";
import RaiNavbar from "@/app/components/navbar/page";

const AboutUs = ()=> {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
<RaiNavbar scrollToSection={scrollToSection} />
      <div className="container mx-auto px-10 md:px-40 py-16">
        <motion.h1
          className="text-5xl font-bold mt-10 text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About Divya
        </motion.h1>

        <motion.div
          className="flex flex-col gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration:2, staggerChildren: 1 }}
        >
          <Card className="col-span-full lg:col-span-2 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardTitle className="text-2xl">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <p className="mb-4">
                    Divya is more than just a business—it's the result of a
                    dream shared by a brother and sister who saw an opportunity
                    in their local community. Inspired by the growing need for
                    affordable and reliable services, they decided to open their
                    own shop.
                  </p>
                  <p className="mb-4">
                    From a small corner of Bucharest, Divya began its journey
                    with a simple goal: to make life easier for students and
                    Loksewa applicants.
                  </p>
                </div>
                <div className="flex-1">
                  <p className="mb-4">
                    The siblings started by offering basic photography and
                    printing services. Over time, they realized the immense
                    potential in helping people navigate the complexities of
                    online form submissions.
                  </p>
                  <p>
                    Their commitment to quality and customer satisfaction
                    quickly won the trust of the community. Today, Divya is a
                    thriving business, known not just for its services but for
                    the personal touch and care it brings to each customer
                    interaction.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col md:flex-row gap-5">
            <Card className="overflow-hidden shadow-lg w-1/2 hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-teal-400 text-white">
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-inner">
                  <p className="text-lg leading-relaxed">
                    At Divya, our mission is to provide accessible, high-quality
                    services that empower individuals to succeed in their
                    personal and professional journeys. From capturing memories
                    through photography to simplifying form submissions, we are
                    dedicated to enhancing lives and delivering excellence at
                    every step.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden shadow-lg w-1/2 hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                <CardTitle className="text-2xl">Our Motto</CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex flex-col  items-center">

              <div className="flex items-center justify-center">
  <div className="w-20 h-40 bg-yellow-100 dark:bg-yellow-900 rounded-l-full overflow-hidden flex items-center justify-center">
    <p className="text-xs font-bold text-yellow-600 dark:text-yellow-300 text-center px-2">
      Empowering Moments
    </p>
  </div>
  <div className="w-20 h-40 bg-orange-100 dark:bg-orange-900 rounded-r-full overflow-hidden flex items-center justify-center">
    <p className="text-xs font-bold text-orange-600 dark:text-orange-300 text-center px-2">
      Enhancing Lives
    </p>
  </div>
</div>


                <p className="mt-4 text-center">
                  This motto reflects our focus on providing quality services
                  that capture important moments and simplify daily tasks for
                  our customers.
                </p>
              </CardContent>
            </Card>
          </div>
          <Card className="col-span-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-400 text-white">
              <CardTitle className="text-2xl">Core Values</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    value: "Quality",
                    description:
                      "We deliver services that meet the highest standards.",
                  },
                  {
                    value: "Customer Satisfaction",
                    description:
                      "Our customers are at the heart of everything we do.",
                  },
                  {
                    value: "Innovation",
                    description:
                      "We continuously seek better ways to serve our community.",
                  },
                  {
                    value: "Accessibility",
                    description:
                      "We believe in making our services affordable and available to everyone.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="font-bold text-lg mb-2 text-green-600 dark:text-green-400">
                      {item.value}
                    </h3>
                    <p className="text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <CardTitle className="text-2xl">Our Services</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Photography",
                    description:
                      "Professional photo sessions for identity cards, profiles, and special occasions.",
                    icon: "📷",
                  },
                  {
                    title: "Printing",
                    description:
                      "Quick and reliable document and image printing services.",
                    icon: "🖨️",
                  },
                  {
                    title: "Online Form Filling",
                    description:
                      "Assisting with form submissions for exams, job applications, and more.",
                    icon: "📝",
                  },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
              <CardTitle className="text-2xl">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { label: "Phone", value: "+40720301333", icon: Phone },
                  { label: "Email", value: "divya@brandaffix.ro", icon: Mail },
                  {
                    label: "Address",
                    value: "Amman St. no 35, 4th Floor, ap 10, Bucharest",
                    icon: MapPin,
                  },
                  {
                    label: "Founded",
                    value: "February 17, 2024",
                    icon: Calendar,
                  },
                  { label: "Founders", value: "Divya Aidi", icon: Users },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
                  >
                    <item.icon className="w-6 h-6 text-red-500 dark:text-red-400" />
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                        {item.label}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default AboutUs