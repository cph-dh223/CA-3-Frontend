import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
//import { fetchData } from "../services/apiFacade.js";
import { BASE_URL } from "../utils/globalVariables.js";
//import { login } from "../services/apiFacade.js";
import { getUserWithRolesFromToken } from "../utils/decodeToken.js";
import { login } from "../services/apiFacade.js";
import { getUserFromToken } from "../services/userServise.js";

function Login({ setIsLoggedIn, setLoggedInUser, userJustCreated, setUserJustCreated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const getUser = async () => {
        const user = await getUserFromToken(token)
        return user
      } 
      getUser().then((u) => setLoggedInUser(u))
      setIsLoggedIn(true)
      navigate("/notes");
    }
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();



    try {
      const data = await login(username, password);

      if (data.token) {
        const userDetails = getUserWithRolesFromToken(data.token);

        //console.log(userDetails);
        setIsLoggedIn(true);
        setLoggedInUser(userDetails);
        setUserJustCreated(false);

        //console.log('Login successful:', userDetails);
        navigate("/notes");
      } else {
        //console.log("Login failed." + data.Message);
        //setErrorMessage(data.Message)
        setErrorMessage(data.msg);
      }
    } catch (err) {
      console.log("Some error happened when logging in. The error: " + err);
    }
  };

  return (
    <>
      <LoginPage>

        <LoginContainer>
          {userJustCreated ? (
            <>
              <StyledCreatedUserParagraf>
                You have succesfully created a user! You can now log in
              </StyledCreatedUserParagraf>
            </>
          ) : (
            <></>
          )}

          <h1>Login</h1>

          <Form onSubmit={handleLogin}>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoginButton type="submit">Login</LoginButton>
          </Form>

          <button onClick={() => (navigate("/createUser"))}>Create user</button>

          {errorMessage != "" ? <p>ERROR: {errorMessage}</p> : <></>}

        </LoginContainer>
      </LoginPage>
    </>
  );
}

const StyledCreatedUserParagraf = styled.p`
  color: green;
  font-size: 2vw;
`;

const LoginPage = styled.div`
  display: flex;
  justify-content: center;

  border: solid red;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 8vw;

  border: solid blue;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 1.4vw;

  border: solid lightblue;
`;

const Input = styled.input`
  width: 20vw;
  height: 3vw;

  margin-top: 1.2vw;
`;

const LoginButton = styled.button`
  width: 6vw;
  height: 1.8vw;

  margin-top: 2vw;
`;

export default Login;
