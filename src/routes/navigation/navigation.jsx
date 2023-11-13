import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <Fragment>
      <section className="flex justify-between m-[25px] sm:mx-[50px] sm:mt-[50px] text-colorText">
        <nav className="" id="logo">
          <Link className="h2tag font-black sm:h1tag" to="/">
            Re-Re
          </Link>
        </nav>
        <nav className="font-medium self-center" id="naivgation">
          <Link
            className="h4tag pl-[25px] tracking-wide sm:pl-[60px] lg:h4tag"
            to="/login"
          >
            LogIn
          </Link>
          <Link
            className="h4tag pl-[25px] tracking-wide sm:pl-[60px] lg:h4tag"
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
