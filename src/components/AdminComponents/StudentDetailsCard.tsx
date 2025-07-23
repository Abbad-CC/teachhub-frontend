import React from 'react';
import { GraduationCap, Mail, Calendar, ToggleLeft, ToggleRight } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  isActive?: boolean;
}

interface Props {
  student: Student;
  toggleStatus: (id: string, currentStatus: boolean) => void;
  isLoading: boolean;
}

const StudentDetailsCard: React.FC<Props> = ({ student, toggleStatus, isLoading }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
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
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  student.isActive !== false
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
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
            onClick={() => toggleStatus(student.id, student.isActive !== false)}
            disabled={isLoading}
            className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              student.isActive !== false
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
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
  );
};

export default StudentDetailsCard;
