// components/MyCourseCard.tsx
import React from 'react';
import { Users } from 'lucide-react';

interface MyCourseCardProps {
  title: string;
  description: string;
  price: number;
  studentsCount: number;
  status: 'published' | 'draft';
  onClick: () => void;
}

const MyCourseCard: React.FC<MyCourseCardProps> = ({
  title,
  description,
  price,
  studentsCount,
  status,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              status === 'published'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {status === 'published' ? 'Published' : 'Draft'}
          </span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">Rs {price}</span>
          <span className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-1" />
            {studentsCount} students
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyCourseCard;
