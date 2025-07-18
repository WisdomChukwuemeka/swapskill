import { useState } from "react";

// Mock API service - replace with your actual API
const AddSkill = {
  Category: async (formData) => {
    const API_URL = 'http://localhost:8000/api';
    const token = localStorage.getItem('access_token');
    
    const response = await fetch(`${API_URL}/category/`, {
      method: 'POST',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw { response: { data: errorData } };
    }
    
    return { data: await response.json() };
  },
};

export const AddSkillForm = () => {
  const [loading, setLoading] = useState(false);
  const [category_name, setCategoryName] = useState("");
  const [profile_image, setProfileImage] = useState(null);
  const [full_name, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [error, setError] = useState("");
  const [videos, setVideos] = useState([
    { file: null, title: "", description: "" },
  ]);

  const handleVideoChange = (index, field, value) => {
    const updatedVideos = [...videos];
    updatedVideos[index][field] = value;
    setVideos(updatedVideos);
  };

  const addVideoField = () => {
    setVideos([...videos, { file: null, title: "", description: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Create FormData with proper structure for Django serializer
    const formData = new FormData();
    
    // Top-level fields
    formData.append("category_name", category_name);
    
    // File uploads (keep these at top level for Django to process)
    if (profile_image) {
      formData.append("profile_image", profile_image);
    }
    if (certificate) {
      formData.append("certificate", certificate);
    }
    
    // Add video files at top level
    videos.forEach((video, index) => {
      if (video.file) {
        formData.append(`video_${index}`, video.file);
      }
    });

    // Create skill object as JSON string
    const skillData = {
      full_name: full_name,
      bio: bio,
      experience: experience,
      skills: skills,
      videos: videos.map((video) => ({
        title: video.title,
        description: video.description
      }))
    };
    
    formData.append("skill", JSON.stringify(skillData));

    try {
      const response = await AddSkill.Category(formData);
      console.log(response.data);
      alert("Category with skill and videos created successfully!");
      
      // Reset form
      setCategoryName("");
      setProfileImage(null);
      setFullName("");
      setBio("");
      setCertificate(null);
      setExperience("");
      setSkills("");
      setVideos([{ file: null, title: "", description: "" }]);
      
    } catch (err) {
      console.error("Full error:", err);
      console.error("Response data:", err.response?.data);
      
      setError(
        err.response?.data?.skill?.profile_image?.[0] ||
        err.response?.data?.skill?.full_name?.[0] ||
        err.response?.data?.skill?.bio?.[0] ||
        err.response?.data?.skill?.certificate?.[0] ||
        err.response?.data?.skill?.experience?.[0] ||
        err.response?.data?.skill?.skills?.[0] ||
        err.response?.data?.skill?.videos?.[0] ||
        err.response?.data?.category_name?.[0] ||
        err.response?.data?.non_field_errors?.[0] ||
        err.response?.data?.detail ||
        "Unable to submit form"
      );
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-primary/5 to-secondary/10">
      <div className="flex flex-col md:flex-row gap-3 max-w-4xl mx-auto">
        <div className="max-w-2xl p-8 bg-card/90 backdrop-blur-md rounded-xl shadow-lg border">
          <h1 className="text-2xl font-bold mb-6 text-foreground">Create Portfolio</h1>
          
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1 text-foreground">Category Name</label>
              <select
                value={category_name}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full border border-input p-2 rounded bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-ring"
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
            </div>

            <div>
              <label className="block font-medium mb-1 text-foreground">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
                className="w-full border border-input p-2 rounded focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-foreground">Full Name</label>
              <input
                type="text"
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-input p-2 rounded focus:ring-2 focus:ring-ring bg-background text-foreground"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-foreground">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full border border-input p-2 rounded focus:ring-2 focus:ring-ring bg-background text-foreground"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-foreground">
                Certificate (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCertificate(e.target.files?.[0] || null)}
                className="w-full border border-input p-2 rounded focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-foreground">Experience (years)</label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full border border-input p-2 rounded focus:ring-2 focus:ring-ring bg-background text-foreground"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-foreground">Skills</label>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full border border-input p-2 rounded focus:ring-2 focus:ring-ring bg-background text-foreground"
                rows={3}
                required
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2 text-foreground">Portfolio Videos</h2>
              {videos.map((video, index) => (
                <div key={index} className="mb-4 border border-border p-4 rounded bg-muted/30">
                  <div className="mb-2">
                    <label className="block font-medium mb-1 text-foreground">Video File</label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) =>
                        handleVideoChange(index, "file", e.target.files?.[0] || null)
                      }
                      className="w-full border border-input p-2 rounded focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block font-medium mb-1 text-foreground">Title</label>
                    <input
                      type="text"
                      value={video.title}
                      onChange={(e) =>
                        handleVideoChange(index, "title", e.target.value)
                      }
                      className="w-full border border-input p-2 rounded focus:ring-2 focus:ring-ring bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1 text-foreground">Description</label>
                    <textarea
                      value={video.description}
                      onChange={(e) =>
                        handleVideoChange(index, "description", e.target.value)
                      }
                      className="w-full border border-input p-2 rounded focus:ring-2 focus:ring-ring bg-background text-foreground"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addVideoField}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
              >
                Add Another Video
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 flex justify-center items-center gap-2 
                ${
                  loading
                    ? "bg-muted cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90"
                }
                rounded-md text-primary-foreground font-semibold transition-colors`}
            >
              {loading ? "Creating..." : "Create Portfolio"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
