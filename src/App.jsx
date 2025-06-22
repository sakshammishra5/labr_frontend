import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import NavLayout from './components/NavLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/auth/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import SignupPage from './pages/auth/SignupPage'
import { Toaster } from './components/ui/sonner'
import ServicesPage from './pages/ServicesPage'
import LabourDetailPage from './pages/LabourDetailPage'
import LabourBookingPage from './pages/LabourBookingPage'
import UsersBooking from './pages/UsersBookingPage'
import UserBookingsPage from './pages/UsersBookingPage'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          // <ProtectedRoute>
          <NavLayout />
          // </ProtectedRoute>
        }>
          <Route index element={<HomePage />} />
          <Route path="/services" element={<ServicesPage  />} />
          <Route path='/contact' element={<ContactPage  />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path="/labourdetail/:id" element={<LabourDetailPage />} />
          <Route path='/booking' element={<LabourBookingPage />} />
          <Route path='/usersbooking' element={<UserBookingsPage />} />
        </Route>
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<div>404</div>} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
