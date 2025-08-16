import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/features/login/LoginForm";
import SignupForm from "./components/features/signup/SignupForm"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OnboardingQuiz from "./components/features/signup/OnboardingQuiz";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signin" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/onboarding" element={<OnboardingQuiz />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}


export default App;
