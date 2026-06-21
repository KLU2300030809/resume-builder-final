// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User2Icon, Mail, Lock } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import api from "../configs/api";
import toast from "react-hot-toast";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Redirect to /app when user is logged in
  useEffect(() => {
    if (user) navigate("/app");
  }, [user, navigate]);

  const [state, setState] = useState("login"); // login / register / forgot
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [dialog, setDialog] = useState({ type: "", message: "" });

  // Validate form
  const validate = () => {
    const newErrors = {};

    if (state === "register") {
      if (!formData.name.trim()) newErrors.name = "Username is required";
      else if (formData.name.length < 3)
        newErrors.name = "Username must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format";

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
    if (state !== "forgot") {
      if (!formData.password) newErrors.password = "Password is required";
      else if (!passwordRegex.test(formData.password))
        newErrors.password =
          "Password must be ≥6 chars, include a number & special char";
    }

    return newErrors;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle login/register submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      let data;
      if (state === "login") {
        ({ data } = await api.post("/api/users/login", {
          email: formData.email.trim(),
          password: formData.password,
        }));
      } else if (state === "register") {
        ({ data } = await api.post("/api/users/register", {
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }));
      }

      // Save token & update Redux
      localStorage.setItem("token", data.token);
      dispatch(login({ token: data.token, user: data.user })); // ✅ CORRECTED

      toast.success(
        state === "login" ? "Logged in successfully!" : "Account created!"
      );

      // ✅ No need to call navigate; useEffect will redirect
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    if (!formData.email.trim()) {
      setDialog({ type: "error", message: "Please enter your email." });
      return;
    }
    setDialog({ type: "success", message: "Password reset link sent to your email." });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="sm:w-[400px] w-full text-center bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden"
      >
        <h1 className="text-3xl font-bold mb-2">
          {state === "login"
            ? "Welcome Back"
            : state === "register"
            ? "Create Account"
            : "Forgot Password"}
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          {state === "login"
            ? "Login to continue to your dashboard"
            : state === "register"
            ? "Sign up to start building resumes with AI"
            : "Enter your email to reset password"}
        </p>

        {state === "register" && (
          <div className="mb-2 text-left">
            <div className="flex items-center bg-gray-50 border rounded-full h-12 px-4 gap-2">
              <User2Icon size={18} className="text-gray-500" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="border-none outline-none w-full bg-transparent"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
        )}

        <div className="mb-2 text-left">
          <div className="flex items-center bg-gray-50 border rounded-full h-12 px-4 gap-2">
            <Mail size={18} className="text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="border-none outline-none w-full bg-transparent"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {state !== "forgot" && (
          <div className="mb-2 text-left">
            <div className="flex items-center bg-gray-50 border rounded-full h-12 px-4 gap-2">
              <Lock size={18} className="text-gray-500" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="border-none outline-none w-full bg-transparent"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
        )}

        {state === "forgot" ? (
          <button
            type="button"
            onClick={handleForgotPassword}
            className="w-full h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition mb-4"
          >
            Reset Password
          </button>
        ) : (
          <button
            type="submit"
            className="w-full h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition mb-4"
          >
            {state === "login" ? "Login" : "Sign Up"}
          </button>
        )}

        <p className="text-gray-500 text-sm cursor-pointer">
          {state === "login"
            ? "Don't have an account? "
            : state === "register"
            ? "Already have an account? "
            : ""}
          {state !== "forgot" && (
            <span
              onClick={() => setState(state === "login" ? "register" : "login")}
              className="text-purple-600 font-medium hover:underline"
            >
              {state === "login" ? "Sign Up" : "Login"}
            </span>
          )}
        </p>

        {state !== "register" && state !== "forgot" && (
          <p
            onClick={() => setState("forgot")}
            className="text-sm text-purple-600 cursor-pointer text-right mt-2"
          >
            Forgot Password?
          </p>
        )}

        {dialog.message && (
          <div
            className={`mt-4 px-4 py-2 rounded-md text-white font-medium ${
              dialog.type === "success"
                ? "bg-green-500"
                : dialog.type === "error"
                ? "bg-red-500"
                : "bg-blue-500"
            }`}
          >
            {dialog.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
