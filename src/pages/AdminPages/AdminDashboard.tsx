import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, GraduationCap, ChevronRight } from 'lucide-react';
import type { RootState } from '../../store';

interface User {
  isActive: unknown;
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Teacher {
  id: string;
  name: string;
  email: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  published: boolean;
  teacher: Teacher;
  createdAt: string;
  updatedAt: string;
}

const AdminDashboard: React.FC = () => {
  const [students, setStudents] = useState<User[]>([]);
  const [teachers, setTeachers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const { user, token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      if (token) {
        // Fetch all data concurrently
        const [studentsResponse, teachersResponse, coursesResponse] = await Promise.all([
          fetch('http://localhost:5000/api/admin/users/students', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          fetch('http://localhost:5000/api/admin/users/teachers', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          fetch('http://localhost:5000/api/admin/courses', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
        ]);

        if (studentsResponse.ok) {
          const studentsData = await studentsResponse.json();
          setStudents(studentsData.students || []);
        } else {
          toast.error('Failed to load students');
        }

        if (teachersResponse.ok) {
          const teachersData = await teachersResponse.json();
          setTeachers(teachersData.teachers || []);
        } else {
          toast.error('Failed to load teachers');
        }

        if (coursesResponse.ok) {
          const coursesData = await coursesResponse.json();
          setCourses(coursesData.courses || []);
        } else {
          toast.error('Failed to load courses');
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getPublishedCoursesCount = () => {
    return courses.filter(course => course.published).length;
  };

  const getDraftCoursesCount = () => {
    return courses.filter(course => !course.published).length;
  };

  const handleNavigateToStudents = () => {
    navigate('/view-students');
  };

  const handleNavigateToTeachers = () => {
    navigate('/view-teachers');
  };

  const handleNavigateToCourses = () => {
    navigate('/view-courses');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">Manage your platform and oversee all activities</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Navigation Cards */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* Students Card */}
            <div
              onClick={handleNavigateToStudents}
              className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group"
            >
              <div className="p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-lg p-3 mr-4">
                      <GraduationCap className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        View All Students
                      </h3>
                      <p className="text-gray-600">
                        Manage and monitor student accounts and activities
                      </p>
                      <div className="mt-2">
                        <span className="text-3xl font-bold text-blue-600">
                          {students.length}
                        </span>
                        <span className="text-gray-500 ml-2">registered students</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>
            </div>

            {/* Teachers Card */}
            <div
              onClick={handleNavigateToTeachers}
              className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group"
            >
              <div className="p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-lg p-3 mr-4">
                      <Users className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        View All Teachers
                      </h3>
                      <p className="text-gray-600">
                        Manage teacher accounts and course assignments
                      </p>
                      <div className="mt-2">
                        <span className="text-3xl font-bold text-green-600">
                          {teachers.length}
                        </span>
                        <span className="text-gray-500 ml-2">Teachers</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-green-600 transition-colors" />
                </div>
              </div>
            </div>

            {/* Courses Card */}
            <div
              onClick={handleNavigateToCourses}
              className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group"
            >
              <div className="p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-purple-100 rounded-lg p-3 mr-4">
                      <BookOpen className="h-8 w-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        View All Courses
                      </h3>
                      <p className="text-gray-600">
                        Monitor and manage all courses on the platform
                      </p>
                      <div className="mt-2">
                        <span className="text-3xl font-bold text-purple-600">
                          {courses.length}
                        </span>
                        <span className="text-gray-500 ml-2">Total courses</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-purple-600 transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Statistics Charts */}
        <div className="space-y-6">
          {/* Students Statistics */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-lg p-6">
            <div className="flex items-center mb-4">
              <GraduationCap className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Students</h3>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {students.length}
              </div>
              <p className="text-gray-500 text-sm">Registered students on platform</p>
            </div>
            <div className="mt-4 bg-blue-100 rounded-lg p-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Active learners</span>
                <span className="font-medium text-gray-900">{students.filter(student => student.isActive).length}</span>
              </div>
            </div>
          </div>

          {/* Teachers Statistics */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Teachers</h3>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {teachers.filter(teacher => teacher.isActive).length}
              </div>
              <p className="text-gray-500 text-sm">Active teachers on platform</p>
            </div>
            <div className="mt-4 bg-green-100 rounded-lg p-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Course creators</span>
                <span className="font-medium text-gray-900">{teachers.length}</span>
              </div>
            </div>
          </div>

          {/* Courses Statistics */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-lg p-6">
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-purple-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Courses</h3>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {courses.length}
              </div>
              <p className="text-gray-500 text-sm">Total courses on platform</p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="bg-purple-50 rounded p-2 flex justify-between text-sm">
                <span className="text-gray-600">Published:</span>
                <span className="font-medium text-gray-900">{getPublishedCoursesCount()}</span>
              </div>
              <div className="bg-purple-50 rounded p-2 flex justify-between text-sm">
                <span className="text-gray-600">Drafts:</span>
                <span className="font-medium text-gray-900">{getDraftCoursesCount()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;