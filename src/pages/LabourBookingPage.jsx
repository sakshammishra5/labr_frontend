import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const LabourBookingPage = () => {
  const baseurl=import.meta.env.VITE_BASE_URL;
  const { state } = useLocation();
  const navigate = useNavigate();

  // Get laborer details from navigation state
  const laborer = state?.laborer || {};
  const { username = 'Unknown', worktype = 'Unknown', location = 'Unknown', image = 'https://via.placeholder.com/80' } = laborer;

  // State for booking form
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    jobDescription: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${baseurl}booking/addbooking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          laborerId: laborer._id,
          username: laborer.username,
          worktype: laborer.worktype,
          date: bookingDetails.date,
          time: bookingDetails.time,
          jobDescription: bookingDetails.jobDescription,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to book laborer');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Redirect if laborer details are missing
  if (!laborer || !laborer._id) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto mt-11">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Book a Laborer</h1>

      {/* Laborer Details */}
      <div className="flex items-center mb-6 p-4 bg-gray-100 rounded-lg">
        <img src={image} alt={username} className="w-16 h-16 rounded-full mr-4" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{username}</h2>
          <p className="text-gray-600">Type: {worktype}</p>
          <p className="text-gray-600">Location: {location}</p>
        </div>
      </div>

      {/* Booking Form */}
      <form onSubmit={handleBookingSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={bookingDetails.date}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={bookingDetails.time}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            value={bookingDetails.jobDescription}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="4"
            placeholder="Describe the job (e.g., painting the living room, fixing a leaky pipe)"
            required
          />
        </div>

        {error && <div className="text-red-500 text-center">{error}</div>}
        {success && (
          <div className="text-green-500 text-center">
            Booking successful! Redirecting to homepage...
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded-md font-semibold text-white ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

export default LabourBookingPage;