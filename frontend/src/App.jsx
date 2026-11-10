
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyEnrollments from "./features/students/pages/MyEnrollments";
import StudentProfile from "./features/students/pages/StudentProfile";
import AdminLogin from "./features/admin/pages/AdminLogin";
import EditCourse from "./features/courses/pages/EditCourse";
import EmployeeManagement from "./features/employee/pages/EmployeeManagement";
import AddEmployee from "./features/employee/pages/AddEmployee";
import EditEmployee from "./features/employee/pages/EditEmployee";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import AdminProfile from "./features/admin/pages/AdminProfile";
import CourseManagement from "./features/courses/pages/CourseManagement";
import AddCourse from "./features/courses/pages/AddCourse";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Student and public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/user-profile" element={<StudentProfile />} />

        {/* Admin pages */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
         <Route path="/admin-courses" element={<CourseManagement />} />
         <Route path="/add-course" element={<AddCourse />} />
          <Route path="/edit-course/:courseName" element={<EditCourse />} />

          {/* Employee management page */}
          <Route path="/admin-employees" element={<EmployeeManagement />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/edit-employee" element={<EditEmployee />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
