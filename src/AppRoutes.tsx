// src/AppRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LandingPage from './pages/LandingPage'
import Authentication from './pages/Authentication'
import StudentDashboard from './pages/StudentDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Layout from './components/Layout'
import NoUserTypeFound from './components/NoUserType'



const AppRoutes = () => {
  const { isAuthenticated, user } = useSelector((state: any) => state.auth)

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
      {user.role === 'student' && (
        <Route
          path="/student-dashboard"
          element={
            <Layout>
              <StudentDashboard />
            </Layout>
          }
        />
      )}
      {user.role === 'teacher' && (
        <Route
          path="/teacher-dashboard"
          element={
            <Layout>
              <TeacherDashboard />
            </Layout>
          }
        />
      )}
      {user.role === 'admin' && (
        <Route
          path="/admin-dashboard"
          element={
            <Layout>
              <AdminDashboard />
            </Layout>
          }
        />
      )}
      <Route path="/no-usertype-found-dashboard" element={<NoUserTypeFound />} />
    </Routes>
  )
}

export default AppRoutes
