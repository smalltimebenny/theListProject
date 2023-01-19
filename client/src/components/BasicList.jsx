import React, {useState, useEffect} from 'react'
import { useNavigate, Link, useParams, NavLink } from 'react-router-dom'
import axios from 'axios'

const BasicList = (props) => {
    const [list, setList] =useState([])
    const [find, setFind] =useState("")
    const {currentUser, setCurrentUser} =props
    const navigate = useNavigate()

    useEffect(
      ()=>{
        if(!currentUser){
          navigate("/logRegPage")
        }
      }
    )

    const handleChange = (e) =>{
      e.preventDefault()
      axios.get("http://localhost:8000/api/getEntriesByList/" +find,{withCredentials:true})
        .then(res=>{
          console.log("getlist worked",res.data)
          setList(res.data)
        })
        .catch(err=>{
          console.log("Error with list function.", err)
        })
    }

    const deleteEntry = (entryId) => {
      axios.delete("http://localhost:8000/api/entry/" +entryId)
        .then(res=>{
          console.log(res)
          const newList = list.filter((item, index)=>item._id !== entryId)
          setList(newList)})
        .catch(err=>console.log("Error in delete function.", err))
    }

    const properOrder = (asc) => {
      return function (a,b){
        if(a.rank===b.rank){return 0}
        if(a.rank===null){return 1}
        if(b.rank===null){return -1}
        if(asc){return a.rank<b.rank?-1:1}
        return a.rank<b.rank ? 1:-1
      }
    }
    list.sort(properOrder(true))

  return (
    <div>
      <form onSubmit={handleChange}>
        <select onChange={(e)=>setFind(e.target.value)}>
          <option>Pick a List Category</option>
          <option value="Books">Books</option>
          <option value="Movies">Movies</option>
          <option value="Music">Music</option>
          {/* <option value="Board Games">Board Games</option> */}
          {/* <option value="Video Games">Video Games</option> */}
          {/* <option value="TV Shows">TV Shows</option>
          <option value="Albums">Albums</option>
          <option value="Songs">Songs</option> */}
        </select>
        <input type="submit" value="Get List" />
      </form>

      {
        list.map((entry, _id) =>{
          let rankDisplay
          let entryVar
          entry.rank? rankDisplay=entry.rank:rankDisplay="-"
          if(entry.lists=="Books"){entryVar=<span>{entry.Author}</span>}
            else if(entry.lists=="Movies"){entryVar=<span>Movies</span>}
            else if(entry.lists=="Music"){entryVar=<span>Musci</span>}
            // else if(entry.lists=="Board Games"){entryVar=<span>Board Games</span>}
            // else if(entry.lists=="Video Games"){entryVar=<span>Video</span>}
            // else if(entry.lists=="TV Shows"){entryVar=<span>TV</span>}
            // else if(entry.lists=="Albums"){entryVar=<span>Albums</span>}
            // else if(entry.lists=="Songs"){entryVar=<span>Songs</span>}
          return(
            <div key={_id}>
              {rankDisplay} | {entry.name} | {entryVar} | <button onClick={()=>deleteEntry(entry._id)}>Delete Entry</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default BasicList