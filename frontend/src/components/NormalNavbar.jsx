function NormalNavbar() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              src="/images/logo.png"
              alt="Smart Programming Logo"
              width="60"
            />
            <span className="h3 text-white">
              Smart Programming
            </span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link text-white" href="/">
                  Home
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link text-white dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  More
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Online Batch Details
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </li>
            </ul>

            <a href="/login" className="btn btn-info ms-lg-5">
              Login
            </a>

            <a href="/register" className="btn btn-info ms-lg-4">
              Register
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NormalNavbar;