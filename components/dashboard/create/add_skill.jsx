import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AddSkill } from "../../services/productapi";

export const Addskill = () => {
  const [skills, setSkills] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [addSkill, setAddSkill] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );
  const [formData, setFormData] = useState({
    category_name: "",
    profile_image: null,
    full_name: "",
    bio: "",
    certificate: null,
    experience: "",
    skills: "",
    video_file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      profile_image: e.target.files[0],
    }));
  };

  const handleCertificateChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      certificate: e.target.files[0],
    }));
  };

  const handleVideoFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      video_file: e.target.files[0],
    }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.profile_image) {
      setMessage("Please select a profile image.");
      setLoading(false);
      return;
    }
    if (!formData.video_file) {
      setMessage("Please select a video.");
      setLoading(false);
      return;
    }

    const payload = new FormData();
    payload.append("profile_image", formData.profile_image);
    payload.append("category_name", formData.category_name);
    payload.append("full_name", formData.full_name);
    payload.append("bio", formData.bio);
    payload.append("video_file", formData.video_file);
    if (formData.certificate) {
      payload.append("certificate", formData.certificate);
    }
    payload.append("experience", formData.experience);

    payload.append(
      "skills",
      JSON.stringify(formData.skills.split(",").map((s) => s.trim()))
    );

    try {
      const response = await AddSkill.Skill(payload);
      console.log(response.data.results);
      setMessage(response.data.message || "Upload successful!");
      setAddSkill((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      setMessage("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("access_token"));
    };
    checkLogin();
  }, []);

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await AddSkill.List_Skill();
        setSkills(response.data.results);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching skills:", err);
        setLoading(false);
      }
    };
    fetchSkill();
  }, [addSkill]);

  if (loading) {
    return <p className="text-center">Loading skills...</p>;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 mt-15">
        <section className="w-full">
          <div className="max-w-xl p-8 rounded-3xl border border-white/30 bg-white/10 shadow-[0_4px_60px_rgba(0,0,0,0.1)] overflow-hidden ">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/20 to-blue-400/10 blur-2xl opacity-30 pointer-events-none"></div>

            <h2 className="text-3xl font-bold mb-6 text-white">Add Skill</h2>

            <form onSubmit={handleUpload} className="space-y-4">
              <select
                name="category_name"
                value={formData.category_name}
                onChange={handleInputChange}
                className="w-full border border-white/20 bg-black backdrop-blur-sm text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select a category</option>
                <option value="business">Business</option>
                <option value="legal">Legal</option>
                <option value="agriculture">Agriculture</option>
                <option value="technology">Technology</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="real_estate">Real Estate</option>
                <option value="engineering">Engineering</option>
                <option value="education">Education</option>
                <option value="health">Health</option>
                <option value="travel_hospitality">Travel Hospitality</option>
              </select>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className="w-full border border-white/20 bg-white/5 backdrop-blur-sm text-white p-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full border border-white/20 bg-white/5 backdrop-blur-sm text-white p-2 rounded"
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Certificate <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={handleCertificateChange}
                  className="block w-full text-sm text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-1">
                  Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full border border-white/20 bg-white/5 backdrop-blur-sm text-white p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-1">
                  Skills
                </label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  className="w-full border border-white/20 bg-white/5 backdrop-blur-sm text-white p-2 rounded"
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Video
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoFileChange}
                  className="block w-full text-sm text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 transition-colors duration-300"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 flex justify-center items-center gap-2 rounded-md text-white font-semibold transition-colors ${
                  loading
                    ? "bg-blue-400/50 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading && <i className="bi bi-arrow-repeat animate-spin"></i>}
                {loading ? "Uploading..." : "Upload"}
              </button>
            </form>

            <p className="mt-4 text-white relative z-10">{message}</p>
          </div>
        </section>

        <section>
          {isLoggedIn && (
            <div className="bg-white">
              {skills.map((skill) => {
                const lastVideo =
                  skill.videos && skill.videos.length > 0
                    ? skill.videos[skill.videos.length - 1]
                    : null;

                return (
                  <div
                    key={skill.id}
                    className="border w-full gap-4 flex flex-col justify-evenly items-center border-gray-200 rounded-lg shadow-md overflow-hidden"
                  >
                    {lastVideo && (
                      <video
                        controls
                        className="aspect-4/2 rounded object-cover"
                      >
                        <source src={lastVideo.video_file} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}

                    <div className="w-full flex flex-col items-center p-4">
                      <section className="flex flex-col md:flex-row items-center gap-6 bg-white rounded-xl p-6 shadow-md w-full max-w-3xl">
                        {skill.profile_image && (
                          <img
                            src={skill.profile_image}
                            alt="Profile"
                            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-green-200"
                          />
                        )}

                        <div className="flex flex-col text-center md:text-left w-full">
                          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                            Name: {skill.full_name}
                          </h2>
                          <p className="text-base md:text-lg text-gray-700 mb-1">
                            <span className="font-semibold text-black">
                              Bio:
                            </span>{" "}
                            {skill.bio}
                          </p>
                          <p className="text-base md:text-lg text-gray-700 mb-1">
                            <span className="font-semibold text-black">
                              Category:
                            </span>{" "}
                            {skill.category
                              ? skill.category.category_name
                              : "None"}
                          </p>
                          <p className="text-base md:text-lg text-gray-700 mb-1">
                            <span className="font-semibold text-black">
                              Experience:
                            </span>{" "}
                            {skill.experience}
                          </p>
                          <p className="text-base md:text-lg text-gray-700">
                            <span className="font-semibold text-black">
                              Skills:
                            </span>{" "}
                            {skill.skills}
                          </p>
                        </div>
                      </section>

                      <div className="mt-6">
                        <button className="bg-green-700 text-white px-6 py-3 rounded-lg text-lg md:text-xl hover:bg-green-800 transition">
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </>
  );
};
