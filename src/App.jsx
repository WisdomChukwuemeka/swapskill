import { Registration } from "../components/auth/registeration"
import { Footer } from "../components/pages/footer"
import { Layout } from "../components/pages/layout"
export const App = () => {
  return(
    <>
    <div class="contain-4xl  min-h-screen bg-black text-white">
          <Layout />
          <Registration />
          
      </div>
      <div className="mt-auto bg-gray-800 text-white py-4 text-center w-full">
            <Footer />
      </div>
    </>
  )
}