import React from "react";
import { Fragment } from "react";

import Footer from "../footer/footer.component";

function Home() {
  return (
    <Fragment>
      <main className="flex">
        <section className="flex flex-col justify-center items-center mx-[50px] mt-[80px] max-[450px]:mt-[30px] max-[450px]:mx-[25px]">
          <p className="text-colorText text-[10rem] leading-[170px] text-center tracking-tight font-black  max-[768px]:text-[5rem] max-[450px]:text-[3rem] max-[450px]:leading-[50px] max-[450px]:tracking-normal">
            A tool for
            <br />
            Recording and Reviewing
          </p>
          <p className="h3tag w-3/4 text-center font-normal tracking-wide mt-[70px] max-[450px]:text-[12px] max-[450px]:mt-[40px] max-[450px]:w-7/8">
            Introducing our app, the ultimate solution for effortless Note
            Tracking. With our intuitive interface and powerful features, you
            can seamlessly record, organize, and review your notes like never
            before. Stay organized and in control with our user-friendly app,
            making note-taking a breeze.
          </p>
          <h1 className="mt-[40px] h1tag">Recording and Reviewing</h1>
          <h2 className="mt-[20px] h2tag">Recording and Reviewing</h2>
          <h3 className="mt-[20px] h3tag">Recording and Reviewing</h3>
          <h4 className="mt-[20px] h4tag">Recording and Reviewing</h4>
          <h5 className="mt-[20px] h5tag">Recording and Reviewing</h5>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}

export default Home;
