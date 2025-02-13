"use client"

import { useState } from "react"
import axiosInstance from "../api/axiosInstance"
import axios from "axios"
const AddMachineForm = () => {
  const [machineId, setMachineId] = useState("")

  const handleAddMachine = async (e) => {
    e.preventDefault()
    try {
      await axios.post("https://washingmachinestatustracker-backend.onrender.com/api/machines", { machineId, status: "Available" })
      alert("Machine added successfully!")
      setMachineId("") // Clear the input after successful addition
    } catch (err) {
      console.error("Error adding machine", err)
      alert("Failed to add machine. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Add New Machine</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleAddMachine} className="space-y-6">
            <div>
              <label htmlFor="machineId" className="block text-sm font-medium text-gray-700">
                Machine ID
              </label>
              <div className="mt-1">
                <input
                  id="machineId"
                  name="machineId"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={machineId}
                  onChange={(e) => setMachineId(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Machine
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddMachineForm

