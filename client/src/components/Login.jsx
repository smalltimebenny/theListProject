import React, {useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")

  const navigate = useNavigate()


  const submitHandler = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8000/api/loginLister",{
      email,
      password
    },{withCredentials:true, credentials:"include"})
    .then((res)=>{
      console.log("successfully logged in", res)
      navigate("/mainLists")
    }).catch(err=>{
      console.log("Login error.", err)
    })
  }


  return (
    <div>
        <form onSubmit={submitHandler}>
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