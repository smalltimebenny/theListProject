import React, {useState, useEffect} from 'react'
import { useNavigate, Link, useParams, NavLink } from 'react-router-dom'
import axios from 'axios'
//add in optional inputs for all fields
//make a button to add to multiple lists eventually
const AddForm = (props) => {
    const [rank, setRank] =useState("")
    const [name, setName] =useState("")
    const [value, setValue] =useState(0.5)
    const [lists, setLists] =useState("")
    const [varKey, setVarKey] =useState("Author")
    const [varVal, setVarVal] =useState("")
    const [listerAdded, setListerAdded] =useState("")
    const {authToken, setAuthToken} =props
    const {currentUser, setCurrentUser} =props
    const [errors, setErrors] =useState({})

    const entryAdd = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/createEntry", {
            rank,
            name,
            value,
            lists,
            [varKey]:varVal,
            listerAdded: currentUser.listerName,
        })
        .then(res=>{
            console.log(res)
        })
        .catch(err => {
            console.log("Error with entry submit function.")
            setErrors(err.response.data.errors)
        })
        // console.log(lists)
    }

    const handleRank = (e) => {
        e.preventDefault()
        setRank(Number(e.target.value))
        Number(e.target.value)===1? setValue(5)
            :Number(e.target.value)===2? setValue(4)
            :Number(e.target.value)===3? setValue(3)
            :Number(e.target.value)===4? setValue(2)
            :Number(e.target.value)===5? setValue(1)
            :setValue(0.5)
    }

    const listChange = (e) => {
        setLists(e)
        if(e==="Books"){
            setVarKey("Author")
        }else if(e==="Movies"){
            setVarKey("ReleaseYear")
        }else if (e==="Music"){
            setVarKey("Artist")
        }else(setVarKey(""))
    }

    return (
    <div>
        <h1>New Entry</h1>
        <form onSubmit={entryAdd}>
            <label>Rank:</label>
            <select onChange={handleRank}>
                <option>Rank</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="0.5">Out of top 5</option>
            </select>
            <label>Name:</label>
            <input type="text" onChange={(e)=>setName(e.target.value)} />
            {errors.name && <span>{errors.name.message}</span>}
            <label>Lists:</label>
            <select onChange={(e)=>listChange(e.target.value)}>
                <option value="null" >Pick a List</option>
                <option value="Books">Books</option>
                <option value="Movies">Movies</option>
                <option value="Music">Music</option>
                {/* <option value="Board Games">Board Games</option>
                <option value="Video Games">Video Games</option> */}
                {/* <option value="TV Shows">TV Shows</option>
                <option value="Movies">Albums</option>
                <option value="Songs">Songs</option> */}
            </select>
            {errors.lists && <span>{errors.lists.message}</span>}
            {lists=="Books" && <span>
                <br /><label>Author:</label>
                <input type="text" onChange={(e)=>setVarVal(e.target.value)} />
                </span>
            }
            {lists=="Movies" && <span>
                <br /><label>Release Year:</label>
                <input type="text" onChange={(e)=>setVarVal(e.target.value)} />
                </span>
            }
            {lists=="Music" && <span>
                <br /><label>Artist:</label>
                <input type="text" onChange={(e)=>setVarVal(e.target.value)} />
                </span>
            }
            <input type="hidden" value={currentUser.listerName} />
            <input type="submit" value="Add entry" />
        </form>
    </div>
  )
}

export default AddForm