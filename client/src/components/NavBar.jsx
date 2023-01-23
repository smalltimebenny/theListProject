import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import DashboardButton from './DashboardButton'
import LogRegButton from './LogRegButton'

const NavBar = (props) => {
  const {currentUser, setCurrentUser} =props
  return (
    <div class="fixed top-0 left-0 flex flex-row justify-evenly items-center gap-x-2 h-1/4 w-screen text-3xl shadow-lg shadow-neon-orange">
        <div class=" bg-neon-orange text-transparent  bg-clip-text text-8xl">The List</div>
        <DashboardButton />
        <LogRegButton />
        <LogoutButton class="text-neon-orange hover:bg-neon-green visited:text-red-200" setCurrentUser={setCurrentUser} currentUser={currentUser} />
        <hr></hr>
    </div>
  )
}

export default NavBar