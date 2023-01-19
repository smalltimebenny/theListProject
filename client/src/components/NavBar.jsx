import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import LogoutButton from './LogoutButton'

const NavBar = (props) => {
  const {currentUser, setCurrentUser} =props
  return (
    <div>
        <h1>THE LIST</h1>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/logRegPage">Login/Register</NavLink>
        <LogoutButton setCurrentUser={setCurrentUser} currentUser={currentUser} />
        <hr></hr>
    </div>
  )
}

export default NavBar