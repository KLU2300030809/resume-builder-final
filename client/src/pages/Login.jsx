// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User2Icon, Mail, Lock } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import api from "../configs/api";
import toast from "react-hot-toast";

const Login = () => {
  console.log("API URL:", import.meta.env.VITE_API_URL);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) navigate("/app");
  }, [user, navigate]);

  const [state, setState] = useState("login");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [dialog, setDialog] = useState({ type: "", message: "" });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      let data;
      if (state === "login") {
        ({ data } = await api.post("/users/login", {
          email: formData.email.trim(),
          password: formData.password,
        }));
      } else if (state === "register") {
        ({ data } = await api.post("/users/register", {
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }));
      }

      localStorage.setItem("token", data.token);
      dispatch(login({ token: data.token, user: data.user }));

      toast.success(
        state === "login" ? "Logged in successfully!" : "Account created!"
      );
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleForgotPassword = () => {
    if (!formData.email.trim()) {
      setDialog({ type: "error", message: "Please enter your email." });
      return;
    }
    setDialog({ type: "success", message: "Password reset link sent to your email." });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0b0b12] relative overflow-hidden text-white">

      {/* background glow (app theme match) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-violet-600/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 blur-[150px] rounded-full" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="sm:w-[400px] w-full text-center
        bg-white/5 border border-white/10 backdrop-blur-xl
        rounded-3xl shadow-2xl p-10 relative overflow-hidden"
      >
        <h1 className="text-3xl font-bold mb-2 text-white">
          {state === "login"
            ? "Welcome Back"
            : state === "register"
            ? "Create Account"
            : "Forgot Password"}
        </h1>

        <p className="text-white/60 text-sm mb-6">
          {state === "login"
            ? "Login to continue to your dashboard"
            : state === "register"
            ? "Sign up to start building resumes with AI"
            : "Enter your email to reset password"}
        </p>

        {/* NAME */}
        {state === "register" && (
          <div className="mb-2 text-left">
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full h-12 px-4 gap-2">
              <User2Icon size={18} className="text-white/60" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="outline-none w-full bg-transparent text-white placeholder-white/40"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>
        )}

        {/* EMAIL */}
        <div className="mb-2 text-left">
          <div className="flex items-center bg-white/5 border border-white/10 rounded-full h-12 px-4 gap-2">
            <Mail size={18} className="text-white/60" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="outline-none w-full bg-transparent text-white placeholder-white/40"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        {state !== "forgot" && (
          <div className="mb-2 text-left">
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full h-12 px-4 gap-2">
              <Lock size={18} className="text-white/60" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="outline-none w-full bg-transparent text-white placeholder-white/40"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>
        )}

        {/* BUTTON */}
        {state === "forgot" ? (
          <button
            type="button"
            onClick={handleForgotPassword}
            className="w-full h-12 rounded-full
            bg-gradient-to-r from-violet-600 to-indigo-600
            text-white font-semibold hover:opacity-90 transition mb-4"
          >
            Reset Password
          </button>
        ) : (
          <button
            type="submit"
            className="w-full h-12 rounded-full
            bg-gradient-to-r from-violet-600 to-indigo-600
            text-white font-semibold hover:opacity-90 transition mb-4"
          >
            {state === "login" ? "Login" : "Sign Up"}
          </button>
        )}

        {/* SWITCH */}
        <p className="text-white/60 text-sm cursor-pointer">
          {state === "login"
            ? "Don't have an account? "
            : state === "register"
            ? "Already have an account? "
            : ""}

          {state !== "forgot" && (
            <span
              onClick={() => setState(state === "login" ? "register" : "login")}
              className="text-violet-400 font-medium hover:underline"
            >
              {state === "login" ? "Sign Up" : "Login"}
            </span>
          )}
        </p>

        {state !== "register" && state !== "forgot" && (
          <p
            onClick={() => setState("forgot")}
            className="text-sm text-violet-400 cursor-pointer text-right mt-2"
          >
            Forgot Password?
          </p>
        )}

        {dialog.message && (
          <div
            className={`mt-4 px-4 py-2 rounded-md text-white font-medium ${
              dialog.type === "success"
                ? "bg-emerald-500/80"
                : dialog.type === "error"
                ? "bg-red-500/80"
                : "bg-blue-500/80"
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