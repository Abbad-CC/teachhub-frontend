// src/AppRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LandingPage from './pages/LandingPage'
import Authentication from './pages/Authentication'
import StudentDashboard from './pages/StudentPages/StudentDashboard'
import TeacherDashboard from './pages/TeacherPages/TeacherDashboard'
import AdminDashboard from './pages/AdminPages/AdminDashboard'
import Layout from './components/Layout'
import NoUserTypeFound from './components/NoUserType'
import EnrolledCourseDetail from './pages/StudentPages/EnrolledCourseDetail'
import AvailableCourseDetail from './pages/StudentPages/AvailableCourseDetail'
import CourseDetails from './pages/TeacherPages/PublishedCourseDetails'
import UnpublishedCourseDetails from './pages/TeacherPages/UnpublishedCourseDetails'
import AddCourse from './pages/TeacherPages/AddCourse'
import EditCourse from './pages/TeacherPages/EditCourses'
import ViewStudents from './pages/AdminPages/ViewStudents'
import ViewTeachers from './pages/AdminPages/ViewTeachers'
import ViewCourses from './pages/AdminPages/ViewCourses'



const AppRoutes = () => {
  const { isAuthenticated, user } = useSelector((state: any) => state.auth)
  if (user && isAuthenticated) {
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
       {user.role === 'admin' ? <Route path="/admin-dashboard" 
      element={
      <Layout>
        <AdminDashboard />
        </Layout>} /> 
        : <Route path="/auth" 
        element={
        <Authentication />} 
        />}
        {user.role === 'admin' ? <Route path="/view-students" 
      element={
      <Layout>
        <ViewStudents />
        </Layout>} /> 
        : <Route path="/auth" 
        element={
        <Authentication />} 
        />}
      
        {user.role === 'admin' ? <Route path="/view-teachers" 
      element={
      <Layout>
        <ViewTeachers />
        </Layout>} /> 
        : <Route path="/auth" 
        element={
        <Authentication />} 
        />}
      
        {user.role === 'admin' ? <Route path="/view-courses" 
      element={
      <Layout>
        <ViewCourses />
        </Layout>} /> 
        : <Route path="/auth" 
        element={
        <Authentication />} 
        />}


      {user.role === 'student' ? <Route path="/student-dashboard" 
      element={
      <Layout>
        <StudentDashboard />
        </Layout>} /> 
        : <Route path="/auth" 
        element={
        <Authentication />} 
        />}

        {user.role === 'student' ? 
        <Route path="/available-course-detail" 
        element={
          <Layout>
            <AvailableCourseDetail />
          </Layout>
        } />:
      <Route path="/auth" 
      element={
      <Authentication />} 
      />}

      {user.role === 'student' ? 
        <Route path="/course-detail" element={
          <Layout>
            <EnrolledCourseDetail />
          </Layout>
        } /> :
       <Route path="/auth" 
      element={
      <Authentication />} 
      />}


      {user.role === 'teacher' ? <Route path="/teacher-dashboard" 
      element={
      <Layout>
        <TeacherDashboard />
      </Layout>} /> : 
      <Route path="/auth" 
      element={
      <Authentication />} 
      />}

      {user.role === 'teacher' ? <Route path="/course-details" 
      element={
      <Layout>
        <CourseDetails />
      </Layout>} /> : 
      <Route path="/auth" 
      element={
      <Authentication />} 
      />}

            {user.role === 'teacher' ? <Route path="/unpublished-course-details" 
      element={
      <Layout>
        <UnpublishedCourseDetails />
      </Layout>} /> : 
      <Route path="/auth" 
      element={
      <Authentication />} 
      />}

        {user.role === 'teacher' ? <Route path="/add-course" 
      element={
      <Layout>
        <AddCourse />
      </Layout>} /> : 
      <Route path="/auth" 
      element={
      <Authentication />} 
      />}


       {user.role === 'teacher' ? <Route path="/edit-course" 
      element={
      <Layout>
        <EditCourse />
      </Layout>} /> : 
      <Route path="/auth" 
      element={
      <Authentication />} 
      />}

      {user.role === 'admin' ? <Route path="/admin-dashboard" 
      element={
      <Layout>
        <AdminDashboard />
      </Layout>} /> : 
      <Route path="/auth" 
      element={
      <Authentication />} 
      />}

      
      <Route path="*" element={<NoUserTypeFound />} />
    </Routes>
  )
}

export default AppRoutes
