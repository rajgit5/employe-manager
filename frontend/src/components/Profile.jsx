import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaSave, FaTimes, FaUpload, FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const [employee, setEmployee] = useState({
    name: "",
    position: "",
    contact: "",
    profilePicture: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    console.log(localStorage.getItem("token"))
    try {
      const response = await axios.get("http://localhost:5000/emp/employees/get", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data.length > 0) {
        setEmployee(response.data[0]); // Display the first employee if exists
        setPreviewImage(response.data[0].profilePicture);
        setCreateMode(false); // Disable create mode if profile exists
      } else {
        setCreateMode(true); // Enable create mode if no profile exists
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
      toast.error("Failed to fetch profile data");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("position", employee.position);
    formData.append("contact", employee.contact);
    if (file) formData.append("profilePicture", file);
  
    try {
      let response;
      if (createMode) {
        response = await axios.post("http://localhost:5000/emp/employees/", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await axios.put(
          `http://localhost:5000/emp/employees/${employee._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      setEmployee(response.data);
      setEditMode(false);
      setCreateMode(false);
      toast.success("Profile saved successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen pt-20 mx-10 bg-gray-100 py-8">
      <ToastContainer />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-green-600 h-32 relative">
          <div className="absolute -bottom-16 left-6">
            <div className="w-32 h-32 bg-white rounded-full p-1">
              <img
                src={
                  previewImage ||
                  employee.profilePicture}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-6 pt-20 pb-6">
          {/* Edit/Create Button */}
          <div className="flex justify-end">
            {!editMode && !createMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                <FaEdit className="mr-2" /> Edit Profile
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditMode(false);
                  setCreateMode(false);
                }}
                className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
              >
                <FaTimes className="mr-2" /> Cancel
              </button>
            )}
          </div>

          {/* Profile Details */}
          {!editMode && !createMode ? (
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {employee.name || "No Profile Found"}
              </h1>
              <p className="text-gray-600 mt-2">{employee.position}</p>
              <p className="text-gray-600 mt-1">{employee.contact}</p>
              {!employee.name && (
                <button
                  onClick={() => setCreateMode(true)}
                  className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-700 transition duration-300"
                >
                  <FaPlus className="mr-2" /> Create Profile
                </button>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={employee.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={employee.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Contact</label>
                  <input
                    type="text"
                    name="contact"
                    value={employee.contact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Profile Picture</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      name="profilePicture"
                      onChange={handleFileChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                  disabled={loading}
                >
                  <FaSave className="mr-2" />{" "}
                  {createMode ? "Create Profile" : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}