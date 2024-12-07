import { Link } from "react-router-dom";
import { useUser } from "../UserContext/UserContext";
import "./Navigation.css";
import profile_icon from "../../assets/business-global-economy_24877-41082.png";

const Navigation = () => {
  const { userName, userProfileImage } = useUser();

  const getAvatar = (name, imageUrl) => {
    if (imageUrl) {
      return <img src={imageUrl} alt="Profile" className="avatar-img" />;
    }
    return <img src={profile_icon} alt="Default Avatar" className="avatar-img" />;
  };

  return (
    <nav className="navigation">
      <div className="logo">
        <Link to="/">EventWebsite</Link>
      </div>

      <ul className="nav-links">
        
        <li><Link to="/home-page">Home</Link></li>
        <li><Link to="/">Event</Link></li>
        <li><Link to="/find-events">Find Events</Link></li>
        <li><Link to="/creat-event">Create Event</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="profile">
        {userName ? (
          <div className="user-info">
            <Link to="/profile-page" className="avatar">
              {getAvatar(userName, userProfileImage)}
            </Link>
            <span className="user-name">{userName}</span>
            <Link className="login-btn " to="/login-sign">Logout</Link>
          </div>
        ) : (
          <Link className="login-btn " to="/login-sign">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
