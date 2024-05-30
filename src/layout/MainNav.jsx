import React, {useState} from "react";
import styled from "styled-components";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  background: none;
  padding: 20px;
  align-items: center;
  font-size: x-large;
  text-align: center;

  @media (max-width: 970px) {
    flex-direction: column;
  }
`;

const MenuContainer = styled.div`
  @media (max-width: 970px) {
  max-height: ${(props) => (props.open ? "450px" : "0px")};
  transition: max-height 0.5s ease-in-out;
  overflow: hidden;
}
`;

const StyledLi = styled.li`
  display: flex;
  padding-right: 30px;
  transition: all 0.5s ease;

  @media (max-width: 970px) {
    padding: 10px 0;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  color: black;
  transition: all 0.1s ease;
  &:hover {
    color: #e99139;
  }
`;


const Logo = styled(NavLink)`
  color: black;
  cursor: pointer;
  text-decoration: none;
  font-size: 35px;
  font-weight: 600;
  font-family: "raleway";
  @media (max-width: 970px) {
    font-size: 50px;
  }
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
  transition: background-color 0.2s ease, color 0.2s ease;

&:hover {
  background-color: #ffffff;
  color: #000000;
}
`;

const Menu = styled.ul`
  display: flex;
  list-style: none;
  text-align: center;
  align-items: center;

  @media (max-width: 970px) {
    opacity: ${(props) => (props.open ? '1' : '0')};
  visibility: ${(props) => (props.open ? 'visible' : 'hidden')};
  transition: opacity 0.5s ease, visibility 0.5s ease;
    flex-direction: column;
  }
`;

const Hamburger = styled.div`
  display: none;

  @media (max-width: 970px) {
    display: block;
    font-size: 3rem;
  }
`;

const HorisontalLine = styled.hr`
  display: none;
  @media (max-width: 970px) {
    display: block;
    width: 50%;
    margin: 0 auto;
    background-color: black;
    height: 3px;
    border: none;
    filter: blur(1px);
    filter: opacity(40%);
  }
`;

const MainNav = ({ setIsLoggedIn, loggedInUser, setLoggedInUser }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    localStorage.clear();
    setLoggedInUser({ email: "", name: "", roles: ["user"] });
    navigate("/login");
    console.log("Logged out" )
    navigate("/login");
    console.log("Logged out" )
  };

  return (
    <>
    <Nav>
      <Logo to="/">Notes.com</Logo>
      <Hamburger onClick={() => setOpen(!open)}>☰</Hamburger>
      <MenuContainer open={open}>
      <Menu open={open}>     
        {loggedInUser.roles.includes("admin") && (
          <StyledLi>
            <StyledNavLink to="/adminPage">AdminPage</StyledNavLink>
          </StyledLi>
        )}
        <StyledLi>
          <StyledNavLink to="/">Notes</StyledNavLink>
        </StyledLi>
        <StyledLi>
          <StyledNavLink to="/about">About</StyledNavLink>
        </StyledLi>
        <StyledLi>
          <LogoutButton type="button" onClick={handleLogout}>
            Logout
          </LogoutButton>
        </StyledLi>
        </Menu>
        </MenuContainer>
    </Nav>
    <HorisontalLine></HorisontalLine>
    </>
  );
};

export default MainNav;
