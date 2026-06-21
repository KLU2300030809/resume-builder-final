import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) setUser(savedUser);
  }, []);

  const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];

  const register = ({ name, email, password }) => {
    const users = getUsers();

    const exists = users.find(u => u.email === email);
    if (exists) {
      return { success: false, message: "User already exists" };
    }

    const newUser = { id: Date.now(), name, email, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    return { success: true };
  };

  const login = ({ email, password }) => {
    const users = getUsers();
    const found = users.find(u => u.email === email && u.password === password);

    if (!found) {
      return { success: false, message: "Invalid email or password" };
    }

    localStorage.setItem("currentUser", JSON.stringify(found));
    setUser(found);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  const forgotPassword = (email) => {
    const users = getUsers();
    const exists = users.find(u => u.email === email);
    if (!exists) {
      return { success: false, message: "Email not registered" };
    }
    return { success: true, message: "Password reset link sent (mock)" };
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
