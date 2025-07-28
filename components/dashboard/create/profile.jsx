import { useState, useEffect } from "react";

export const Profile = () => {
  const [formData, setFormData] = useState({
    avatar: null,
    full_name: "",
    bio: "",
    phone_number: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      avatar: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Profile submitted!");
  };

  return (
    <div className="min-h-screen md:px-[15%] lg:px-[25%] flex items-center justify-center bg-gradient-to-br">
      <div className="w-full h-fit  p-8 rounded-3xl border border-white/30 bg-white/10 backdrop-blur-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar */}
          <div>
            <label className="block text-white mb-1 font-medium">
              Avatar
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full px-4 py-3 md:py-4 md:text-2xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-white mb-1 font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 md:py-4 md:text-2xl p-3 rounded bg-white/20 backdrop-blur-sm text-white border border-white/30 focus:outline-none"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-white mb-1 font-medium">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 md:py-4 md:text-2xl p-3 rounded bg-white/20 backdrop-blur-sm text-white border border-white/30 focus:outline-none"
              rows="3"
            ></textarea>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-white mb-1 font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 md:py-4 md:text-2xl rounded bg-white/20 backdrop-blur-sm text-white border border-white/30 focus:outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-white mb-1 font-medium">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 md:py-4 md:text-2xl p-3 rounded bg-white/20 backdrop-blur-sm text-white border border-white/30 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full px-4 py-3 md:py-4 md:text-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};
