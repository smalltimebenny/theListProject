import React, {useState, useEffect} from 'react'
import { useNavigate, Link, useParams, NavLink } from 'react-router-dom'
import axios from 'axios'
import Login from './Login'
import RegisterForm from './RegisterForm'
import Announcement from './Announcement'


const LogRegPage = (props) => {
    const {authToken, setAuthToken} =props
    const {currentUser, setCurrentUser} =props
    const navigate = useNavigate()

    useEffect(
        ()=>{
            if(!currentUser._id){
                axios.get("http://localhost:8000/api/lister/findOne/" + props.currentUser.email)
                    .then(res=>{
                        console.log(res.data)
                        setCurrentUser({
                            _id:res.data.lister._id,
                            listerName:res.data.lister.listerName,
                            email:res.data.lister.email})})
                    .catch(err=>{
                        console.log("Find Lister error. (LogReg page on load.)", err)
                        navigate("/")
                    })
                    }}
    )
    useEffect(()=>{
        console.log(authToken)
        if(!authToken){
            console.log("Not authorized.")
            navigate("/")
        }
    })
    


  return (
    <div>
        <Login />
        <Announcement />
        <Announcement />
        <Announcement />
        <RegisterForm />
    </div>
  )
}

export default LogRegPage