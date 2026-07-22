import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

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

          <p>Home</p>
          <p>Shop</p>
          <p>Contact</p>
        </div>

        <div>
          <h3 className="font-bold mb-4">
            Customer Care
          </h3>

          <p>FAQs</p>
          <p>Returns</p>
          <p>Privacy Policy</p>
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