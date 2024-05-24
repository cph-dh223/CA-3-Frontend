import React from "react";
import styled from "styled-components";
import { NavLink, Navigate, useNavigate } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  background: none;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: x-large;
  text-align: center;
`;

const StyledLi = styled.li`
  display: flex;
  padding-right: 30px;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  color: black;

  &:hover {
    color: var(--gray2);
  }
`;

const Logo = styled(NavLink)`
  color: black;
  text-align: center; 
  cursor: pointer;
  text-decoration: none;
`;

const LogoutButton = styled.button`
  background-color: black;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-size: 20px;
  font-weight: 500;
  height: 40px;
  line-height: 20px;
  list-style: none;
  outline: none;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
`;

const MainNav = ({ setIsLoggedIn, loggedInUser, setLoggedInUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
    localStorage.removeItem("token");

    setLoggedInUser({ email: "", name: "", roles: ["user"] });
  };

  return (
    <Nav>
      <Logo to="/">Notes.com</Logo>
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        {loggedInUser.roles.includes("admin") && (
          <StyledLi>
            <StyledNavLink to="/adminPage">AdminPage</StyledNavLink>
          </StyledLi>
        )}
        <StyledLi>
          <StyledNavLink to="/note">Notes</StyledNavLink>
        </StyledLi>
        <StyledLi>
          <StyledNavLink to="/about">About</StyledNavLink>
        </StyledLi>
        <StyledLi>
          <StyledNavLink to="/myNotes">My Notes</StyledNavLink>
        </StyledLi>
        <StyledLi>
          <LogoutButton type="button" onClick={handleLogout}>
            Logout
          </LogoutButton>
        </StyledLi>
      </ul>
    </Nav>
  );
};

export default MainNav;
