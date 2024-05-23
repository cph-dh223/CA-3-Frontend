import { BASE_URL } from "../utils/globalVariables";
import styled from "styled-components";
import { useState, useEffect } from "react";
import UserList from "./componentsServices/UserList";
import UserForm from "./componentsServices/UserForm";
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 50px;
  margin: auto;
`;
const StyledUserForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  label {
    font-size: x;
  }
  input {
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
  }
  button {
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
  }
  select {
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
  }
`;

const StyledUserTable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th {
    background-color: #f2f2f2;
  }
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    border-radius: 5px;
  }
`;

export default function UserOverview() {
  //ADMIN ACCESS ONLY

  const blankUser = { email: "", password: "", roles: [] };
  const [users, setUsers] = useState([]);
  const [userToEdit, setuserToEdit] = useState(blankUser);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function deleteUser(email) {
    setSuccess("");
    setError("");
    console.log("User is begin deleted: ", email);
    const response = await fetch(BASE_URL + "/users/delete/" + email, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    }).then(()=>setSuccess("User Deleted")).catch((error) => setError("Something went wrong :("));
    setUsers(users.filter((user) => user.email !== email));
  }

  async function updateUser(userToUpdate) {
    setSuccess("");
    setError("");
    if (userToUpdate.password != confirmPassword) { 
      setError("Passwords do not match");
      setConfirmPassword("");
      return;
    }
    //check password like we do in register when that is implemented
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
          setSuccess("User Updated!");
        })
        .catch((e) => setError("Something went wrong"));
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
    <StyledDiv>
      <StyledUserForm>
        <UserForm
          updateUser={updateUser}
          userToEdit={userToEdit}
          setConfirmPassword={setConfirmPassword}
          confirmPassword={confirmPassword}
          error={error}
          setError={setError}
          confirmPasswordchange={confirmPassword}
          setSuccess={setSuccess}
          success={success}
        />
      </StyledUserForm>
      <br></br>
      <h1>Users</h1>
      <StyledUserTable>
        <UserList
          users={users}
          deleteUser={deleteUser}
          setUserToEdit={setuserToEdit}
        />
      </StyledUserTable>
    </StyledDiv>
  );
}
