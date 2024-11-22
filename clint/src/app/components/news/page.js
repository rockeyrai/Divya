import React, { forwardRef, useRef, useState, useEffect } from "react";
import Image from "next/image";
import "./News.css";

// Sample news data
const newsItems = [
  {
    id: 1,
    title: "New Technology Breakthrough",
    description:
      "Scientists have made a groundbreaking discovery in quantum computing, potentially revolutionizing the field of cryptography and data processing.",
    image: "/c54bec1a-4c69-435e-8e30-37e897a88dcc.jpg",
  },
  {
    id: 2,
    title: "Global Climate Summit",
    description:
      "World leaders gather to discuss urgent climate action plans, setting ambitious targets for reducing carbon emissions over the next decade.",
    image: "/400772957_216883978022531_3005775761945613774_n.jpg",
  },
  {
    id: 3,
    title: "Economic Recovery Trends",
    description:
      "Experts analyze positive signs in the global economy post-pandemic, with emerging markets showing particularly strong growth potential.",
    image: "/398515986_872164520933406_7696851842795521949_n.jpg",
  },
  {
    id: 4,
    title: "Advancements in Healthcare",
    description:
      "Revolutionary treatment shows promise in fighting rare diseases, offering hope to millions of patients worldwide.",
    image: "/398491162_877321490659930_3872872133272746253_n.jpg",
  },
  {
    id: 5,
    title: "Space Exploration Milestone",
    description:
      "NASA announces plans for the next phase of Mars exploration, including the possibility of establishing a permanent human presence on the red planet.",
    image: "/IMG_5690.jpg",
  },
];

const RaiNews = forwardRef((props, ref) => {
  const sliderRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", handleScroll);
      return () => slider.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <section
      ref={ref}
      style={{ height: "90vh" }}
      className="py-12 px-4 bg-gray-100"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest News</h2>
        <div className="relative">
          {showLeftArrow && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
              onClick={() => scroll("left")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
                priority
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}
          <div
            ref={sliderRef}
            className="flex overflow-x-auto gap-5 pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {newsItems.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-[300px] h-[400px] snap-center bg-white rounded-lg shadow-md overflow-hidden hover-box "
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={300}
                  className="w-full h-56 object-cover"
                  priority
                />
                <div className="p-4">
                  <h3 className="text-xm font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-xs line-clamp-3">
                    {item.description}
                  </p>
                </div>
                <div className="px-4 pb-4">
                  <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
          {showRightArrow && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
              onClick={() => scroll("right")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
});

export default RaiNews;
