import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import WindowAnimation from './WindowAnimation';
import SplitText from './SplitText'; // or './components/SplitText' based on file location



export default function SignupForm({ setUser, setAuthState }) {
  const navigate = useNavigate();

  const handleSignIn = () => {
    // You can also handle form validation or auth here
    navigate('/signin'); // or whatever your SignIn route path is
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-[1200px] h-full md:h-[700px] flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-lg">

        {/* Left side: Animation */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center p-6">
          <WindowAnimation />
        </div>

        {/* Right side: Form */}
        <div className="w-full md:w-1/2 h-full px-10 py-20 overflow-y-auto">
          <h1 className="text-5xl text-center font-semibold text-[#254EDB]">Monovo</h1>
          <div className="pt-5 px-4">
            <SplitText
              text="Welcome!"
              className="text-xl font-bold text-gray-500 text-center"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              rootMargin="-100px"
              threshold={0.2}
            />
          </div>
          <div className="mt-2">
            <div className="flex flex-col">
              <label className="text-lg font-medium">Email</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-lg font-medium">Password</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your password"
                type="password"
              />
            </div>
            <div className="mt-8 flex justify-center items-center gap-4">
              <button
                className="flex items-center gap-2 text-sm font-medium text-gray-600 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition"
                onClick={() => console.log("Google sign-in")}
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google icon"
                  className="w-4 h-4"
                />
                Sign in with Google
              </button>
            </div>

            <div className="mt-8 flex flex-col gap-y-4">
              <button onClick={handleSignIn} className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 bg-[#254EDB] rounded-xl text-white font-bold text-lg">
                Sign Up
              </button>
            </div>
            <div className="mt-8 flex justify-center items-center">
              <p className="font-medium text-base">Already a member?</p>
              <button
                onClick={handleSignIn}
                className="ml-2 font-medium text-base text-violet-500"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
