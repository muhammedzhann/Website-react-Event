import axios from "axios";
import { category } from "./DataRender";

// URLs для пользователей и событий
const USERS_API_URL = "https://6746985538c8741641d37ede.mockapi.io/users";
const EVENTS_API_URL = "https://6746985538c8741641d37ede.mockapi.io/createvents";

/** ========== Работа с пользователями ========== **/

// Получить всех пользователей
export const getUsers = async () => {
    try {
        const response = await axios.get(USERS_API_URL);
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении пользователей:", error);
        throw error;
    }
};

// Создать пользователя
export const createUser = async (userData) => {
    try {
        const response = await axios.post(USERS_API_URL, userData);
        return response.data;
    } catch (error) {
        console.error("Ошибка при создании пользователя:", error);
        throw error;
    }
};

// Обновить данные пользователя
export const updateUser = async (userId, userData) => {
    try {
        const response = await axios.put(`${USERS_API_URL}/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error("Ошибка при обновлении пользователя:", error);
        throw error;
    }
};

// Удалить пользователя
export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${USERS_API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при удалении пользователя:", error);
        throw error;
    }
};

// Логин пользователя
export const loginUser = async ({ email, password }) => {
    try {
        const response = await axios.get(USERS_API_URL, {
            params: {
                email: email, // Фильтруем по email
                password:password,
            },
        });

        const user = response.data.find((user) => user.email === email && user.password === password);

        if (!user) {
            throw new Error("Неверный email или пароль");
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage || "https://via.placeholder.com/150", // fallback profile image
        };
    } catch (error) {
        console.error("Ошибка при входе:", error);
        throw error;
    }
};

/** ========== Работа с событиями ========== **/

// Создать событие
export const createEvent = async (eventData) => {
    try {
        const response = await axios.post(EVENTS_API_URL, {
            heading: eventData.heading,
            date: eventData.date,   // Полная дата (например, "2024-11-30")
            location: eventData.location,
            description: eventData.description,
            img: eventData.img,
            time: eventData.time,   // Время события
            dayOfWeek: eventData.dayOfWeek, // День недели
            price: eventData.price, // Добавлено: Цена события
            category: eventData.category, 
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка при создании события:", error);
        throw error;
    }
};

// Получить события с фильтрацией по месяцу и году
// export const fetchEvents = async (month, year, category) => {
//     try {
//         const response = await axios.get(EVENTS_API_URL, {
//             params: {
//                 month: month,
//                 year: year,  
//                 category: category, 
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Ошибка при получении событий:", error);
//         throw error;
//     }
// };

// API запрос с фильтрацией по категории

export const fetchEvents = async (month, year, category) => {
    try {
        const response = await axios.get(EVENTS_API_URL, {
            params: {
                month: month,
                year: year,
                category: category !== "null" ? category : undefined,  // Убедитесь, что категория передается только если она не "All"
            },
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении событий:", error);
        throw error;
    }
};
