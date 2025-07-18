import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LandingPage from './pages/LandingPage'
import Authentication from './pages/Authentication'
import StudentDashboard from './pages/StudentDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import AdminDashboard from './pages/AdminDashboard'

const AppRoutes = () => {
  const { isAuthenticated, user } = useSelector((state: any) => state.auth)
  if(user && isAuthenticated){
      console.log("this is user and isAuthenticated:", user, isAuthenticated, user.role)
  }
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
      {user.role === 'student' ? <Route path="/student-dashboard" element={<StudentDashboard />} /> :<Route path="/auth" element={<Authentication />} />}
      {user.role === 'teacher' ? <Route path="/teacher-dashboard" element={<TeacherDashboard />} />:<Route path="/auth" element={<Authentication />} />}
      {user.role === 'admin' ? <Route path="/admin-dashboard" element={<AdminDashboard />} />:<Route path="/auth" element={<Authentication />} />}
      <Route path="*" element={<Navigate to="/no-usertype-found-dashboard" />} />
    </Routes>
  )
}

export default AppRoutes
