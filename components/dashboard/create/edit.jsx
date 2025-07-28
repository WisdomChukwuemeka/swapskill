import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AddSkill } from "../../services/productapi";

export const Editskill = () => {
  const [skills, setSkills] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );
  const [skill_ID, setSkill_ID] = useState(null);

  const [formData, setFormData] = useState({
    category_name: "",
    profile_image: null,
    full_name: "",
    bio: "",
    certificate: null,
    experience: "",
    skills: "",
    video_file: null,
    existingProfileImage: null,
    existingCertificate: null,
    existingVideo: null,
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!skill_ID) {
      setMessage("Please select a skill to update.");
      return;
    }
    setLoading(true);

    const payload = new FormData();
    payload.append("category_name", formData.category_name);
    payload.append("full_name", formData.full_name);
    payload.append("bio", formData.bio);
    payload.append("experience", formData.experience);
    payload.append(
      "skills",
      JSON.stringify(formData.skills.split(",").map((s) => s.trim()))
    );

    if (formData.profile_image) {
      payload.append("profile_image", formData.profile_image);
    }
    if (formData.certificate) {
      payload.append("certificate", formData.certificate);
    }
    if (formData.video_file) {
      payload.append("video_file", formData.video_file);
    }

    try {
      const response = await AddSkill.Update_skill(skill_ID, payload);
      console.log(response.data);
      setMessage(response.data.message || "Skill updated successfully!");
    } catch (error) {
      if (error.response?.data) {
        console.error("Server error:", error.response.data);
        setMessage(
          error.response.data.category_name
            ? error.response.data.category_name
            : "Error updating skill"
        );
      } else {
        setMessage("Unknown error occurred");
      }
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
    const fetchSkills = async () => {
      try {
        const response = await AddSkill.List_Skill();
        console.log(response.data)
        setSkills(response.data.results);
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };
    fetchSkills();
  }, [message]);

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-10">
      <section className="w-full">
        <div className="max-w-xl p-8 rounded-xl bg-white/10 border border-white/20">
          <h2 className="text-2xl mb-4 text-white font-bold">Update Skill</h2>

          {!skill_ID && (
            <p className="mb-2 text-yellow-300">
              ⚠️ Please select a skill below to edit.
            </p>
          )}

          <form onSubmit={handleUpdate} className="space-y-4">
            <select
              name="category_name"
              value={formData.category_name}
              onChange={handleInputChange}
              className="w-full border border-white/20 bg-black text-white p-2 rounded"
              required
            >
              <option value="">Select category</option>
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

            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleInputChange}
              className="w-full border border-white/20 bg-black text-white p-2 rounded"
              required
            />

            <textarea
              name="bio"
              placeholder="Bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full border border-white/20 bg-black text-white p-2 rounded"
              required
            ></textarea>

            <input
              type="text"
              name="experience"
              placeholder="Experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full border border-white/20 bg-black text-white p-2 rounded"
              required
            />

            <textarea
              name="skills"
              placeholder="Skills (comma-separated)"
              value={formData.skills}
              onChange={handleInputChange}
              className="w-full border border-white/20 bg-black text-white p-2 rounded"
              required
            ></textarea>

            <div>
              <label className="block text-white mb-1">Profile Image</label>
              {formData.existingProfileImage && (
                <img
                  src={formData.existingProfileImage}
                  alt="Profile"
                  className="w-20 h-20 mb-2 object-cover rounded-full"
                />
              )}
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>

            <div>
              <label className="block text-white mb-1">Certificate</label>
              {formData.existingCertificate && (
                <a
                  href={formData.existingCertificate}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-300 underline block mb-2"
                >
                  View Existing Certificate
                </a>
              )}
              <input
                type="file"
                accept="application/pdf,image/*"
                onChange={handleCertificateChange}
              />
            </div>

            <div>
              <label className="block text-white mb-1">Video</label>
              {formData.existingVideo && (
                <video controls className="w-full mb-2 rounded">
                  <source src={formData.existingVideo} type="video/mp4" />
                </video>
              )}
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoFileChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !skill_ID}
              className={`w-full py-3 rounded-md text-white font-bold ${
                loading || !skill_ID
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Updating..." : "Update Skill"}
            </button>
          </form>

          <p className="mt-4 text-white">{message}</p>
        </div>
      </section>

      <section className="w-full">
        {isLoggedIn && (
          <div className="space-y-4">
            {skills.map((skill) => {
              // ✅ Take the LAST uploaded video
              const lastVideo =
                skill.videos && skill.videos.length > 0
                  ? skill.videos[skill.videos.length - 1].video_file
                  : null;

              return (
                <div
                  key={skill.id}
                  className="bg-white/10 border border-white/20 rounded-lg p-4 flex flex-col items-center"
                >
                  {skill.profile_image && (
                    <img
                      src={skill.profile_image}
                      alt="Profile"
                      className="w-24 h-24 rounded-full mb-2"
                    />
                  )}
                  <h3 className="text-lg text-white font-bold">
                    {skill.full_name}
                  </h3>
                  <p className="text-white">Bio: {skill.bio}</p>
                  <p className="text-white">
                    Category: {skill.category?.category_name}
                  </p>
                  <button
                    onClick={() => {
                      setSkill_ID(skill.id);
                      setFormData({
                        category_name: skill.category?.category_name || "",
                        full_name: skill.full_name || "",
                        bio: skill.bio || "",
                        experience: skill.experience || "",
                        skills: Array.isArray(skill.skills)
                          ? skill.skills.join(", ")
                          : skill.skills || "",
                        profile_image: null,
                        certificate: null,
                        video_file: null,
                        existingProfileImage: skill.profile_image || null,
                        existingCertificate: skill.certificate || null,
                        existingVideo: lastVideo || null, // ✅ Use last video
                      });
                      setMessage(`Editing: ${skill.full_name}`);
                    }}
                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Edit
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
