import React, { useState, useEffect } from "react";

export default function UserForm({ updateUser, userToEdit, error , setConfirmPassword, confirmPassword}) {
  const [user, setUser] = useState({ ...userToEdit });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    if(e.target.id === "confirmPassword"){
      setConfirmPassword(e.target.value);
    }
    else if (e.target.id === "roles") {
      if (!user.roles.includes(e.target.value)) {
        setUser({ ...user, roles: [...user.roles, e.target.value] });
      }
    } else {
      setUser({ ...user, [e.target.id]: e.target.value });
    }
  };

  useEffect(() => {
    setUser(userToEdit);
    console.log(userToEdit);
  }, [userToEdit]);

  return (
    <>
      <h3 htmlFor="email">Edit user: {user.email}</h3>
      <form>
        <label htmlFor="password">New Password</label>
        <br></br>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="password"
          onChange={handleChange}
        />{" "}
        <label>
        <input type="checkbox" onClick={() => setShowPassword(!showPassword)}/>
          Show password
        </label>
        <br></br>
        <input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder="confirm password"
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor="roles">Role </label>
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
      </form>
    </>
  );
}
