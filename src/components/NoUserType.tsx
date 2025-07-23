import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

// src/pages/NoUserTypeFound.tsx
const NoUserTypeFound = () => {
   const dispatch = useDispatch();
  const handleLogout = () => {
      dispatch(logout());
    };
  

  return (
    <>
    <div className="flex flex-col mt-40 gap-12">

      <div className="text-center text-red-600 font-bold text-xl">
        No valid user type found. Please contact support, or choose correct role
      </div>
      <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                  Logout
                </button>
                  </div>
   </>
  )
}

export default NoUserTypeFound
