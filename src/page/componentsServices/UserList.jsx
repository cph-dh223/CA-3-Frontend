export default function UserList({ users, deleteUser, setUserToEdit }) {
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
        {users.map((user) => (
          <tr key={user.email}>
            <td>{user.email}</td>
            <td> {user.roles.join(", ")} </td>
            <td>
              <button onClick={() => deleteUser(user.email)}>Delete</button>
              <button onClick={() => setUserToEdit(user)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
