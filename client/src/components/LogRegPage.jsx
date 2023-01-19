import React, {useState, useEffect} from 'react'
import { useNavigate, Link, useParams, NavLink } from 'react-router-dom'
import axios from 'axios'
import Login from './Login'
import RegisterForm from './RegisterForm'
import Announcement from './Announcement'


const LogRegPage = (props) => {
    const {currentUser, setCurrentUser} =props
    const navigate = useNavigate()




  return (
    <div>
        <Login setCurrentUser={setCurrentUser} currentUser={currentUser} />
        <Announcement />
        <Announcement />
        <Announcement />
        <RegisterForm setCurrentUser={setCurrentUser} currentUser={currentUser} />
    </div>
  )
}

export default LogRegPage