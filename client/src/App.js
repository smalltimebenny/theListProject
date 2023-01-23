import {BrowserRouter, Routes, Route} from "react-router-dom"
import {useState, useNavigate} from "react"
import AddForm from "./components/AddForm"
import BasicList from "./components/BasicList"
import RegisterForm from "./components/RegisterForm"
import Login from "./components/Login"
import LogoutButton from "./components/LogoutButton"
import NavBar from "./components/NavBar"
import LandingPage from "./components/LandingPage"
import LogRegPage from "./components/LogRegPage"
import Dashboard from "./components/Dashboard"
import UpdateEntryForm from "./components/UpdateEntryForm"

//button to call multiple basic lists
//figure out ranking and make leaderboards
//registration and login functioanlity
//users to upvote/boost items already on a main listgit add .
function App() {
  const [currentUser, setCurrentUser] =useState(null)


  return (
    <div className="App">
      <BrowserRouter>
      <NavBar setCurrentUser={setCurrentUser} currentUser={currentUser} />
        <Routes>
          <Route path="/" element={<LandingPage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="/logRegPage" element={<LogRegPage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="/dashboard" element={<Dashboard currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="/mainLists" element={<BasicList currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="/addElement" element={<AddForm currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="/register" element={<RegisterForm currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="/login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="/entry/update/:id1" element={<UpdateEntryForm currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        </Routes>
      </BrowserRouter>
          
      
      {/* main page will be "mainLists" */}
      {/* dashboard will be listerDashboard */}
      {/* <PersonalList /> */}
      {/* <BrowserRouter>
        <Routes>
          <Route element={<AddForm masterList={masterList} setMasterList={setMasterList} />} path="/1" />
          <Route element={<BasicList masterList={masterList} setMasterList={setMasterList} />} path="/2" />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
