import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LogRegButton = (props) => {
    const {currentUser, setCurrentUser} =props
    const navigate = useNavigate()

    const goAway = () => {
        navigate("/logRegPage")
    }

  return (
    <div><form onSubmit={goAway}>
        <button class="text-neon-orange hover:bg-neon-green visited:text-red-600">Login/Registration</button>
    </form>
    </div>
  )
}

export default LogRegButton