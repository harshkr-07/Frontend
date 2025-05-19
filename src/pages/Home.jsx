import React from "react";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import About from "../Components/About";
// import MenuPreview from '../Components/MenuPreview';
import Contact from "../Components/Contact";
import Menu from "../Components/Menu";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <About />
      {/* <MenuPreview /> */}
      <Menu />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
