// components/PublishedCourses.tsx
import React from 'react';
import { BookOpen } from 'lucide-react';

interface PublishedCoursesProps {
  publishedCount: number;
  draftCount: number;
}

const PublishedCourses: React.FC<PublishedCoursesProps> = ({
  publishedCount,
  draftCount
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-300 shadow-lg p-6">
      <div className="flex items-center mb-4">
        <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Published Courses</h3>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-600 mb-2">{publishedCount}</div>
        <p className="text-gray-500 text-sm">Active courses available to students</p>
      </div>
      <div className="mt-4 bg-blue-100 rounded-lg p-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Draft courses:</span>
          <span className="font-medium text-gray-900">{draftCount}</span>
        </div>
      </div>
    </div>
  );
};

export default PublishedCourses;
