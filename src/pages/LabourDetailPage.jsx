import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router';

const LabourDetailPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Get laborer details from navigation state
  const laborer = state?.laborer || {};
  console.log("laborer",laborer)
  const { username = 'Unknown', worktype = 'Unknown', location = 'Unknown', image = 'https://via.placeholder.com/80' } = laborer;

  // Handle navigation to booking page
  const handleBookNow = () => {
    navigate('/booking', { state: { laborer } });
  };

  // Redirect if laborer details are missing
  if (!laborer || !laborer._id) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Laborer Details</h1>

      {/* Laborer Details */}
      <div className="flex items-center mb-6 p-4 bg-gray-100 rounded-lg">
        <img src={image} alt={username} className="w-24 h-24 rounded-full mr-4" />
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{username}</h2>
          <p className="text-gray-600">Type: {worktype}</p>
          <p className="text-gray-600">Location: {location}</p>
          {/* Placeholder for future features */}
          <p className="text-gray-600">Rating: Coming soon...</p>
          <p className="text-gray-600">Reviews: Coming soon...</p>
        </div>
      </div>

      {/* Book Now Button */}
      <button
        onClick={handleBookNow}
        className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 font-semibold"
      >
        Book Now
      </button>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="w-full p-3 mt-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 font-semibold"
      >
        Back
      </button>
    </div>
  );
};

export default LabourDetailPage;