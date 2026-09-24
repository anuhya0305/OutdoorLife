import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const faqs = [
  {
    q: "Is this a real store?",
    a: "No. OutdoorLife is a portfolio demo. Orders are saved so you can try the full flow, but no payment is taken and nothing is shipped.",
  },
  {
    q: "Which payment methods can I pick?",
    a: "UPI, credit card, debit card, net banking, or cash on delivery. Payment is simulated, so never enter real card details.",
  },
  {
    q: "Are there discount codes?",
    a: "Yes: WELCOME20 takes 20% off your order and SAVE10 takes 10% off. Enter one on the checkout page.",
  },
  {
    q: "Where can I see my orders?",
    a: "Log in and open My Orders from the top navigation. You only ever see your own orders.",
  },
  {
    q: "Why does the store sometimes take a minute to load?",
    a: "The backend runs on a free hosting tier that sleeps when idle. The first visit after a quiet spell wakes it up, which takes about a minute.",
  },
];

const Help = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <div className="pt-24 md:pt-28 pb-12 md:pb-20 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-6 space-y-8">

        <h1 className="text-3xl md:text-4xl font-bold text-center">Help Center</h1>

        <section id="faqs" className="bg-white rounded-xl shadow p-6 md:p-8 scroll-mt-28">
          <h2 className="text-2xl font-bold text-green-700 mb-4">FAQs</h2>
          <div className="space-y-5">
            {faqs.map((item) => (
              <div key={item.q}>
                <h3 className="font-semibold">{item.q}</h3>
                <p className="text-gray-600 mt-1">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="returns" className="bg-white rounded-xl shadow p-6 md:p-8 scroll-mt-28">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Returns</h2>
          <p className="text-gray-600">
            Since this is a demo store, nothing ships and there is nothing to return. A real store
            would describe its return window, item condition rules, and refund timeline here.
            Questions? <Link to="/contact" className="text-green-700 font-semibold hover:underline">Contact us</Link>.
          </p>
        </section>

        <section id="privacy" className="bg-white rounded-xl shadow p-6 md:p-8 scroll-mt-28">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Privacy Policy</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Your password is hashed with BCrypt before it's stored. Nobody, including the admin, can read it.</li>
            <li>Delivery details you enter at checkout are stored with your order and visible only to you and the store admin.</li>
            <li>Messages sent from the contact form and newsletter emails are stored so the admin can read them.</li>
            <li>Your cart and wishlist are kept in your browser's local storage.</li>
            <li>Please don't enter real personal or payment details. This is a demo.</li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default Help;
