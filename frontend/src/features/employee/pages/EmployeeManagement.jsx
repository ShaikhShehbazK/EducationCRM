
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminSidebar from "../../../components/AdminSidebar";

function EmployeeManagement() {
  const navigate = useNavigate();
  const location = useLocation();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedEmail, setSelectedEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [successMsg, setSuccessMsg] = useState(
    location.state?.successMessage || ""
  );
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/employee"
      );

      if (!response.ok) {
        throw new Error("Unable to fetch employees");
      }

      const data = await response.json();

      setEmployees(data);
      setErrorMsg("");

    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Open delete confirmation modal
  const confirmDelete = (email) => {
    setSelectedEmail(email);
    setShowModal(true);
  };

  // Delete employee
  const deleteEmployee = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/deleteEmployee?email=${encodeURIComponent(selectedEmail)}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setSuccessMsg("Employee deleted successfully!");
      setErrorMsg("");
      setShowModal(false);
      setSelectedEmail("");

      fetchEmployees();

    } catch (error) {
      setErrorMsg(error.message);
      setShowModal(false);
    }
  };

  return (
    <AdminSidebar>
      <div className="container-fluid p-0">

        <h2>Employee Management</h2>
        <p>Here you can add, update and delete employees</p>

        {/* Add Employee Button */}
        <section className="mt-5">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/add-employee")}
          >
            Add Employee
          </button>
        </section>

        <section className="mt-5">

          {/* Success Message */}
          {successMsg && (
            <div className="alert alert-success">
              {successMsg}
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="alert alert-danger">
              {errorMsg}
            </div>
          )}

          {/* Employee Table */}
          {loading ? (
            <p>Loading employees...</p>
          ) : employees.length === 0 ? (
            <div className="alert alert-warning">
              No employee found
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered shadow">

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone No.</th>
                    <th>City</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>

                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>{employee.phoneno}</td>
                      <td>{employee.city}</td>

                      {/* Update Button */}
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() =>
                            navigate("/edit-employee", {
                              state: {
                                employeeEmail: employee.email,
                              },
                            })
                          }
                        >
                          <i className="bi bi-pencil-fill text-white"></i>
                        </button>
                      </td>

                      {/* Delete Button */}
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            confirmDelete(employee.email)
                          }
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </section>

        {/* Delete Confirmation Modal */}
        {showModal && (
          <div
            className="modal d-block"
            tabIndex="-1"
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <div className="modal-dialog">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title">
                    Delete Employee
                  </h5>

                  <button
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <p>
                    Are you sure you want to delete this employee?
                  </p>
                </div>

                <div className="modal-footer">

                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn btn-primary"
                    onClick={deleteEmployee}
                  >
                    Delete
                  </button>

                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </AdminSidebar>
  );
}

export default EmployeeManagement;
