export const Registration = () => {
  return (
    <>
      <div className=" mt-20 flex  justify-center bg-black px-4">
        <div className="w-full max-w-lg bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 md:p-12 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Create an Account</h2>

          <form className="space-y-6">
        
            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@mail.com"
                className="w-full px-4 py-3 rounded-md bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block mb-2 text-sm font-medium" htmlFor="first_name">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-md bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block mb-2 text-sm font-medium" htmlFor="last_name">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-md bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block mb-2 text-sm font-medium" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="w-full px-4 py-3 rounded-md bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block mb-2 text-sm font-medium" htmlFor="phone_number">
                Phone number
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-md bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Select Role
            </label>
            <select
              name="role"
              id="role"
              
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            >
              <option value="student">Create</option>
              <option value="staff">Offer</option>
            </select>
          </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-medium" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-md bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold transition-colors"
            >
              Register
            </button>
          </form>

          {/* Extra link */}
          <p className="text-center text-sm mt-6 text-white/70">
            Already have an account? <a href="#" className="text-green-500 hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </>
  );
};
