import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import type { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import WelcomeCard from '../../components/WelcomeCard';


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

const StudentDashboard: React.FC = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'available' | 'enrolled'>('available');

  const { user, token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();


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
     
      <div className="container mx-auto py-8">
       <WelcomeCard name={user?.name} />

        {/* Tab Navigation */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('available')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'available'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Available Courses ({availableCourses.length})
            </button>
            <button
              onClick={() => setActiveTab('enrolled')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'enrolled'
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
              <div key={course.id} className="relative bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden">

                {/* Already Enrolled Tag */}
                {isEnrolled(course.id) && (
                  <span className="absolute top-3 right-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Already Enrolled
                  </span>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-green-600">Rs {course.price}</span>
                    <span className="text-sm text-gray-500 px-2 py-1">
                      {course.studentCount || 0} students
                    </span>
                  </div>
                  <div className="mb-4 text-sm text-gray-500">
                    Instructor: {course.teacher.name}
                  </div>

            

                  <button
                    onClick={() => navigate('/available-course-detail', { state: { course, isEnrolled: isEnrolled(course.id) } })}
                    className="w-full mt-2 py-2 px-4 rounded-md bg-cyan-600 text-white hover:bg-cyan-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}


          {activeTab === 'enrolled' &&
            enrolledCourses.map((course) => (
              <div key={course.id} className="relative bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden">

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-green-600">Rs {course.price}</span>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                      Enrolled
                    </span>
                  </div>
                  <div className="mb-4 text-sm text-gray-500">
                    Instructor: {course.teacher.name}
                  </div>

                  <button
                    onClick={() => navigate('/course-detail', { state: { course } })}
                    className="w-full bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-700 transition-colors"
                  >
                    View Details
                  </button>
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