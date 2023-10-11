import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <Fragment>
      <section className="flex justify-between mx-[50px] mt-[50px] max-[450px]:m-[25px] text-colorText">
        <nav className="" id="logo">
          <Link className="h1tag font-black" to="/">
            Re-Re
          </Link>
        </nav>
        <nav className="font-medium self-center" id="naivgation">
          <Link
            className="h4tag pl-[60px] tracking-wide max-[450px]:pl-[25px] "
            to="/login"
          >
            LogIn
          </Link>
          <Link
            className="h4tag pl-[60px] tracking-wide max-[450px]:pl-[25px] "
            to="/register"
          >
            SignUp
          </Link>
        </nav>
      </section>
    </Fragment>
  );
}

export default Navigation;
