import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#334155] text-[#FAF9F6] py-12 px-6 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand & tagline */}
        <div>
          <h3 className="text-2xl font-extrabold mb-3 flex items-center gap-2">
            Unité
          </h3>
          <p className="text-sm text-[#F4EDE4]">
            Elegant living spaces thoughtfully designed for modern life. Experience comfort and community under one roof.
          </p>
        </div>

        {/* About links */}
        <div>
          <h4 className="font-semibold mb-3 text-[#DAA49A]">About</h4>
          <ul className="space-y-2 text-[#F4EDE4] text-sm">
            <li><a href="#about" className="hover:underline">Our Story</a></li>
            <li><a href="#contact" className="hover:underline">Contact Us</a></li>
            <li><a href="#team" className="hover:underline">Meet the Team</a></li>
          </ul>
        </div>

        {/* Explore links */}
        <div>
          <h4 className="font-semibold mb-3 text-[#DAA49A]">Explore</h4>
          <ul className="space-y-2 text-[#F4EDE4] text-sm">
            <li><a href="/apartments" className="hover:underline">Apartments</a></li>
            <li><a href="/coupons" className="hover:underline">Coupons & Offers</a></li>
            <li><a href="/dashboard" className="hover:underline">Resident Portal</a></li>
          </ul>
        </div>

        {/* Social */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h4 className="font-semibold mb-3 text-[#DAA49A]">Follow Us</h4>
          <div className="flex space-x-4 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#F4EDE4] hover:text-white"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#F4EDE4] hover:text-white"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#F4EDE4] hover:text-white"><FaLinkedin /></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#F4EDE4] hover:text-white"><FaGithub /></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#F4EDE4]/20 mt-10 pt-4 text-center text-[#F4EDE4] text-sm">
        © {new Date().getFullYear()} Unité. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

