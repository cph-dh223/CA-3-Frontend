import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import { getUserWithRolesFromToken } from "../utils/decodeToken.js";
import { login } from "../services/apiFacade.js";
import backgroundImage from '/src/img/and-machines-vqTWfa4DjEk-unsplash.jpg'; //CHANGE BACKGROUND IMAGE

function Login({ setErrorMessage, errorMessage, setIsLoggedIn, setLoggedInUser, userJustCreated, setUserJustCreated}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await login(username, password);

      if (data.token) {
        const userDetails = getUserWithRolesFromToken(data.token);
        setIsLoggedIn(true);
        setLoggedInUser(userDetails);
        setUserJustCreated(false);

        //console.log('Login successful:', userDetails);
        navigate("/");
      } else {
        setErrorMessage(data.msg);
      }
    } catch (err) {
      console.log("Some error happened when logging in. The error: " + err);
    }
  };

  return (
    <>
      <LoginWrapper>
        <LoginPage>
          <Styledwrapper>
            <h1 style={{fontSize: userJustCreated && ("20px")}}>
              {userJustCreated ? (<>You're one step away! <br></br>Please log in to access your account</>) : "Login"}</h1>
            <form onSubmit={handleLogin}>
              <StyledInputBox>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <i className="bx bxs-user"></i>
              </StyledInputBox>
              <StyledInputBox>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i className="bx bxs-lock-alt"></i>
              </StyledInputBox>
              <StyledButton type="submit">Login</StyledButton>
            </form>

            <StyledRegisterLink>
              <p>
                Don't have an account?
                <a href={"/createUser"}> Register</a>
              </p>
            </StyledRegisterLink>

            {errorMessage && <p>{errorMessage}</p>}
          </Styledwrapper>
        </LoginPage>
      </LoginWrapper>
    </>
  );
}

const Styledwrapper = styled.div`
  width: 420px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  border-radius: 10px;
  padding: 30px 40px;
  

  h1 {
    font-size: 36px;
    text-align: center;
  }
`;

const LoginWrapper = styled.div`
  * {
    margin: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }
`;

const LoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url(${backgroundImage}) no-repeat; 
  background-size: cover;
  background-position: center;
`;

const StyledButton = styled.button`
  width: 100%;
  height: 45px;
  background: #fff;
  border: none;
  outline: none;
  border-radius: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 16px;
  color: #333;
  font-weight: 600;
`;

const StyledInputBox = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  margin: 30px 0;

  input {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 40px;
    font-size: 18px;
    color: white;
    padding: 20px 45px 20px 20px;

    &::placeholder {
      color: white;
    }
  }

  i {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
  }
`;

const StyledRegisterLink = styled.div`
  font-size: 14.5px;
  text-align: center;
  margin: 20px 0 15px;

  p a {
    color: #fff;
    text-decoration: none;
    font-weight: 600;
  }
  p a:hover {
    text-decoration: underline;
  }
`;

export default Login;
