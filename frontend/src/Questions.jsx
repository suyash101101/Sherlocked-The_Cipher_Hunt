import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "./supabaseClient";
import Aos from "aos";
import "aos/dist/aos.css";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import "./ContestPage.css";

function ContestPage() {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teamName, setTeamName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const handleSignUp = async () => {
    try {
      if (!email || !password || !teamName) {
        alert("Please fill in all fields");
        return;
      }

      // Hash the password before storing
      const hashedPassword = await bcrypt.hash(password, 10);

      // Sign up the user using Supabase auth
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password, // Still needed for Supabase auth
      });

      if (signUpError) throw signUpError;

      // Insert the user into the "users" table with the hashed password
      const { error: insertError } = await supabase.from("users").insert([
        {
          email,
          password_hash: hashedPassword,
          team_name: teamName,
        },
      ]);

      if (insertError) throw insertError;

      alert("Signed up successfully!");

      // Fetch the user ID for the session
      const { data: userData, error: fetchError } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();

      if (fetchError) throw fetchError;

      // Set the user ID in cookies
      setCookie("userId", userData.id, { path: "/" });

      // Redirect to the questions page
      navigate("/questions");
    } catch (error) {
      alert("Signup failed. Please try again.");
      console.error(error);
    }
  };

  const handleSignIn = async () => {
    try {
      if (!email || !password) {
        alert("Please fill in all fields");
        return;
      }

      // Fetch the user data from the "users" table
      const { data: userData, error: fetchError } = await supabase
        .from("users")
        .select("id, password_hash")
        .eq("email", email)
        .single();

      if (fetchError) throw fetchError;

      // Compare the provided password with the hashed password
      const passwordMatch = await bcrypt.compare(password, userData.password_hash);

      if (!passwordMatch) {
        alert("Invalid credentials. Please try again.");
        return;
      }

      // Set the user ID in cookies
      setCookie("userId", userData.id, { path: "/" });

      // Redirect to the questions page
      navigate("/questions");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      removeCookie("userId");
      alert("You have been logged out.");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const renderContent = () => {
    if (cookies.userId) {
      return (
        <div data-aos="fade-up" className="login-container">
          <h1>Welcome to the Contest</h1>
          <h2>You are already logged in.</h2>
          <button onClick={handleSignOut}>Logout</button>
        </div>
      );
    } else {
      return (
        <div data-aos="fade-up" className="login-container">
          <h1>Let the Contest Begin</h1>
          <form>
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
              placeholder="Email"
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

  return <>{renderContent()}</>;
}

export default ContestPage;
