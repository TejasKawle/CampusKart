// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
  const stored = localStorage.getItem("userInfo");
  if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (email) => {
    setUser(email);
    localStorage.setItem("email", email);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
