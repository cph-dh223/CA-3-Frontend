import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getUserWithRolesFromToken } from "../utils/decodeToken.js";
import { login } from "../services/apiFacade.js";

function Login({
  setIsLoggedIn,
  setLoggedInUser,
  userJustCreated,
  setUserJustCreated,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
        navigate("/notes");
      } else {
        setErrorMessage(data.msg);
      }
    } catch (err) {
      console.log("Some error happened when logging in. The error: " + err);
    }
  };

  return (
    <LoginPage>
      {userJustCreated && (
        <p style={{ color: "green", fontSize: "2vw" }}>
          You have succesfully created a user! You can now log in
        </p>
      )}

      <h1>Login</h1>

      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "1.4vw",
        }}
      >
        <LoginContainer>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </LoginContainer>
        <LoginContainer>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LoginContainer>
        <StyledButton type="submit">Login</StyledButton>
      </form>

      <StyledButton onClick={() => navigate("/createUser")}>
        Create user
      </StyledButton>

      {errorMessage && <p>ERROR: {errorMessage}</p>}
    </LoginPage>
  );
}

const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8vw;
`;

const StyledButton = styled.button`
  padding: 1em;
  background: hsl(233deg 36% 38%);
  color: hsl(0 0 100);
  border: none;
  border-radius: 30px;
  font-weight: 600;
  width: 30vw;;
margin-top: 1vw;
`;

const LoginContainer = styled.div`

`;

export default Login;
