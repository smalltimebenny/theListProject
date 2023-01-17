import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
    const [listerName, setListerName] =useState("")
    const [email, setEmail] =useState("")
    const [password, setPassword] =useState("")
    const [confirmPassword, setConfirmPassword] =useState("")

    const [errors, setErrors] =useState({})
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/registerLister", {
            listerName,
            email,
            password,
            confirmPassword,
        }, {withCredentials:true, credentials:"include"})
        .then((res)=>{
            console.log(res)
            navigate("/mainLists")
        }).catch(err=>{
            console.log("Error with Lister submit function.", err)
        })
    }

    return (
    <div>
        <form onSubmit={submitHandler}>
            <label>Lister Name:</label>
            <input type="text" onChange={(e)=>setListerName(e.target.value)} />
            <label>Email:</label>
            <input type="text" onChange={(e)=>setEmail(e.target.value)} />
            <label>Password:</label>
            <input type="text" onChange={(e)=>setPassword(e.target.value)} />
            <label>Confirm Password:</label>
            <input type="text" onChange={(e)=>setConfirmPassword(e.target.value)} />
            <button>Sign up!</button>
        </form>
        
    </div>
  )
}

export default RegisterForm