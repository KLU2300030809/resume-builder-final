import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PencilIcon, PlusIcon, TrashIcon} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import api from "../configs/api";
import { setUser, logout } from "../app/features/authSlice";
import { Sparkles } from "lucide-react";
const Dashboard = () => {
  const { token, user } = useSelector((state) => state.auth); // ✅ FIX: single selector
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showCreateResume, setShowCreateResume] = useState(false);
  const [title, setTitle] = useState("");


  const [showEditResume, setShowEditResume] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editFile, setEditFile] = useState(null);
  const [removeBackground, setRemoveBackground] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const accentColors = [
    "from-indigo-500 to-purple-500",
    "from-emerald-500 to-teal-500",
    "from-amber-500 to-orange-500",
    "from-pink-500 to-rose-500",
  ];

  /* ------------------ REDIRECT IF NO TOKEN ------------------ */
  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  /* ------------------ FETCH LOGGED-IN USER ------------------ */
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const { data } = await api.get("/users/data");
        dispatch(setUser(data.user)); // ✅ FIX: removed setLocalUser
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          dispatch(logout());
          navigate("/login", { replace: true });
        }
      }
    };
    fetchUser();
  }, [token, dispatch, navigate]);

  /* ------------------ FETCH RESUMES ------------------ */
  const fetchResumes = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get("/resumes/user");
