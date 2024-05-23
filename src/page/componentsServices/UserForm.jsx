import React, { useState, useEffect } from "react";

export default function UserForm({ updateUser, userToEdit, error , confirmPassword, setConfirmPassword, setError, success, setSuccess}) {
  const [user, setUser] = useState({ ...userToEdit });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setSuccess("");
    setError("");
    if(e.target.id === "confirmPassword"){
      setConfirmPassword(e.target.value);
      
    }
    else if (e.target.id === "roles") {
      if (!user.roles.includes(e.target.value)) {
        setUser({ ...user, roles: [...user.roles, e.target.value] });
      } else {
        setError("Role already exists");
      }
    } else {
      setUser({ ...user, [e.target.id]: e.target.value });
      console.log(e.target.id, e.target.value)
    }
  };

  useEffect(() => {
    setUser(userToEdit);
    setConfirmPassword(userToEdit.password);
  }, [userToEdit]);

  return (
    <>
      <h3 htmlFor="email">Edit user: {user.email}</h3>
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
          onChange={handleChange}
        />{" "}
        <br></br>
        <input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder="confirm password"
          onChange={handleChange}
        />
        <br></br>
        <br></br>
        <label htmlFor="roles">Role </label>
        <br></br>
        <select id="roles" onChange={handleChange}>
          <option value="">Add role</option>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
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
    </>
  );
}
