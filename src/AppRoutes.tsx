import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LandingPage from './pages/LandingPage'
import Authentication from './pages/Authentication'
import StudentDashboard from './pages/StudentDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import AdminDashboard from './pages/AdminDashboard'

const AppRoutes = () => {
  const { isAuthenticated, userType } = useSelector((state: any) => state.auth)

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    )
  }

  return (
    <Routes>
      {userType === 'student' && <Route path="/dashboard" element={<StudentDashboard />} />}
      {userType === 'teacher' && <Route path="/dashboard" element={<TeacherDashboard />} />}
      {userType === 'admin' && <Route path="/dashboard" element={<AdminDashboard />} />}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}

export default AppRoutes
