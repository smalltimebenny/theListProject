import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterForm = (props) => {      
    const {currentUser, setCurrentUser} =props;
    const [listerName, setListerName] =useState("")
    const [email, setEmail] =useState("")
    const [password, setPassword] =useState("")
    const [confirmPassword, setConfirmPassword] =useState("")

    const [errors, setErrors] =useState({})
    const navigate = useNavigate()

    const autoLogin = (email, password) => {
        axios.post("http://localhost:8000/api/loginLister", {
            email,
            password
        }, {withCredentials:true, credentials:"include"})
            .then(res=>{
                console.log("Successfully logged in after registration.", res)
                setCurrentUser({
                    _id:res.data.lister._id,
                    listerName:res.data.lister.listerName,
                    email:res.data.lister.email})
                    navigate("/")
            }).catch(err=>{
                console.log("Autologin error.", err)
            })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/registerLister", {
            listerName,
            email,
            password,
            confirmPassword,
        },{withCredentials:true, credentials:"include"})
        .then((res)=>{
            console.log("guess it worked",res)
            // autoLogin(email, password)
            // navigate("/")
        }).catch(err=>{
            console.log("Error with Lister submit function.", err)
            setErrors(err.response.data.errors)
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
            {errors.listerName && <span>{errors.listerName.message}</span>}
            <label>Email:</label>
            <input type="text" onChange={(e)=>setEmail(e.target.value)} />
            {errors.email && <span>{errors.email.message}</span>}
            <label>Password:</label>
            <input type="text" onChange={(e)=>setPassword(e.target.value)} />//make sure to change to type password
            {errors.password && <span>{errors.password.message}</span>}
            <label>Confirm Password:</label>
            <input type="text" onChange={(e)=>setConfirmPassword(e.target.value)} />
            {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
            <button>Sign up!</button>
        </form>
        
    </div>
  )
}

export default RegisterForm