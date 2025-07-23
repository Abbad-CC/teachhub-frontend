import { ChevronRight, GraduationCap } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
interface Props{
    studentCount : number;
}



const StudentsCard: React.FC<Props> = ({studentCount}) => {


     const navigate = useNavigate();

  const handleNavigateToStudents = () => {
    navigate('/view-students');
  };



  return (
   <div
              onClick={handleNavigateToStudents}
              className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group"
            >
              <div className="p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-lg p-3 mr-4">
                      <GraduationCap className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        View All Students
                      </h3>
                      <p className="text-gray-600">
                        Manage and monitor student accounts and activities
                      </p>
                      <div className="mt-2">
                        <span className="text-3xl font-bold text-blue-600">
                          {studentCount}
                        </span>
                        <span className="text-gray-500 ml-2">registered students</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>
            </div>
  )
}

export default StudentsCard