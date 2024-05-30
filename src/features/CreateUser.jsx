import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/apiFacade";
import backgroundImage from "/src/img/and-machines-vqTWfa4DjEk-unsplash.jpg"; //CHANGE BACKGROUND IMAGE

export default function CreateUser({ setUserJustCreated }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password and Confirm Password do not match");
      return;
    }
    console.log({ email: email, password: password });

    const userDetailsEntered = { email: email, password: password };

    try {
      const result = await createUser(userDetailsEntered);

      if (result.msg) {
        setError(result.msg);
      } else {
        setUserJustCreated(true);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error in handleCreateUser:", error);
    }
  };

  return (
    <>
      <LoginWrapper>
        <LoginPage>

          <Styledwrapper>
          <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
              <StyledInputBox>
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={handleEmailChange}
                  required
                />
              </StyledInputBox>

              <StyledInputBox>
                <input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </StyledInputBox>

              <StyledInputBox>
                <input
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </StyledInputBox>
              <br></br>
              <StyledButtonWrapper>
                <StyledButtonSubmit type="submit">
                  Create User
                </StyledButtonSubmit>

                {/* <StyledButtonLogin type="submit">Login</StyledButtonLogin> */}
              </StyledButtonWrapper>
            </form>
            {error && <p>{error}</p>}
            <StyledRegisterLink>
              <p>
                Already have an account?
                <a href={"/Login"}> Log in</a>  
              </p>
            </StyledRegisterLink>
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

const StyledButtonWrapper = styled.div`
  display: flex;
`;
const StyledButtonSubmit = styled.button`
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
  margin-bottom: 20px;
`;

const StyledButtonLogin = styled.button`
  width: 40%;
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
  margin-left: auto;
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

//--------------------------- OLD STYLES ------------------------------
