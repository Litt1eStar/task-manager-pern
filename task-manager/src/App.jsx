import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Workspace from "./components/Workspace";
import ContainerPage from "./components/Container/ContainerPage";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoute/>}>
            <Route path="/profile" element={<Profile/>}/>
          </Route>
          <Route element={<PrivateRoute/>}>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Route>
          <Route element={<PrivateRoute/>}>
            <Route path="/workspace" element={<Workspace/>}/>
          </Route>
          <Route element={<PrivateRoute/>}>
            <Route path="/container/:id" element={<ContainerPage/>}/>
          </Route>
            <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
