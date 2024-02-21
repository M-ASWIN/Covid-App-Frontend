import Button from "@mui/material/Button";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const Navbar = () => {
  const { id } = useContext(UserContext);
  return (
    <div className="navbar">
      <Link href="/" className="left" >
        <div >
          <h2>Covid App</h2>
        </div>
      </Link>
      <div className="right">
        {id === 1 && (
          <Button className="btn">
            <Link className="link" to={"/addcenter"}>
              Add Centers
            </Link>
          </Button>
        )}
        <Button className="btn">
          <Link className="link" to={"/bookslot"}>
            Book Slot
          </Link>
        </Button>
        <Button className="btn">
          <Link className="link" to={"/login"}>
            Login
          </Link>
        </Button>
        <Button className="btn">
          <Link className="link" to={"/register"}>
            Register
          </Link>
        </Button>
      </div>
    </div>
  );
};
