import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import type { RootState } from '../../store';
import TeachersCard from '../../components/AdminComponents/TeachersCard';
import StudentsCard from '../../components/AdminComponents/StudentsCard';
import CoursesCard from '../../components/AdminComponents/CoursesCard';
import StatisticsSection from '../../components/AdminComponents/StatisticsSection';
import WelcomeCard from '../../components/WelcomeCard';

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

const AdminDashboard: React.FC = () => {
  const [students, setStudents] = useState<User[]>([]);
  const [teachers, setTeachers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const { user, token } = useSelector((state: RootState) => state.auth);


  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      if (token) {
        // Fetch all data concurrently
        const [studentsResponse, teachersResponse, coursesResponse] = await Promise.all([
          fetch('http://localhost:5000/api/admin/users/students', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          fetch('http://localhost:5000/api/admin/users/teachers', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          fetch('http://localhost:5000/api/admin/courses', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
        ]);

        if (studentsResponse.ok) {
          const studentsData = await studentsResponse.json();
          setStudents(studentsData.students || []);
        } else {
          toast.error('Failed to load students');
        }

        if (teachersResponse.ok) {
          const teachersData = await teachersResponse.json();
          setTeachers(teachersData.teachers || []);
        } else {
          toast.error('Failed to load teachers');
        }

        if (coursesResponse.ok) {
          const coursesData = await coursesResponse.json();
          setCourses(coursesData.courses || []);
        } else {
          toast.error('Failed to load courses');
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
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
     <WelcomeCard name={user?.name}/>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Navigation Cards */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* Students Card */}
           <StudentsCard studentCount={students.length} />
            {/* Teachers Card */}
           <TeachersCard teacherCount={teachers?.length}/>

            {/* Courses Card */}
           <CoursesCard courseCount={courses.length}/>
          </div>
        </div>

        {/* Right Side - Statistics Charts */}
        <StatisticsSection students={students} teachers={teachers} courses={courses} />

      </div>
    </div>
  );
};

export default AdminDashboard;