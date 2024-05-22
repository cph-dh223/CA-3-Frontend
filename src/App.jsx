import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
  Navigate,
  NavLink,
} from "react-router-dom";

import About from "./page/About.jsx";
import Notes from "./page/SomeNotes.jsx";
import PageNotFound from "./page/PageNotFound.jsx";
import Login from "./page/Login.jsx";
import AddNote from "./page/AddNote.jsx";
import AppLayout from "./layout/AppLayout.jsx";
import CreateUser from "./features/CreateUser.jsx";

import ProtectedRoutes from "./utils/ProtectedRoutes";


import Notes from './page/SomeNotes.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({
    email: "",
    name: "",
    roles: ["user"],
  });

  return (

    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/login" />} />

        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setLoggedInUser={setLoggedInUser}
            />
          }
        />
        <Route path="/createUser" element={<CreateUser />} />

        <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
          <Route
            element={
              <AppLayout
                setIsLoggedIn={setIsLoggedIn}
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
              />
            }
          >
            <Route path="/notes" element={<Notes />} />

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Route>

        <Route path="/about" element={<About />} />

        <Route path="/addNote" element={<AddNote />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
