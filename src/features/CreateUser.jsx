import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/apiFacade";

export default function CreateUser({setUserJustCreated}) {
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
    console.log({email: email, password: password});

    const userDetailsEntered = {email: email, password: password};

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
    <StyledLoginForm>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>
          Email:
          <StyledInput
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </StyledLabel>
        <br></br>
        <StyledLabel>
          Password:
          <StyledInput
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </StyledLabel>
        <br></br>
        <StyledLabel>
          Confirm password:
          <StyledInput
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </StyledLabel>
        <br></br>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <StyledButton type="submit">Create User</StyledButton>
      </StyledForm>
    </StyledLoginForm>
  );
}

const StyledLoginForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 200vb;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledLabel = styled.label`
  margin-bottom: 10px;
  font-family: Arial, sans-serif;
  color: #333;
`;

const StyledInput = styled.input`
  margin-top: 5px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
  color: #000000;
  background-color: #25a5c2;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #186d80;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;
