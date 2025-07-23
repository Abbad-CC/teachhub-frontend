import { BookOpen, ChevronRight } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

interface Props {
    courseCount: number;
}

const CoursesCard: React.FC<Props> = ({ courseCount }) => {

    const navigate = useNavigate();



    const handleNavigateToCourses = () => {
        navigate('/view-courses');
    };

    return (
        <div
            onClick={handleNavigateToCourses}
            className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group"
        >
            <div className="p-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="bg-purple-100 rounded-lg p-3 mr-4">
                            <BookOpen className="h-8 w-8 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                View All Courses
                            </h3>
                            <p className="text-gray-600">
                                Monitor and manage all courses on the platform
                            </p>
                            <div className="mt-2">
                                <span className="text-3xl font-bold text-purple-600">
                                    {courseCount}
                                </span>
                                <span className="text-gray-500 ml-2">Total courses</span>
                            </div>
                        </div>
                    </div>
                    <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-purple-600 transition-colors" />
                </div>
            </div>
        </div>
    )
}

export default CoursesCard