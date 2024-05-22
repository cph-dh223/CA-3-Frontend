import Header from "./Header";
import { Outlet } from "react-router-dom";

function AppLayout({setIsLoggedIn, loggedInUser, setLoggedInUser}) {
    return (
      <>
        <Header etIsLoggedIn={setIsLoggedIn} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
        <Outlet />
      </>
    );
  }

  export default AppLayout;