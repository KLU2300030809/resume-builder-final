import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const { token, user, loading } = useSelector((state) => state.auth);

  if (loading) return <Loader />;

  if (!token) return <Navigate to="/login" replace />;

  if (!user) return <Loader />;

  return children;
};

export default ProtectedRoute;