import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/AdminSidebar";
// import { COURSE_URL, readError } from "./adminApi";

const initialForm = {
  name: "", description: "", originalPrice: "", discountedPrice: "", updatedOn: ""
};

export default function AddCourse() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!image) {
      setError("Please select a course image.");
      return;
    }
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append("image", image); // Must match @RequestParam("image") in Spring Boot.

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/course", { method: "POST", body: formData });
      if (!response.ok) throw new Error(await readError(response));
      setSuccess("Course added successfully.");
      setTimeout(() => navigate("/admin-courses"), 700);
    } catch (err) {
      setError(err.message || "Unable to add course.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminSidebar>
      <h2>Course Management</h2>
      <p>Add course below...</p>
      <section className="mt-5">
        <h3 className="text-center">Add Course</h3>
        <div className="row justify-content-center">
          <div className="card shadow p-4 p-md-5" style={{ width: "min(100%, 600px)" }}>
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Course Name :</label>
                <input name="name" value={form.name} onChange={handleChange}
                  className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Course Description :</label>
                <textarea name="description" value={form.description} onChange={handleChange}
                  className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Course Original Price :</label>
                <input type="number" min="0" step="0.01" name="originalPrice"
                  value={form.originalPrice} onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Course Discounted Price :</label>
                <input type="number" min="0" step="0.01" name="discountedPrice"
                  value={form.discountedPrice} onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Course Updated On :</label>
                <input name="updatedOn" value={form.updatedOn} onChange={handleChange}
                  className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Course Image :</label>
                <input type="file" accept=".jpg,.jpeg,image/jpeg" className="form-control"
                  onChange={(e) => setImage(e.target.files?.[0] ?? null)} required />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Adding..." : "Add Course"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </AdminSidebar>
  );
}
