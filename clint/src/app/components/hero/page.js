import React, { forwardRef } from 'react';
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

const images = [
  "/main_banner.jpg",
 "/IMG_5701.jpg",
 "/IMG_5690.jpg"
]

const RaiHero = forwardRef((props, ref) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])
  return (
    <section ref={ref} style={{ height:  'calc(100vh - 10vh)' }} className="relative w-full overflow-hidden bg-orange-800">
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`Hero image ${index + 1}`}
          fill
          style={{ objectFit: 'cover' }}
          className={`transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
       
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Welcome to Our Website
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 px-40">
          Welcome to Divya, your go-to destination for high-quality photo printing, online form filling, and a wide range of printing services. We provide fast, reliable, and affordable solutions to help you preserve memories and simplify your tasks. Whether you need professional prints or assistance with forms, we’re here to make your life easier with excellent service and convenience.
          </p>
          <button onClick={() => router.push('/about-us')}  className="bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-200 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
});

export default RaiHero;
