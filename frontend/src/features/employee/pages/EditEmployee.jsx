
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/AdminSidebar";

function EditEmployee() {
  const location = useLocation();
  const navigate = useNavigate();

  const oldEmail = location.state?.employeeEmail;

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    phoneno: "",
    city: "",
  });

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch existing employee details
  useEffect(() => {
    const fetchEmployee = async () => {
      if (!oldEmail) {
        setErrorMsg("Employee email not provided.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/getEmployeeByEmail?email=${encodeURIComponent(oldEmail)}`
        );

        if (!response.ok) {
          throw new Error("Employee not found.");
        }

        const data = await response.json();

        setEmployee({
          name: data.name || "",
          email: data.email || "",
          password: data.password || "",
          phoneno: data.phoneno || "",
          city: data.city || "",
        });

      } catch (error) {
        setErrorMsg(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [oldEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  // Update employee details
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/updateEmployee?oldEmail=${encodeURIComponent(oldEmail)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employee),
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      navigate("/admin-employees", {
        state: { successMessage: "Employee details updated successfully!" },
      });

    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  if (loading) {
    return <div className="container p-4">Loading employee details...</div>;
  }

  return (
    <AdminSidebar>
    <div className="container-fluid p-0">

      <h2>Employee Management</h2>
      <p>Edit employee below...</p>

      <section className="mt-5">
        <h3 className="text-center">Edit Employee</h3>

        <div className="row justify-content-center">
          <div className="card shadow p-5" style={{ width: "50%" }}>

            {errorMsg && (
              <div className="alert alert-danger">{errorMsg}</div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">Name :</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={employee.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email Id :</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={employee.email}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password :</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={employee.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone No. :</label>
                <input
                  type="text"
                  name="phoneno"
                  className="form-control"
                  value={employee.phoneno}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">City :</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  value={employee.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Update Employee Details
              </button>

            </form>
          </div>
        </div>
      </section>

    </div>
    </AdminSidebar>
  );
}

export default EditEmployee;