setResumes(
  (data.resumes || []).map((r) => ({
    ...r,
    personal_info: {
      ...r.personal_info,
imagePreview:
  r.personal_info.image_original || "/default-profile.png",
    },
  }))
);


    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchResumes();
  }, [token]);

  /* ------------------ CREATE RESUME ------------------ */
  const createResume = async (e) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Please enter a title");

    try {
     const { data } = await api.post("/resumes/create", {
  resumeData: {
    title: title.trim()
  }
});
      toast.success(data.message);
      setTitle("");
      setShowCreateResume(false);
      await fetchResumes();
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  /* ------------------ UPLOAD RESUME ------------------ */

  /* ------------------ EDIT RESUME ------------------ */
  const openEditModal = (resume) => {
    setEditId(resume._id);
    setEditTitle(resume.title);
    setEditFile(null);
    setRemoveBackground(false);
    setShowEditResume(true);
  };
const saveEdit = async (e) => {
  e.preventDefault();

  try {
 const { data } = await api.post("/resumes/update", {
  resumeId: editId,
  resumeData: {
    title: editTitle
  }
});

    setResumes((prev) =>
      prev.map((r) => (r._id === editId ? data.resume : r))
    );

    toast.success(data.message);
    setShowEditResume(false);
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
  }
};
  /* ------------------ DELETE RESUME ------------------ */
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const deleteResume = async () => {
    try {
      const { data } = await api.delete(`/resumes/delete/${deleteId}`);
      setResumes((prev) => prev.filter((r) => r._id !== deleteId));
      toast.success(data.message);
      setShowDeleteConfirm(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  /* ------------------ UI (UNCHANGED) ------------------ */
  
  /* ------------------ RENDER ------------------ */
return (
  <div className="min-h-screen bg-[#0b0b12] text-white">

    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Resume2Portfolio Dashboard
        </h1>

        {user && (
          <p className="text-white/60 mt-2">
            Welcome, {user.name}
          </p>
        )}
      </div>

      {/* ACTION CARDS */}
      <div className="flex gap-6 flex-wrap mt-6">

        <ActionCard
          icon={<PlusIcon />}
          label="Create Resume"
          onClick={() => setShowCreateResume(true)}
        />

        <ActionCard
          icon={<Sparkles className="text-white" />}
          label="Generate Portfolio"
          onClick={() => {
            toast.success("Generate Portfolio clicked");
            navigate("/app/portfolio-generator");
          }}
        />

      </div>

      {/* LOADING */}
      {isLoading && (
        <p className="mt-6 text-white/50">Loading resumes...</p>
      )}

      {/* RESUME GRID */}
      {!isLoading && resumes.length > 0 && (
        <>
          <h2 className="mt-12 mb-4 text-lg font-semibold text-white/80">
            My Resumes
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">

            {resumes.map((resume) => (
              <div
                key={resume._id}
                onClick={() => {
                  if (resume.resumeFile) {
                    window.open(resume.resumeFile, "_blank");
                  } else {
                    navigate(`/app/builder/${resume._id}`);
                  }
                }}
                className="group relative rounded-2xl p-[1px] cursor-pointer hover:scale-105 transition-transform duration-300"
              >

                {/* CARD */}
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-4 h-44 flex flex-col justify-between backdrop-blur-md shadow-lg group-hover:bg-white/10 transition-all duration-300">

                  <div className="flex flex-col items-center justify-center flex-1">
                    <p className="font-medium text-white text-center text-lg">
                      {resume.title}
                    </p>

                    <p className="text-xs text-white/40 mt-2 text-center">
                      Updated {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="absolute top-2 right-2 hidden group-hover:flex gap-1">

                    <PencilIcon
                      className="size-8 p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(resume);
                      }}
                    />

                    <TrashIcon
                      className="size-8 p-1.5 rounded-lg text-red-400 hover:bg-red-500/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmDelete(resume._id);
                      }}
                    />
                  </div>

                </div>
              </div>
            ))}

          </div>
        </>
      )}

    </div>

    {/* MODALS (UNCHANGED) */}
    {showCreateResume && (
      <Modal title="Create New Resume" onClose={() => setShowCreateResume(false)}>
        <form onSubmit={createResume}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Resume title"
            required
            className="w-full h-11 bg-white/5 border border-white/10 rounded-lg px-4 text-white focus:ring-2 focus:ring-violet-500"
          />
          <ModalActions onCancel={() => setShowCreateResume(false)} />
        </form>
      </Modal>
    )}

    {showEditResume && (
      <Modal title="Edit Resume" onClose={() => setShowEditResume(false)}>
        <form onSubmit={saveEdit}>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Resume title"
            required
            className="w-full h-11 bg-white/5 border border-white/10 rounded-lg px-4 text-white focus:ring-2 focus:ring-violet-500"
          />
          <ModalActions onCancel={() => setShowEditResume(false)} />
        </form>
      </Modal>
    )}

    {showDeleteConfirm && (
      <Modal title="Delete Resume?" onClose={() => setShowDeleteConfirm(false)}>
        <p className="text-white/60 mb-6">This action cannot be undone.</p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 border border-white/10 rounded-lg text-white/70 hover:text-white"
            onClick={() => setShowDeleteConfirm(false)}
          >
            Cancel
          </button>

          <button
            className="px-5 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg"
            onClick={deleteResume}
          >
            Delete
          </button>
        </div>
      </Modal>
    )}

  </div>
);
};

/* ------------------ SMALL COMPONENTS ------------------ */
const ActionCard = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-44 h-44 bg-white/5 border border-white/10 backdrop-blur-xl
    rounded-2xl flex flex-col items-center justify-center gap-3
    hover:bg-white/10 hover:-translate-y-1 transition-transform duration-300"
  >
    <div className="p-3 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
      {icon}
    </div>

    <p className="text-sm font-medium text-white/80">{label}</p>
  </button>
);

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-[#0f0f1a] border border-white/10 w-full max-w-md rounded-2xl p-6 shadow-2xl relative text-white">

      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-white/40 hover:text-white"
      >
        ✕
      </button>

      <h2 className="text-xl font-semibold mb-4 text-white">
        {title}
      </h2>

      {children}
    </div>
  </div>
);

const ModalActions = ({ onCancel }) => (
  <div className="flex justify-end gap-3 mt-6">
    <button
      onClick={onCancel}
      type="button"
      className="px-4 py-2 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition"
    >
      Cancel
    </button>

    <button
      type="submit"
      className="px-5 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition"
    >
      Save
    </button>
  </div>
);

export default Dashboard;
