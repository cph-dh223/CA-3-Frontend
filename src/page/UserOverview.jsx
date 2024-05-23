import { BASE_URL } from "../utils/globalVariables";
import { useState, useEffect } from "react";
import UserForm from "../componentsServices/UserForm";
import UserList from "../componentsServices/UserList";

return function UserOverview() { //ADMIN ACCESS ONLY

  const blankUser = { email: "", password: "", roles: [] };
  const [users, setUsers] = useState([]);
  const [userToEdit, setuserToEdit] = useState(blankUser);

  useEffect(() => {
    fetchUsers();
  }, [])
  
  async function deleteUser(email) {
    const response = await fetch(BASE_URL + "/users/delete" + email, {
      method: "DELETE",
      headers: { "Authorization": "Bearer " + localStorage.getItem("token")},
    }).catch((error) => console.log(error));
    setUsers(users.filter((user) => user.email !== email));
  }

  async function updateUser(userToUpdate) {
    if(!users.find((user) => user.email === userToUpdate.email)) {
      const response = await fetch(BASE_URL + "/users/update/" + email, {
        method: "PUT",
        body: JSON.stringify(userToUpdate),
        headers: { "Authorization": "Bearer " + localStorage.getItem("token")},
      }).then((response) => setuserToEdit(response.json)).catch((error) => console.log(error));
    }
  }

  async function fetchUsers() {
    const response = await fetch(BASE_URL + "/users");
    const data = await response.json();
    setUsers(data);
  }

  return (
    <div>
      <h1>User Overview</h1>
      <UserForm blankUser={blankUser} updateUser={updateUser} userToEdit={userToEdit} />
      <UserList users={users} deleteUser={deleteUser} updateUser={updateUser}/>
    </div>
  );
}