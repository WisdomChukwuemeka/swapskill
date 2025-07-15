import { Login } from "../components/auth/login"
import { Registration } from "../components/auth/registeration"
import { Footer } from "../components/pages/footer"
import { Layout } from "../components/pages/layout"
import { Home } from "../components/pages/home"
import { Dashboard } from "../components/dashboard/dashboard"
import { BrowserRouter, Routes, Route } from "react-router-dom"
export const App = () => {
  return(
    <>
    <div class="contain-4xl  min-h-screen text-white">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/registration" element={<Registration />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
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