import {BrowserRouter, Routes, Route} from "react-router-dom"
import {useState, useNavigate} from "react"
import AddForm from "./components/AddForm"
import BasicList from "./components/BasicList"
import './App.css';
//button to call multiple basic lists
//figure out ranking and make leaderboards
//registration and login functioanlity
//users to upvote/boost items already on a main list
function App() {

  return (
    <div>
      <AddForm />
      <BasicList />
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
