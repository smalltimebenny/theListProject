import React, {useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const Login = (props) => {
  const {authToken, setAuthToken} =props
  const {currentUSer, setCurrentUser} =props
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")

  const navigate = useNavigate()


  const loginListerHandler = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8000/api/loginLister",{
      email,
      password
    },{withCredentials:true, credentials:"include"})
    .then((res)=>{
      console.log("successfully logged in", res)
      // console.log(res.data.lister)
      setAuthToken(true)
      setCurrentUser({
        _id:res.data.lister._id,
        listerName:res.data.lister.listerName,
        email:res.data.lister.email})
      navigate("/mainLists")
    }).catch(err=>{
      console.log("Login error.", err)
    })
  }


  return (
    <div>
        <form onSubmit={loginListerHandler}>
          <label>Email:</label>
          <input type="text" onChange={(e)=>setEmail(e.target.value)} />
          <label>Password:</label>
          <input type="text" onChange={(e)=>setPassword(e.target.value)} />
          <button>Login</button>
        </form>
        
    </div>
  )
}

export default Login