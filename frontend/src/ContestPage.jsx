import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "./supabaseClient";
import Aos from "aos";
import "aos/dist/aos.css";
import "./ContestPage.css";
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
    // Scroll to the login section if URL contains '#login'
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
      navigate("/questions");
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
      window.location.href = "/"; // Redirect to home or login page
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  const renderContent = () => {
    if (cookies.userId) {
      return (
        <div data-aos="fade-up" className="login-container" style={{ width: "400px", margin: "0 auto" }}>
          <h1>Welcome to the Contest</h1>
          <h2>You are already logged in.</h2>
          <button onClick={handleSignOut}>Logout</button>
        </div>
      );
    } else {
      return (
        <div data-aos="fade-up" className="login-container" style={{ width: "400px", margin: "0 auto" }}>
          <h1>Get in Sherlock!</h1>
          <form id="login">
            <input
              type="text"
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
            <br />
            <input
              type="email"
              placeholder="Team Leader Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <button type="button" onClick={handleSignUp}>
              Sign Up
            </button>
            <button type="button" onClick={handleSignIn}>
              Login
            </button>
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
