import React, { Fragment } from "react";

import Footer from "./footer/footer";

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
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}

export default Home;
