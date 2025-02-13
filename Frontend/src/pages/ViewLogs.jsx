"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MachineLogs = () => {
  const { machineId } = useParams();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(`https://washingmachinestatustracker-backend.onrender.com/api/machines/logs/${machineId}`);
        setLogs(response.data.logs);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    if (machineId) fetchLogs();
  }, [machineId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-blue-600 to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white/20 backdrop-blur-md p-10 rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-white text-center mb-6">Logs for Machine {machineId}</h2>
        {logs.length > 0 ? (
          <ul className="space-y-4">
            {logs.map((log, index) => (
              <li key={index} className="bg-white/30 p-5 rounded-xl shadow-md hover:shadow-xl transition">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-white">{log.name}</p>
                  <p className="text-sm text-white bg-green-400 px-3 py-1 rounded-full">Roll: {log.roll}</p>
                </div>
                <p className="text-gray-100 mt-2 text-sm">{new Date(log.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-white text-center">No logs available for this machine.</p>
        )}
      </div>
    </div>
  );
};

export default MachineLogs;