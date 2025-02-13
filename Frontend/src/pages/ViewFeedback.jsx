"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const FeedbackList = () => {
  const { machineId } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`https://washingmachinestatustracker-backend.onrender.com/api/machines/feedback/${machineId}`)
        setFeedbacks(response.data.feedbacks);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, [machineId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-blue-600 to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white/20 backdrop-blur-md p-10 rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-white text-center mb-6">Feedback for Machine {machineId}</h2>
        {feedbacks.length > 0 ? (
          <ul className="space-y-4">
            {feedbacks.map((fb, index) => (
              <li key={index} className="bg-white/30 p-5 rounded-xl shadow-md hover:shadow-xl transition">
                <p className="text-sm text-gray-200">Feedback:</p>
                <p className="mt-1 text-lg text-white font-semibold">{fb.feedback}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-white text-center">No feedback available for this machine.</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackList;


