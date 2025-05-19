import React from "react";
import { assets } from "../assets/assets";
import { Carousel } from "react-responsive-carousel";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const MotionLink = motion(Link);

const Header = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        interval={5000}
        className="h-full"
      >
        <div className="relative">
          <img
            src={assets.hero}
            alt="Slide 1"
            className="h-screen w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-start text-left px-6 md:px-20 bg-black/60">
            <motion.div
              className="text-white max-w-2xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.h1
                className="text-4xl md:text-6xl font-extrabold mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Your favourite food here
              </motion.h1>

              <motion.p
                className="text-lg md:text-2xl leading-relaxed text-gray-300 mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Experience culinary bliss with hand-picked ingredients, unique
                flavors, and heart-warming ambiance.
              </motion.p>

              <MotionLink
                to="/reservation"
                className="bg-white text-black font-semibold px-6 py-3  rounded hover:bg-red-500 hover:text-white transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <span className="text-red-500">●</span> Reservation
              </MotionLink>
            </motion.div>
          </div>
        </div>
        <div className="relative">
          <img
            src={assets.hero7}
            alt="Slide 2"
            className="h-screen w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-start text-left px-6 md:px-20 bg-black/60">
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-white mb-4"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              EATERY CAFE & RESTAURANT
            </motion.h1>
            <motion.p
              className="text-lg md:text-2xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Our mission is to provide an unforgettable experience
            </motion.p>
            <motion.button
              className="bg-white text-black font-semibold px-6 py-3 rounded hover:bg-red-500 hover:text-white transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Meet Our Chef
            </motion.button>
          </div>
        </div>
        <div className="relative">
          <img
            src={assets.hero8}
            alt="Slide 3"
            className="h-screen w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-start text-left px-6 md:px-20 bg-black/60">
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-white mb-4"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              YOUR PERFECT BREAKFAST
            </motion.h1>
            <motion.p
              className="text-lg md:text-2xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              The best dining quality can be here too!
            </motion.p>
            <motion.button
              className="bg-white text-black font-semibold px-6 py-3 rounded hover:bg-red-500 hover:text-white transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Discover Menu
            </motion.button>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Header;
