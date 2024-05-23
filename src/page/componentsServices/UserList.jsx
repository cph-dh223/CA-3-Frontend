


return function UserList({ users , deleteUser, updateUser}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Roles</th>
          <th></th>
        </tr>
      </thead>
      {users.map((user) => (
        <tbody key={user.email}>
          <tr>
            <td>{user.email}</td>
            <td>{user.roles}</td>
            <td>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
              <button onClick={() => updateUser(user)}>Edit</button>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
}