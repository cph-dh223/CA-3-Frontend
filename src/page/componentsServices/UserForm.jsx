import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function UserForm({ updateUser, userToEdit, setUserToEdit, error , confirmPassword, setConfirmPassword, setError, success, setSuccess, role, setRole, password, setPassword, userRolesBeforeEdit}) {
  

  const [showPassword, setShowPassword] = useState(false);
  

const handlePasswordChange = (e) =>{
  setPassword(e.target.value);
  setUserToEdit((prevUser) => ({...prevUser, password: e.target.value}))

}

const handleConfirmPasswordChange = (e) =>{
  setConfirmPassword(e.target.value);
 
}

const handleRolesChange = (e) =>{
  setRole(e.target.value)
  setUserToEdit((prevUser) => ({...prevUser, roles: [...userRolesBeforeEdit, e.target.value]}));
  
}


  return (
    <>
      <h3 htmlFor="email">Edit user: {userToEdit.email}</h3>
      <form>
        <label htmlFor="password">New Password</label>
        <br></br>
        <label>
        <input type="checkbox" onClick={() => setShowPassword(!showPassword)}/>
          Show password
        </label>
        <br></br>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="password"
          onChange={handlePasswordChange}
          value={password}
        />
        <br></br>
        <input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder="confirm password"
          onChange={handleConfirmPasswordChange}
          value={confirmPassword}
        />
        <br></br>
        <br></br>
        <label htmlFor="roles">Role </label>
        <br></br>
        <select id="roles" onChange={handleRolesChange} value={role} disabled={!userToEdit.email}>
          <option value="">Add role</option>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <br></br>
        <button
          onClick={(e) => {
            e.preventDefault();
            updateUser(userToEdit, "password");
            setUserToEdit({});
          }}
          disabled={!userToEdit.email || password === ""}
        >
          Confirm password changes
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            updateUser(userToEdit, "roles");
            setRole("");
            setUserToEdit({});
          }}
          disabled={!userToEdit.email || role === ""}
        >
          Confirm roles changes
        </button>
        <h3 style={{ color: "red" }}>{error}</h3>
        <h3 style={{ color: "green" }}>{success}</h3>
        <hr></hr>
      </form>
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
