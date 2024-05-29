import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function UserForm({
  updateUser,
  userToEdit,
  error,
  confirmPassword,
  setConfirmPassword,
  setError,
  success,
  setSuccess,
}) {
  const [user, setUser] = useState({ ...userToEdit });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setSuccess("");
    setError("");
    if (e.target.id === "confirmPassword") {
      setConfirmPassword(e.target.value);
    } else if (e.target.id === "roles") {
      if (!user.roles.includes(e.target.value)) {
        setUser({ ...user, roles: [...user.roles, e.target.value] });
      } else {
        setError("Role already exists");
      }
    } else {
      setUser({ ...user, [e.target.id]: e.target.value });
      console.log(e.target.id, e.target.value);
    }
  };

  useEffect(() => {
    setUser(userToEdit);
    setConfirmPassword(userToEdit.password);
  }, [userToEdit]);

  return (
    <>
      <h3 htmlFor="email">Edit user: {user.email}</h3>
      <Styledwrapper>
        <form>
          <label htmlFor="password">New Password</label>
          <br></br>
          <label>
            <input
              type="checkbox"
              onClick={() => setShowPassword(!showPassword)}
            />
            Show password
          </label>
          <br></br>
          <StyledInputBox>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="password"
              onChange={handleChange}
            />{" "}
          </StyledInputBox>

          <StyledInputBox>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="confirm password"
              onChange={handleChange}
            />
          </StyledInputBox>

          <StyledDropDown>
            <select id="roles" onChange={handleChange}>
              <option value="">Add role</option>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </StyledDropDown>
          <br></br>
          <button
            onClick={(e) => {
              e.preventDefault();
              updateUser(user);
            }}
          >
            Confirm changes
          </button>
          <h3 style={{ color: "red" }}>{error}</h3>
          <h3 style={{ color: "green" }}>{success}</h3>
          <hr></hr>
        </form>
      </Styledwrapper>
    </>
  );
}

const StyledInputBox = styled.div`
  width: 100%;
  height: 30px;
  margin: 30px 0;

  input {
    width: 100%;
    height: 100%;
    outline: none;
    border: 1px solid grey;
    border-radius: 10px;
    font-size: 18px;
    color: black;

    &::placeholder {
      color: black;
    }
  }
`;
const Styledwrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  

  margin: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
`;

const StyledDropDown = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  margin: 30px 0;

  select {
    width: 100%;
    height: 100%;
    outline: none;
    border: 1px solid grey;
    border-radius: 10px;
    font-size: 18px;
    color: black;
  }
`;
