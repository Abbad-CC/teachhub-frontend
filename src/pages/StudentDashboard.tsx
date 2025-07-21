// import React from 'react';
// import { useSelector } from 'react-redux';
// import type { RootState } from '../store';
// import Navbar from '../components/Navbar';

// const StudentDashboard: React.FC = () => {
//   const { user } = useSelector((state: RootState) => state.auth);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
      
//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="px-4 py-6 sm:px-0">
//           <h1 className="text-3xl font-bold text-gray-900">
//             Welcome back, {user?.name}!
//           </h1>
//           <p className="mt-2 text-gray-600">
//             Here's your learning dashboard. Continue your educational journey.
//           </p>
//         </div>

//         {/* Dashboard Content */}
//         <div className="px-4 py-6 sm:px-0">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* My Courses */}
//             <div className="lg:col-span-2">
//               <div className="bg-white overflow-hidden shadow rounded-lg">
//                 <div className="px-4 py-5 sm:p-6">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">My Courses</h3>
//                   <div className="space-y-4">
//                     {/* Course Card */}
//                     <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <h4 className="text-lg font-medium text-gray-900">Introduction to React</h4>
//                           <p className="text-sm text-gray-600">Learn the fundamentals of React development</p>
//                         </div>
//                         <div className="text-right">
//                          teachers Name
//                         </div>
//                       </div>
//                     </div>

//                     <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <h4 className="text-lg font-medium text-gray-900">Advanced JavaScript</h4>
//                           <p className="text-sm text-gray-600">Master advanced JavaScript concepts</p>
//                         </div>
//                         <div className="text-right">
//                          teachers name
//                         </div>
//                       </div>
//                     </div>

//                     <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <h4 className="text-lg font-medium text-gray-900">Data Structures</h4>
//                           <p className="text-sm text-gray-600">Learn fundamental data structures</p>
//                         </div>
//                         <div className="text-right">
//                          teachers name
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Sidebar */}
//             <div className="space-y-6">
//               {/* Quick Stats */}
//               {/* <div className="bg-white overflow-hidden shadow rounded-lg">
//                 <div className="px-4 py-5 sm:p-6">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
//                   <div className="space-y-3">
//                     <div className="flex justify-between">
//                       <span className="text-sm text-gray-600">Enrolled Courses</span>
//                       <span className="text-sm font-medium text-gray-900">3</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-sm text-gray-600">Completed Courses</span>
//                       <span className="text-sm font-medium text-gray-900">1</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-sm text-gray-600">Total Study Hours</span>
//                       <span className="text-sm font-medium text-gray-900">48</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-sm text-gray-600">Average Score</span>
//                       <span className="text-sm font-medium text-gray-900">87%</span>
//                     </div>
//                   </div>
//                 </div>
//               </div> */}

//               {/* Recent Activity */}
//               {/* <div className="bg-white overflow-hidden shadow rounded-lg">
//                 <div className="px-4 py-5 sm:p-6">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
//                   <div className="space-y-3">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                       <div>
//                         <p className="text-sm text-gray-900">Completed React Hooks lesson</p>
//                         <p className="text-xs text-gray-500">2 hours ago</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                       <div>
//                         <p className="text-sm text-gray-900">Started JavaScript Arrays</p>
//                         <p className="text-xs text-gray-500">5 hours ago</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                       <div>
//                         <p className="text-sm text-gray-900">Submitted assignment</p>
//                         <p className="text-xs text-gray-500">1 day ago</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div> */}

//               {/* Upcoming Deadlines */}
//               {/* <div className="bg-white overflow-hidden shadow rounded-lg">
//                 <div className="px-4 py-5 sm:p-6">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Deadlines</h3>
//                   <div className="space-y-3">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="text-sm text-gray-900">React Project</p>
//                         <p className="text-xs text-gray-500">Due in 3 days</p>
//                       </div>
//                       <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
//                         High
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="text-sm text-gray-900">JS Quiz</p>
//                         <p className="text-xs text-gray-500">Due in 5 days</p>
//                       </div>
//                       <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
//                         Medium
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;


import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import type { RootState } from '../store';
import Navbar from '../components/Navbar';
// import { API_BASE_URL } from '../store/sagas/authSagas';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  demoVideoUrl: string;
  published: boolean;
  teacher: {
    id: string;
    name: string;
    email: string;
  };
  studentCount?: number;
}

interface Enrollment {
  id: string;
  courseId: string;
  studentId: string;
  enrolledAt: string;
}

