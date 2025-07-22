import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Calendar, ToggleLeft, ToggleRight, ArrowLeft } from 'lucide-react';
import type { RootState } from '../store';

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
          <div
            key={student.id}
            className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-3 mr-3">
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {student.name}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      student.isActive !== false 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.isActive !== false ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="truncate">{student.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Joined {formatDate(student.createdAt)}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => toggleStudentStatus(student.id, student.isActive !== false)}
                  disabled={toggleLoading === student.id}
                  className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    student.isActive !== false
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  } ${toggleLoading === student.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {toggleLoading === student.id ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                  ) : (
                    <>
                      {student.isActive !== false ? (
                        <ToggleRight className="h-4 w-4 mr-2" />
                      ) : (
                        <ToggleLeft className="h-4 w-4 mr-2" />
                      )}
                    </>
                  )}
                  {student.isActive !== false ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          </div>
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