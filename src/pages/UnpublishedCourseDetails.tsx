import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import type { RootState } from '../store';
import { Trash } from 'lucide-react';

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

const UnpublishedCourseDetails: React.FC = () => {
  const { state } = useLocation();
  const course: Course = state?.course;
  const { token } = useSelector((state: RootState) => state.auth);
  const [isPublished, setIsPublished] = useState (false)
  const [isDeleted, setIsDeleted] = useState (false)
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  const handlePublish = async () => {
    if (!token || !course?.id) return;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${course.id}/publish`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Course published successfully');
        setIsPublished(true);
        setTimeout(() => {
          navigate('/teacher-dashboard');
        }, 2500);
      } else {
        toast.error(data.error || 'Failed to publish course');
      }
    } catch (error) {
      toast.error('Error publishing course');
    } finally {
      setLoading(false);
    }
  };

    const handleEditCourse = () => {
    navigate('/edit-course', { state: { course } });
  };

   const handleDeleteCourse = async () => {
    if (!token || !course?.id) return;
    setDeleteLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${course.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Course Deleted successfully');
        setIsDeleted(true);
        setTimeout(() => {
          navigate('/teacher-dashboard');
        }, 2500);
      } else {
        toast.error(data.error || 'Failed to Delete course');
      }
    } catch (error) {
      toast.error('Error Deleting course');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (!course) return <p className="p-6">No course data found.</p>;

  return (
    <div className="md:flex lg:flex mx-auto max-w-6xl p-6 bg-white rounded shadow gap-6 sm:block relative">
      {/* Left Side */}
      <div className="w-full">
        <div className='flex justify-between'>
          <h1 className="text-2xl mt-1.5 font-bold ">{course.title}</h1>
          <div className='flex gap-2'>
           
          {!course.published && (
            <button
              onClick={handlePublish}
              disabled={loading}
              className={`px-4 py-2 rounded font-medium transition ${loading ? 'bg-gray-400 cursor-not-allowed' : isPublished? "bg-gray-500 disabled: text-white" : 'bg-green-600 text-white hover:bg-green-700'}`}
            >
              {loading ? 'Publishing...' : isPublished ? 'Published - Redirecting' : "Publish Course"}
            </button>
          )}
           <button
              onClick={handleEditCourse}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium text-sm"
            >
              Edit Course
            </button>
             <button
              onClick={handleDeleteCourse}
              className={`px-4 py-2  ${isDeleted ? "bg-gray-500 disabled: text-white": "bg-red-600 text-white hover:bg-red-700"} rounded  transition font-medium text-sm`}
            >
              {deleteLoading ? "Deleting..." : isDeleted ? "Redirecting..." : <Trash/>}
            </button>
             
          </div>
        </div>

        <p className="text-gray-700 mt-7 mb-4">{course.description}</p>

        <video src={course.demoVideoUrl} controls className="w-full mb-4 rounded" />

        <div className="text-sm text-gray-600 mb-2">
          Status: <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Draft</span>
        </div>
        <div className="text-green-700 font-semibold mb-2">Price: Rs {course.price}</div>
        <div className="text-sm text-gray-600 mb-4">
          Students Enrolled: {course.enrollments?.length || 0}
        </div>

        {/* Enrolled Students */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Enrolled Students</h3>
          {course.enrollments && course.enrollments.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {course.enrollments.map((enrollment: Enrollment) => (
                <div key={enrollment.student.id} className="p-4 bg-gray-50 rounded-xl border border-blue-400">
                  <h5 className="font-bold text-blue-900">{enrollment.student.name}</h5>
                  <p className="text-sm text-gray-600">{enrollment.student.email}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No students enrolled yet.</p>
          )}
        </div>
      </div>

     
    </div>
  );
};

export default UnpublishedCourseDetails;
