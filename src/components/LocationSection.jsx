import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icon to avoid missing icon issue
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const LocationSection = () => {
  const position = [23.7806, 90.4074]; // Example: Dhaka, Bangladesh

  return (
    <section className="bg-[#FAF9F6] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#334155] mb-8">
          📍 Our Location
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Section */}
          <div className="text-gray-700 text-lg leading-relaxed">
            <p>
              Unité is located at the heart of the city, offering excellent connectivity
              to schools, hospitals, shopping centers, and public transportation. Whether
              you're walking or driving, getting here is effortless.
            </p>
            <ul className="mt-4 list-disc pl-5 space-y-2">
              <li>🚶 Just 5 minutes walk from Central Park</li>
              <li>🚌 Accessible via Route 6, 12, and 25</li>
              <li>🚗 Dedicated parking available</li>
              <li>🏥 Nearby hospital: CityCare Medical (2 km)</li>
            </ul>
          </div>

          {/* Map Section */}
          <div className="rounded-xl overflow-hidden shadow-lg h-96">
            <MapContainer center={position} zoom={15} scrollWheelZoom={false} className="h-full w-full">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position} icon={customIcon}>
                <Popup>
                  Unité Apartment Building<br />Dhaka, Bangladesh
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