const StudentDashboard: React.FC = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrollingCourseId, setEnrollingCourseId] = useState<string | null>(null);
  const [unenrollingCourseId, setUnenrollingCourseId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'available' | 'enrolled'>('available');

  const { user, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      // Fetch available courses
      const availableResponse = await fetch('http://localhost:5000/api/courses/all');
      if (availableResponse.ok) {
        const availableData = await availableResponse.json();
        setAvailableCourses(availableData.courses || []);
      }

      // Fetch enrolled courses
      if (token) {
        const enrolledResponse = await fetch('http://localhost:5000/api/courses/enrolled', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (enrolledResponse.ok) {
          const enrolledData = await enrolledResponse.json();
          setEnrolledCourses(enrolledData.courses || []);
        }
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId: string) => {
    if (!token) {
      toast.error('Please login to enroll');
      return;
    }

    setEnrollingCourseId(courseId);
    try {
      const response = await fetch(`http://localhost:5000/api/enrollments/${courseId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Successfully enrolled in course!');
        // Refresh courses to update enrollment status
        fetchCourses();
      } else {
        toast.error(data.error || 'Failed to enroll in course');
      }
    } catch (error) {
      console.error('Error enrolling:', error);
      toast.error('Failed to enroll in course');
    } finally {
      setEnrollingCourseId(null);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    if (!token) {
      toast.error('Please login to unenroll');
      return;
    }

    setUnenrollingCourseId(courseId);
    try {
      const response = await fetch(`http://localhost:5000/api/enrollments/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Successfully unenrolled from course!');
        // Refresh courses to update enrollment status
        fetchCourses();
      } else {
        toast.error(data.error || 'Failed to unenroll from course');
      }
    } catch (error) {
      console.error('Error unenrolling:', error);
      toast.error('Failed to unenroll from course');
    } finally {
      setUnenrollingCourseId(null);
    }
  };

  const isEnrolled = (courseId: string) => {
    return enrolledCourses.some(course => course.id === courseId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
    {/* <div className='mx-auto'>
      <Navbar/>
      </div>     */}
      <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">Explore courses and manage your learning journey</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('available')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'available'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            Available Courses ({availableCourses.length})
          </button>
          <button
            onClick={() => setActiveTab('enrolled')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'enrolled'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My Courses ({enrolledCourses.length})
          </button>
        </nav>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
        {activeTab === 'available' &&
          availableCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg border-1  border-gray-300 shadow-lg overflow-hidden">
              {/* {course.demoVideoUrl && (
                <div className="aspect-video bg-gray-100">
                  <video
                    src={course.demoVideoUrl}
                    className="w-full h-full object-cover"
                    controls
                    />
                </div>
              )} */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {course.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-green-600">
                    ${course.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    {course.studentCount || 0} students
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">
                    Instructor: {course.teacher.name}
                  </p>
                </div>
                <button
                  onClick={() => handleEnroll(course.id)}
                  disabled={isEnrolled(course.id) || enrollingCourseId === course.id}
                  className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                    isEnrolled(course.id)
                    ? 'bg-green-100 text-green-800 cursor-not-allowed'
                    : enrollingCourseId === course.id
                    ? 'bg-blue-400 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                  >
                  {enrollingCourseId === course.id ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Enrolling...
                    </div>
                  ) : isEnrolled(course.id) ? (
                    'Already Enrolled'
                  ) : (
                    'Enroll Now'
                  )}
                </button>
              </div>
            </div>
          ))}

        {activeTab === 'enrolled' &&
          enrolledCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* {course.demoVideoUrl && (
                <div className="aspect-video bg-gray-100">
                  <video
                    src={course.demoVideoUrl}
                    className="w-full h-full object-cover"
                    controls
                    />
                </div>
              )} */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {course.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-green-600">
                    ${course.price}
                  </span>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    Enrolled
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">
                    Instructor: {course.teacher.name}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                    Continue Learning
                  </button>
                  <button
                    onClick={() => handleUnenroll(course.id)}
                    disabled={unenrollingCourseId === course.id}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      unenrollingCourseId === course.id
                      ? 'bg-red-400 text-white cursor-not-allowed'
                      : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                    >
                    {unenrollingCourseId === course.id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      'Unenroll'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Empty States */}
      {activeTab === 'available' && availableCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses available</h3>
          <p className="text-gray-500">Check back later for new courses!</p>
        </div>
      )}

      {activeTab === 'enrolled' && enrolledCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No enrolled courses</h3>
          <p className="text-gray-500">Start learning by enrolling in a course!</p>
          <button
            onClick={() => setActiveTab('available')}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Browse Available Courses
          </button>
        </div>
      )}
    </div>
      </>
  );
};

export default StudentDashboard;