import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { clearTheme } from "./ThemeContext";

const API = "http://localhost:8080/e-api/";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setAuthLoaded(true); // ✅ mark loaded
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${API}register.php`, { name, email, password });
      if (res.data.status === "success") {
        setUser(res.data.user);
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API}login.php`, { email, password });
      if (res.data.status === "success") {
        setUser(res.data.user);
        return { success: true, role: res.data.role };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("theme");
     clearTheme();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, register, login, logout, authLoaded }}>
      {authLoaded ? children : <div>Loading...</div>} 
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
