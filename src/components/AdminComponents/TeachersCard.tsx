import { ChevronRight, Users } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

interface Props{
     teacherCount: number;
}
  
const TeachersCard: React.FC<Props> = ({teacherCount}) => {
 
 
 const navigate = useNavigate();



const handleNavigateToTeachers = () => {
    navigate('/view-teachers');
  };

 
 
    return (
    <div
              onClick={handleNavigateToTeachers}
              className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group"
            >
              <div className="p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-lg p-3 mr-4">
                      <Users className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        View All Teachers
                      </h3>
                      <p className="text-gray-600">
                        Manage teacher accounts and course assignments
                      </p>
                      <div className="mt-2">
                        <span className="text-3xl font-bold text-green-600">
                          {teacherCount}
                        </span>
                        <span className="text-gray-500 ml-2">Teachers</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-green-600 transition-colors" />
                </div>
              </div>
            </div>
  )
}

export default TeachersCard