import React from "react";

export const Contact = () => {
  return (
    <section className="flex flex-col justify-center items-center min-h-screen px-6 py-16 bg-gradient-to-br overflow-x-auto ">
      <div className="min-w-[400px] max-w-2xl w-full bg-white/10 backdrop-blur-md rounded-3xl border border-white/30 p-10 shadow-[0_4px_60px_rgba(0,0,0,0.1)]">
        <h1 className="text-4xl font-bold mb-4 text-green-700">Contact Us</h1>
        <p className="text-lg text-white mb-6">
          Have questions, suggestions, or want to collaborate with us? 
          We’d love to hear from you! Reach out using the form below.
        </p>
        <form className="space-y-6">
          <div>
            <label className="block text-white mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/10 text-white focus:outline-none"
              type="text"
              id="name"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-white mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/10 text-white focus:outline-none"
              type="email"
              id="email"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-white mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/10 text-white focus:outline-none"
              id="message"
              rows="5"
              placeholder="Your message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};


