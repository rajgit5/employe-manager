import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";

function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(`http://localhost:5000/api/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (!employee) {
    return <div className="text-center mt-8">Employee not found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Employee Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          {employee.profilePicture ? (
            <img
              src={employee.profilePicture}
              alt={employee.name}
              className="w-32 h-32 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="w-32 h-32 text-gray-400" />
          )}
          <h2 className="mt-4 text-xl font-semibold">{employee.name}</h2>
          <p className="text-gray-600">{employee.position}</p>
          <p className="text-gray-600">{employee.contact}</p>
          <p className="text-sm text-gray-500">
            Created: {new Date(employee.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;