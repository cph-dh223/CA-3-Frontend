export default function UserList({ users, deleteUser, setUserToEdit, setUserRolesBeforeEdit }) {

  const setUserToEditAndRolesOfUser = (u) => {
    setUserToEdit(u); 
    setUserRolesBeforeEdit(u.roles);
  };


  return (
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Roles</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(users) && users.map((user) => (
          <tr key={user.email}>
            <td>{user.email}</td>
            <td> {user.roles.join(", ")} </td>
            <td>
              <button onClick={() => deleteUser(user.email)}>Delete</button>
              <button onClick={() => setUserToEditAndRolesOfUser(user)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
