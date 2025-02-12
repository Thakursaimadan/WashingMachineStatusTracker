"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { LuWashingMachine } from "react-icons/lu"
import { FaCheckCircle, FaTimesCircle, FaCommentDots } from "react-icons/fa"

const MachineList = () => {
  const [machines, setMachines] = useState([])
  const [feedback, setFeedback] = useState("")
  const [selectedMachineId, setSelectedMachineId] = useState(null)

  const fetchMachines = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/machines")
      setMachines(response.data)
    } catch (error) {
      console.error("Error fetching machines:", error)
    }
  }

  useEffect(() => {
    fetchMachines()
    const intervalId = setInterval(fetchMachines, 10000)
    return () => clearInterval(intervalId)
  }, [])

  const handleSubmitFeedback = async (machineId) => {
    try {
      await axios.post(`http://localhost:5000/api/machines/feedback/${machineId}`, { feedback })
      alert("Feedback submitted successfully!")
      setFeedback("")
      setSelectedMachineId(null)
      fetchMachines()
    } catch (error) {
      console.error("Error submitting feedback:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-blue-700 text-white py-12 px-4 sm:px-6 lg:px-8">
      <header className="bg-white text-blue-600 p-6 shadow-lg rounded-lg max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <LuWashingMachine className="text-blue-500 h-12 w-12" />
          <h1 className="text-3xl font-bold">Available Washing Machines</h1>
        </div>
        <Link to="/login">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
            Admin Login
          </button>
        </Link>
      </header>

      <main className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {machines.map((machine) => (
          <div
            key={machine._id}
            className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-md p-6 transition duration-300 hover:shadow-lg text-gray-900"
          >
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <LuWashingMachine className="text-blue-500" /> Machine {machine.machineId}
            </h3>
            <p
              className={`text-lg font-semibold flex items-center gap-2 ${machine.status === "In Use" ? "text-red-500" : "text-green-500"}`}
            >
              {machine.status === "In Use" ? <FaTimesCircle /> : <FaCheckCircle />} Status: {machine.status}
            </p>
            <button
              className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center gap-2"
              onClick={() => setSelectedMachineId(machine._id)}
            >
              <FaCommentDots /> Give Feedback
            </button>
            {selectedMachineId === machine._id && (
              <div className="mt-4">
                <textarea
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <button
                  className="w-full mt-2 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
                  onClick={() => handleSubmitFeedback(machine._id)}
                >
                  Submit Feedback
                </button>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  )
}

export default MachineList