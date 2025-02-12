"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const FeedbackList = () => {
  const { machineId } = useParams()
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/machines/feedback/${machineId}`)
        setFeedbacks(response.data.feedbacks)
      } catch (error) {
        console.error("Error fetching feedbacks:", error)
      }
    }

    fetchFeedbacks()
  }, [machineId])

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Feedback for Machine {machineId}</h2>
        {feedbacks.length > 0 ? (
          <ul className="space-y-4">
            {feedbacks.map((fb, index) => (
              <li key={index} className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <p className="text-sm font-medium text-gray-500">Feedback:</p>
                  <p className="mt-1 text-lg text-gray-900">{fb.feedback}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-600">No feedback available for this machine.</p>
        )}
      </div>
    </div>
  )
}

export default FeedbackList

