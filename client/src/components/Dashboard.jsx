import React, {useState, useEffect} from 'react'
import { useNavigate, Link, useParams, NavLink } from 'react-router-dom'
import axios from 'axios'
import LandingPage from './LandingPage'
import AddForm from './AddForm'

const Dashboard = (props) => {
    const {currentUser, setCurrentUser} =props
    const navigate = useNavigate()



    useEffect(
        ()=>{
            console.log(currentUser)
            if(currentUser===null){
                return navigate("/logRegPage")
            }
            }
        )
    return (
    <div>
        <div>
            <h3>My Recommendations</h3>
            <AddForm setCurrentUser={setCurrentUser} currentUser={currentUser}/>
        </div>
        <div>
            <h3>Recommended to me</h3>
            <LandingPage setCurrentUser={setCurrentUser} currentUser={currentUser}/>
        </div>
        <div>
            <h3>Read/Seen/Heard it!</h3>
        </div>
        <div>
            <h3>No thanks!</h3>
        </div>
    </div>
    )
}

export default Dashboard