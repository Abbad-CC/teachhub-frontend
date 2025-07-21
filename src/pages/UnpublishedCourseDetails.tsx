import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';


interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  demoVideoUrl: string;
  published: boolean;
  teacherId: string;
  createdAt: string;
  updatedAt: string;
  enrollments: Enrollment[];
}

interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  student: Student;
}

interface Student {
  id: string;
  name: string;
  email: string;
}


const UnpublishedCourseDetails: React.FC = () => {

        const { state } = useLocation();
        const course = state?.course;
        const { token } = useSelector((state: RootState) => state.auth);
        const [loading, setLoading] = useState(false);
         console.log("this is course : ", course)
        console.log("this is course and if its published or not: ", course.published)
         console.log("this is course and enrollment: ", course.enrollments)

  return (<>
    <div>CourseDetails</div>
    <h1>{course.title}</h1>
    <h1>{course.description}</h1>
    <h1>{course.price}</h1>
    {course.published ? <h1>Published Course</h1> : <h1>Unpublished Course</h1>}
    <video src={course.demoVideoUrl}></video>
    <h1>{course.teacherId}</h1>
     <h1>{course.createdAt}</h1>
     {course.enrollments.map((enrollment: Enrollment) => (
  <div key={enrollment.student.id} className="p-5 shadow border-2 border-gray-400">
    <h5>{enrollment.student.name}</h5>
    <p>{enrollment.student.email}</p>
  </div>
))}

    
  </>
  )
}

export default UnpublishedCourseDetails