import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterForm = (props) => {
    const {authToken, setAuthToken} =props;
    const {currentUser, setCurrentUser} =props;
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
            setAuthToken(true)
            navigate("/mainLists")
        }).catch(err=>{
            console.log("Error with Lister submit function.", err)
        })
    }

    // const getListerInfo = (email) => {
    //     axios.get("http://localhost:8000/api/lister/findOne", {email},{withCredentials:true, credentials:"include"})
    //     .then(res => res.json(res))
    //     .catch(err =>{
    //         console.log("Couldn't grab new Lister(attempt at registration)", err)
            
    //     })
    // }

    return (
    <div>
        <form onSubmit={submitHandler}>
            <label>Lister Name:</label>
            <input type="text" onChange={(e)=>setListerName(e.target.value)} />
            <label>Email:</label>
            <input type="text" onChange={(e)=>setEmail(e.target.value)} /> //test for uniqueness
            <label>Password:</label>
            <input type="text" onChange={(e)=>setPassword(e.target.value)} />//make sure to change to type password
            <label>Confirm Password:</label>
            <input type="text" onChange={(e)=>setConfirmPassword(e.target.value)} />
            <button>Sign up!</button>
        </form>
        
    </div>
  )
}

export default RegisterForm