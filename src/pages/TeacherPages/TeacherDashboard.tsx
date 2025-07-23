import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import type { RootState } from '../../store';
import MyCourseCard from '../../components/TeacherComponents/MyCourseCard';
import PublishedCourses from '../../components/TeacherComponents/PublishedCourses';
import TotalStudents from '../../components/TeacherComponents/TotalStudents';
import WelcomeCard from '../../components/WelcomeCard';

interface Student {
  id: string;
  name: string;
  email: string;
}

interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  student: Student;
}

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  demoVideoUrl: string;
  published: boolean;
  teacherId: string;
  createdAt: string;
  updatedAt: string;
  enrollments: Enrollment[];
}

const TeacherDashboard: React.FC = () => {
  const [publishedCourses, setPublishedCourses] = useState<Course[]>([]);
  const [unpublishedCourses, setUnpublishedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'published' | 'unpublished'>('published');

  const { user, token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    setLoading(true);
    try {
      if (token) {
        const response = await fetch('http://localhost:5000/api/courses/mycourses', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const courses = data.courses || [];

          // Separate published and unpublished courses
          const published = courses.filter((course: Course) => course.published);
          const unpublished = courses.filter((course: Course) => !course.published);

          setPublishedCourses(published);
          setUnpublishedCourses(unpublished);
        } else {
          toast.error('Failed to load courses');
        }
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const getStudentCount = (course: Course) => {
    return course.enrollments?.length || 0;
  };

  const getTotalStudents = () => {
    return publishedCourses.reduce((total, course) => total + getStudentCount(course), 0);
  };

  const handleCourseClick = (course: Course) => {
    navigate('/course-details', { state: { course } });
  };

  const handleUnPublishedCourseClick = (course: Course) => {
    navigate('/unpublished-course-details', { state: { course } });
  };

  const handleAddCourse = () => {
    navigate('/add-course');
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
      <div className="mb-8 flex justify-between items-center">
       <WelcomeCard name={user?.name} />
        <button
          onClick={handleAddCourse}
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Courses */}
        <div className="lg:col-span-2">
          {/* Tab Navigation */}
          <div className="mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('published')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'published'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Published Courses ({publishedCourses.length})
              </button>
              <button
                onClick={() => setActiveTab('unpublished')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'unpublished'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Draft Courses ({unpublishedCourses.length})
              </button>
            </nav>
          </div>

          {/* Course List */}
          <div className="space-y-4">
            {activeTab === 'published' &&
              publishedCourses.map((course) => (
                <MyCourseCard
                  key={course.id}
                  title={course.title}
                  description={course.description}
                  price={course.price}
                  studentsCount={getStudentCount(course)}
                  status="published"
                  onClick={() => handleCourseClick(course)}
                />

              ))}

            {activeTab === 'unpublished' &&
              unpublishedCourses.map((course) => (
                <MyCourseCard
                  key={course.id}
                  title={course.title}
                  description={course.description}
                  price={course.price}
                  studentsCount={getStudentCount(course)}
                  status="draft"
                  onClick={() => handleUnPublishedCourseClick(course)}
                />

              ))}
          </div>

          {/* Empty States */}
          {activeTab === 'published' && publishedCourses.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <BookOpen className="mx-auto h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No published courses</h3>
              <p className="text-gray-500">Start by creating and publishing your first course!</p>
              <button
                onClick={handleAddCourse}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Course
              </button>
            </div>
          )}

          {activeTab === 'unpublished' && unpublishedCourses.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <BookOpen className="mx-auto h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No draft courses</h3>
              <p className="text-gray-500">All your courses are published!</p>
            </div>
          )}
        </div>

        {/* Right Side - Charts */}
        <div className="space-y-6">
          {/* Published Courses Chart */}
          <PublishedCourses publishedCount={publishedCourses.length} draftCount={unpublishedCourses.length} />


          {/* Total Students Chart */}
          <TotalStudents
            totalCount={getTotalStudents()}
            breakdown={publishedCourses.map((course) => ({
              title: course.title,
              count: getStudentCount(course),
            }))}
          />

        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;