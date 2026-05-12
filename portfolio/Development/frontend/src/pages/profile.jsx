import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

function Profile() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

  const token = localStorage.getItem("token");

  const authHeaders = {
    Authorization: `Bearer ${token}`,
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setFetching(false);
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/api/profile`, {
          headers: authHeaders,
        });

        setUser(res.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
        alert(err.response?.data?.error || "Failed to fetch profile");
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, [token, API_BASE_URL]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select only image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be less than 2 MB");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!token) {
      alert("Please login first");
      return;
    }

    if (!image) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_BASE_URL}/api/profile/upload`,
        formData,
        {
          headers: {
            ...authHeaders,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Profile image updated!");

      setUser(res.data.user);
      setImage(null);
      setPreview("");
    } catch (err) {
      console.error("Upload error:", err);
      alert(err.response?.data?.error || "Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  const profileImageUrl = getImageUrl(user?.profile_image);

  return (
    <>
      <Navbar />

      <section className="min-h-[calc(100vh-80px)] bg-slate-950 text-white px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Profile Settings
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
              Upload{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Profile Photo
              </span>
            </h1>

            <p className="text-slate-400 mt-4">
              Your photo will be stored in users table and fetched from backend.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-2xl shadow-cyan-500/10">
            {fetching ? (
              <p className="text-center text-slate-300">Loading profile...</p>
            ) : !token ? (
              <div className="text-center">
                <p className="text-slate-300 mb-4">
                  Please login to view your profile.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6">
                <div className="h-40 w-40 rounded-full border-4 border-cyan-400 overflow-hidden bg-slate-800 flex items-center justify-center">
                  {preview || profileImageUrl ? (
                    <img
                      src={preview || profileImageUrl}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-slate-400 text-sm">No Photo</span>
                  )}
                </div>

                <div className="text-center">
                  <h2 className="text-2xl font-bold">
                    {user?.username || "User"}
                  </h2>

                  <p className="text-cyan-400 text-sm mt-1">
                    {user?.email || "No email"}
                  </p>
                </div>

                <label className="w-full max-w-md cursor-pointer rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950 p-6 text-center hover:border-cyan-400 transition">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  <p className="font-semibold text-slate-200">
                    Click to choose image
                  </p>

                  <p className="text-sm text-slate-400 mt-2">
                    PNG, JPG, JPEG supported. Max size 2 MB.
                  </p>
                </label>

                {image && (
                  <p className="text-sm text-cyan-400 break-all">
                    Selected: {image.name}
                  </p>
                )}

                <button
                  onClick={uploadImage}
                  disabled={loading}
                  className="w-full max-w-md rounded-xl bg-cyan-500 px-6 py-3 text-slate-950 font-bold hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-cyan-500/20"
                >
                  {loading ? "Uploading..." : "Upload Photo"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;