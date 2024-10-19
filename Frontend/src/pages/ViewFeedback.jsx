import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams

const FeedbackList = () => {
  const { machineId } = useParams(); // Extract machineId from URL parameters

  console.log("the id is",machineId)
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        console.log("in useeffect")
        const response = await axios.get(`http://localhost:5000/api/machines/feedback/${machineId}`);
        console.log("The response is:", response);
        setFeedbacks(response.data.feedbacks);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, [machineId]);

  return (
    <div>
      <h2>Feedback for Machine {machineId}</h2>
      <ul>
        {feedbacks.map((fb, index) => (
          <li key={index}>
            <p><strong>Feedback:</strong> {fb.feedback}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;
