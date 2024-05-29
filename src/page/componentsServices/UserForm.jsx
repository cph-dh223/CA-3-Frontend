import React, { useState, useEffect } from "react";

export default function UserForm({ updateUser, userToEdit, setUserToEdit, error , confirmPassword, setConfirmPassword, setError, success, setSuccess, role, setRole, password, setPassword}) {
  
  //const [userWithPassword, setUserWithPassword] = useState({ ...userToEdit });
  //const [userWithRoles, setUserWithRoles] = useState({ ...userToEdit });
  const blankUser = { email: "", password: "", roles: [] };
  const [showPassword, setShowPassword] = useState(false);
  
  //console.log(userToEdit.roles)


const handlePasswordChange = (e) =>{
  setPassword(e.target.value);
  setUserToEdit((prevUser) => ({...prevUser, password: e.target.value}))

}

const handleConfirmPasswordChange = (e) =>{
  setConfirmPassword(e.target.value);
 
}

const handleRolesChange = (e) =>{
  setRole(e.target.value)
  setUserToEdit((prevUser) => ({...prevUser, roles: [...prevUser.roles, e.target.value]}));
}



/*
  const handleChange = (e) => {
    setSuccess("");
    setError("");
    if(e.target.id === "confirmPassword"){
      setConfirmPassword(e.target.value);
      
    }
    else if (e.target.id === "roles") {
      if (!userWithRoles.roles.includes(e.target.value)) {
        setUserWithRoles({ ...userWithRoles, roles: [...userWithRoles.roles, e.target.value] });
      } else {
        setError("Role already exists");
      }
    } else {
      setUserWithPassword({ ...userWithPassword, [e.target.id]: e.target.value });
      console.log(e.target.id, e.target.value)
    }
  };

  */
  useEffect(() => {
    //setUserWithPassword(userToEdit);
    //setUserWithRoles(userToEdit);
    //setConfirmPassword(userToEdit.password);
  }, [userToEdit]);

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
        <select id="roles" onChange={handleRolesChange} value={role}>
          <option value="">Add role</option>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <br></br>
        <button
          onClick={(e) => {
            e.preventDefault();
            updateUser(userToEdit, "password");
            
          }}
        >
          Confirm password changes
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            updateUser(userToEdit, "roles");
            setRole("")
          }}
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
