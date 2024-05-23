import React, { useState, useEffect } from "react";

export default function UserForm({
  blankUser,
  updateUser,
  userToEdit,
}) {
  const [user, setUser] = useState({ ...userToEdit });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    setPerson(userToEdit);
  }, [userToEdit]);

  return (
    <form>
      <label htmlFor="email">email</label>
      <input
        id="id"
        readOnly="true"
        type="number"
        placeholder="id"
        value={user.id}
        onChange={handleChange}
      />
      <br></br>
      <label htmlFor="roles">Roles</label>
      <select id="roles" value={user.roles} onChange={handleChange}>
        <option defaultChecked>Add role</option>
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>
      <button
        onClick={(e) => {
          e.preventDefault();
          updateUser(user);
        }}
      >
        Create
      </button>
      <button onClick={() => setUser(blankUser)}>Reset</button>
    </form>
  );
}
