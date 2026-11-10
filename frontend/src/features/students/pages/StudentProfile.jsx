
import Footer from "../../../components/Footer";
import { useLocation } from "react-router-dom";
import NavbarSwitcher from "../../../components/NavbarSwitcher";

function StudentProfile() {
    const user = JSON.parse(sessionStorage.getItem("loggedInUser") || "null");
    // const location = useLocation();
    // const user = location.state?.user;

      if (!user) {
        return <Navigate to="/login" replace />;
    }
    console.log("User data received in StudentProfile:", user);
  // const student = {
  //   name: "Deepak",
  //   email: "deepak@gmail.com",
  //   phone: "+91 62838-30308",
  //   city: "Chandigarh",
  // };

  return (
    <>
      <NavbarSwitcher />

      <main
        className="container-fluid"
        style={{ minHeight: "550px" }}
      >
        <section className="container py-5">
          <div className="row">
            {/* Profile Card */}
            <div className="col-lg-4 mb-4">
              <div className="card shadow">
                <div className="card-body">
                  <div className="text-center">
                    <i
                      className="bi bi-person-circle"
                      style={{ fontSize: "8rem" }}
                    ></i>

                    <h3>{user.name}</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* User Details */}
            <div className="col-lg-8">
              <div className="card shadow">
                <div className="card-body">
                  <div className="text-center">
                    <h4 className="mb-4">User Details</h4>

                    <table className="table table-striped table-hover table-bordered">
                      <tbody>
                        <tr>
                          <td>Name</td>
                          <td>{user.name}</td>
                        </tr>

                        <tr>
                          <td>Email</td>
                          <td>{user.email}</td>
                        </tr>

                        <tr>
                          <td>Phone No.</td>
                          <td>{user.phoneno}</td>
                        </tr>

                        <tr>
                          <td>City</td>
                          <td>{user.city}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default StudentProfile;
