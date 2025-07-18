import { useState } from "react"
import type { RootState } from "../store";
import { useSelector } from "react-redux";

const StudentDashboard: React.FC = () => {

    const [count , setCount] = useState(0);
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

    console.log("This is Students Dashboard with user and isAuthenticated: ",user, isAuthenticated)
  return (<>
  <div className="bg-blue-300">
  <div className="text-black">
    <h2 className="text-2xl text-black p-2">StudentDashboard</h2>
  </div>
  </div>
  </>
  )
}

export default StudentDashboard