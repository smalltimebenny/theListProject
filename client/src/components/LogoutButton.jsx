import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {

    const navigate = useNavigate()

    const logout=(e)=>{
        e.preventDefault()
        axios.get("http://localhost:8000/api/logoutLister")
        .then(res=>{
            console.log(res)
            navigate("/login")
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