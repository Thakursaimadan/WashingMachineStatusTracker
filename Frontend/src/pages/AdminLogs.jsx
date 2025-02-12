"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const AdminLogs = ({ machineId }) => {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(`https://washingmachinestatustracker-backend.onrender.com/api/logs/${machineId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        setLogs(response.data)
      } catch (error) {
        console.error("Failed to fetch logs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [machineId])

  if (loading) return <div className="flex justify-center items-center h-screen">Loading logs...</div>

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Usage Logs</h2>
        {logs.length === 0 ? (
          <p className="text-lg text-gray-600">No logs available</p>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {logs.map((log, index) => (
                <li key={index} className="px-4 py-4 sm:px-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-900">
                      Student Name: <span className="font-normal">{log.studentName}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Roll Number: <span className="font-medium">{log.studentRoll}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Start Time: <span className="font-medium">{new Date(log.startTime).toLocaleString()}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      End Time:{" "}
                      <span className="font-medium">
                        {log.endTime ? new Date(log.endTime).toLocaleString() : "In Progress"}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminLogs

