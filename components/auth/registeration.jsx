import { useState } from "react";
import {useNavigate, Link} from "react-router-dom"
import { AuthAPI } from "../services/api";
export const Registration = ({onRegister}) => {
const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    role: "",
    agreement: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData(prevData => ({
        ...prevData,
        [e.target.name]: e.target.value
    }))
  };
  const handleCheckboxChange = (e) => {
  setFormData(prevData => ({
    ...prevData,
    [e.target.name]: e.target.checked
  }));
};

  const handleSubmit = async(e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try{
      const response = await AuthAPI.register(formData)
      localStorage.setItem('access_token', response.data.access)
      localStorage.setItem('refresh_token', response.data.refresh)
      localStorage.setItem('role', response.data.role)
      localStorage.setItem('is_superuser', JSON.stringify(response.data.user.is_superuser))
      setSuccess(response?.data?.message)
      setTimeout(() => setSuccess(''), 2000);
      navigate('/login')
      onRegister(response.data.user)
    } catch(error){
      setError(
        error.response?.data?.email?.[0] ||
        error.response?.data?.password?.[0] ||
        error.response?.data?.confirm_password?.[0] ||
        error.response?.data?.role?.[0] || 'Registration failed, try again')
      setTimeout(() => setError(''), 2000);
    } finally {
      setLoading(false)
    }

  };


  return (
    <section className="min-h-screen flex lg:px-[35%] items-center justify-center px-10 bg-gradient-to-br from-black/90 to-black/70">
      <div className=" w-full h-fit bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <i className="bi bi-circle-half text-3xl md:text-5xl mb-2 text-green-500"></i>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Create an Account</h2>
        </div>

        {success && <div className="text-green-600 text-center">{success}</div>}
        {error && (
          <div className="text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              className="w-full px-4 py-3 md:py-2 md:text-2xl  rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Role Select */}
          <div>
            <label htmlFor="role" className="block mb-2 text-sm font-medium text-white">
              Select Role
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 md:py-2 md:text-2xl rounded-lg bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="" disabled>Select role</option>
              <option className="bg-black text-white" value="create">
                Create
              </option>
              <option className="bg-black text-white" value="offer">
                Offer
              </option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 md:py-2 md:text-2xl rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="confirm_password" className="block text-sm font-medium text-white">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-3 md:py-2 md:text-2xl border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          {/* {Agreement} */}
            <div className="flex gap-2 items-center">
            <input type="checkbox" name="agreement" id="agreement" 
            checked={formData.agreement}
            onChange={handleCheckboxChange}
            required
            />
            <label htmlFor="agreement" className="block text-sm font-medium text-green-400">
              I agree to the terms and conditions
            </label>
          </div>


          {/* Submit */}
          <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-3 md:py-2 md:text-2xl flex justify-center items-center gap-2 
        ${
      loading
        ? "bg-green-400 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700"
    }
    rounded-md text-white font-semibold transition-colors`}
            >
              {loading && <i className="bi bi-arrow-repeat animate-spin"></i>}
              {loading ? "Registering..." : "Register"}
            </button>
        </form>

        {/* Link */}
        <p className="text-center text-sm md:text-2xl mt-6 text-white/70">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 hover:text-green-500 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};
