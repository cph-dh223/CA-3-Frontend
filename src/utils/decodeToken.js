// authUtils.js
import { jwtDecode } from "jwt-decode";

export function getUserWithRolesFromToken(token) {
  try {

    const decoded = jwtDecode(token);

    if (!decoded) {
      throw new Error("Invalid token");
    }

    const roles = decoded.roles;
    const name = decoded.name;
    const email = decoded.email;

    const rolesArray = Array.isArray(roles) ? roles : roles.split(",");
    const rolesSet = new Set(rolesArray);

    localStorage.setItem('token', token);

    console.log({ email: email, name: name, roles: Array.from(rolesSet) });
    
    return { email: email, name: name, roles: Array.from(rolesSet) };

  } catch (error) {
    console.error("Error decoding token:", error);
    throw error;
  }
};
