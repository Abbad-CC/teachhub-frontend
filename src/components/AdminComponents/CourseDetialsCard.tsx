// src/components/admin/CourseDetailsCard.tsx
import React from 'react';
import { BookOpen, User, Calendar, ToggleLeft, ToggleRight } from 'lucide-react';

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

interface CourseDetailsCardProps {
    course: Course;
    toggleLoading: string | null;
    onToggleStatus: (courseId: string, currentStatus: boolean) => void;
}

const CourseDetailsCard: React.FC<CourseDetailsCardProps> = ({ course, toggleLoading, onToggleStatus}) => {

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatPrice = (price: number) => {
        return `Rs ${price.toLocaleString()}`;
    };

    return (
        <div className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center mb-2">
                            <div className="bg-purple-100 rounded-full p-2 mr-3">
                                <BookOpen className="h-5 w-5 text-purple-600" />
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${course.published
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                {course.published ? 'Published' : 'Draft'}
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                            {course.title}
                        </h3>
                    </div>
                </div>

                <div className="space-y-3 mb-4">
                    <p className="text-sm text-gray-600 line-clamp-3">
                        {course.description}
                    </p>

                    <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        <span className="truncate">by {course.teacher.name}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                        <span className="font-semibold text-purple-600">{formatPrice(course.price)}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Created {formatDate(course.createdAt)}</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                    <button
                        onClick={() => onToggleStatus(course.id, course.published)}
                        disabled={toggleLoading === course.id}
                        className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${course.published
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            } ${toggleLoading === course.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {toggleLoading === course.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                        ) : (
                            <>
                                {course.published ? (
                                    <ToggleRight className="h-4 w-4 mr-2" />
                                ) : (
                                    <ToggleLeft className="h-4 w-4 mr-2" />
                                )}
                            </>
                        )}
                        {course.published ? 'Unpublish' : 'Publish'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailsCard;
