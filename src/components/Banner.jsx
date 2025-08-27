import { useEffect, useRef } from "react";
import img1 from "../assets/banner-img1.jpg";
import img2 from "../assets/banner-img2.jpg";
import img3 from "../assets/banner-img3.avif";
import img4 from "../assets/banner-img4.avif";

const images = [img1, img2, img3, img4];

const Banner = () => {
  const indexRef = useRef(0);
  const bgRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % images.length;
      if (bgRef.current) {
        bgRef.current.style.backgroundImage = `url(${images[indexRef.current]})`;
      }
    }, 5000); // change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={bgRef}
      className="relative h-[70vh] w-full flex items-center justify-center text-white px-6 transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `url(${img1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Text content */}
      <div className="relative z-10 text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-md">
          Welcome to Unité Living
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-xl mx-auto drop-shadow-sm">
          Smart, elegant apartments with everything you need for comfort and style.
        </p>
        <button className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition">
          Explore Apartments
        </button>
      </div>
    </section>
  );
};

export default Banner;






