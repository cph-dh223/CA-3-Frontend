import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import { Route, Routes, useNavigate } from "react-router-dom";

import About from "./page/About.jsx";
import Notes from "./page/Notes.jsx";
import PageNotFound from "./page/PageNotFound.jsx";
import Login from "./features/Login.jsx";
import AddNote from "./page/AddNote.jsx";
import AppLayout from "./layout/AppLayout.jsx";
import CreateUser from "./features/CreateUser.jsx";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";
import UserOverview from "./page/UserOverview.jsx";

import MyNotes from "./page/MyNotes.jsx";

function App() {
  const [userJustCreated, setUserJustCreated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState({
    email: "",
    name: "",
    roles: ["user"],
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const checkTokenExpiry = (exp) => {
    return Date.now() >= exp * 1000;
  };

useEffect(() => {
      // Check the token right away
      checkToken();
  
      // Then check the token every 15 minutes
      const intervalId = setInterval(checkToken, 15 * 60 * 1000);
    
      // Clear the interval when the component is unmounted
      return () => clearInterval(intervalId);
}, [])

const checkToken = () => {
  console.log("Checking token: " + localStorage.getItem("token"));
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      if (!checkTokenExpiry(decodedToken.exp)) {
        setIsLoggedIn(true);
        setLoggedInUser({
          email: decodedToken.email,
          name: decodedToken.name,
          roles: decodedToken.roles,
        });
      } else {
        setIsLoggedIn(false);
        setErrorMessage("Your session has expired. Please log in again.");
        localStorage.clear();
      }
    } catch (e) {
      setIsLoggedIn(false);
    }
  } else {
    setIsLoggedIn(false);
  }
};

  return (
    <Routes>
      <Route
        element={
          <ProtectedRoutes isLoggedIn={isLoggedIn}>
            <AppLayout
              setIsLoggedIn={setIsLoggedIn}
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
            />
          </ProtectedRoutes>
        }
      >
        <Route path="/" element={<Notes />} />
        <Route path="/adminPage" element={<UserOverview />} />
        <Route path="/myNotes" element={<MyNotes />} />
        <Route path="/about" element={<About />} />
        <Route path="/addNote" element={<AddNote />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
      <Route
        path="/login"
        element={
          <Login
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
            setIsLoggedIn={setIsLoggedIn}
            setLoggedInUser={setLoggedInUser}
            userJustCreated={userJustCreated}
            setUserJustCreated={setUserJustCreated}
          />
        }
      />
      <Route
        path="/createUser"
        element={<CreateUser setUserJustCreated={setUserJustCreated} />}
      />
    </Routes>
  );
}

export default App;
