import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/logo.svg";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const  navigate = useNavigate();

    const [Values, Setvalues] = useState({
        username: "",
        password: ""
      });
     const Tostoptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      } 
      const handleSubmit = async (event) =>{
        event.preventDefault();    
        if(ValidationLoginForm())
        {
              const {username, password} = Values;
              const { data } = await axios.post("http://localhost:5000/api/auth/login", {
                username,
                password
          });
            if (data.status === false) {
              toast.error(data.msg, Tostoptions);
            }
            if (data.status === true) {
              console.log(data.msg);
              navigate("/");
            }
        }
      }
      const ValidationLoginForm = () =>{
            const {username, password} = Values;
            if(username === ""){

                toast.error("Username is required.", Tostoptions);
                return false;
            }else if(password === "")
            {
                toast.error("Password is required.", Tostoptions);
                return false;
            }
            return true; 
      }
      const handleChange = (e) =>{
            Setvalues({...Values,[e.target.name]: e.target.value});
      }
  return (
    <>
    <FormContainer>
    <form action="" onSubmit={(e) => handleSubmit(e) }>
      <div className="brand">
        <img src={Logo} alt="logo" />
        <h1>snappy</h1>
      </div>
      <input 
          type="text"
          placeholder="Username"
          name="username"
          min="3"
          onChange={(e) => handleChange(e)}
      />
      <input 
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
      />
      <button type="submit">Login User</button>
      <span>
      Don't have an account ?  <Link to="/register">Create Account</Link>

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