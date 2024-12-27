import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import supabase from "./config/supabaseClient";
import Aos from "aos";
import "aos/dist/aos.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ContestPage() {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teamName, setTeamName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { pathname, hash } = location;
    if (pathname === "/" && hash === "#login") {
      const loginElement = document.getElementById("login");
      if (loginElement) {
        loginElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const handleSignIn = async () => {
    try {
      if (!email || !password || !teamName) {
        toast.error("Please fill in all fields");
        return;
      }
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        throw signInError;
      }

      const { data, error: fetchError } = await supabase
        .from("users")
        .select("id, email, team_name")
        .eq("email", email)
        .single();

      if (fetchError || !data) {
        throw fetchError || new Error("User not found");
      }

      setCookie("userId", data.id, { path: "/" });
      navigate(`/sherlock/${data.id}`);
    } catch (error) {
      toast.error("Wrong Credentials. Sign Up Before Login");
      console.error(error);
    }
  };

  const handleSignUp = async () => {
    try {
      if (!email || !password || !teamName) {
        toast.error("Please fill in all fields");
        return;
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        throw signUpError;
      } else {
        toast.success("Signed up successfully");

        const { error: upsertError } = await supabase.from("users").upsert([
          {
            email,
            password,
            team_name: teamName,
          },
        ]);

        if (upsertError) {
          throw upsertError;
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("User already exists or an error occurred");
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      removeCookie("userId");
      toast.success("You have been logged out successfully.");
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  const renderContent = () => {
    if (cookies.userId) {
      return (
        <div
          data-aos="fade-up"
          className="bg-white bg-opacity-95 p-8 rounded-lg shadow-lg w-[400px] mx-auto text-center"
        >
          <h1 className="text-2xl font-bold text-gray-700 mb-4">
            Welcome to the Contest
          </h1>
          <h2 className="text-lg text-gray-600 mb-6">
            You are already logged in.
          </h2>
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <div
          data-aos="fade-up"
          className="bg-white bg-opacity-95 p-8 rounded-lg shadow-lg w-[400px] mx-auto text-center"
        >
          <h1 className="text-2xl font-bold text-gray-700 mb-4">
            Get in Sherlock!
          </h1>
          <form id="login" className="space-y-4">
            <input
              type="text"
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Team Leader Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleSignUp}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={handleSignIn}
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      );
    }
  };

  return (
    <>
      {renderContent()}
      <ToastContainer />
    </>
  );
}

export default ContestPage;
