
import { Link, useLocation, useNavigate } from "react-router-dom";

function StudentNavbar() {
  const navigate = useNavigate();
   const user = JSON.parse(sessionStorage.getItem("loggedInUser") || "null");

   const handleLogout = () => {
    sessionStorage.removeItem("loggedInUser");
    // window.location.href = "/login"; // Redirect to login page after logout
     navigate("/login");
  }
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src="/images/logo.png"
              alt="Smart Programming Logo"
              width="60"
            />
            <span className="h3 text-white">Smart Programming</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#studentNavbar"
            aria-controls="studentNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

         <div className="collapse navbar-collapse" id="studentNavbar">
  <ul className="navbar-nav ms-auto align-items-center mb-0">
    <li className="nav-item">
      <Link className="nav-link text-white" to="/">
        Home
      </Link>
    </li>

    <li className="nav-item">
      <Link className="nav-link text-white" to="/my-enrollments">
        My Enrollments
      </Link>
    </li>

    <li className="nav-item ms-lg-5">
      <Link className="nav-link text-white d-flex align-items-center" to="/user-profile">
        <i
          className="bi bi-person-circle"
          style={{ fontSize: "2rem" }}
        ></i>
        <span className="ms-2">Hello, {user? user.name : "User"}</span>
      </Link>
    </li>
  </ul>

  <button onClick={handleLogout} className="btn btn-danger ms-2">
    Logout
  </button> 
</div>
        </div>
      </nav>
    </header>
  );
}

export default StudentNavbar;
