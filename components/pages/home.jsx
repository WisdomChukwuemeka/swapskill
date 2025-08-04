import { useState, useEffect, useContext } from "react";
import { DataContext } from "../context/context";
import { useNavigate } from "react-router-dom";
export const Home = () => {
  const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(
  localStorage.getItem("role")
);
  const navigate = useNavigate();
  const {
    searchButton,
    skill,
    searchskill,
    activeView,
    setActiveView,
    responseData,
    handleSearchChange,
  } = useContext(DataContext);

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
      <section class="flex flex-col justify-center items-center">
        <div>
          <div class="flex flex-col md:flex-row gap-2 max-w-6xl mx-auto ">
            <div class="border border-white/30 bg-white/10 shadow-[0_4px_60px_rgba(0,0,0,0.1)] text-md md:text-2xl  rounded-2xl w-[20rem] p-8 ">
              <ul class="flex flex-col gap-4">
                <li class="py-3 px-4 text-center rounded-lg hover:bg-green-600 hover:text-white cursor-pointer transition">
                  Business
                </li>
                <li class="py-3 px-4 text-center rounded-lg hover:bg-green-600 hover:text-white cursor-pointer transition">
                  Legal
                </li>
                <li class="py-3 px-4 text-center rounded-lg hover:bg-green-600 hover:text-white cursor-pointer transition">
                  Agriculture
                </li>
                <li class="py-3 px-4 text-center rounded-lg hover:bg-green-600 hover:text-white cursor-pointer transition">
                  Technology
                </li>
                <li class="py-3 px-4 text-center rounded-lg hover:bg-green-600 hover:text-white cursor-pointer transition">
                  Design
                </li>
                <li class="py-3 px-4 text-center rounded-lg hover:bg-green-600 hover:text-white cursor-pointer transition">
                  Marketing
                </li>
                <li class="py-3 px-4 text-center rounded-lg hover:bg-green-600 hover:text-white cursor-pointer transition">
                  Real Estate
                </li>
                <li class="py-3 px-4 text-center rounded-lg hover:bg-green-600 hover:text-white cursor-pointer transition">
                  Engineering
                </li>
                <li class="py-3 px-4 text-center rounded-lg hover:bg-green-600 hover:text-white cursor-pointer transition">
                  Education
                </li>
                <li class="py-3 px-4 text-center rounded-lg hover:bg-green-600 hover:text-white cursor-pointer transition">
                  Health
                </li>
                <li class="py-3 px-4 text-center rounded-lg hover:bg-green-600 hover:text-white cursor-pointer transition">
                  Travel & Hospitality
                </li>
              </ul>
            </div>


            {isLoggedIn && (
              
              <section class=" rounded-2xl shadow-md  items-center justify-center">
              <div className="  gap-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                {(skill || []).map((skill) => {
                  const lastVideo =
                    skill.videos && skill.videos.length > 0
                      ? skill.videos[skill.videos.length - 1]
                      : null;

                  return (
                    <div
                      key={skill.id}
                      className="border w-fit  h-fit   flex flex-col 
                     items-center justify-center
                     border-gray-500 rounded-lg shadow-md 
                     overflow-hidden "
                    >
                      <div class="flex justify-start gap-1 items-center p-3">
                        <img
                          src={skill.profile_image}
                          alt={skill.full_name}
                          className="w-10 h-10 rounded-full object-cover object-center bg-no-repeat" />
                        <p>
                                <span className="text-md md:text-md font-semibold text-white">
                                  {skill.full_name.length > 15
                                    ? `${skill.full_name.slice(0, 15)}...`
                                    : skill.full_name}
                                </span>
                              </p>
                      </div>
                      {lastVideo && (
                        <video
                          controls
                          preload="metadata"
                          muted
                          playsInline
                          class="aspect-square w-full  object-cover"
                        >
                          <source src={lastVideo.video_file} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}

                      <div className="relative w-fit  flex 
                      flex-col items-center  md:h-30">
                        <section className=" flex flex-col items-center text-center gap-1 
                        mb-10 rounded-xl shadow-md w-full max-w-3xl">
                          <div class="flex items-center">
                            
                            <div class="flex flex-col p-1 items-center">
                              <p className="text-sm md:text-md text-gray-300 mb-0.5">
                                <span className="font-semibold text-white">
                                  Category:
                                </span>{" "}
                                {skill.category
                                  ? skill.category.category_name
                                  : "None"}
                              </p>
                              <p className="text-sm md:text-md text-gray-300">
                                <span className="font-semibold text-white">
                                  Skills:
                                </span>{" "}
                                {skill.skills.length > 3
                                    ? `${skill.skills.slice(0, 3)}...`
                                    : skill.skills.join(", ")}
                              </p>
                            </div>
                          </div>
                          
                        </section>
                        
                        <button onClick={() => navigate(`/full_profile/${skill.id}`)} className="text-sm md:text-md  
                        absolute bottom-0 bg-green-700
                         text-white p-1.5 rounded-lg
                           md:text-md hover:bg-green-800 transition mb-2
                           ">
                           View Profile
                          </button>

                          
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
            )}
            



            
          </div>
        </div>
      </section>
    </>
  );
};
