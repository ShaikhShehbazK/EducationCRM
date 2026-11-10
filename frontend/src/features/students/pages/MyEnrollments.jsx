import StudentNavbar from "../../../components/StudentNavbar";
import Footer from "../../../components/Footer";
import { useEffect, useState } from "react";

function MyEnrollments() {
  const loggedInUser = JSON.parse(
    sessionStorage.getItem("loggedInUser") || "null"
  );

  const userEmail = loggedInUser?.email;

  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userEmail) {
      setError("Please login to view your enrollments.");
      setLoading(false);
      return;
      
    }

    fetch(
      `http://localhost:8080/getPurchasedCourses?email=${encodeURIComponent(userEmail)}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch purchased courses.");
        }

        return response.json();
      })
      .then((data) => {
        setEnrollments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching enrollments:", err);
        setError("Unable to load your enrollments. Please try again.");
        setLoading(false);
      });
  }, [userEmail]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <StudentNavbar />

      <main className="container-fluid flex-grow-1">
        <section className="container py-5 bg-light h-100">
          <h3 className="text-center mb-4">My Enrollments</h3>

          {loading && (
            <p className="text-center">Loading your enrollments...</p>
          )}

          {error && (
            <p className="text-center text-danger">{error}</p>
          )}

          {!loading && !error && enrollments.length === 0 && (
            <h5 className="text-center text-danger py-5">
              Sorry, you didn't purchase any course yet!
            </h5>
          )}

          {!loading && !error && enrollments.length > 0 && (
            <div className="row g-4">
              {enrollments.map((course, index) => (
                <div
                  className="col-lg-3 col-md-6"
                  key={`${course.courseName}-${course.purchaseDate}-${index}`}
                >
                  <div className="card h-100">
                    <img
                      src={course.imageUrl}
                      className="card-img-top"
                      alt={course.courseName}
                    />

                    <div className="card-body">
                      <h5 className="card-title">
                        {course.courseName}
                      </h5>

                      <p className="card-text">
                        {course.description}
                      </p>

                      <button className="btn-outline-primary btn">
                        Start Course
                      </button>
                    </div>

                    <div className="card-footer text-body-secondary">
                      Updated: {course.updatedOn}
                    </div>

                    <div className="card-footer text-body-secondary">
                      <div>Purchased On:</div>
                      <strong>{course.purchaseDate}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default MyEnrollments;