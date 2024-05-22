import MainNav from "./MainNav.jsx";

function Header({setIsLoggedIn, loggedInUser, setLoggedInUser}) {
    return (
      <>
        <MainNav setIsLoggedIn={setIsLoggedIn} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
      </>
    );
  }

  export default Header;