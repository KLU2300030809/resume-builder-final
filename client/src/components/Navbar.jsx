import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/features/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="shadow bg-white">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold">
            AI
          </div>
          <span className="text-lg font-semibold text-slate-800">
            ResumeBuilder
          </span>
        </Link>

        {/* Right section */}
        <div className="flex items-center gap-4 text-sm">
          {user && <p className="max-sm:hidden">Hi, {user.name}</p>}
          {user && (
            <button
              onClick={logoutUser}
              className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all"
            >
              Logout
            </button>
          )}
        </div>

      </nav>
    </div>
  );
};

export default Navbar;
