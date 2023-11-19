import React, { Fragment } from "react";

import Footer from "./footer/footer";

function Home() {
  return (
    <Fragment>
      <main className="flex">
        <section className="flex flex-col justify-center items-center mx-[25px] my-[30px] sm:mx-[50px] sm:my-[40px] lg:mt-[60px]">
          <p className="text-colorText text-[3rem] leading-[50px] text-center tracking-tight font-black sm:text-[4rem] sm:leading-[65px] md:text-[5rem] md:leading-[80px] lg:text-[6rem] lg:leading-[110px]">
            A tool for
            <br />
            Recording and Reviewing
            <br />
            your learning
          </p>
          <p className="h4tag w-5/6 text-center font-normal tracking-wide mt-[50px] sm:text-[15px] sm:mt-[50px] sm:w-7/8 md:text-[17px] md:mt-[60px] lg:text-[20px] lg:mt-[70px]">
            Introducing the app, the ultimate solution for effortless Note
            Tracking. With my intuitive interface and powerful features, you can
            seamlessly record, organize, and review your notes like never
            before. Stay organized and in control with our user-friendly app,
            making note-taking a breeze.
          </p>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}

export default Home;
