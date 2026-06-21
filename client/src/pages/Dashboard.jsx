import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PencilIcon, PlusIcon, TrashIcon, UploadCloudIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import api from "../configs/api";
import { setUser, logout } from "../app/features/authSlice";

const Dashboard = () => {
  const { token, user } = useSelector((state) => state.auth); // ✅ FIX: single selector
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showCreateResume, setShowCreateResume] = useState(false);
  const [title, setTitle] = useState("");

  const [showUploadResume, setShowUploadResume] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadFile, setUploadFile] = useState(null);

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
        const { data } = await api.get("/api/users/data");
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
      const { data } = await api.get("/api/resumes/user");
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
     const { data } = await api.post("/api/resumes/create", {
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
const uploadResume = async (e) => {
  e.preventDefault();

  if (!uploadTitle.trim()) return toast.error("Please enter a title");
  if (!uploadFile) return toast.error("Please select a file");

  try {
    await api.post("/api/resumes/create", {
  resumeData: {
    title: uploadTitle.trim()
  }
});
console.log("uploaded resume:", data.resume);
    // success message
    toast.success("Uploaded successfully");

    // reset modal
    setUploadTitle("");
    setUploadFile(null);
    setShowUploadResume(false);

    // refresh dashboard resumes list
    await fetchResumes();

    // OPTIONAL: remove auto navigation
    // navigate(`/app/builder/${data.resume._id}`);
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
  }
};
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
   await api.put("/api/resumes/update", {
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
      const { data } = await api.delete(`/api/resumes/delete/${deleteId}`);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* HEADER */}
        <div className="mb-8 flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold">
            AI
          </div>
          <h1 className="text-3xl font-bold text-slate-800">ResumeBuilder Dashboard</h1>
        </div>
        {user && <p className="text-slate-600 mb-2">Welcome, {user.name}</p>}
        <p className="text-slate-500 mt-1">Create, upload, and manage your resumes</p>

        {/* ACTION CARDS */}
        <div className="flex gap-6 flex-wrap mt-6">
          <ActionCard icon={<PlusIcon />} label="Create Resume" onClick={() => setShowCreateResume(true)} />
          <ActionCard icon={<UploadCloudIcon />} label="Upload Resume" onClick={() => setShowUploadResume(true)} />
        </div>

        {/* LOADING STATE */}
        {isLoading && <p className="mt-6 text-slate-500">Loading resumes...</p>}

        {/* RESUME GRID */}
        {!isLoading && resumes.length > 0 && (
          <>
            <h2 className="mt-12 mb-4 text-lg font-semibold text-slate-700">My Resumes</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {resumes.map((resume, index) => {
                const gradient = accentColors[index % accentColors.length];
                return (
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
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-20 blur-xl group-hover:opacity-40 transition-all duration-500`}
                    />
                    <div className="relative bg-white rounded-2xl p-4 h-44 flex flex-col justify-between shadow-sm group-hover:shadow-xl transition-all duration-300">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                        AI
                      </div>
     <div className="flex flex-col items-center justify-center flex-1">
  <p className="font-medium text-slate-800 text-center text-lg">
    {resume.title}
  </p>

  <p className="text-xs text-slate-400 mt-2 text-center">
    Updated {new Date(resume.updatedAt).toLocaleDateString()}
  </p>
</div>    
                      <div className="absolute top-2 right-2 hidden group-hover:flex gap-1">
                        <PencilIcon
                          className="size-8 p-1.5 rounded-lg hover:bg-slate-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(resume);
                          }}
                        />
                        <TrashIcon
                          className="size-8 p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDelete(resume._id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* ---------------- MODALS ---------------- */}
      {showCreateResume && (
        <Modal title="Create New Resume" onClose={() => setShowCreateResume(false)}>
          <form onSubmit={createResume}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Resume title"
              required
              className="w-full h-11 border rounded-lg px-4 focus:ring-2 focus:ring-purple-400"
            />
            <ModalActions onCancel={() => setShowCreateResume(false)} />
          </form>
        </Modal>
      )}

      {showUploadResume && (
        <Modal title="Upload Resume" onClose={() => setShowUploadResume(false)}>
          <form onSubmit={uploadResume}>
            <input
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              placeholder="Resume name"
              required
              className="w-full h-11 border rounded-lg px-4 mb-4 focus:ring-2 focus:ring-purple-400"
            />
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl p-6 cursor-pointer hover:border-purple-500 transition">
              <UploadCloudIcon className="size-10 text-purple-500 mb-2" />
              <p className="text-sm text-slate-600">{uploadFile ? uploadFile.name : "Click to upload PDF"}</p>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setUploadFile(e.target.files[0])}
                className="hidden"
                required
              />
            </label>
            <ModalActions onCancel={() => setShowUploadResume(false)} />
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
        className="w-full h-11 border rounded-lg px-4 focus:ring-2 focus:ring-purple-400"
      />

      <ModalActions onCancel={() => setShowEditResume(false)} />
    </form>
  </Modal>
)}
      {showDeleteConfirm && (
        <Modal title="Delete Resume?" onClose={() => setShowDeleteConfirm(false)}>
          <p className="text-slate-600 mb-6">This action cannot be undone.</p>
          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 border rounded-lg"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </button>
            <button
              className="px-5 py-2 bg-red-500 text-white rounded-lg"
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
    className="w-44 h-44 bg-white rounded-2xl border border-dashed border-indigo-300 flex flex-col items-center justify-center gap-3 hover:shadow-xl hover:-translate-y-1 transition-transform duration-300"
  >
    <div className="p-3 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white">{icon}</div>
    <p className="text-sm font-medium text-slate-700">{label}</p>
  </button>
);

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl relative">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  </div>
);

const ModalActions = ({ onCancel }) => (
  <div className="flex justify-end gap-3 mt-6">
    <button onClick={onCancel} type="button" className="px-4 py-2 border rounded-lg">
      Cancel
    </button>
    <button type="submit" className="px-5 py-2 bg-purple-500 text-white rounded-lg">
      Save
    </button>
  </div>
);

export default Dashboard;
