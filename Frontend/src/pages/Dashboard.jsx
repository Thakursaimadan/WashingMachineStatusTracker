"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LuWashingMachine } from "react-icons/lu";
import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";

const Dashboard = () => {
  const [machines, setMachines] = useState([]);
  const [studentInfo, setStudentInfo] = useState({ roll: "", name: "" });
  const [currentMachineId, setCurrentMachineId] = useState(null);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/machines");
        setMachines(response.data);
      } catch (error) {
        console.error("Failed to fetch machines:", error);
      }
    };
    fetchMachines();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo({ ...studentInfo, [name]: value });
  };

  const toggleStatus = async (id, status) => {
    if (status === "Available") {
      setCurrentMachineId(id);
    } else {
      await updateMachineStatus(id, "Available");
      setCurrentMachineId(null);
    }
  };

  const updateMachineStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/machines/toggle/${id}`, {
        status: newStatus,
        roll: studentInfo.roll,
        name: studentInfo.name,
      });
      setMachines(machines.map((m) => (m._id === id ? { ...m, status: newStatus } : m)));
      setStudentInfo({ roll: "", name: "" });
      setCurrentMachineId(null);
    } catch (error) {
      console.error("Failed to toggle status:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentMachineId) {
      updateMachineStatus(currentMachineId, "In Use");
    }
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-cyan-800 via-blue-700 to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white/20 backdrop-blur-md p-10 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-white text-center mb-8 flex items-center justify-center gap-3">
          <LuWashingMachine className="text-yellow-400" /> Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {machines.map((machine) => (
            <div
              key={machine._id}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-gray-200 px-4 py-2 rounded-bl-xl text-sm text-gray-600">
                ID: {machine._id.slice(-6)}
              </div>

              <div className="flex items-center space-x-4">
                <LuWashingMachine className="text-4xl text-blue-500" />
                <h2 className="text-2xl font-semibold text-gray-800">{machine.name}</h2>
              </div>

              <p
                className={`text-lg font-semibold mt-3 flex items-center ${
                  machine.status === "Available" ? "text-green-600" : "text-red-600"
                }`}
              >
                {machine.status === "Available" ? (
                  <BsFillCheckCircleFill className="mr-2 text-green-500" />
                ) : (
                  <BsFillXCircleFill className="mr-2 text-red-500" />
                )}
                {machine.status}
              </p>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => toggleStatus(machine._id, machine.status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    machine.status === "Available"
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  {machine.status === "Available" ? "Mark as In Use" : "Mark as Available"}
                </button>

                <div className="space-x-3">
                  <Link
                    to={`/logs/${machine._id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-all"
                  >
                    📜 View Logs
                  </Link>
                  <Link
                    to={`/feedbacks/${machine._id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-all"
                  >
                    💬 View Feedback
                  </Link>
                </div>
              </div>

              {currentMachineId === machine._id && (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4 bg-gray-100 p-4 rounded-lg">
                  <input
                    type="text"
                    name="roll"
                    placeholder="Roll Number"
                    value={studentInfo.roll}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Student Name"
                    value={studentInfo.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 rounded-lg bg-yellow-600 text-white font-medium hover:bg-yellow-700 transition-all"
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
