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
    <div class="flex content-evenly mx-28 px-48 py-20 absolute top-1/4 h-3/4 w-auto text-neon-orange overflow-auto">
        <Login class="mx-12" setCurrentUser={setCurrentUser} currentUser={currentUser} />
        <div class="mx-12">
        <Announcement />
        <Announcement />
        <Announcement />
        </div>
        <RegisterForm class="mx-12" setCurrentUser={setCurrentUser} currentUser={currentUser} />
    </div>
  )
}

export default LogRegPage