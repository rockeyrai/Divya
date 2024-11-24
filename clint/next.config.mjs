/** @type {import('next').NextConfig} */
const nextConfig = {
  // next.config.js

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000", // Replace with the port your backend server is running on
        pathname: "/images/**", // Adjust based on your image paths
      },
    ],
  }
}


export default nextConfig;
