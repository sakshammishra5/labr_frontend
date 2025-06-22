import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router';
import { fetchUserBookings, cancelBooking } from '@/store/Slices/labour.slice';

const UserBookingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { User } = useSelector((state) => state.app);
  const { bookings, bookingsLoading, bookingsError } = useSelector((state) => state.labour.LabourConfig);

  // Fetch bookings when the component mounts
  useEffect(() => {
    if (User?._id) {
      dispatch(fetchUserBookings());
    }
  }, [User, dispatch]);

  // Handle canceling a booking
  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      dispatch(cancelBooking(bookingId));
    }
  };

  // Redirect if user is not logged in
  // if (!User?._id) {
  //   return <Navigate to="/" replace />;
  // }

  // Format date and time for display
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Bookings</h1>

      {bookingsLoading ? (
        <div className="text-center">Loading...</div>
      ) : bookingsError ? (
        <div className="text-center text-red-500">Error: {bookingsError}</div>
      ) : bookings.length === 0 ? (
        <p className="text-gray-600">You have no bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="p-4 bg-gray-100 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {booking.username} ({booking.worktype})
                  </h2>
                  <p className="text-gray-600">Date: {formatDate(booking.date)}</p>
                  <p className="text-gray-600">Time: {formatTime(booking.time)}</p>
                  <p className="text-gray-600">Job Description: {booking.jobDescription}</p>
                  <p className="text-gray-600">Status: <span className={`capitalize ${booking.status === 'pending' ? 'text-yellow-500' : booking.status === 'confirmed' ? 'text-green-500' : booking.status === 'completed' ? 'text-blue-500' : 'text-red-500'}`}>{booking.status}</span></p>
                </div>
                {booking.status === 'pending' && (
                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookingsPage;