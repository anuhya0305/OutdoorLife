import { useState } from "react";
import { toast } from "react-toastify";
import { sendMessage } from "../../services/ContactService";

const emptyForm = { name: "", email: "", message: "" };

const Contact = () => {
  const [form, setForm] = useState(emptyForm);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await sendMessage(form);
      toast.success("Message sent. We'll get back to you soon.");
      setForm(emptyForm);
    } catch (error) {
      toast.error(error.response?.data?.error || "Couldn't send your message. Try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700">Contact Us</h1>
          <p className="text-gray-600 text-sm md:text-base mt-3">
            We'd love to hear from you. Feel free to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">

          {/* Left */}
          <div className="bg-white shadow-lg rounded-xl p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-6">Get In Touch</h2>

            <form className="space-y-5" onSubmit={handleSubmit}>

              <div>
                <label className="block font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  placeholder="Enter your name"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  placeholder="Enter your email"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Message</label>
                <textarea
                  rows="5"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  maxLength={2000}
                  placeholder="Write your message..."
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full sm:w-auto bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>

            </form>
          </div>

          {/* Right */}
          <div className="bg-green-700 text-white rounded-xl shadow-lg p-6 md:p-8">

            <h2 className="text-xl md:text-2xl font-semibold mb-6">
              Contact Information
            </h2>

            <div className="space-y-6">

              <div>
                <h3 className="font-bold">📍 Address</h3>
                <p>Hyderabad, Telangana, India</p>
              </div>

              <div>
                <h3 className="font-bold">📞 Phone</h3>
                <p>+91 9876543210</p>
              </div>

              <div>
                <h3 className="font-bold">📧 Email</h3>
                <p>support@outdoorlife.com</p>
              </div>

              <div>
                <h3 className="font-bold">🕒 Working Hours</h3>
                <p>Monday - Saturday</p>
                <p>9:00 AM - 6:00 PM</p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;