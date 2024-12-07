import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext/UserContext"; // Контекст пользователя
import Navigation from "../../components/Navigation/Navigation"; // Навигация
import "./ProfilePage.css";
import profile_icon from "../../assets/business-global-economy_24877-41082.png"; // Иконка профиля
import axios from "axios";

const ProfilePage = () => {
  const { userName, userProfileImage } = useUser(); // Данные из контекста
  const [payments, setPayments] = useState([]); // История платежей
  const [events, setEvents] = useState([]); // Данные событий
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Состояние ошибки
  const navigate = useNavigate();

  // Загрузка данных платежей и событий
  useEffect(() => {
    const fetchPaymentsAndEvents = async () => {
      try {
        setLoading(true);

        // Параллельное получение данных с сервера
        const [paymentsResponse, eventsResponse] = await Promise.all([
          axios.get("https://674d5c7e635bad45618aebb5.mockapi.io/payment"),
          axios.get("https://6746985538c8741641d37ede.mockapi.io/createvents"),
        ]);

        setPayments(paymentsResponse.data); // Сохраняем данные платежей
        setEvents(eventsResponse.data); // Сохраняем данные событий
      } catch (err) {
        setError("Failed to load data"); // Обработка ошибки
      } finally {
        setLoading(false); // Устанавливаем конец загрузки
      }
    };

    fetchPaymentsAndEvents(); // Вызов функции
  }, []);

  // Получение названия события по ID
  const getEventNameById = (eventId) => {
    const event = events.find((e) => e.id === eventId);
    return event ? event.heading : "N/A";
  };

  // Получение цены события по ID
  const getEventPriceById = (eventId) => {
    const event = events.find((e) => e.id === eventId);
    return event ? `${event.price}$` : "N/A";
  };

  // Обработка перехода на детали события
  const handleViewDetails = (paymentId, eventId) => {
    navigate(`/event/${eventId}`, { state: { paymentId } }); // Передаем данные через `state`
  };

  return (
    <div className="profile__nav">
      <Navigation />
      <div className="profile-page">
        {/* Блок профиля */}
        <div className="profile-info">
          <div className="profile-avatar">
            <img
              src={userProfileImage || profile_icon} // Используем иконку, если изображение отсутствует
              alt="Profile Avatar"
              className="profile-img"
            />
          </div>
          <div className="profile-details">
            <h2>Name: {userName || "Guest"}</h2>
          </div>
        </div>

        {/* Секция истории платежей */}
        <div className="payments-section">
          <h2>Payment History</h2>
          {loading ? (
            <p>Loading...</p> // Показать, пока данные загружаются
          ) : error ? (
            <p className="error">{error}</p> // Показать ошибку, если есть
          ) : (
            <table className="payments-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Event Name</th>
                  <th>Amount</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment.id}>
                    <td>{index + 1}</td>
                    <td>{payment.name || "N/A"}</td>
                    <td>{payment.mobileNumber || "N/A"}</td>
                    <td>{getEventNameById(payment.eventId)}</td>
                    <td>{getEventPriceById(payment.eventId)}</td>
                    <td>
                      <button
                        className="details-button"
                        // onClick={() => handleViewDetails(payment.eventId)}
                      >
                        <Link to="/">View Details</Link>
                        
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
