import React, {useState, useEffect} from 'react'
import { useNavigate, Link, useParams, NavLink } from 'react-router-dom'
import axios from 'axios'

const Dashboard = (props) => {
    const {authToken, setAuthToken} =props
    const {currentUser, setCurrentUser} =props
    const navigate = useNavigate()


    useEffect(
        ()=>{
            if(!currentUser._id){
                axios.get("http://localhost:8000/api/lister/findOne/" + currentUser.email)
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
        if(!authToken){
            console.log("Not authorized.")
            navigate("/")
        }
    })
  return (
    <div>

    </div>
  )
}

export default Dashboard