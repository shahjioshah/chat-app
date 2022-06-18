import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { useNavigate, Link } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const host = "http://localhost:5000";
const registerRoute = `http://localhost:5000/api/auth/register`;

export default function Register() {
  const  navigate = useNavigate();
  const [Values, Seyvalues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
    
  const Tostoptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  } 
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation())
    {
      const {username, email, password} = Values;
      const { data } = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
  });
    if (data.status === false) {
      toast.error(data.msg, Tostoptions);
    }
    if (data.status === true) {
      navigate("/");
    }
         
     }
  }
  const handleValidation = () =>{
    const {username, email, password, confirmPassword} = Values;

    if(password !== confirmPassword)
    {
      toast.error("Password not match!",Tostoptions);
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        Tostoptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        Tostoptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", Tostoptions);
      return false;
    }
    return true;
  }
  const handleChange = (event) =>{
    Seyvalues({...Values,[event.target.name]: event.target.value })
  }
  return (
    <>
  <FormContainer>  
    <form method="post" onSubmit={(e) => handleSubmit(e)}>
      <div className="brand">
        <img src={Logo} alt="logo" />
        <h1>snappy</h1>
      </div>
      <input 
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => handleChange(e)}
      />
      <input 
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChange(e)}
      />
      <input 
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
      />
      <input 
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={(e) => handleChange(e)}
      />
      <button type="submit">Create User</button>
      <span>
      Already have an account ? <Link to="/login">Login.</Link>
      </span>
    </form>
  </FormContainer>
  <ToastContainer />  
  </>
  );
}
const FormContainer = styled.div`
      
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      background-color: #131324;
      .brand{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img{
          height: 5rem;
        }
        h1{
          color: white;
        }
      }
      form{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        border-radius: 2rem;
        padding: 2rem 3rem;
      }
      input{
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        font-size: 1rem;
        color: white;
        width: 100%;
        &:focus{
          border: 0.1rem solid #997af0;
          outline: none;
        }
      }
      button{
        background-color: transparent;
        padding: 1rem 2rem;
        color: white;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        border: none;
        font-size: 1rem;
        text-transform: uppercase;
      }
      span{
        color: white;
        text-transform: uppercase;
        a{
          font-weight: bold;
          text-decoration: none;
        }
      }
`;