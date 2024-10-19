import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Feedback = () => {
  const { id } = useParams();
  const [user, setUser] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/feedback/${id}`, { user, comment });
      alert('Feedback submitted!');
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Your Name" value={user} onChange={(e) => setUser(e.target.value)} required />
      <textarea placeholder="Your Feedback" value={comment} onChange={(e) => setComment(e.target.value)} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Feedback;
