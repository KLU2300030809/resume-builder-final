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
    <div className="bg-[#0b0b12] border-b border-white/10 backdrop-blur-xl">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-white">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
        

          <span className="text-lg font-semibold text-white">
            Resume2Portfolio
          </span>
        </Link>

        {/* Right section */}
        <div className="flex items-center gap-4 text-sm">

          {user && (
            <p className="max-sm:hidden text-white/60">
              Hi, <span className="text-white font-medium">{user.name}</span>
            </p>
          )}

          {user && (
            <button
              onClick={logoutUser}
              className="px-6 py-1.5 rounded-full
              bg-white/5 border border-white/10
              text-white/80 hover:text-white hover:bg-white/10
              active:scale-95 transition-all"
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