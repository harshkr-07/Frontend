import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { FaUtensils, FaWineGlassAlt, FaRegSmileBeam, FaConciergeBell } from 'react-icons/fa';
import { assets } from '../assets/assets';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const About = () => {
  const whyChooseUsItems = [
    {
      icon: <FaUtensils className="text-red-500 text-6xl" />,
      title: 'Exceptional Quality',
      description:
        'We use only the freshest, high-quality ingredients to create dishes that capture the essence of authentic flavors.',
    },
    {
      icon: <FaWineGlassAlt className="text-red-500 text-6xl" />,
      title: 'Signature Flavors',
      description:
        'Experience a symphony of flavors with our curated menu that blends tradition with contemporary flair.',
    },
    {
      icon: <FaRegSmileBeam className="text-red-500 text-6xl" />,
      title: 'Friendly Atmosphere',
      description: 'Enjoy a warm and inviting atmosphere that makes every visit a memorable one.',
    },
    {
      icon: <FaConciergeBell className="text-red-500 text-6xl" />,
      title: 'Personalized Service',
      description:
        'Our attentive staff ensures that every guest feels valued and appreciated.',
    },
  ];

  // Split into chunks of 2 items per slide
  const slides = [];
  for (let i = 0; i < whyChooseUsItems.length; i += 2) {
    slides.push(whyChooseUsItems.slice(i, i + 2));
  }

  return (
    <div className="bg-gray-100 py-20 px-6 md:px-20">
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto">
        <div className="w-full md:w-1/2 mb-12 md:mb-0">
          <img
            src={assets.hero6}
            alt="About Us"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-1 md:pl-12">
          <h1 className="text-5xl font-bold mb-6 text-gray-800">
            Discover the Art of Fine Dining
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            At our restaurant, every dish is a masterpiece crafted with passion,
            tradition, and a touch of innovation. From handpicked ingredients to a cozy, welcoming ambiance,
            we bring you a dining experience that delights the senses.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Why Choose Us</h2>
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={6000}
          // Removed rounded-lg and shadow-lg here for transparency
        >
          {slides.map((group, idx) => (
            <div
              key={idx}
              className="flex justify-center gap-8 px-6 py-12"
              // Removed rounded-lg and shadow-lg here too
            >
              {group.map((item, i) => (
                <div key={i} className="flex items-center max-w-md">
                  <div className="mr-6">{item.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default About;
