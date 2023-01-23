import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LogoutButton = (props) => {
    const {currentUser, setCurrentUser} =props
    const navigate = useNavigate()

    const logout=(e)=>{
        e.preventDefault()
        axios.get("http://localhost:8000/api/logoutLister")
        .then(res=>{
            console.log("logout", res)
            setCurrentUser(null)
            navigate("/logRegPage")
        })
        .catch(err=>{
          console.log(err)
        })
    }

  return (
    <div><form onSubmit={logout}>
        <button class="text-neon-orange hover:bg-neon-green visited:text-red-600">Logout</button>
    </form>
    </div>
  )
}

export default LogoutButton