import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/AdminSidebar";

// Helper function to read error responses
async function getErrorMessage(response) {
  const responseText = await response.text();

  if (!responseText) {
    return `Request failed with status ${response.status}`;
  }

  try {
    const errorData = JSON.parse(responseText);
    return errorData.message || errorData.error || responseText;
  } catch {
    return responseText;
  }
}

export default function EditCourse() {
  const { courseName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [course, setCourse] = useState(location.state?.course ?? null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch course details if course is not available in navigation state
  useEffect(() => {
    if (course) return;

    let ignore = false;

    async function fetchCourse() {
      try {
        setError("");

        const response = await fetch("http://localhost:8080/course");
        console.log("Fetching course details for:", response);
        if (!response.ok) {
          throw new Error(await getErrorMessage(response));
        }

        const courseList = await response.json();

        const foundCourse = courseList.find((c) => c.name === courseName);

        if (!foundCourse) {
          throw new Error("Course not found.");
        }

        if (!ignore) {
          setCourse(foundCourse);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Unable to load course.");
        }
      }
    }

    fetchCourse();

    return () => {
      ignore = true;
    };
  }, [course, courseName]);

  // Handle input changes
  function handleChange(e) {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  }

  // Handle course update
  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = new FormData();

      // Append course details
      [
        "name",
        "description",
        "originalPrice",
        "discountedPrice",
        "updatedOn",
      ].forEach((key) => {
        data.append(key, course[key] ?? "");
      });

      // Append image only if a new image is selected
      if (image) {
        data.append("courseImg", image);
      }

      const response = await fetch(
        "http://localhost:8080/updateCourseDetailsForm",
        {
          method: "PUT",
          body: data,
        },
      );

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
      }

      // alert("Course updated successfully!");
      // navigate("/admin-courses");
      navigate("/admin-courses", {
        state: {
          successMessage: "Course details updated successfully!",
        },
      });
    } catch (err) {
      console.error("Error updating course:", err);
      setError(err.message || "Unable to update course.");
    } finally {
      setLoading(false);
    }
  }

  // Display loading or error if course is unavailable
  if (!course) {
    return (
      <AdminSidebar>
        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <p>Loading course...</p>
        )}
      </AdminSidebar>
    );
  }

  return (
    <AdminSidebar>
      <h2>Course Management</h2>
      <p>Edit course below...</p>

      <section className="mt-5">
        <h3 className="text-center">Edit Course</h3>

        <div className="row justify-content-center">
          <div
            className="card shadow p-4 p-md-5"
            style={{ width: "min(100%, 700px)" }}
          >
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Course Name :</label>

                <input
                  name="name"
                  value={course.name ?? ""}
                  className="form-control"
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Course Description :</label>

                <textarea
                  name="description"
                  value={course.description ?? ""}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Course Original Price :</label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="originalPrice"
                  value={course.originalPrice ?? ""}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Course Discounted Price :</label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="discountedPrice"
                  value={course.discountedPrice ?? ""}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Course Updated On :</label>

                <input
                  name="updatedOn"
                  value={course.updatedOn ?? ""}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Course Image :</label>

                <div className="d-flex align-items-center gap-3 flex-wrap">
                  {course.imageUrl && (
                    <img
                      src={course.imageUrl}
                      alt="Current course"
                      width="150"
                    />
                  )}

                  <input
                    type="file"
                    accept=".jpg,.jpeg,image/jpeg"
                    className="form-control"
                    onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                  />
                </div>

                <small className="text-muted">
                  Choose a file only if you want to replace the current image.
                </small>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Course Details"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </AdminSidebar>
  );
}
