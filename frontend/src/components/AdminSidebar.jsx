
import { Link, useNavigate } from "react-router-dom";

function AdminSidebar({ children }) {
  const navigate = useNavigate();
   const handleLogout = () => {
    sessionStorage.removeItem("loggedInAdmin");
    alert("Logged out successfully!");
     navigate("/admin-login");
  }
  return ( 
  <div className="d-flex min-vh-100">
    <div className="admin-sidebar">
      <nav className="nav flex-column mt-5">
        <h5 className="text-white ms-3 mb-4">
          Welcome Admin
        </h5>

        <Link to="/admin-profile" className="nav-link">
          <i className="bi bi-house-fill"></i>
          <span className="ms-2">Dashboard</span>
        </Link>


        <Link to="/admin-profile" className="nav-link">
          <i className="bi bi-person-fill"></i>
          <span className="ms-2">Profile</span>
        </Link>

        <Link to="/admin-courses" className="nav-link">
          <i className="bi bi-book-fill"></i>
          <span className="ms-2">Course Management</span>
        </Link>

        <Link to="/admin-employees" className="nav-link">
          <i className="bi bi-people-fill"></i>
          <span className="ms-2">Employee Management</span>
        </Link>

        <Link to="/admin-customers" className="nav-link">
          <i className="bi bi-person-lines-fill"></i>
          <span className="ms-2">Customer Management</span>
        </Link>

        <Link to="/admin-sales" className="nav-link">
          <i className="bi bi-bar-chart-fill"></i>
          <span className="ms-2">Sales</span>
        </Link>

        <Link to="/admin-feedback" className="nav-link">
          <i className="bi bi-chat-dots-fill"></i>
          <span className="ms-2">Feedback</span>
        </Link>

        <Link to="/admin-settings" className="nav-link">
          <i className="bi bi-gear-fill"></i>
          <span className="ms-2">Settings</span>
        </Link>

          <Link
          to="#"
          className="nav-link"
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
        >
          <i className="bi bi-box-arrow-in-right"></i>
          <span className="ms-2">Logout</span>
        </Link>
        
      </nav>
    </div>
       {/* Page Content */}
      <main className="flex-grow-1 p-4">
        {children}
      </main>
    </div>
  );
}

export default AdminSidebar;
