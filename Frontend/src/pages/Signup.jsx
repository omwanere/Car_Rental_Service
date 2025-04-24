import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/state";
import "../Style/signup.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signupInfo, setSignupInfo] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!signupInfo.FirstName.trim()) {
      newErrors.FirstName = "First name is required";
    } else if (signupInfo.FirstName.length < 2) {
      newErrors.FirstName = "First name must be at least 2 characters";
    }

    if (!signupInfo.LastName.trim()) {
      newErrors.LastName = "Last name is required";
    } else if (signupInfo.LastName.length < 2) {
      newErrors.LastName = "Last name must be at least 2 characters";
    }

    if (!signupInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(signupInfo.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!signupInfo.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(signupInfo.password)) {
      newErrors.password = "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character";
    }

    if (signupInfo.password !== signupInfo.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/register",
        {
          FirstName: signupInfo.FirstName,
          LastName: signupInfo.LastName,
          email: signupInfo.email,
          password: signupInfo.password,
        },
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
        toast.success("Account created successfully!");
        navigate("/");
        setSignupInfo({
          FirstName: "",
          LastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred during signup";
      toast.error(errorMessage);
      console.error("Signup Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup">
      <div className="signup_content">
        <form className="signup_content_form" onSubmit={handleSignup}>
          <div className="form-group">
            <input
              type="text"
              name="FirstName"
              placeholder="First Name"
              value={signupInfo.FirstName}
              onChange={(e) => setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value })}
              className={errors.FirstName ? "error" : ""}
            />
            {errors.FirstName && <span className="error-message">{errors.FirstName}</span>}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="LastName"
              placeholder="Last Name"
              value={signupInfo.LastName}
              onChange={(e) => setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value })}
              className={errors.LastName ? "error" : ""}
            />
            {errors.LastName && <span className="error-message">{errors.LastName}</span>}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signupInfo.email}
              onChange={(e) => setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value })}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupInfo.password}
              onChange={(e) => setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value })}
              className={errors.password ? "error" : ""}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={signupInfo.confirmPassword}
              onChange={(e) => setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value })}
              className={errors.confirmPassword ? "error" : ""}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={isLoading ? "loading" : ""}
          >
            {isLoading ? "Creating Account..." : "SIGN UP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
