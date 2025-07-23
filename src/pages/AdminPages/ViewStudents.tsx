import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GraduationCap,  ArrowLeft } from 'lucide-react';
import type { RootState } from '../../store';
import StudentDetailsCard from '../../components/AdminComponents/StudentDetailsCard';

interface Student {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  isActive?: boolean;
}

const ViewStudents: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggleLoading, setToggleLoading] = useState<string | null>(null);

  const { token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      if (token) {
        const response = await fetch('http://localhost:5000/api/admin/users/students', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStudents(data.students || []);
        } else {
          toast.error('Failed to load students');
        }
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const toggleStudentStatus = async (studentId: string, currentStatus: boolean) => {
    setToggleLoading(studentId);
    try {
      // Assuming you have an endpoint to toggle user status
      const response = await fetch(`http://localhost:5000/api/admin/student/${studentId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        // Update local state
        setStudents(prev => prev.map(student =>
          student.id === studentId
            ? { ...student, isActive: !currentStatus }
            : student
        ));
        toast.success(`Student ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      } else {
        toast.error('Failed to update student status');
      }
    } catch (error) {
      console.error('Error toggling student status:', error);
      toast.error('Failed to update student status');
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
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
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
            className="mr-4 p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              All Students
            </h1>
            <p className="text-gray-600">Manage and monitor student accounts</p>
          </div>
        </div>
        <div className="bg-blue-100 px-4 py-2 rounded-lg">
          <span className="text-blue-800 font-semibold">
            Total: {students.length} Students
          </span>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <StudentDetailsCard
            key={student.id}
            student={student}
            toggleStatus={toggleStudentStatus}
            isLoading={toggleLoading === student.id}
          />
        ))}
      </div>

      {/* Empty State */}
      {students.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <GraduationCap className="mx-auto h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
          <p className="text-gray-500">There are currently no students registered on the platform.</p>
        </div>
      )}
    </div>
  );
};

export default ViewStudents;