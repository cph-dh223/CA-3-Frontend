import React from "react";
import styled from "styled-components";
import { NavLink, Navigate, useNavigate } from "react-router-dom";

const HeaderContainer = styled.header`
  background-color: var(--turqois5);
  padding: 10px;
`;

const StyledNavLink = styled(NavLink)`
  /* Remove bottom line */
  text-decoration: none;

  /* Define normal state styles */
  color: var(--gold1);

  /* Define hover state styles */
  &:hover {
    color: var(--gray2); /* Hover color */
  }

  /* Define active state styles */
  &.active {
    color: var(--gray1); /* Active color */
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  color: var(--gold1);
  font-size: 24px;
`;

const Menu = styled.ul`
  display: flex;
  list-style: none;
`;

const MenuItem = styled.li`
  margin-left: 20px;
  color: var(--gold1);
`;

const LogoutButton = styled.button`

  background_color: var(--turqois5);
  color: var(--gold1);
`;

const Login = styled.div`
  color: var(--gold1);
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
    <HeaderContainer>
      <Nav>
        <Logo>My Logo</Logo>
        <Menu>
          {loggedInUser.roles.includes("admin") ? (
            <MenuItem>
              <StyledNavLink to="/adminPage">AdminPage</StyledNavLink>
            </MenuItem>
          ) : (
            <></>
          )}
          <MenuItem>
            <StyledNavLink to="/notes">Notes</StyledNavLink>
          </MenuItem>
          <MenuItem>
            <StyledNavLink to="/about">About</StyledNavLink>
          </MenuItem>
          <MenuItem>
            <StyledNavLink to="/myNotes">My Notes</StyledNavLink>
          </MenuItem>

          <MenuItem>
            <LogoutButton type="button" onClick={handleLogout}>
              Logout
            </LogoutButton>
          </MenuItem>
        </Menu>
      </Nav>
    </HeaderContainer>
  );
};

export default MainNav;
