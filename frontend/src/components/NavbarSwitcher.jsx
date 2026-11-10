import StudentNavbar from "./StudentNavbar";
import NormalNavbar from "./NormalNavbar";

function NavbarSwitcher() {

    const loggedInUser = JSON.parse(
        sessionStorage.getItem("loggedInUser") || "null"
    );

    if (loggedInUser) {
        return <StudentNavbar />;
    }

    return <NormalNavbar />;
}

export default NavbarSwitcher;