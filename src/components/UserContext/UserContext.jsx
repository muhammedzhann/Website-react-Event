import React, { createContext, useContext, useState } from "react";

// Create UserContext
const UserContext = createContext();

// Custom hook to access user data
export const useUser = () => useContext(UserContext);

// Provider to wrap the app and share user data
export const UserProvider = ({ children }) => {
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);  // Email is stored here
    const [userProfileImage, setUserProfileImage] = useState(null);

    const updateUser = (name, email, profileImage = null) => {
        setUserName(name);
        setUserEmail(email);
        setUserProfileImage(profileImage);
    };

    return (
        <UserContext.Provider value={{ userName, userEmail, userProfileImage, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};



// import React, { createContext, useState, useContext, useEffect } from "react";
// import { loginUser } from "../../utils/Api"; // Import the login API call

// const UserContext = createContext();

// export const useUser = () => {
//   return useContext(UserContext); // Custom hook to access the context data
// };

// export const UserProvider = ({ children }) => {
//   const [userName, setUserName] = useState(null);
//   const [userEmail, setUserEmail] = useState(null);
//   const [userProfileImage, setUserProfileImage] = useState(null);

//   // Function to update the user data after login
//   const updateUser = (userData) => {
//     setUserName(userData.name);
//     setUserEmail(userData.email);
//     setUserProfileImage(userData.profileImage); // Assuming profile image is part of the user data
//   };

//   const logoutUser = () => {
//     setUserName(null);
//     setUserEmail(null);
//     setUserProfileImage(null);
//   };

//   return (
//     <UserContext.Provider value={{ userName, userEmail, userProfileImage, updateUser, logoutUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

