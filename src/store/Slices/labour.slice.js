import { createSlice } from '@reduxjs/toolkit';
const baseUrl = import.meta.env.VITE_BASE_URL;

const initialState = {
  LabourConfig: {
    Labour: [],
    labourType: "",
    labour: [],
    loading: false,
    error: null,
    bookings: [], // Add bookings state
    bookingsLoading: false, // Separate loading state for bookings
    bookingsError: null, // Separate error state for bookings
  }
};

const labourSlice = createSlice({
  name: 'labour',
  initialState,
  reducers: {
    setLabourType: (state, action) => {
      state.LabourConfig.labourType = action.payload;
    },
    setLabour: (state, action) => {
      state.LabourConfig.labour = action.payload;
    },
    clearLabour: (state) => {
      state.LabourConfig.labour = [];
      state.LabourConfig.error = null;
    },
    setLoading: (state, action) => {
      state.LabourConfig.loading = action.payload;
    },
    setError: (state, action) => {
      state.LabourConfig.error = action.payload;
    },
    setBookings: (state, action) => {
      state.LabourConfig.bookings = action.payload;
    },
    clearBookings: (state) => {
      state.LabourConfig.bookings = [];
      state.LabourConfig.bookingsError = null;
    },
    setBookingsLoading: (state, action) => {
      state.LabourConfig.bookingsLoading = action.payload;
    },
    setBookingsError: (state, action) => {
      state.LabourConfig.bookingsError = action.payload;
    },
  },
});

// Thunk to fetch laborers (already implemented)
export const fetchLaborers = (worktype, isAvailable, pincode) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearLabour());
  try {
    const query = new URLSearchParams({ worktype, isAvailable, pincode }).toString();
    const response = await fetch(`${baseUrl}labour/getlabour?${query}`);
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch laborers');
    }

    dispatch(setLabour(result.data));
  } catch (err) {
    dispatch(setError(err.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk to fetch user bookings
export const fetchUserBookings = () => async (dispatch) => {
  dispatch(setBookingsLoading(true));
  dispatch(clearBookings());
  try {
    const response = await fetch(`${baseUrl}api/bookings/user`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adjust based on your auth setup
      },
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch bookings');
    }

    dispatch(setBookings(result.data));
  } catch (err) {
    dispatch(setBookingsError(err.message));
  } finally {
    dispatch(setBookingsLoading(false));
  }
};

// Thunk to cancel a booking
export const cancelBooking = (bookingId) => async (dispatch) => {
  try {
    const response = await fetch(`${baseUrl}api/bookings/${bookingId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adjust based on your auth setup
      },
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to cancel booking');
    }

    // Refetch bookings after cancellation
    dispatch(fetchUserBookings());
  } catch (err) {
    dispatch(setBookingsError(err.message));
  }
};

export const { setLabourType, setLabour, clearLabour, setLoading, setError, setBookings, clearBookings, setBookingsLoading, setBookingsError } = labourSlice.actions;
export default labourSlice.reducer;