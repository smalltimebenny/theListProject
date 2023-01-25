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
    const {myRecs, setMyRecs} =props
    const {currentUser, setCurrentUser} =props
    const [nameField, setNameField] =useState("")
    const [authorField, setAuthorField] =useState("")
    const [releaseYearField, setReleaseYearField] =useState("")
    const [artistField, setArtistField] =useState("")
    const [rankField, setRankField] =useState("")
    const [errors, setErrors] =useState({})

    const entryAdd = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/createEntry", {
            rank,
            name,
            value,
            lists,
            [varKey]:varVal,
            listerAdded: currentUser._id,
        },{withCredentials:true, credentials:"include"})
        .then(res=>{
            console.log(res)
            getMyRecs(currentUser._id)
        })
        .catch(err => {
            console.log("Error with entry submit function.",err)
            setErrors(err.response.data.errors)
        })
        e.target.reset()
    }


    const getMyRecs = (userId)=>{
        axios.get("http://localhost:8000/api/entry/findEntriesByLister/"+userId)
            .then(res=>{
                // console.log("entries by user data", res.data)
                let array1 = res.data
                let namesSeen = []
                for (let i=0; i<array1.length;i++){
                    let title = array1[i].name
                    if(!namesSeen.includes(title)){
                        let temper = {
                            name: array1[i].name,
                            lists: array1[i].lists,
                            _id: array1[i]._id,
                        }
                        namesSeen.push(temper)
                }
                // console.log("names seen", namesSeen)
                }
    
    // console.log(titlesSeen)
                let groups =[]
                for(let i=0; i<namesSeen.length;i++){
                    let rankk = array1.filter(item =>item.name == namesSeen[i].name)
                    // console.log("rankk", rankk)
                    let group = {
                        value:0,
                        name: namesSeen[i].name,
                        lists: namesSeen[i].lists,
                        _id: namesSeen[i]._id,
                    }
                    for(let j=0; j<rankk.length;j++){
                        let tempVal = group.value + rankk[j].value
                        group = {
                            value: tempVal,
                            name: namesSeen[i].name,
                            lists: namesSeen[i].lists,
                            _id: namesSeen[i]._id
                        }
                        
                    }groups.push(group)
                }
    
                // console.log("groups",groups)
                let sortedGroups = groups.sort(
                    (a,b)=>(a.value<b.value) ? 1 : (a.value>b.value) ? -1 : 0
                    )
                let sortedBooks = sortedGroups.filter(entry=>entry.lists==="Books")
                let sortedMovies = sortedGroups.filter(entry=>entry.lists==="Movies")
                let sortedMusic = sortedGroups.filter(entry=>entry.lists==="Music")
                console.log("groups2", sortedBooks, sortedMovies, sortedMusic)
                    
                    let finalSortedGroups = [
                                                {rank:1, ...sortedBooks[0]}, {rank:2, ...sortedBooks[1]}, {rank:3, ...sortedBooks[2]}, {rank:4, ...sortedBooks[3]}, {rank:5, ...sortedBooks[4]}, 
                                                {rank:1, ...sortedMovies[0]}, {rank:2, ...sortedMovies[1]}, {rank:3, ...sortedMovies[2]}, {rank:4, ...sortedMovies[3]}, {rank:5, ...sortedMovies[4]}, 
                                                {rank:1, ...sortedMusic[0]}, {rank:2, ...sortedMusic[1]}, {rank:3, ...sortedMusic[2]}, {rank:4, ...sortedMusic[3]}, {rank:5, ...sortedMusic[4]}, 
                                            ]
                                            console.log("final sorted groups1", finalSortedGroups)
                    let tempFinalSortedGroups = []
                    finalSortedGroups.filter((item,id)=> 
                    {
                        if(item){tempFinalSortedGroups.push(item)}
                    })
                    finalSortedGroups = tempFinalSortedGroups
                    console.log("final sorted groups",finalSortedGroups)
                setMyRecs(finalSortedGroups)
            }
                )
            .catch(err=>console.log("my recs fetch error", err))
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
        <form onSubmit={entryAdd}>
            <label>Lists:</label>
            <select class="bg-blue-900" onChange={(e)=>listChange(e.target.value)}>
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
            <label>Rank:</label>
            <select class="bg-blue-900" onChange={handleRank}>
                <option>Rank</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="0.5">Out of top 5</option>
            </select>
            {errors.lists && <span>{errors.rank.message}</span>}
            <label>Name:</label>
            <input class="bg-blue-900" defaultValue={""} type="text" onChange={(e)=>setName(e.target.value)} />
            {errors.name && <span>{errors.name.message}</span>}
            {lists==="Books" && <span>
                <label>Author:</label>
                <input class="bg-blue-900" type="text" onChange={(e)=>setVarVal(e.target.value)} />
                </span>
            }
            {lists==="Movies" && <span>
                <label>Release Year:</label>
                <input class="bg-blue-900" type="text" onChange={(e)=>setVarVal(e.target.value)} />
                </span>
            }
            {lists==="Music" && <span>
                <label>Artist:</label>
                <input class="bg-blue-900" type="text" onChange={(e)=>setVarVal(e.target.value)} />
                </span>
            }
            {/* <input type="hidden" value={currentUser.listerName} /> */}
            <input class="border mx-1 border-neon-yellow" type="submit" value="Add entry" />
        </form>
    </div>
  )
}

export default AddForm