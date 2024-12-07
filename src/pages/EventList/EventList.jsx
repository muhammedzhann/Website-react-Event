import React, { useState, useEffect } from "react";
import EventCard from "../../components/EventCard/EventCard.jsx";
import { fetchEvents } from "../../utils/Api";
import Navigation from "../../components/Navigation/Navigation.jsx";
import "./EventList.css";

const categories = ["Game", "Music", "Technology", "Sports", "Culture"];

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const renderCategoryRows = () => {
    return categories.map((category) => {
      const filteredEvents = events.filter((event) => event.category === category);

      if (filteredEvents.length === 0) return null; // Пропуск категории, если нет событий

      return (
        <div key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <div className="event-grid">
            {filteredEvents.map(({ id, date, heading, location, img, category }) => (
              <EventCard
                key={id}
                id={id}
                date={date}
                heading={heading}
                location={location}
                img={img}
                category={category}
              />
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="events">
      <Navigation />
      <div className="event-list-container">
        <h1 className="event-list-title">Events</h1>
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            
            <div className="slider-wrapper">
              
              <div className="categories-wrapper">{renderCategoryRows()}</div>
              
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventList;


// import React, { useState, useEffect } from "react";
// import EventCard from "../../components/EventCard/EventCard.jsx";
// import { fetchEvents } from "../../utils/Api"; // Import API function
// import Navigation from "../../components/Navigation/Navigation.jsx";
// import "./EventList.css";

// const EventList = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0); // Current starting index of visible items
//   const itemsPerPage = 3; // Number of items to show per page

//   useEffect(() => {
//     const loadEvents = async () => {
//       setLoading(true);
//       try {
//         const data = await fetchEvents();
//         setEvents(data);
//       } catch (err) {
//         console.error("Error fetching events:", err);
//         setError("Failed to load events. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadEvents();
//   }, []);

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) =>
//       Math.min(prevIndex + 1, events.length - 1)
//     );
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
//   };

//   const renderVisibleEvents = () => {
    
//     return events.slice(currentIndex, currentIndex + itemsPerPage).map(({ id, date, heading, location, img, category }) => (
//       <EventCard
//         key={id}
//         id={id}
//         date={date}
//         heading={heading}
//         location={location}
//         img={img}
//         category={category}
        
//       />
//     ));
//   };

//   return (
//     <div className="events">
//       <Navigation />
      
//         <div className="event-list-container">
//       <h1 className="event-list-title">Events</h1> 
//       <div className="event-list-wrapper">
        
//         {loading ? (
//           <div className="loading-container">
//             <div className="spinner"></div>
//           </div>
//         ) : error ? (
//           <p className="error">{error}</p>

//         ) : events.length > 0 ? (
        
//           <div className="slider-wrapper">
//             <button className="nav-button left" onClick={handlePrev} disabled={currentIndex === 0}>
//               &#8249;
//             </button>
            
//             <div className="event-grid">{renderVisibleEvents()}</div>
            
//             <button
//               className="nav-button right"
//               onClick={handleNext}
//               disabled={currentIndex + itemsPerPage >= events.length}
//             >
//               &#8250;
//             </button>
//           </div>

          
//         ) : (
//           <p>No events available</p>
//         )}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default EventList;

// import React, { useState, useEffect } from "react";
// import EventCard from "../../components/EventCard/EventCard.jsx";
// import { fetchEvents } from "../../utils/Api";
// import Navigation from "../../components/Navigation/Navigation.jsx";
// import "./EventList.css";

// const categories = ["Game", "Music", "Technology", "Sports", "Culture"];

// const EventList = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadEvents = async () => {
//       setLoading(true);
//       try {
//         const data = await fetchEvents();
//         setEvents(data);
//       } catch (err) {
//         console.error("Error fetching events:", err);
//         setError("Failed to load events. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadEvents();
//   }, []);

//   const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
//   const [currentEventIndex, setCurrentEventIndex] = useState(0);

//   const renderCategoryRows = () => {
//     return categories.map((category, categoryIndex) => {
//       const filteredEvents = events.filter(
//         (event) => event.category === category
//       );

//       if (filteredEvents.length === 0) return null;

//       const currentEvent = filteredEvents[currentEventIndex];

//       return (
//         <div key={categoryIndex} className="category-row">
//           <h3>{category}</h3>
//           <div className="event-list">
//             {currentEvent && <EventCard event={currentEvent} />}
//           </div>
//           {/* Кнопки для навигации по событиям внутри категории */}
//           <div className="slider-controls">
//             <button
//               onClick={() =>
//                 setCurrentEventIndex(
//                   (prevIndex) => (prevIndex - 1 + filteredEvents.length) % filteredEvents.length
//                 )
//               }
//             >
//               Previous Event
//             </button>
//             <button
//               onClick={() =>
//                 setCurrentEventIndex(
//                   (prevIndex) => (prevIndex + 1) % filteredEvents.length
//                 )
//               }
//             >
//               Next Event
//             </button>
//           </div>
//         </div>
//       );
//     });
//   };

//   return (
//     <div className="event-list-container">
//       <Navigation />
//       <h1>Upcoming Events</h1>
//       {loading && <p>Loading events...</p>}
//       {error && <p className="error-message">{error}</p>}
//       <div className="category-container">
//         {renderCategoryRows()}
//       </div>
//     </div>
//   );
// };

// export default EventList;
