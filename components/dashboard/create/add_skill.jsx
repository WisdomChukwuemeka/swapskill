import { useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AddSkill } from "../../services/productapi";

export const Addskill = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category_name: "",
    profile_image: null,
    full_name: "",
    bio: "",
    certificate: null,
    experience: "",
    skills: "",
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

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.profile_image) {
      setMessage("Please select a profile image.");
      setLoading(false);
      return;
    }

    const payload = new FormData();
    payload.append("profile_image", formData.profile_image);
    payload.append("category_name", formData.category_name);
    payload.append("full_name", formData.full_name);
    payload.append("bio", formData.bio);
    if (formData.certificate) {
      payload.append("certificate", formData.certificate);
    }
    payload.append("experience", formData.experience);

    // ✅ Fix for skills!
    payload.append(
      "skills",
      JSON.stringify(formData.skills.split(",").map((s) => s.trim()))
    );

    try {
      const response = await AddSkill.Category(payload); // ✅ use payload not formData
      console.log(response.data);
      setMessage(response.data.message || "Upload successful!");
    } catch (error) {
      console.error(error);
      setMessage("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative max-w-xl   p-8 rounded-3xl border border-white/30 bg-white/10 backdrop-blur-lg shadow-[0_4px_60px_rgba(0,0,0,0.1)] overflow-hidden">
        {/* Water ripple layer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/20 to-blue-400/10 blur-2xl opacity-30 pointer-events-none"></div>

        <h2 className="text-3xl font-bold mb-6 text-white">Add Skill</h2>

        <form onSubmit={handleUpload} className="space-y-4 relative z-10">
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
              className="block w-full text-sm text-gray-100
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-green-600 file:text-white
      hover:file:bg-green-700
      transition-colors duration-300"
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
              className="block w-full text-sm text-gray-100
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-600 file:text-white
      hover:file:bg-blue-700
      transition-colors duration-300"
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
            <label className="block text-white font-medium mb-1">Skills</label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              className="w-full border border-white/20 bg-white/5 backdrop-blur-sm text-white p-2 rounded"
            ></textarea>
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
    </>
  );
};

// export const Addskill = () => {
//   const [loading, setLoading] = useState(false);
//   const [category_name, setCategoryName] = useState("");
//   const [profile_image, setProfileImage] = useState(null);
//   const [full_name, setFullName] = useState("");
//   const [bio, setBio] = useState("");
//   const [certificate, setCertificate] = useState(null);
//   const [experience, setExperience] = useState("");
//   const [skills, setSkills] = useState("");
//   const [error, setError] = useState("");
//   const [videos, setVideos] = useState([
//     { file: null, title: "", description: "" },
//   ]);

//   const handleVideoChange = (index, field, value) => {
//     const updatedVideos = [...videos];
//     updatedVideos[index][field] = value;
//     setVideos(updatedVideos);
//   };

//   const addVideoField = () => {
//     setVideos([...videos, { file: null, title: "", description: "" }]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("category_name", category_name);

//     // ✅ Pack skill as JSON
//     const skillPayload = {
//       full_name: full_name,
//       bio: bio,
//       experience: experience,
//       skills: skills,
//       videos: videos.map((video) => ({
//         title: video.title,
//         description: video.description,
//       })),
//     };
//     formData.append("skill", JSON.stringify(skillPayload));

//     // ✅ Attach files
//     formData.append("profile_image", profile_image);
//     if (certificate) {
//       formData.append("certificate", certificate);
//     }

//     videos.forEach((video, index) => {
//       if (video.file) {
//         formData.append(`video_${index}`, video.file);
//       }
//     });

//     try {
//       const response = await AddSkill.Category(formData);
//       console.log(response.data);
//       alert("Category with skill and videos created successfully!");
//     } catch (err) {
//       console.error(err);
//       setError(
//         err.response?.data?.file?.[0] ||
//           err.response?.data?.title?.[0] ||
//           err.response?.data?.description?.[0] ||
//           err.response?.data?.profile_image?.[0] ||
//           err.response?.data?.full_name?.[0] ||
//           err.response?.data?.bio?.[0] ||
//           err.response?.data?.certificate?.[0] ||
//           err.response?.data?.experience?.[0] ||
//           err.response?.data?.skills?.[0] ||
//           err.response?.data?.category_name?.[0] ||
//           "Unable to submit form"
//       );
//       setTimeout(() => setError(""), 3000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row gap-3">
//       <div className="max-w-2xl p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg">
//         <h1 className="text-2xl font-bold mb-6">Portfolio</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block font-medium mb-1">Category Name</label>
//             {error && <div className="text-red-600 font-medium">{error}</div>}
//             <select
//               value={category_name}
//               onChange={(e) => setCategoryName(e.target.value)}
//               className="w-full border p-2 rounded bg-black text-white hover:bg-green-600"
//               required
//             >
//               <option value="">Select a category</option>
//               <option value="business">Business</option>
//               <option value="legal">Legal</option>
//               <option value="agriculture">Agriculture</option>
//               <option value="technology">Technology</option>
//               <option value="design">Design</option>
//               <option value="marketing">Marketing</option>
//               <option value="real_estate">Real Estate</option>
//               <option value="engineering">Engineering</option>
//               <option value="education">Education</option>
//               <option value="health">Health</option>
//               <option value="travel_hospitality">Travel Hospitality</option>
//             </select>
//           </div>

//           <div>
//             <label className="block font-medium mb-1">
//               <i className="bi bi-person-circle mr-2"></i>
//               Profile Image
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setProfileImage(e.target.files[0])}
//               required
//             />
//           </div>

//           <div>
//             <label className="block font-medium mb-1">Full Name</label>
//             <input
//               type="text"
//               value={full_name}
//               onChange={(e) => setFullName(e.target.value)}
//               className="w-full border p-2 rounded"
//               required
//             />
//           </div>

//           <div>
//             <label className="block font-medium mb-1">Bio</label>
//             <textarea
//               value={bio}
//               onChange={(e) => setBio(e.target.value)}
//               className="w-full border p-2 rounded"
//               required
//             ></textarea>
//           </div>

//           <div>
//             <label className="block font-medium mb-1">
//               <i className="bi bi-file-earmark-text mr-2"></i>
//               Certificate (optional)
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setCertificate(e.target.files[0])}
//             />
//           </div>

//           <div>
//             <label className="block font-medium mb-1">Experience (years)</label>
//             <input
//               type="text"
//               min="0"
//               value={experience}
//               onChange={(e) => setExperience(e.target.value)}
//               className="w-full border p-2 rounded"
//               required
//             />
//           </div>

//           <div>
//             <label className="block font-medium mb-1">Skills</label>
//             <textarea
//               value={skills}
//               onChange={(e) => setSkills(e.target.value)}
//               className="w-full border p-2 rounded"
//               required
//             ></textarea>
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold mb-2">Portfolio Videos</h2>
//             {videos.map((video, index) => (
//               <div key={index} className="mb-4 border p-4 rounded">
//                 <div>
//                   <label className="block font-medium mb-1">Video File</label>
//                   <input
//                     type="file"
//                     accept="video/*"
//                     onChange={(e) =>
//                       handleVideoChange(index, "file", e.target.files[0])
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-1">Title</label>
//                   <input
//                     type="text"
//                     value={video.title}
//                     onChange={(e) =>
//                       handleVideoChange(index, "title", e.target.value)
//                     }
//                     className="w-full border p-2 rounded"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-1">Description</label>
//                   <textarea
//                     value={video.description}
//                     onChange={(e) =>
//                       handleVideoChange(index, "description", e.target.value)
//                     }
//                     className="w-full border p-2 rounded"
//                   ></textarea>
//                 </div>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addVideoField}
//               className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded"
//             >
//               <i className="bi bi-plus-circle"></i> Add Another Video
//             </button>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 flex justify-center items-center gap-2 ${
//               loading
//                 ? "bg-green-400 cursor-not-allowed"
//                 : "bg-green-600 hover:bg-green-700"
//             } rounded-md text-white font-semibold transition-colors`}
//           >
//             {loading && <i className="bi bi-arrow-repeat animate-spin"></i>}
//             {loading ? "Creating..." : "Create"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };
