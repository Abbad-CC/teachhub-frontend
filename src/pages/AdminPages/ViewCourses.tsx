import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { BookOpen,  ArrowLeft } from 'lucide-react';
import type { RootState } from '../../store';
import CourseDetailsCard from '../../components/AdminComponents/CourseDetialsCard';



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

const ViewCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggleLoading, setToggleLoading] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  const { token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      if (token) {
        const response = await fetch('http://localhost:5000/api/admin/courses', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCourses(data.courses || []);
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

  const toggleCourseStatus = async (courseId: string, currentStatus: boolean) => {
    setToggleLoading(courseId);
    try {
      const response = await fetch(`http://localhost:5000/api/admin/course/${courseId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ IsPublished: !currentStatus }),
      });

      if (response.ok) {
        // Update local state
        setCourses(prev => prev.map(course =>
          course.id === courseId
            ? { ...course, published: !currentStatus }
            : course
        ));
        toast.success(`Course ${!currentStatus ? 'published' : 'unpublished'} successfully`);
      } else {
        toast.error('Failed to update course status');
      }
    } catch (error) {
      console.error('Error toggling course status:', error);
      toast.error('Failed to update course status');
    } finally {
      setToggleLoading(null);
    }
  };



  const handleGoBack = () => {
    navigate('/admin-dashboard');
  };

  const filteredCourses = courses.filter(course => {
    if (filter === 'published') return course.published;
    if (filter === 'draft') return !course.published;
    return true;
  });

  const publishedCount = courses.filter(c => c.published).length;
  const draftCount = courses.filter(c => !c.published).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={handleGoBack}
            className="mr-4 p-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              All Courses
            </h1>
            <p className="text-gray-600">Manage and monitor all courses on the platform</p>
          </div>
        </div>
        <div className="bg-purple-100 px-4 py-2 rounded-lg">
          <span className="text-purple-800 font-semibold">
            Total: {courses.length} Courses
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setFilter('all')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${filter === 'all'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            All Courses ({courses.length})
          </button>
          <button
            onClick={() => setFilter('published')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${filter === 'published'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            Published ({publishedCount})
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${filter === 'draft'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            Drafts ({draftCount})
          </button>
        </nav>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseDetailsCard
            key={course.id}
            course={course}
            toggleLoading={toggleLoading}
            onToggleStatus={toggleCourseStatus}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <BookOpen className="mx-auto h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {filter === 'all' ? '' : filter} courses found
          </h3>
          <p className="text-gray-500">
            {filter === 'all'
              ? 'There are currently no courses on the platform.'
              : `There are currently no ${filter} courses.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default ViewCourses;