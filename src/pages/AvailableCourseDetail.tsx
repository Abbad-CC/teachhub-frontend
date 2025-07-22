import  { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import type { RootState } from '../store';

const AvailableCourseDetail = () => {
  const { state } = useLocation();
  const course = state?.course;
  const navigate = useNavigate();

  const { token } = useSelector((state: RootState) => state.auth);
  const [enrolling, setEnrolling] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEnrolledNow, setIsEnrolledNow] = useState(false);
  const isEnrolled = state?.isEnrolled;

  if (!course) return <p className="p-6">No course data found.</p>;

  const handleEnroll = async () => {
    if (!token) {
      toast.error('Please login to enroll');
      return;
    }

    setEnrolling(true);

    try {
      const response = await fetch(`http://localhost:5000/api/enrollments/${course.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Successfully enrolled in course!');
        setIsEnrolledNow(true);
        setTimeout(() => {
          navigate('/student-dashboard');
        }, 2500);
      } else {
        toast.error(data.error || 'Failed to enroll in course');
      }
    } catch (error) {
      console.error('Error enrolling:', error);
      toast.error('Failed to enroll in course');
    } finally {
      setEnrolling(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 border border-gray-300 shadow-lg bg-white rounded relative">
      {/* Custom Confirm Popup */}
      {showConfirm && (
        <div className="fixed inset-0 w-screen h-screen bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center w-11/12 max-w-md">
            <p className="text-lg mb-4">Are you sure you want to enroll in this course?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleEnroll}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Yes, Enroll
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
      <p className="text-gray-700 mb-4">{course.description}</p>
      <div className="text-sm text-gray-600 mb-2">Instructor: {course.teacher?.name}</div>
      <div className="text-green-700 font-semibold mb-2">Price: Rs {course.price}</div>
      <p className="text-sm text-gray-500 mb-4">Students Enrolled: {course.studentCount}</p>

      <button
        onClick={() => setShowConfirm(true)}
        disabled={enrolling || isEnrolled || isEnrolledNow}
        className={`w-full py-2 px-4 mt-20 rounded-md font-medium transition-colors ${
          enrolling || isEnrolled || isEnrolledNow
            ? 'bg-gray-600 text-white cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {enrolling ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Enrolling...
          </div>
        ) : isEnrolled || isEnrolledNow ? (
          'Already Enrolled'
        ) : (
          'Enroll Now'
        )}
      </button>
    </div>
  );
};

export default AvailableCourseDetail;
