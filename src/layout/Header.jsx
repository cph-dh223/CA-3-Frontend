import MainNav from "./MainNav";

function Header({setIsLoggedIn, loggedInUser, setLoggedInUser}) {
    return (
      <>
        <MainNav setIsLoggedIn={setIsLoggedIn} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
      </>
    );
  }

  export default Header;