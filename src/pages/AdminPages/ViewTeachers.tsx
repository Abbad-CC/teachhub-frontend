import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Users, ArrowLeft } from 'lucide-react';
import type { RootState } from '../../store';
import TeacherDetailsCard from '../../components/AdminComponents/TeacherDetailsCard';

interface Teacher {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  isActive: boolean;
  
}

const ViewTeachers: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggleLoading, setToggleLoading] = useState<string | null>(null);

  const { token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      if (token) {
        const response = await fetch('http://localhost:5000/api/admin/users/teachers', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTeachers(data.teachers || []);
        } else {
          toast.error('Failed to load teachers');
        }
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
      toast.error('Failed to load teachers');
    } finally {
      setLoading(false);
    }
  };

  const toggleTeacherStatus = async (teacherId: string, currentStatus: boolean) => {
    setToggleLoading(teacherId);
    try {
      
      const response = await fetch(`http://localhost:5000/api/admin/teacher/${teacherId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        // Update local state
        setTeachers(prev => prev.map(teacher =>
          teacher.id === teacherId
            ? { ...teacher, isActive: !currentStatus }
            : teacher
        ));
        toast.success(`Teacher ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      } else {
        toast.error('Failed to update teacher status');
      }
    } catch (error) {
      console.error('Error toggling teacher status:', error);
      toast.error('Failed to update teacher status');
    } finally {
      setToggleLoading(null);
    }
  };

 

  const handleGoBack = () => {
    navigate('/admin-dashboard');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
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
            className="mr-4 p-2 text-gray-600 hover:text-green-600 transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              All Teachers
            </h1>
            <p className="text-gray-600">Manage and monitor teacher accounts</p>
          </div>
        </div>
        <div className="bg-green-100 px-4 py-2 rounded-lg">
          <span className="text-green-800 font-semibold">
            Total: {teachers.length} Teachers
          </span>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <TeacherDetailsCard
            key={teacher.id}
            teacher={teacher}
            toggleStatus={toggleTeacherStatus}
            isLoading={toggleLoading === teacher.id}
          />
        ))}
      </div>

      {/* Empty State */}
      {teachers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Users className="mx-auto h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No teachers found</h3>
          <p className="text-gray-500">There are currently no teachers registered on the platform.</p>
        </div>
      )}
    </div>
  );
};

export default ViewTeachers;