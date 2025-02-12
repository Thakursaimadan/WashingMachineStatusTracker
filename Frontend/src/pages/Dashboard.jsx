"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"

const Dashboard = () => {
  const [machines, setMachines] = useState([])
  const [studentInfo, setStudentInfo] = useState({ roll: "", name: "" })
  const [currentMachineId, setCurrentMachineId] = useState(null)

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/machines")
        setMachines(response.data)
      } catch (error) {
        console.error("Failed to fetch machines:", error)
      }
    }
    fetchMachines()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setStudentInfo({ ...studentInfo, [name]: value })
  }

  const toggleStatus = async (id, status) => {
    if (status === "Available") {
      setCurrentMachineId(id)
    } else {
      await updateMachineStatus(id, "Available")
      setCurrentMachineId(null)
    }
  }

  const updateMachineStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/machines/toggle/${id}`, {
        status: newStatus,
        roll: studentInfo.roll,
        name: studentInfo.name,
      })
      setMachines(machines.map((m) => (m._id === id ? { ...m, status: newStatus } : m)))
      setStudentInfo({ roll: "", name: "" })
      setCurrentMachineId(null)
    } catch (error) {
      console.error("Failed to toggle status:", error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentMachineId) {
      updateMachineStatus(currentMachineId, "In Use")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Admin Dashboard</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {machines.map((machine) => (
              <li key={machine._id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-blue-600 truncate">{machine.name}</p>
                    <p className={`text-sm ${machine.status === "Available" ? "text-green-500" : "text-red-500"}`}>
                      {machine.status}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => toggleStatus(machine._id, machine.status)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Toggle Status
                    </button>
                    <Link href={`/logs/${machine._id}`} className="text-blue-600 hover:text-blue-800">
                      View Logs
                    </Link>
                    <Link href={`/feedbacks/${machine._id}`} className="text-blue-600 hover:text-blue-800">
                      View Feedback
                    </Link>
                  </div>
                </div>
                {currentMachineId === machine._id && (
                  <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <input
                      type="text"
                      name="roll"
                      placeholder="Roll Number"
                      value={studentInfo.roll}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      name="name"
                      placeholder="Student Name"
                      value={studentInfo.name}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Submit
                    </button>
                  </form>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

