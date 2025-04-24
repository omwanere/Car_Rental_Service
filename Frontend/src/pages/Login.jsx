import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../redux/state";
import "../Style/login.css";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };
  const user = useSelector((state) => state.user); // ✅ Move this to the top

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        loginInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Login Response:", response.data); // 🔍 Debugging Step
      //console.log("Updated User State:", useSelector((state) => state.user));

      if (response.data.success) {
        dispatch(
          setLogin({ user: response.data.user, token: response.data.token })
        );
        console.log("Updated User State:", user); // ✅ Use the value from useSelector

        navigate("/");
        setLoginInfo({
          email: "",
          password: "",
        });
      } else {
        console.log("Login Failed: Success is false");
      }
    } catch (error) {
      console.log("Login Error:", error);
    }
  };

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={loginHandler}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginInfo.email} // ✅ Corrected
            onChange={changeEventHandler}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginInfo.password} // ✅ Corrected
            onChange={changeEventHandler}
            required
          />
          <button
            type="submit"
            disabled={!loginInfo.email || !loginInfo.password} // ✅ Corrected
          >
            LOG IN
          </button>
        </form>
        <Link to="/signup">Don't have an account? Sign Up Here</Link>
      </div>
    </div>
  );
};

export default Login;
