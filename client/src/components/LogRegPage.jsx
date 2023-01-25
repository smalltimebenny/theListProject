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
    <div class="absolute h-full w-full py-20 bg-gradient-to-br from-fuchsia-900 via-black to-middle-blue  text-neon-orange overflow-auto">
        <div class="flex content-evenly relative h-3/4 top-1/4 px-10 overflow-auto">
        <Login class="mx-12" setCurrentUser={setCurrentUser} currentUser={currentUser} />
        <div class="mx-12">
        <Announcement />
        <Announcement />
        <Announcement />
        <Announcement />
        <Announcement />
        </div>
        <RegisterForm class="mx-12" setCurrentUser={setCurrentUser} currentUser={currentUser} />
        </div>
    </div>
  )
}

export default LogRegPage