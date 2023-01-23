import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const DashboardButton = (props) => {
    const {currentUser, setCurrentUser} =props
    const navigate = useNavigate()

    const getOut = () => {
        navigate("/dashboard")
    }

  return (
    <div><form onSubmit={getOut}>
        <button class="text-neon-orange hover:bg-neon-green visited:text-red-600">Dashboard</button>
    </form>
    </div>
  )
}

export default DashboardButton