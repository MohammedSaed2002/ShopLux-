import { createContext, useState, useContext } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value={{ token, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}