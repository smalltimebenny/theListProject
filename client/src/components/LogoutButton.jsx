import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LogoutButton = (props) => {
    const {currentUser, setCurrentUser} =props
    const navigate = useNavigate()

    const logout=(e)=>{
        e.preventDefault()
        axios.get("http://localhost:8000/api/logoutLister", {withCredentials:true, credentials:"include"})
        .then(res=>{
            console.log(res)
            setCurrentUser(null)
            navigate("/logRegPage")
        })
        .catch(err=>{
          console.log(err)
        })
    }

  return (
    <div><form onSubmit={logout}>
        <button>Logout</button>
    </form>
    </div>
  )
}

export default LogoutButton