    import React from "react";
    import "./HomePage.css"; 
    import { Link } from "react-router-dom";
    import Navigation from "../../components/Navigation/Navigation";

    function App() {
    return (
        <div className="container__box">
                <Navigation/>
                <div className="main-container">
        <video className="background-video" autoPlay muted loop>
            <source src="src/assets/bg-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>

        {/* Overlay content */}
        <div className="content">
            <div className="text-container">
            <h1 className="title">Biggest Tech Event</h1>
            <p className="subtitle">Growing The Global Technology Industry</p>
            </div>
            <div className="details-container">
            <p className="event-date">December 27, 2023</p>
            <p className="event-location">BIC, Dhaka, Bangladesh and Online</p>
                <button className="cta-button">
                    <Link to="/">See Events</Link>
                </button>
            </div>
        </div>
        </div>
            
        </div>
    );
    }

    export default App;
