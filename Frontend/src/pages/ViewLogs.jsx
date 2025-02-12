"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const MachineLogs = () => {
  const { machineId } = useParams()
  const [logs, setLogs] = useState([])

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/machines/logs/${machineId}`)
        setLogs(response.data.logs)
      } catch (error) {
        console.error("Error fetching logs:", error)
      }
    }

    if (machineId) fetchLogs()
  }, [machineId])

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Logs for Machine {machineId}</h2>
        {logs.length > 0 ? (
          <ul className="bg-white shadow overflow-hidden sm:rounded-md">
            {logs.map((log, index) => (
              <li key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 truncate">{log.name}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Roll: {log.roll}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {new Date(log.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-600">No logs available for this machine.</p>
        )}
      </div>
    </div>
  )
}

export default MachineLogs

