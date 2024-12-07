// import { useParams } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import { fetchEvents } from "../../utils/Api";
// import Navigation from "../../components/Navigation/Navigation";
// import { MdCalendarMonth } from "react-icons/md";
// import { IoLocationSharp } from "react-icons/io5";
// import "./EventDetails.css";

// const EventDetails = () => {
//   const { id } = useParams();
//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadEvent = async () => {
//       try {
//         setLoading(true); // Set loading to true at the start of data fetch
//         const events = await fetchEvents(); // Fetch all events
//         const filteredEvent = events.find((eventDetail) => eventDetail.id === id);

//         if (!filteredEvent) {
//           throw new Error("Event not found");
//         }

//         setEvent(filteredEvent);
//       } catch (err) {
//         setError(err.message || "Failed to load event details");
//       } finally {
//         setLoading(false); // Set loading to false after data is fetched
//       }
//     };

//     loadEvent();
//   }, [id]);

//   // Function to format the day of the week and day of the month
//   const formatDay = (date) => {
//     const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     const eventDate = new Date(date);
//     const dayOfWeek = daysOfWeek[eventDate.getDay()];
//     const dayOfMonth = eventDate.getDate(); // Get day of the month
//     return `${dayOfMonth} ${dayOfWeek}`; // Return in format "25 Saturday"
//   };

//   // Function to format the time (assuming the time is in 24-hour format like 'HH:MM')
//   const formatTime = (time) => {
//     // Assuming the time received from the server is in "HH:MM" format
//     const [hours, minutes] = time.split(":");
//     const formattedTime = new Date();
//     formattedTime.setHours(hours);
//     formattedTime.setMinutes(minutes);
//     formattedTime.setSeconds(0); // Set seconds to 0

//     return formattedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return <p className="error">{error}</p>;
//   }

//   return (
//     <div className="event-details-container">
//       <Navigation />
//       <div className="event-details-wrapper">
//         <img src={event.img} alt="Event" />
//         <div className="event-details-content">
//           <h3>Event Name: {event.heading}</h3>
//           <div className="small-details">
//             <p className="date">
//               <MdCalendarMonth className="icon" />
//               <span className="font-weight-med">{event.date.split("-")[1]}</span>
//               <span className="font-weight-med">{event.date.split("-")[0]}</span>
//             </p>
//             <p className="day font-weight-med">
//               <strong>Day:</strong> {formatDay(event.date)}
//             </p>
//             {event.time && (
//               <p className="time font-weight-med">
//                 <strong>Time:</strong> {formatTime(event.time)}
//               </p>
//             )}
//             <p className="location font-weight-med">
//               <IoLocationSharp className="icon" />
//               {event.location}
//             </p>
//           </div>
//           <p className="description">
//             <span className="description-heading">Event Description:</span>
//             <span className="description-heading-para">{event.description}</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventDetails;





import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for HTTP requests
import { useParams } from "react-router-dom"; // Import useParams for dynamic routing
import Navigation from "../../components/Navigation/Navigation"; // Import Navigation component (header)
import { MdCalendarMonth } from "react-icons/md"; // Import calendar icon
import { IoLocationSharp } from "react-icons/io5"; // Import location icon
import "./EventDetails.css"; // Import styles

import close__img from "../../assets/image.png"; // Close icon for modal

