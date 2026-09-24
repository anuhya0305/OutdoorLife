import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-14">

      <div className="max-w-[1400px] mx-auto px-8 grid md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-2xl font-bold text-green-400">
            🏕 OutdoorLife
          </h2>

          <p className="mt-4 text-gray-400">
            Gear Up. Explore More. Live Wild.
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-4">
            Quick Links
          </h3>

          <div className="flex flex-col gap-1">
            <Link to="/" className="hover:text-green-400">Home</Link>
            <Link to="/shop" className="hover:text-green-400">Shop</Link>
            <Link to="/contact" className="hover:text-green-400">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-4">
            Customer Care
          </h3>

          <div className="flex flex-col gap-1">
            <Link to="/help#faqs" className="hover:text-green-400">FAQs</Link>
            <Link to="/help#returns" className="hover:text-green-400">Returns</Link>
            <Link to="/help#privacy" className="hover:text-green-400">Privacy Policy</Link>
          </div>
        </div>

        <div>

          <h3 className="font-bold mb-4">
            Follow Us
          </h3>

          <div className="flex gap-4 text-2xl">

            <FaFacebook />

            <FaInstagram />

            <FaTwitter />

          </div>

        </div>

      </div>

      <hr className="my-8 border-gray-700"/>

      <p className="text-center text-gray-400">
        © 2026 OutdoorLife | All Rights Reserved.
      </p>

    </footer>
  );
};

export default Footer;