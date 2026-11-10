import { useState } from "react";
import NormalNavbar from "../../../components/NormalNavbar";
import Footer from "../../../components/Footer";

function Register() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    const form = event.target;

    const user = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value,
      phoneno: form.phoneno.value.trim(),
      city: form.city.value.trim(),
    };

    // Frontend validation
    const namePattern = /^[a-zA-Z ]{5,25}$/;
    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^[a-zA-Z0-9]{5,25}$/;
    const phonePattern = /^[0-9]{10}$/;
    const cityPattern = /^[a-zA-Z ]{3,25}$/;

    if (!namePattern.test(user.name)) {
      setMessage("Name must be 5–25 letters.");
      setMessageType("danger");
      return;
    }

    if (!emailPattern.test(user.email)) {
      setMessage("Please enter a valid email address.");
      setMessageType("danger");
      return;
    }

    if (!passwordPattern.test(user.password)) {
      setMessage("Password must be 5–25 letters or numbers.");
      setMessageType("danger");
      return;
    }

    if (!phonePattern.test(user.phoneno)) {
      setMessage("Phone number must contain exactly 10 digits.");
      setMessageType("danger");
      return;
    }

    if (!cityPattern.test(user.city)) {
      setMessage("City must be 3–25 letters.");
      setMessageType("danger");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        // throw new Error(`Registration failed (${response.status})`);
        const errorData = await response.json();
        console.log("Error Data:", errorData.phoneno);
  const backendMessage =
    errorData.phoneno || "Registration failed";

  setMessage(backendMessage);
  setMessageType("danger");

  return;
      }

      const result = await response.json();

      setMessage(
        result.id
          ? `Registration successful!`
          : "Registration successful!"
      );
      setMessageType("success");

      form.reset();
    } catch (error) {
      console.error("Registration error:", error);

      setMessage(
        error.message.includes("Registration failed")
          ? error.message
          : "Unable to connect to the backend. Please check whether Spring Boot is running."
      );
      setMessageType("danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NormalNavbar />

      <main className="container-fluid" style={{ minHeight: "550px" }}>
        <section className="container py-5 bg-light">
          <h3 className="text-center mb-4">Register Here</h3>

          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6">
              <form onSubmit={handleRegister}>
                <div className="card shadow p-5">
                  {message && (
                    <div
                      className={`alert alert-${messageType}`}
                      role="alert"
                    >
                      {message}
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Name :</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      minLength={5}
                      maxLength={25}
                      required
                    />
                  </div>

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
                      minLength={5}
                      maxLength={25}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone No. :</label>
                    <input
                      type="tel"
                      name="phoneno"
                      className="form-control"
                      maxLength={10}
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">City :</label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      minLength={3}
                      maxLength={25}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register"}
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

export default Register;