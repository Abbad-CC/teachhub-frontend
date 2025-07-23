// components/TotalStudents.tsx
import React from 'react';
import { Users } from 'lucide-react';

interface TotalStudentsProps {
  totalCount: number;
  breakdown: { title: string; count: number }[];
}

const TotalStudents: React.FC<TotalStudentsProps> = ({ totalCount, breakdown }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-300 shadow-lg p-6">
      <div className="flex items-center mb-4">
        <Users className="h-6 w-6 text-green-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Total Students</h3>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-green-600 mb-2">{totalCount}</div>
        <p className="text-gray-500 text-sm">Students enrolled across all courses</p>
      </div>
      <div className="mt-4 space-y-2">
        {breakdown.slice(0, 3).map((item, i) => (
          <div key={i} className="flex justify-between text-sm bg-green-50 rounded p-2">
            <span className="text-gray-600 truncate mr-2">{item.title}</span>
            <span className="font-medium text-gray-900">{item.count}</span>
          </div>
        ))}
        {breakdown.length > 3 && (
          <div className="text-center text-xs text-gray-500 mt-2">
            +{breakdown.length - 3} more courses
          </div>
        )}
      </div>
    </div>
  );
};

export default TotalStudents;
