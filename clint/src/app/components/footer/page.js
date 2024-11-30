import React, { forwardRef, useEffect, useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaGoogle,
} from "react-icons/fa";
import "./Footer.css";


const RaiFooter = forwardRef((props, ref) => {
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

useEffect(()=>{
  fetchChange()
},[])
console.log(homeChange)
  return (
    <section ref={ref} style={{ height: "50vh" ,backgroundColor: homeChange.bodyColor }}  className="main-footer" >
      <h2 className="text-3xl font-bold mb-10 text-center">Contact Us</h2>
      {/* Contact Section */}
      <section className="contact-section "               style={{backgroundColor: homeChange.bodyColor }}>
        {/* Map */}
        <div className="map-container">
          <iframe
            title="Map Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.3093445087236!2d85.28770171506106!3d27.711740182791177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb192a41ae4f57%3A0x2c1cddf94790b192!2sKirtipur%2C%20Kathmandu!5e0!3m2!1sen!2snp!4v1699191892654!5m2!1sen!2snp"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Info */}
        <div className="info-container" style={{ backgroundColor: homeChange.bodyColor }}>
          <h2>Meet us</h2>
          <div className="info-item">
            <FaPhone className="icon" /> +40720301333
          </div>
          <div className="info-item">
            <FaEnvelope className="icon" /> divya@brandaffix.ro
          </div>
          <div className="info-item">
            <FaMapMarkerAlt className="icon" /> Amman St. no 35, 4th floor, ap
            10, Bucharest
          </div>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://mail.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGoogle />
            </a>
          </div>
        </div>

        {/* Form */}
        <div className="form-container">
          <h2>Feedback</h2>
          <form>
            <textarea placeholder="Hello, my name is ..." />
            <input type="text" placeholder="Your email address" />
            <button type="submit">Send</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Terms & Conditions</p>
      </footer>
    </section>
  );
});

export default RaiFooter;
