import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import type { RootState } from '../store';

type Broadcast = {
    id: number;
    message: string;
    sentAt: string;
};

const EnrolledCourseDetail = () => {
    const { state } = useLocation();
    const course = state?.course;
    const { token } = useSelector((state: RootState) => state.auth);
    const [loading, setLoading] = useState(false);
    const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isUnenrolled, setIsUnenrolled] = useState(false);
    const navigate = useNavigate();

    const handleUnenroll = async () => {
        if (!token || !course?.id) return toast.error("Invalid token or course");

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/enrollments/${course.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (response.ok) {
                toast.success('Successfully unenrolled from course!');
                setIsUnenrolled(true);
                setTimeout(() => {
                    navigate('/student-dashboard');
                }, 1500);
            } else {
                toast.error(data.error || 'Failed to unenroll');
            }
        } catch (error) {
            toast.error('Unenrollment failed');
        } finally {
            setLoading(false);
            setShowConfirm(false);
        }
    };

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

    if (!course) return <p className="p-6">No course data found.</p>;

    return (
    <div className="md:flex lg:flex mx-auto p-6 bg-white rounded shadow gap-6 sm:block relative">
        {/* Custom Confirm Popup */}
        {showConfirm && (
            <div className="fixed inset-0 w-screen h-screen bg-black/60  flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded shadow-md text-center w-11/12 max-w-md">
                    <p className="text-lg mb-4">Are you sure you want to unenroll from this course?</p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={handleUnenroll}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Yes, Unenroll
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

        {/* Left: Course Detail */}
        <div className="w-2/3">
            <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-700 mb-4">{course.description}</p>

            <video src={course.demoVideoUrl} controls className="w-full mb-4 rounded" />

            <div className="text-sm text-gray-600 mb-2">Instructor: {course.teacher?.name}</div>
            <div className="text-green-700 font-semibold mb-2">Price: Rs {course.price}</div>
        </div>

        {/* Right: Announcements */}
        <div className="w-1/3 flex flex-col gap-11 border-l pl-6">
            <div className="flex justify-between">
                <h2 className="text-xl mt-4 px-4 py-2 font-semibold">Course Announcements</h2>
                <button
                    onClick={() => setShowConfirm(true)}
                    disabled={loading || isUnenrolled}
                    className={`mt-4 px-4 py-2 rounded bg-red-600 text-white font-medium hover:bg-red-700 transition ${
                        loading || isUnenrolled ? 'opacity-50 cursor-not-allowed bg-gray-400 hover:bg-gray-400' : ''
                    }`}
                >
                    {loading ? 'Unenrolling...' : isUnenrolled ? 'Unenrolled' : 'Unenroll'}
                </button>
            </div>
            <div>
                {broadcasts.length === 0 ? (
                    <p className="text-gray-500">No announcements yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {broadcasts.map((broadcast) => (
                            <li key={broadcast.id} className="bg-gray-100 p-4 rounded shadow-sm">
                                <p className="text-gray-800">{broadcast.message}</p>
                                <div className="text-sm text-gray-500 mt-2">
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

export default EnrolledCourseDetail;
