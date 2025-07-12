const AboutTheBuilding = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 bg-[#FAF9F6] rounded-2xl shadow-lg text-[#1F1F1F]">
      <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-12 text-[#334155]">
        About <span className="text-[#B35648]">Unité</span>
      </h2>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Image section */}
        <div className="rounded-xl overflow-hidden shadow-md">
          <img
            src="https://images.unsplash.com/photo-1589652717521-10c0d092dea9"
            alt="Building exterior"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text content */}
        <div className="prose prose-lg md:prose-xl max-w-none text-justify leading-relaxed">
          <p>
            Nestled in the heart of Dhaka, <strong>Unité</strong> is more than just a building —
            it's a vertical community built for comfort and elegance. With 24 exclusive
            residences, each unit is crafted with floor-to-ceiling windows, smart-home
            integration, and sustainable design materials that reduce energy consumption.
          </p>
          <p>
            The building offers <span className="text-[#A3B18A] font-semibold">24/7 security</span>,
            underground parking, and a full-time concierge service. Residents enjoy luxury
            amenities such as a rooftop garden, a fully equipped fitness studio, and shared
            co-working lounges that promote both productivity and connection.
          </p>
          <p>
            Whether you're hosting a dinner party in the sky lounge or enjoying quiet
            mornings on your private balcony, <strong>Unité</strong> delivers an elevated
            lifestyle that blends modern luxury with everyday convenience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutTheBuilding;


