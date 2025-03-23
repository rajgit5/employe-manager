import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa"; // React Icons for profile placeholder
import Cookies from "js-cookie";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get("http://localhost:5000/emp/employees", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Employee Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {employees.length ? employees.map((employee) => (
          <Link
            to={`/employee/${employee._id}`}
            key={employee._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center">
              {employee.profilePicture ? (
                <img
                  src={employee.profilePicture}
                  alt={employee.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-24 h-24 text-gray-400" />
              )}
              <h2 className="mt-4 text-xl font-semibold">{employee.name}</h2>
              <p className="text-gray-600">{employee.position}</p>
              <p className="text-sm text-gray-500">
                Created: {new Date(employee.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        )) : <div className="text-center"><h1>No Employee Found</h1></div>}
      </div>
    </div>
  );
}

export default Dashboard;