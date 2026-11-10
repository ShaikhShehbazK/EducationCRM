
import NormalNavbar from "../../../components/NormalNavbar";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  // const handleLogin = (event) => {
  //   event.preventDefault();

  //   // Backend login API will be connected later.
  //   alert("Login form submitted!");
  // };
  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = {
        email: event.target.email.value,
        password: event.target.password.value
    };

    try {
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const userData = await response.json();
            console.log("Login successful:", userData);
            alert("Login successful!");
             
            sessionStorage.setItem("loggedInUser", JSON.stringify(userData));
            navigate("/user-profile");

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
    <>
      <NormalNavbar />

      <main
        className="container-fluid"
        style={{ minHeight: "550px" }}
      >
        <section className="container py-5 bg-light">
          <h3 className="text-center mb-4">Login Here</h3>

          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6">
              <form onSubmit={handleLogin}>
                <div className="card shadow p-5">
                  <div className="mb-3">
                    <label className="form-label">Email Id :</label>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      required
                    />

                    <div className="form-text">
                      We'll never share your email with anyone else.
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password :</label>

                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Login;
