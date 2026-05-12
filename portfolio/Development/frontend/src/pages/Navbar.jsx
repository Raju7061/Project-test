import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const fileRef = useRef();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.profile_image) {
          setProfileImage(`http://localhost:5000${data.profile_image}`);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleUploadClick = () => {
    fileRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/api/profile/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (data.profile_image) {
        setProfileImage(`http://localhost:5000${data.profile_image}`);
        alert("Profile image uploaded");
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-cyan-400 text-2xl font-bold">My Portfolio</h1>

      <div className="flex items-center gap-6 relative">
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/messages">Messages</Link>

        <button
          onClick={() => setShowMenu(!showMenu)}
          className="bg-gray-700 px-3 py-1 rounded"
        >
          Settings
        </button>

        <img
          src={
            profileImage ||
            "https://via.placeholder.com/40?text=U"
          }
          alt="profile"
          className="w-10 h-10 rounded-full object-cover border border-cyan-400"
        />

        {showMenu && (
          <div className="absolute right-0 top-14 bg-white text-black shadow-lg rounded w-44 z-50">
            <button
              onClick={handleUploadClick}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Upload Profile Photo
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}

        <input
          type="file"
          ref={fileRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </nav>
  );
}

export default Navbar;