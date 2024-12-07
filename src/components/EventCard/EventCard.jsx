import { Link } from "react-router-dom";
import React from "react";
import "./EventCard.css";

const EventCard = ({ id, heading, date, location, img, category }) => {
  const [year, month, ] = date.split("-");

  return (
    <Link to={`/events/${id}`} className="event-card-link">
      <div className="card">
        <div className="card-img-wrapper">
          <img src={img} alt="Event" className="card-image" />
        </div>
        <div className="card-content">
          <h3 className="card-title">{heading}</h3>
          <p className="card-category">Category: {category}</p> {/* Displaying category */}
          <p className="card-description">
            Year: {year} | Month: {month}
          </p>
          <p className="card-location">{location}</p>
          <button className="card-button">Details</button>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
