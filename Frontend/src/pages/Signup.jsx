import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/state";
import "../Style/signup.css";

const Signup = () => {
  const dispatch = useDispatch();

  const [signupInfo, setSignupInfo] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    conformpassword: "",
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
  };

  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(
      signupInfo.password === signupInfo.conformpassword ||
        signupInfo.conformpassword === ""
    );
  });
  const handleSignup = async (e) => {
    e.preventDefault();
    const { FirstName, LastName, email, password } = signupInfo;
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/register",
        signupInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        dispatch(
          setLogin({ user: response.data.user, token: response.data.token })
        );
        navigate("/Login");
        setSignupInfo({
          FirstName: "",
          LastName: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSignup}>
          <input
            placeholder="First Name"
            name="FirstName"
            value={signupInfo.FirstName}
            onChange={changeEventHandler}
            required
          />
          <input
            placeholder="Last Name"
            name="LastName"
            value={signupInfo.LastName}
            onChange={changeEventHandler}
            required
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={signupInfo.email}
            onChange={changeEventHandler}
            required
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={signupInfo.password}
            onChange={changeEventHandler}
            required
          />
          <input
            placeholder="Conform Password"
            name="conformpassword"
            type="password"
            value={signupInfo.conformpassword}
            onChange={changeEventHandler}
            required
          />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}

          <button
            type="submit"
            disabled={
              !passwordMatch ||
              !signupInfo.FirstName ||
              !signupInfo.LastName ||
              !signupInfo.email ||
              !signupInfo.password
            }
          >
            REGISTER
          </button>
        </form>
        <a href="/Login">Already have an account? Log In Here</a>
      </div>
    </div>
  );
};

export default Signup;
