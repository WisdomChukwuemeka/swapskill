import { Login } from "../components/auth/login"
import { Registration } from "../components/auth/registeration"
import { Footer } from "../components/pages/footer"
import { Layout } from "../components/pages/layout"
import { Home } from "../components/pages/home"
import { Dashboard } from "../components/dashboard/dashboard"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Addskill } from "../components/dashboard/create/add_skill"
import { About } from "../components/pages/about"
import { Contact } from "../components/pages/contact"
import { Editskill } from "../components/dashboard/create/edit"
import { Profile } from "../components/dashboard/create/profile"
import { Terms } from "../components/pages/terms"
export const App = () => {
  return(
    <>
    <div class=" containier -smooth bg-[linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.9)),url('../src/assets/bg.png')] max-w-[4000px] mx-auto  min-h-screen text-white">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/registration" element={<Registration />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/addskill" element={<Addskill />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/edit_skill" element={<Editskill />} />
                <Route path="/terms" element={<Terms />} />
              </Route>
            </Routes>
          </BrowserRouter>
          
      </div>
      <div className="mt-auto bg-gray-800 text-white py-1 text-center w-full">
            <Footer />
      </div>
    </>
  )
}