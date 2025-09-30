import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:8080/e-api/";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔹 Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔹 Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // 🔹 Register Function
  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${API}register.php`, {
        name,
        email,
        password,
      });
      if (res.data.status === "success") {
        setUser(res.data.user);
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // 🔹 Login Function
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

  // 🔹 Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // clear storage
  };

  return (
    <AuthContext.Provider value={{ user, setUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
