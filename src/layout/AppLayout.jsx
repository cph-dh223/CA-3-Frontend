import Header from "./Header.jsx";
import { Outlet } from "react-router-dom";

function AppLayout({setIsLoggedIn, loggedInUser, setLoggedInUser}) {
    return (
      <>
        <Header setIsLoggedIn={setIsLoggedIn} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
        <Outlet />
      </>
    );
  }

  export default AppLayout;