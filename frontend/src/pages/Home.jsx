import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import NavbarSwitcher from "../components/NavbarSwitcher";

function Home() {
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(
    sessionStorage.getItem("loggedInUser") || "null",
  );
  const userEmail = loggedInUser?.email;

  const isLoggedIn = loggedInUser !== null;

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingPayment, setProcessingPayment] = useState(false);
  const [enrollments, setEnrollments] = useState([]);

  // Format date: 2026-11-06 7:55:50 AM
  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    const time =
      `${hours}:` +
      `${String(date.getMinutes()).padStart(2, "0")}:` +
      `${String(date.getSeconds()).padStart(2, "0")} ${ampm}`;

    return `${year}-${month}-${day} ${time}`;
  };

  useEffect(() => {
    if (!userEmail) {
      // setError("Please login to view your enrollments.");
      setEnrollments([]);
      setLoading(false);
      return;
    }

    fetch(
      `http://localhost:8080/getPurchasedCourses?email=${encodeURIComponent(userEmail)}`,
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

  // Fetch courses from Spring Boot
  useEffect(() => {
    fetch("http://localhost:8080/course")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        return response.json();
      })
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setError("Unable to load courses. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Load Razorpay Checkout script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  // Buy course
  const handleBuy = async (course) => {
    if (processingPayment) return;

    try {
      setProcessingPayment(true);

      // Load Razorpay Checkout
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        throw new Error("Unable to load Razorpay Checkout");
      }

      // Course amount in paise
      const amount = Math.round(Number(course.discountedPrice) * 100);

      // Razorpay Checkout options
      const options = {
        key: "rzp_test_TwNJ2oEnNLlaTx",

        amount: amount,
        currency: "INR",

        name: "Education CRM",
        description: course.name,
        image: "http://localhost:5173/images/logo.png",

        handler: async function (paymentResponse) {
          try {
            console.log("Payment response:", paymentResponse);

            // Prepare purchase date and time
            const purchaseDate = formatDateTime(new Date());

            // Prepare order details
            const data = {
              courseName: course.name,
              userEmail: loggedInUser.email,
              courseAmount: String(amount),
              dateOfPurchase: purchaseDate,
              rzpPaymentId: paymentResponse.razorpay_payment_id,
            };

            console.log("Data to send to backend:", data);

            // Store order details in Spring Boot
            const response = await fetch(
              "http://localhost:8080/storeOrderDetails",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              },
            );

            if (!response.ok) {
              throw new Error("Unable to store order details");
            }

            const result = await response.text();

            console.log("Backend response:", result);

            alert("Payment Successful!");
            alert("Congratulations! Your course has been purchased.");

            navigate("/my-enrollments");
          } catch (error) {
            console.error("Order storing error:", error);
            alert("Payment completed, but order details could not be saved.");
            setProcessingPayment(false);
          }
        },

        prefill: {
          name: loggedInUser?.name || "",
          email: loggedInUser?.email || "",
        },

        theme: {
          color: "#0d6efd",
        },

        modal: {
          ondismiss: function () {
            setProcessingPayment(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        alert("Payment failed. Please try again.");
        setProcessingPayment(false);
      });

      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert(error.message || "Unable to start payment");
      setProcessingPayment(false);
    }
  };

  return (
    <>
      <NavbarSwitcher />

      <main className="container-fluid">
        {/* Banner */}
        <section>
          <img
            src="/images/banner.jpg"
            alt="Smart Programming Banner"
            className="img-fluid w-100"
          />
        </section>

        {/* Courses */}
        <section className="container py-5 bg-light">
          <h3 className="text-center mb-4">Our Courses</h3>

          {/* Loading */}
          {loading && <p className="text-center">Loading courses...</p>}

          {/* Error */}
          {error && <p className="text-center text-danger">{error}</p>}

          {/* Course cards */}
          {!loading && !error && (
            <div className="row g-4">
              {courses.length === 0 ? (
                <p className="text-center">No courses available.</p>
              ) : (
                courses.map((course) => (
                  <div className="col-lg-3 col-md-6" key={course.id}>
                    <div className="card h-100">
                      <img
                        src={course.imageUrl}
                        className="card-img-top"
                        alt={course.name}
                      />

                      <div className="card-body">
                        <h5 className="card-title">{course.name}</h5>

                        <p className="card-text">{course.description}</p>

                        <p>
                          <strong>Price:</strong>{" "}
                          <del>Rs. {course.originalPrice}</del>{" "}
                          <span className="bg-info p-1">
                            Rs. {course.discountedPrice}
                          </span>
                        </p>

                        <button
                          onClick={() => {
                            const isPurchased = enrollments.some(
                              (enrollment) =>
                                enrollment.courseName === course.name,
                            );

                            if (isPurchased) {
                              navigate("/my-enrollments");
                            } else {
                              handleBuy(course);
                            }
                          }}
                          className={`btn ${
                            enrollments.some(
                              (enrollment) =>
                                enrollment.courseName === course.name,
                            )
                              ? "btn-outline-primary"
                              : "btn-primary"
                          }`}
                          disabled={processingPayment}
                        >
                          {enrollments.some(
                            (enrollment) =>
                              enrollment.courseName === course.name,
                          )
                            ? "Start Course"
                            : processingPayment
                              ? "Processing..."
                              : "Buy Now"}
                        </button>
                      </div>

                      <div className="card-footer text-body-secondary">
                        Updated: {course.updatedOn}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;
