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

//button to call multiple basic lists
//figure out ranking and make leaderboards
//registration and login functioanlity
//users to upvote/boost items already on a main listgit add .
function App() {
  const [authToken, setAuthToken] =useState(false)
  const [currentUser, setCurrentUser] =useState({})


  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/logRegPage" element={<LogRegPage currentUser={currentUser} setCurrentUser={setCurrentUser} authToken={authToken} setAuthToken={setAuthToken} />} />
          <Route path="/" element={<LandingPage currentUser={currentUser} setCurrentUser={setCurrentUser} authToken={authToken} setAuthToken={setAuthToken} />} />
          <Route path="/addElement" element={<AddForm currentUser={currentUser} setCurrentUser={setCurrentUser} authToken={authToken} setAuthToken={setAuthToken} />} />
          <Route path="/mainLists" element={<BasicList currentUser={currentUser} setCurrentUser={setCurrentUser} authToken={authToken} setAuthToken={setAuthToken} />} />
          <Route path="/register" element={<RegisterForm currentUser={currentUser} setCurrentUser={setCurrentUser} authToken={authToken} setAuthToken={setAuthToken} />} />
          <Route path="/login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} authToken={authToken} setAuthToken={setAuthToken} />} />
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
