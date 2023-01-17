import {BrowserRouter, Routes, Route} from "react-router-dom"
import {useState, useNavigate} from "react"
import AddForm from "./components/AddForm"
import BasicList from "./components/BasicList"
import RegisterForm from "./components/RegisterForm"
import Login from "./components/Login"
import LogoutButton from "./components/LogoutButton"

//button to call multiple basic lists
//figure out ranking and make leaderboards
//registration and login functioanlity
//users to upvote/boost items already on a main listgit add .
function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <LogoutButton />
        <Routes>
          <Route element={<AddForm />} path="/addElement" />
          <Route path="/mainLists" element={<BasicList />} />
          <Route element={<RegisterForm />} path="/register" />
          <Route element={<Login />} path="/login" />
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
