import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PortfolioPreview from "./pages/PortfolioPreview";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Loader from "./components/Loader";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import ATSGuide from "./pages/ATSGuide";
import PDFViewer from "./pages/PDFViewer";
import Features from "./components/home/Features";
import PortfolioGenerator from "./pages/PortfolioGenerator";
import Footer from "./components/home/Footer";
import Login from "./pages/Login";
import SharedResume from "./pages/SharedResume";
import api from "./configs/api";
import { login,setLoading } from "./app/features/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import PortfolioPublic from "./pages/PortfolioPublic";
const App = () => {
  const [resumes, setResumes] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const getUserData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(setLoading(false));
      return;
    }

    try {
      const { data } = await api.get("/users/data", {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(
        login({
          token,
          user: data.user,
        })
      );
    } catch (error) {
  console.error("Auth failed:", error);
  localStorage.removeItem("token");
  dispatch(setLoading(false));
}

  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) return <Loader />; // wait until user data fetched

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/ats-guide" element={<ATSGuide />} />
        <Route path="/contact" element={<Footer />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Dashboard resumes={resumes} setResumes={setResumes} />}
          />
          <Route path="builder/:resumeId" element={<ResumeBuilder resumes={resumes} />} />
          <Route path="pdf/:resumeId" element={<PDFViewer resumes={resumes} />} />
        </Route>
<Route
  path="/share/:shareId"
  element={<SharedResume />}
/>
        <Route path="/view/:resumeId" element={<Preview />} />
        <Route path="/portfolio/:slug" element={<PortfolioPublic />} />
<Route path="/portfolio/preview/:resumeId" element={<PortfolioPreview />} />
<Route path="/app/portfolio-generator" element={<PortfolioGenerator />} />
      </Routes>
    </>
  );
};

export default App;
