import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import LogoutButton from './LogoutButton'

const NavBar = (props) => {
  const {authToken, setAuthToken} =props
  const {currentUSer, setCurrentUser} =props
    const navigate = useNavigate()
  return (
    <div>
        <h1>THE LIST</h1>
        <NavLink to="/mainLists">Dashboard</NavLink>
        <NavLink to="/register">Login/Register</NavLink>
        <LogoutButton />
        <hr></hr>
    </div>
  )
}

export default NavBar