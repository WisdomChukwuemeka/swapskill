import { useState, useEffect, useContext } from "react"
// import { DataContext } from "../context/context"
export const Home = () => {
  // const {
  //           searchButton,
  //           skill, searchskill, 
  //           activeView, setActiveView, 
  //           responseData, handleSearchChange
  // } = useContext(DataContext)
  return(
    <>
    <section>
      <div>
        <div class="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto ">
  
  <div class="border border-white/30 bg-white/10 shadow-[0_4px_60px_rgba(0,0,0,0.1)]  rounded-2xl p-8 w-full md:w-1/3">
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

  <div class="flex-1  rounded-2xl shadow-md flex items-center justify-center p-8">
    <span class="text-gray-500 text-lg">Images</span>
  </div>
</div>

      </div>
      </section>
    </>
  )
}