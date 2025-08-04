import { useParams } from "react-router-dom";
import { AddSkill } from "../../services/productapi";
import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";


export const Information = () => {

const links = [
    { id: 1, label: "API Endpoint 1", url: "#" },
    { id: 2, label: "API Endpoint 2", url: "#" },
    { id: 3, label: "API Endpoint 3", url: "#" },
    { id: 4, label: "API Endpoint 4", url: "#" },
  ];

    const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [skill, setSkill] = useState(null);

  useEffect(() => {
    const fetch_profile = async () => {
      const response = await AddSkill.View_information(id);
      setSkill(response.data);
      console.log(response.data);
    };
    fetch_profile();
  }, [id]);

  useEffect(() => {
    // ✅ Simulate loading time (e.g. data fetch)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds spinner

    return () => clearTimeout(timer);
  }, []);

   if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-green-500"></div>
        <p className="mt-4 text-white">Loading...</p>
      </div>
    );
  }

  return (
    <>

        {skill && (
          <div class=" relative flex flex-col justify-center 
          items-center 
          gap-8  overflow-x-auto 
            border-2 rounded-3xl border-l-amber-300
             border-r-green-300 border-t-amber-300
              border-b-green-300
              backdrop-blur-md
              shadow-[0_4px_60px_rgba(0,0,0,0.1)]
              bg-white/10">
            <div class=" flex flex-col md:flex-row 
            justify-center  items-center gap-10 
            px-6 py-8 bg-gradient-to-br 
            
              ">

            <div class="text-center md:text-left text-white">
                <h1 className="text-3xl md:text-5xl lg:text-lg font-bold mb-4 text-green-700">{skill.full_name}</h1>
                <p className="text-lg text-white mb-6">
                    {skill.description}
                </p>
                <div className="flex flex-col gap-2 md:text-2xl">
                    <span className="text-white">Skill: {skill.skills.join(', ')}</span>
                    <span className="text-white">Location: {skill.location}</span>
                    <span className="text-white">Contact: {skill.contact}</span>
                    <span className="text-white">Email: {skill.email}</span>
                    <span className="text-white">LinkedIn: {skill.linkedin}</span>
                    <span className="text-white">Experience: {skill.experience} years</span>
                </div>
            </div>

             <div>
                 {skill.profile_image && (
                <img
                    src={skill.profile_image}
                    alt="Profile"
                    className=" rounded-full  md:h-100 md:w-100 object-cover bg-no-repeat  mx-auto mb-4"
                />
            )}
            </div>
        </div>
        <div>
          
          <section class="flex justify-center items-center text-center">
              <button className="absolute  text-[1rem] bottom-4 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors">
              Interview
            </button>
          </section>
          
            
        </div>
        </div>
        )}



        <div>
            <div>
                <span>
                    Available: <span className="text-green-500 font-semibold ml-2">
                    {skill && skill.available ? "Yes" : "No"}
                </span>
                </span>
                
            </div>
            
        </div>





<section>
  {/* This is a section for additional information or actions related to the profile. */}
  <div class="flex flex-col md:flex-row  gap-8 justify-center items-center mt-8">

      <div>
         <div className="relative">
  {skill.videos && skill.videos.length > 0 && (
    <>
      <video
        id={`video-${skill.id}`}
        controls
        preload="metadata"
        muted
        playsInline
        className="aspect-square rounded-2xl md:h-70 lg:h-130 w-full object-cover"
      >
        <source src={skill.videos[0].video_file} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Play overlay with floating circle */}
      <button
        onClick={() => {
          const video = document.getElementById(`video-${skill.id}`);
          if (video) {
            video.play();
            const overlay = document.getElementById(`overlay-${skill.id}`);
            if (overlay) overlay.style.display = "none";
          }
        }}
        id={`overlay-${skill.id}`}
        className="absolute inset-0 flex items-center justify-center transition"
      >
        {/* Animated floating circle */}
        <div className="relative flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-4 border-white animate-spin-slow"></div>
          <div className="absolute flex items-center justify-center w-16 h-16 rounded-full bg-green-600 text-white">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M4 4l12 6-12 6V4z" />
            </svg>
          </div>
        </div>
      </button>
    </>
  )}
</div>

      </div>

      <div>
        {/* left section */}
        <div class="flex justify-center text-center"><h2 class="font-bold text-gr"> ARCHIVE</h2></div>
        <div className="flex flex-col items-start">
      {links.map((link, index) => (
        <div key={link.id} className="flex flex-col items-start">
          {/* Top vertical line */}
          {index !== 0 && (
            <div className="h-10 w-px bg-green-300 mx-5"></div>
          )}

          {/* Row: circle + branch + label */}
          <div className="flex items-center">
            {/* Circle */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white">
              {link.id}
            </div>

            {/* Branch */}
            <div className="w-15 h-px bg-gray-300"></div>

            {/* Label */}
            <a
              href={link.url}
              className="ml-2 text-[1rem] md:text-2xl lg:text-3xl text-orange-300 hover:underline"
            >
              {link.label}
            </a>
          </div>

          {/* Bottom vertical line */}
          {index !== links.length - 1 && (
            <div className="h-4 w-px bg-gray-300 mx-5"></div>
          )}
        </div>
      ))}
    </div>
    </div>

  </div>
</section>

          
    </>
  );
};
