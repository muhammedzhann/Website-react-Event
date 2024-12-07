import React, { useState } from "react";
import Navigation from "../../components/Navigation/Navigation";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail, MdPhone } from "react-icons/md";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before submission
    setSubmitted(false); // Reset submitted status

    const formData = new FormData(e.target);
    formData.append("access_key", "faee45ef-1852-4d4e-8983-3fed8ab61628"); // Add your Web3Forms access key

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });
      const result = await res.json();

      if (result.success) {
        setSubmitted(true);
        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setError("Failed to send your message. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while sending your message.");
    }
  };

  return (
    <div className="contact-container">
      <Navigation />
      <div className="contact-wrapper">
        <h1>Contact Us</h1>
        <div className="contact-content">
          {/* Form Section */}
          <div className="contact-form">
            <h2>Have Questions? Reach Out!</h2>
            {submitted && <p className="success-message">Your message has been sent successfully!</p>}
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label htmlFor="message">Message:</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your question or message here"
                ></textarea>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>

        <div className="contact-details">
          <h2>Contact Information</h2>
          <p>
            <IoLocationSharp className="icon" /> 123 Event St., Cityname, Country
          </p>
          <p>
            <MdEmail className="icon" /> contact@eventsite.com
          </p>
          <p>
            <MdPhone className="icon" /> +1 (234) 567-8901
          </p>
            <h2>Follow Us</h2>
            <div className="detailed-social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="instagram-link">
                <i className="fab fa-instagram"></i> Instagram
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="twitter-link">
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="facebook-link">
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