const EventDetails = () => {
  const { id } = useParams(); // Get event ID from URL
  const [event, setEvent] = useState(null); // State to hold event data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State for handling errors
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [name, setName] = useState(""); // State for the user's name
  const [mobileNumber, setMobileNumber] = useState(""); // State for the user's mobile number

  // Fetch event details when the component mounts
  useEffect(() => {
    const loadEvent = async () => {
      setLoading(true);
      try {
        // Fetch event data from the API using the event ID
        const response = await axios.get(`https://6746985538c8741641d37ede.mockapi.io/createvents/${id}`);
        setEvent(response.data); // Set event data
      } catch (err) {
        setError("Event not found or failed to load"); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    loadEvent(); // Fetch event details
  }, [id]); // Trigger effect on ID change

  // Handle opening the payment modal
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  // Handle closing the payment modal
  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Handle payment form submission
  const handlePaymentSubmit = async () => {
    const paymentData = {
      eventId: id, // Event ID
      name,
      mobileNumber,
      paymentTime: new Date().toISOString(), // Payment timestamp
    };

    try {
      // Send payment data to the server (mock API in this case)
      const response = await axios.post(
        "https://674d5c7e635bad45618aebb5.mockapi.io/payment",
        paymentData
      );

      const { eventName } = useParams(); // Fetch eventName from the URL

      console.log("Payment successful:", response.data);
      alert("Payment successful!");

      // Close modal and reset form fields after successful payment
      setModalOpen(false);
      setName("");
      setMobileNumber("");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div> {/* Spinner for loading */}
      </div>
    );
  }

  // Show error message if fetching data failed
  if (error) {
    return <p className="error">{error}</p>;
  }

  // Render event details once data is loaded
  return (
    <div className="event-details">
      <Navigation /> 
      
      <h1 className="header__title" >{event.heading}</h1> 

      <div className="event-card__details">
        <img className="event-image" src={event.img} alt="Event" />
        <div className="event-info">
          <div className="first__colum">
            <h2 className="event-price">{event.price} $</h2>
            <p className="event-description">{event.description}</p>
          </div>
          <div className="second__colum">
            <p className="event-date-time">
              <MdCalendarMonth className="icon" />
              {event.date} | {event.time}
            </p>
            <p className="location">
              <IoLocationSharp className="icon" />
              {event.location}
            </p>
          </div>
          <button className="event-button" onClick={handleModalOpen}>
            Get Ticket
          </button>
        </div>
      </div>

      {/* Modal for payment */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={handleModalClose}>
              <img className="close__image" src={close__img} alt="Close" />
            </button>
            <h2>Enter Your Payment Information</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)} // Update name state
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)} // Update mobile number state
            />
            <button className="modal-button" onClick={handlePaymentSubmit}>
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import Navigation from "../../components/Navigation/Navigation";
// import { MdCalendarMonth } from "react-icons/md";
// import { IoLocationSharp } from "react-icons/io5";
// import "./EventDetails.css";
// import close__img from "../../assets/image.png";

// const EventDetails = () => {
//   const { paymentId, eventId } = useParams(); // Получаем оба параметра
//   const [event, setEvent] = useState(null); // Данные события
//   const [payment, setPayment] = useState(null); // Данные платежа
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       setLoading(true);
//       try {
//         // Запрашиваем данные события и платежа
//         const [eventResponse, paymentResponse] = await Promise.all([
//           axios.get(`https://6746985538c8741641d37ede.mockapi.io/createvents/${eventId}`),
//           axios.get(`https://674d5c7e635bad45618aebb5.mockapi.io/payment/${paymentId}`),
//         ]);

//         setEvent(eventResponse.data);
//         setPayment(paymentResponse.data);
//       } catch (err) {
//         setError("Failed to load details. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [paymentId, eventId]);

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return <p className="error">{error}</p>;
//   }

//   return (
//     <div className="event-details">
//       <Navigation />
//       <h1 className="header__title">{event.heading}</h1>

//       <div className="event-card__details">
//         <img className="event-image" src={event.img} alt="Event" />
//         <div className="event-info">
//           <div className="first__colum">
//             <h2 className="event-price">{event.price} $</h2>
//             <p className="event-description">{event.description}</p>
//           </div>
//           <div className="second__colum">
//             <p className="event-date-time">
//               <MdCalendarMonth className="icon" />
//               {event.date} | {event.time}
//             </p>
//             <p className="event-location">
//               <IoLocationSharp className="icon" />
//               {event.location}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Информация о платеже */}
//       <div className="payment-info">
//         <h2>Payment Details</h2>
//         <p>
//           <strong>Name:</strong> {payment.name}
//         </p>
//         <p>
//           <strong>Mobile:</strong> {payment.mobileNumber}
//         </p>
//         <p>
//           <strong>Payment Time:</strong> {new Date(payment.paymentTime).toLocaleString()}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default EventDetails;
