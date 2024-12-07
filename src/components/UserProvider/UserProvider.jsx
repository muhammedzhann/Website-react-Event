// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import { UserProvider } from "./context/UserContext"; // Путь к вашему контексту
import Login from "./pages/Login/Login"; // Страница логина
import EventList from "./pages/EventList/EventList"; // Страница с событиями
import EventDetails from "./pages/EventDetails/EventDetails"; // Страница подробностей события

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/login-sign" element={<Login />} />
          <Route path="/events/:id" element={<EventDetails />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
