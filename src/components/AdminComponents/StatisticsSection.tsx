import React from 'react';
import { Users, BookOpen, GraduationCap } from 'lucide-react';

interface User {
  isActive: boolean;
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Teacher {
  id: string;
  name: string;
  email: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  published: boolean;
  teacher: Teacher;
  createdAt: string;
  updatedAt: string;
}


interface Props {
  students: User[];
  teachers: User[];
  courses: Course[];
}

const StatisticsSection: React.FC<Props> = ({ students, teachers, courses }) => {
  const activeStudents = students.filter(s => s.isActive).length;
  const activeTeachers = teachers.filter(t => t.isActive).length;
  const publishedCourses = courses.filter(c => c.published).length;
  const draftCourses = courses.filter(c => !c.published).length;

  return (
    <div className="space-y-6">
      {/* Students Stats */}
      <div className="bg-white rounded-lg border border-gray-300 shadow-lg p-6">
        <div className="flex items-center mb-4">
          <GraduationCap className="h-6 w-6 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Students</h3>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">{students.length}</div>
          <p className="text-gray-500 text-sm">Registered students on platform</p>
        </div>
        <div className="mt-4 bg-blue-100 rounded-lg p-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Active learners</span>
            <span className="font-medium text-gray-900">{activeStudents}</span>
          </div>
        </div>
      </div>

      {/* Teachers Stats */}
      <div className="bg-white rounded-lg border border-gray-300 shadow-lg p-6">
        <div className="flex items-center mb-4">
          <Users className="h-6 w-6 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Teachers</h3>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">{activeTeachers}</div>
          <p className="text-gray-500 text-sm">Active teachers on platform</p>
        </div>
        <div className="mt-4 bg-green-100 rounded-lg p-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Course creators</span>
            <span className="font-medium text-gray-900">{teachers.length}</span>
          </div>
        </div>
      </div>

      {/* Courses Stats */}
      <div className="bg-white rounded-lg border border-gray-300 shadow-lg p-6">
        <div className="flex items-center mb-4">
          <BookOpen className="h-6 w-6 text-purple-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Courses</h3>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-purple-600 mb-2">{courses.length}</div>
          <p className="text-gray-500 text-sm">Total courses on platform</p>
        </div>
        <div className="mt-4 space-y-2">
          <div className="bg-purple-50 rounded p-2 flex justify-between text-sm">
            <span className="text-gray-600">Published:</span>
            <span className="font-medium text-gray-900">{publishedCourses}</span>
          </div>
          <div className="bg-purple-50 rounded p-2 flex justify-between text-sm">
            <span className="text-gray-600">Drafts:</span>
            <span className="font-medium text-gray-900">{draftCourses}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;
