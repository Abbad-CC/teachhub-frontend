import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import type { RootState } from '../store';

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

type Broadcast = {
  id: number;
  message: string;
  subject: string;
  sentAt: string;
};

const CourseDetails: React.FC = () => {
  const { state } = useLocation();
  const course = state?.course;
  const { token } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sendingBroadcast, setSendingBroadcast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBroadcasts = async () => {
      if (!token || !course?.id) return;

      try {
        const response = await fetch(`http://localhost:5000/api/courses/announcement/get/${course.id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setBroadcasts(data.broadcasts);
        } else {
          toast.error(data.error || 'Failed to fetch announcements');
        }
      } catch (err) {
        toast.error('Something went wrong while fetching announcements');
      }
    };

    fetchBroadcasts();
  }, [course?.id, token]);

  const handleSendBroadcast = async () => {
    if (!subject.trim() || !message.trim()) {
      toast.error('Both subject and message are required');
      return;
    }

    if (!token || !course?.id) {
      toast.error('Invalid token or course');
      return;
    }

    setSendingBroadcast(true);
    try {
      const response = await fetch(`http://localhost:5000/api/courses/announcement/send/${course.id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject, message }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Broadcast email sent successfully!');
        setSubject('');
        setMessage('');
        // Refresh broadcasts
        const broadcastsResponse = await fetch(`http://localhost:5000/api/courses/announcement/get/${course.id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const broadcastsData = await broadcastsResponse.json();
        if (broadcastsResponse.ok) {
          setBroadcasts(broadcastsData.broadcasts);
        }
      } else {
        toast.error(data.error || 'Failed to send broadcast email');
      }
    } catch (error) {
      toast.error('Failed to send broadcast email');
    } finally {
      setSendingBroadcast(false);
    }
  };

  const handleEditCourse = () => {
    navigate('/edit-course', { state: { course } });
  };

  const handleDeleteCourse = () => {
    // You can implement delete functionality here
    toast.info('Delete course functionality to be implemented');
  };

  if (!course) return <p className="p-6">No course data found.</p>;

  return (
    <div className="md:flex lg:flex mx-auto p-6 bg-white rounded shadow gap-6 sm:block relative">
      {/* Left: Course Detail */}

      <div className="w-2/3">
        <div className='flex justify-between'>
          <h1 className="text-2xl font-bold ">{course.title}</h1>

          <div className="flex flex-row-reverse gap-2">
            <button
              onClick={handleEditCourse}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium text-sm"
            >
              Edit Course
            </button>
            <button
              onClick={handleDeleteCourse}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium text-sm"
            >
              Delete Course
            </button>
          </div>
        </div>
        <p className="text-gray-700 mb-4">{course.description}</p>

        <video src={course.demoVideoUrl} controls className="w-full mb-4 rounded" />

        <div className="text-sm text-gray-600 mb-2">
          Status: {course.published ? (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Published</span>
          ) : (
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Draft</span>
          )}
        </div>
        <div className="text-green-700 font-semibold mb-2">Price: ${course.price}</div>
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

      {/* Right: Course Management & Announcements */}
      <div className="w-1/3 flex flex-col gap-6 border-l pl-6">
        {/* Course Management Buttons */}


        {/* Broadcast Email Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Send Announcement</h2>

          <div className="space-y-3 mb-4">
            <input
              type="text"
              placeholder="Email Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Announcement Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <button
            onClick={handleSendBroadcast}
            disabled={sendingBroadcast || !subject.trim() || !message.trim()}
            className={`w-full px-4 py-2 rounded font-medium transition ${sendingBroadcast || !subject.trim() || !message.trim()
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
              }`}
          >
            {sendingBroadcast ? 'Sending...' : 'Send Announcement'}
          </button>
        </div>

        {/* Previous Announcements */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Previous Announcements</h3>
          {broadcasts.length === 0 ? (
            <p className="text-gray-500">No announcements sent yet.</p>
          ) : (
            <ul className="space-y-4 max-h-64 overflow-y-auto">
              {broadcasts.map((broadcast) => (
                <li key={broadcast.id} className="bg-gray-100 p-4 rounded shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-1">{broadcast.subject}</h4>
                  <p className="text-gray-800 text-sm mb-2">{broadcast.message}</p>
                  <div className="text-xs text-gray-500">
                    Sent on {new Date(broadcast.sentAt).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;