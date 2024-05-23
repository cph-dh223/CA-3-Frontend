import { BASE_URL } from "../utils/globalVariables";
import { StyledC}
import { useState, useEffect } from "react";
import UserList from "./componentsServices/UserList";
import UserForm from "./componentsServices/UserForm";

export default function UserOverview() {
  //ADMIN ACCESS ONLY

  const blankUser = { email: "", password: "", roles: [] };
  const [users, setUsers] = useState([]);
  const [userToEdit, setuserToEdit] = useState(blankUser);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function deleteUser(email) {
    console.log("User is begin deleted: ", email);
    const response = await fetch(BASE_URL + "/users/delete/" + email, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    }).catch((error) => setError("Something went wrong :("));
    setUsers(users.filter((user) => user.email !== email));
  }

  async function updateUser(userToUpdate) {
    setError("");
    if (userToUpdate.password !== confirmPassword) {
      setError("Passwords do not match");
      setConfirmPassword("");
      return;
    }

    if (users.find((user) => user.email === userToUpdate.email)) {
      console.log("User is being updated: \n", userToUpdate);
      const response = await fetch(BASE_URL + "/users/update/", {
        method: "PUT",
        body: JSON.stringify(userToUpdate),
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
        .then(() => {
          setUsers(
            users.map((user) =>
              user.email === userToUpdate.email ? userToUpdate : user
            )
          );
        })
        .catch((error) => setError("Something went wrong"));
    }
  }

  async function fetchUsers() {
    const response = await fetch(BASE_URL + "/users", {
      metghod: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    const data = await response.json();
    setUsers(data);
  }

  return (
    <div>
      <h1>User Overview</h1>

      <UserForm
        updateUser={updateUser}
        userToEdit={userToEdit}
        setConfirmPassword={setConfirmPassword}
        confirmPassword={confirmPassword}
        error={error}
      />
      <UserList
        users={users}
        deleteUser={deleteUser}
        setUserToEdit={setuserToEdit}
      />
    </div>
  );
}
