import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const handleAdminLogin = async(event) => {
    event.preventDefault();
    const formData = {
        email: event.target.email.value,
        password: event.target.password.value
    };
    console.log("Admin login form data:", formData);

    try {
        const response = await fetch("http://localhost:8080/adminLogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const adminData = await response.json();
            console.log("Login successful:", adminData);
            alert("Login successful!");
             
            sessionStorage.setItem("loggedInAdmin", JSON.stringify(adminData));
            navigate("/admin-profile");

        } else {
            const errorMessage = await response.text();
            alert(errorMessage || "Invalid email or password");
        }

    } catch (error) {
        console.error(error);
        alert("Unable to connect to the backend");
    }
  };

  return (
    <main className="admin-login-page">
      <div className="card shadow admin-login-card">
        <div className="card-body text-center">
          <h4 className="card-title py-4 text-decoration-underline">
            Admin Login
          </h4>

          <form onSubmit={handleAdminLogin}>
            <div className="mb-3">
              <label className="form-label">
                Admin Email :
              </label>

              <input
                type="email"
                className="form-control"
                name="email"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Admin Password :
              </label>

              <input
                type="password"
                className="form-control"
                name="password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default AdminLogin;
