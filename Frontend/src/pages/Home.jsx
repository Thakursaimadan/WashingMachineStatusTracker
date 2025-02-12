"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const Home = () => {
  const [machines, setMachines] = useState([])

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

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Available Washing Machines</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {machines.map((machine) => (
            <div key={machine._id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{machine.name}</h3>
                <p className={`mt-1 text-sm ${machine.status === "Available" ? "text-green-600" : "text-red-600"}`}>
                  {machine.status}
                </p>
                <div className="mt-4">
                  <Link
                    to={`/feedback/${machine._id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Give Feedback
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home

