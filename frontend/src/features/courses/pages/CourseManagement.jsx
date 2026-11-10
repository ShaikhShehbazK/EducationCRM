import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import AdminLayout from "./AdminLayout";
import AdminSidebar from "../../../components/AdminSidebar";
import { useLocation } from "react-router-dom";
// import { COURSE_URL, DELETE_COURSE_URL, readError } from "./adminApi";


export default function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const location = useLocation();

  const successMessage = location.state?.successMessage;

  async function loadCourses() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8080/course");
      if (!response.ok) throw new Error(await readError(response));
      setCourses(await response.json());
    } catch (err) {
      setError(err.message || "Unable to load courses.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCourses();
  }, []);
  async function confirmDelete() {
    if (!selectedCourse) return;
    setDeleting(true);
    setError("");
    setSuccess("");
    try {
      // TODO: adjust URL/method to match your actual Spring Boot delete mapping.
      const response = await fetch(
        `${"http://localhost:8080/delete"}?courseName=${encodeURIComponent(selectedCourse.name)}`,
        { method: "DELETE" },
      );
      if (!response.ok) throw new Error(await readError(response));
      setSuccess("Course deleted successfully.");
      setSelectedCourse(null);
      await loadCourses();
    } catch (err) {
      setError(err.message || "Unable to delete course.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AdminSidebar>
      <h2>Course Management</h2>
      <p>Here you can add, update and delete courses.</p>

      <section className="mt-5">
        <Link to="/add-course" className="btn btn-primary">
          Add Course
        </Link>
      </section>
      {successMessage && (
        <div className="alert alert-success mt-4" role="alert">
          {successMessage}
        </div>
      )}

      <section className="mt-4">
        {success && (
          <div className="alert alert-success" role="alert">
            {success}
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {loading ? (
          <p>Loading courses...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered shadow bg-white align-middle">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Discounted Price</th>
                  <th>Course Image</th>
                  <th>Edit Course</th>
                  <th>Delete Course</th>
                </tr>
              </thead>
              <tbody>
                {courses.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No courses found.
                    </td>
                  </tr>
                ) : (
                  courses.map((course) => (
                    <tr key={course.id ?? course.name}>
                      <td>{course.name}</td>
                      <td>{course.discountedPrice}</td>
                      <td>
                        {/* <img src={course.imageUrl?.startsWith("http")
                        ? course.imageUrl : `http://localhost:8080${course.imageUrl || ""}`}
                        width="150" alt={course.name || "Course"} /> */}
                        <img
                          src={course.imageUrl}
                          width="150"
                          alt={course.name}
                        />
                      </td>
                      <td>
                        <Link
                          to={`/edit-course/${encodeURIComponent(course.name)}`}
                          state={{ course }}
                          className="btn btn-warning"
                          aria-label="Edit course"
                        >
                          <i className="bi bi-pencil-fill text-white" />
                        </Link>
                      </td>

                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => setSelectedCourse(course)}
                          aria-label="Delete course"
                        >
                          <i className="bi bi-trash-fill" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {selectedCourse && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{ background: "rgba(0,0,0,.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Course</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedCourse(null)}
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this course?</p>
                <strong>{selectedCourse.name}</strong>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedCourse(null)}
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={confirmDelete}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminSidebar>
  );
}
