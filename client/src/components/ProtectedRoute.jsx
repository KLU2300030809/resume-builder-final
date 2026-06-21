import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { token, user, loading } = useSelector((state) => state.auth);

  // Wait until auth check finishes
  if (loading) return <div>Loading...</div>;

  // If no token → not logged in
  if (!token) return <Navigate to="/login" replace />;

  // Token exists but user not loaded yet
  if (!user) return <div>Loading...</div>;

  return children;
};

export default ProtectedRoute;
