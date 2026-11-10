import { Link, useLocation } from "react-router-dom";

export default function ErrorPage() {
  const location = useLocation();
  const message = location.state?.message || "Something went wrong.";

  return (
    <main className="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="text-center">
          <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
            <i className="bi bi-exclamation-circle-fill text-danger display-4" />
          </h2>
          <h3 className="h2 mb-2">Oops! Error Occurred...</h3>
          <p className="mb-5">{message}</p>
          <Link className="btn btn-dark rounded-pill px-5 fs-6" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
