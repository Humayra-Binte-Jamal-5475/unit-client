import { useRef, useEffect } from "react";
import { animate } from "motion";
import img1 from "../assets/banner-img1.jpg";
import img2 from "../assets/banner-img2.jpg";

/*************************************************
 * FancyBanner — automatic sliding apartment images
 * Requirements honoured: only use existing imports
 *************************************************/
const Banner = () => {
  const trackRef = useRef(null);

  /* Seamless sideways loop: translate X from 0% to -100% over 12s
     The track contains 2× the image set so you never see a gap. */
  useEffect(() => {
    if (trackRef.current) {
      animate(
        trackRef.current,
        { x: ["0%", "-100%"] },
        {
          duration: 12,
          repeat: Infinity,
          easing: "linear",
        }
      );
    }
  }, []);

  const images = [img1, img2];

  return (
    <section className="relative h-[60vh] w-full overflow-hidden rounded-2xl shadow-xl bg-[#F4EDE4] my-10">
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

      {/* Sliding track */}
      <div ref={trackRef} className="absolute inset-0 flex z-0">
        {/* duplicate image array twice for seamless loop */}
        {[...images, ...images].map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`slide-${idx}`}
            className="h-full w-full flex-shrink-0 object-cover"
          />
        ))}
      </div>

      {/* Text overlay */}
      <div className="relative z-20 h-full flex flex-col justify-center pl-8 md:pl-16 text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
          Experience Elevated Living
        </h1>
        <p className="mt-4 max-w-md text-lg md:text-2xl drop-shadow-md">
          Modern apartments, premium amenities, and a community that feels like family.
        </p>
        <button className="mt-6 self-start bg-[#334155] hover:bg-[#1F1F1F] text-[#FAF9F6] font-semibold px-6 py-3 rounded-full shadow-md">
          Explore Apartments
        </button>
      </div>
    </section>
  );
};

export default Banner;




