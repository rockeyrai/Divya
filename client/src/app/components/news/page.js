import React, { forwardRef, useRef, useState, useEffect } from "react";
import Image from "next/image";
import "./News.css";

const RaiNews = forwardRef((props, ref) => {
  const sliderRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(true);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [homeChange, setHomeChange] = useState([]);
  
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

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/newslist"); // Update endpoint accordingly
      if (!res.ok) throw new Error("Failed to fetch news");
      const data = await res.json();
      setAllNews(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchChange()
  }, []);
  console.log(homeChange.image)

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { clientWidth } = sliderRef.current;
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section
      ref={ref}
      style={{ height: "90vh", backgroundColor: homeChange.bodyColor  }}
      className="py-12 px-4"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest News</h2>
        <div className="relative">
          {showLeftArrow && (
            <button
              aria-label="Scroll Left"
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md"
              onClick={() => scroll("left")}
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}
          <div
            ref={sliderRef}
            className="flex overflow-x-auto gap-5 pb-4 snap-x snap-mandatory scroll-container"
          >
            {allNews.map((item) => (
              <div
              style={{backgroundColor: homeChange.cardColor }}
                key={item.source}
                className="flex-shrink-0 w-[300px] h-[400px] snap-center  rounded-lg shadow-md overflow-hidden hover-box "
              >
                <Image
                  src={item.image || "/default-image.jpg"}
                  alt={item.title}
                  width={300}
                  height={300}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xm font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-xs line-clamp-2">
                    {item.content}
                  </p>
                </div>
                <div className="px-4 pb-4">
                  <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"  onClick={() => (window.location.href =`${item.source}` )} >
                 
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
          {showRightArrow && (
            <button
              aria-label="Scroll Right"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md"
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
