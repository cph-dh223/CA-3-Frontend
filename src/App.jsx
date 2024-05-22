
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

import ProtectedRoutes from "./utils/ProtectedRoutes";


import Notes from './page/SomeNotes.jsx'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({
    email: "",
    name: "",
    roles: ["user"],
  });

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element = {<ProtectedRoutes isAuthenticated={isAuthenticated}/>} >
          <Route element={<AppLayout />}>
            <Route path="/notes" element={<Notes />} />
            <Route path="/about" element={<About />} />

            <Route path="/AddNote" element={<AddNote />} />

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
