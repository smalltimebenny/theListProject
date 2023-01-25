import React, {useState, useEffect} from 'react'
import { useNavigate, Link, useParams, NavLink } from 'react-router-dom'
import axios from 'axios'
//validators don't all work for some reason
const UpdateEntryForm = (props) => {
    const [id, setId] =useState("")
    const [rank, setRank] =useState("")
    const [name, setName] =useState("")
    const [value, setValue] =useState(0.5)
    const [lists, setLists] =useState("")
    const [varKey, setVarKey] =useState("Author")
    const [varVal, setVarVal] =useState("")
    const [listerAdded, setListerAdded] =useState("")
    const [author, setAuthor] =useState("")
    const [releaseYear, setReleaseYear] =useState("")
    const [artist, setArtist] =useState("")
    const {currentUser, setCurrentUser} =props
    const [errors, setErrors] =useState({})
    const {id1} =useParams()
    const navigate = useNavigate()

    useEffect(
        ()=>{
            axios.get("http://localhost:8000/api/entry/findOne/"+id1)
                .then(res=>{
                    setName(res.data.name)
                    if(res.data.Author){setAuthor(res.data.Author)}
                    if(res.data.ReleaseYear)(setReleaseYear(res.data.ReleaseYear))
                    if(res.data.Artist){setArtist(res.data.Artist)}
                    if(res.data.lists){setLists(res.data.lists)}
                })
                .catch(err=>console.log("find entry error", err))
        },[]
    )

    const entryUpdate = (e) =>{
        e.preventDefault();
        console.log(currentUser)
        axios.patch("http://localhost:8000/api/entry/"+id1, {
            rank,
            name,
            value,
            lists,
            [varKey]:varVal,
        })
        .then(res=>{
            console.log(res)
            navigate("/dashboard")
        })
        .catch(err => {
            console.log("Error with entry submit function.",err)
            setErrors(err.response.data.errors)
            console.log("what gets sent to set errors", err.response.data.errors)
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
    <div class="flex content-evenly px-48 py-20 absolute top-1/4 h-3/4 w-auto text-neon-orange overflow-auto">
        <form onSubmit={entryUpdate}>
        <label>Lists:</label>
            <select defaultValue={lists} onChange={(e)=>listChange(e.target.value)}>
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
            <label>Rank:</label>
            <select defaultValue={rank} onChange={handleRank}>
                <option>Rank</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="0.5">Out of top 5</option>
            </select>
            <label>Name:</label>
            <input type="text" defaultValue={name} onChange={(e)=>setName(e.target.value)} />
            {errors.name && <span>{errors.name.message}</span>}
            {lists=="Books" && <span>
                <label>Author:</label>
                <input type="text" defaultValue={author} onChange={(e)=>setVarVal(e.target.value)} />
                </span>
            }
            {lists=="Movies" && <span>
                <label>Release Year:</label>
                <input type="text" defaultValue={releaseYear} onChange={(e)=>setVarVal(e.target.value)} />
                </span>
            }
            {lists=="Music" && <span>
                <label>Artist:</label>
                <input type="text" defaultValue={artist} onChange={(e)=>setVarVal(e.target.value)} />
                </span>
            }
            {errors.lists && <span>{errors.lists.message}</span>}
            {/* <input type="hidden" value={id} /> */}
            {/* <input type="hidden" value={currentUser.listerName} /> */}
            <input type="submit" value="Add entry" />
        </form>
    </div>
  )
}

export default UpdateEntryForm