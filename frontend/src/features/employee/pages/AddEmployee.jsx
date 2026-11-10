
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/AdminSidebar";

function AddEmployee() {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    phoneno: "",
    city: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/addEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      navigate("/admin-employees", {
        state: { successMessage: "Employee added successfully!" },
      });

    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <AdminSidebar>
    <div className="container-fluid p-0">

      <h2>Employee Management</h2>
      <p>Add employee below...</p>

      <section className="mt-5">
        <h3 className="text-center">Add Employee</h3>

        <div className="row justify-content-center">
          <div className="card shadow p-5" style={{ width: "40%" }}>

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
                  onChange={handleChange}
                  required
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
                Add Employee
              </button>

            </form>
          </div>
        </div>
      </section>

    </div>
    </AdminSidebar>
  );
}

export default AddEmployee;
