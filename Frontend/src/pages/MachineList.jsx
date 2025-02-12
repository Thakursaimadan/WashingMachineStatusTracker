"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

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
  }, [fetchMachines]) // Added fetchMachines to dependencies

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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Available Washing Machines</h1>
          <Link to="/login">
            <button className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition duration-300">
              Admin Login
            </button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto mt-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {machines.map((machine) => (
            <div
              key={machine._id}
              className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2">Machine ID: {machine.machineId}</h3>
              <p className={`text-lg mb-4 ${machine.status === "In Use" ? "text-red-500" : "text-green-500"}`}>
                Status: {machine.status}
              </p>
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                onClick={() => setSelectedMachineId(machine._id)}
              >
                Give Feedback
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
        </div>
      </main>
    </div>
  )
}

export default MachineList

