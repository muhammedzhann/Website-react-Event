import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { UserProvider } from "./components/UserContext/UserContext"; // Исправленный путь

ReactDOM.render(
    <UserProvider>
        <App />
    </UserProvider>,
    document.getElementById("root")
);