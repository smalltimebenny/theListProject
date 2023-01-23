import React, {useState, useEffect} from 'react'
import { useNavigate, Link, useParams, NavLink } from 'react-router-dom'
import axios from 'axios'
import AddForm from './AddForm'

const Dashboard = (props) => {
    const [books, setBooks] =useState([])
    const [movies, setMovies] =useState([])
    const [musics, setMusics] =useState([])
    const [consumedd, setConsumedd] =useState([])
    const [doNotWantIt, setDoNotWantIt] =useState([])
    const [myRecs, setMyRecs] =useState([])
    const {currentUser, setCurrentUser} =props
    const {_id, entryTitle,entrySpecial} =useParams()
    const navigate = useNavigate()

useEffect(()=>{
    const fetchInitialData = () =>{
        axios.get("http://localhost:8000/api/lister/loggedIn", {withCredentials:true})
        .then(res=>{
                // console.log(res)
                console.log("initial res data",res.data)
                setCurrentUser({
                    _id: res.data[0]._id,
                    listerName:res.data[0].listerName,
                    email:res.data[0].email,
                    consumed:res.data[0].consumed,
                    doNotWant:res.data[0].doNotWant,
                })
                getMyRecs(res.data[0]._id)
            })
            .catch(err=>console.log("initial data fetch error",err))
            
    }
    fetchInitialData()
    // if (currentUser){
    //     getMyRecs()
    // }
},[])


const getMyRecs = (userId)=>{
            axios.get("http://localhost:8000/api/entry/findEntriesByLister/"+userId)
                .then(res=>{
                    console.log("entries by user data", res.data)
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
                    console.log("names seen", namesSeen)
                    }
        
        // console.log(titlesSeen)
                    let groups =[]
                    for(let i=0; i<namesSeen.length;i++){
                        let rankk = array1.filter(item =>item.name == namesSeen[i].name)
                        console.log("rankk", rankk)
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
        
                    console.log("groups",groups)
                    let sortedGroups = groups.sort(
                        (a,b)=>(a.value<b.value) ? 1 : (a.value>b.value) ? -1 : 0
                        )
                    console.log("sorted groups",sortedGroups)
        
                    setMyRecs(sortedGroups)
                }
                    )
                .catch(err=>console.log("my recs fetch error", err))
        }
        
        

        useEffect(()=>{
            axios.get("http://localhost:8000/api/getBooks")
            .then(res=> {
                // console.log(res.data)
                setBooks(res.data)
            })
            .catch(err=>console.log("Book List didn't load.", err))
        }, [])
    
        useEffect(()=>{
            axios.get("http://localhost:8000/api/getMovies")
            .then(res=> {
                // console.log(res.data)
                setMovies(res.data)
            })
            .catch(err=>console.log("Movie List didn't load.", err))
        }, [])
    
        useEffect(()=>{
            axios.get("http://localhost:8000/api/getMusic")
            .then(res=> {
                // console.log(res.data)
                setMusics(res.data)
            })
            .catch(err=>console.log("Music List didn't load.", err))
        }, [])


        const getInitialData = async () => {
            axios.get("http://localhost:8000/api/lister/loggedIn",{withCredentials:true})
                .then((res) => 
                {
                    console.log("auth test", res.data)
                    setCurrentUser({
                        _id:res.data[0]._id,
                        listerName:res.data[0].listerName,
                        email:res.data[0].email,
                        consumed:res.data[0].consumed,
                        doNotWant:res.data[0].doNotWant})
                })
                .catch(err=>{
                    console.log("Didn't get info for logged in user on dashboard.", err)
                    navigate("/logRegPage")
                })
        }

        const getConsumed = (list) =>{
            let tempList =list
            let temptemp = consumedd
            console.log("consumedd",temptemp)
            for(let i = 0; i<tempList.length; i++){
                axios.get("http://localhost:8000/api/entry/findOne/"+tempList[i])
                .then(res=>{
                    // console.log("getconsumed data", res.data)
                    temptemp.push(res.data)
                })
                .catch(err =>console.log("getconsumed error", err))
            }
            // console.log("temptemp",temptemp)
            setConsumedd(temptemp)
        }

        const getDoNotWant = (list) =>{
            let tempList2 = list
            let temptemp3 = doNotWantIt
            for(let i = 0; i<tempList2.length; i++){
                axios.get("http://localhost:8000/api/entry/findOne/"+tempList2[i])
                .then(res=>{
                    console.log("getdonotwant data", res.data)
                    temptemp3.push(res.data)
                })
                .catch(err =>console.log("getdonotwant error", err))
            }
            setDoNotWantIt(temptemp3)
        }
        // const findOneLister = (userId) => {
        //     axios.get("http://localhost:8000/api/lister/findOne/"+userId)
        //         .then( res =>
        //             console.log("findonelister info",res.data))
        //         .catch(err=>{
        //             console.log("findonelister messed up", err)
        //         })
        // }

        const deleteEntry = (entryId) =>{
            axios.delete("http://localhost:8000/api/entry/"+entryId,{withCredentials:true, credentials:"include"})
                .then(res=> {
                    // console.log(res.data)
                    const newBooksList = books.filter((item, index) => item._id!==entryId)
                    const newMoviesList = movies.filter((item, index) => item._id!==entryId)
                    const newMusicsList = musics.filter((item, index) => item._id!==entryId)
                    setBooks(newBooksList)
                    setMovies(newMoviesList)
                    setMusics(newMusicsList)
                })
                .catch(err=> console.log("Dashboard delete entry error.", err))
        }

        const consumed = (userId,entryId) => {
            // console.log("consumed test", currentUser)
            console.log("consumed", userId, entryId)
            axios.put(`http://localhost:8000/api/lister/addToConsumed/${userId}/${entryId}/`)
                .then(res=>{
                    console.log("consumed",res.data)
                    const newBooksList2 = books.filter((item,index) =>item._id!=entryId)
                    const newMoviesList2 = movies.filter((item,index) =>item._id!=entryId)
                    const newMusicsList2 = musics.filter((item,index) =>item._id!=entryId)
                    setBooks(newBooksList2)
                    setMovies(newMoviesList2)
                    setMusics(newMusicsList2)
                    let temptemp2 = res.data.consumed
                    // console.log("temptemp2",temptemp2)
                    getConsumed(temptemp2)
                    console.log("consumed function activated",consumedd)
                })
                .catch(err=> console.log("consumed error", err))
        }

        const blackList = (userId, entryId) => {
            axios.put(`http://localhost:8000/api/lister/addToDoNotWant/${userId}/${entryId}/`)
                .then (res => {
                    const newBooksList2 = books.filter((item,index) =>item._id!=entryId)
                    const newMoviesList2 = movies.filter((item,index) =>item._id!=entryId)
                    const newMusicsList2 = musics.filter((item,index) =>item._id!=entryId)
                    setBooks(newBooksList2)
                    setMovies(newMoviesList2)
                    setMusics(newMusicsList2)
                    let temptemp4 = res.data.doNotWant
                    getDoNotWant(temptemp4)
                })
                .catch(err=>console.log("blacklist error",err))
        }
        const getLoggedInfo = () => {
            axios.get("http://localhost:8000/api/lister/loggedIn",{withCredentials:true})
                .then(res =>{
                    // console.log("getloggedinfo",res.data)
                    setCurrentUser({
                        _id:res.data[0]._id,
                        listerName:res.data[0].listerName,
                        email:res.data[0].email,
                        consumed:res.data[0].consumed,
                        doNotWant:res.data[0].doNotWant})
                })
                .catch(err=>console.log("Didn't get info for logged in user on dashboard.", err))
        }

    return (
    <div>
        <div>
            <h2>My Recommendations</h2>
            <AddForm setCurrentUser={setCurrentUser} currentUser={currentUser}/>
            <h3>Books</h3>
            {/* need dynamic ranking */}
            <table>
                    <thead>
                        <tr>
                        <th>Rank</th>
                        <th>Score</th>
                        <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                    {myRecs.map((item, id) =>{
                    if(item.lists==="Books"){
                        return(
                            <tr>
                                <td>1.</td>
                                <td>{item.value}</td>  
                                <td>{item.name}</td>
                                <td><Link to={`/entry/update/${item._id}`}>Update</Link></td>
                            </tr>
                        )
                    }})}
                    </tbody>
                    </table>
            <h3>Movies</h3>
            <table>
                    <thead>
                        <tr>
                        <th>Rank</th>
                        <th>Score</th>
                        <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                    {myRecs.map((item, id) =>{
                    if(item.lists==="Movies"){
                        return(
                            <tr>
                                <td>1.</td>
                                <td>{item.value}</td>  
                                <td>{item.name}</td>
                            </tr>
                        )
                    }})}
                    </tbody>
                    </table>
            <h3>Music</h3>
            <table>
                    <thead>
                        <tr>
                        <th>Rank</th>
                        <th>Score</th>
                        <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                    {myRecs.map((item, id) =>{
                    if(item.lists==="Music"){
                        return(
                            <tr>
                                <td>1.</td>
                                <td>{item.value}</td>  
                                <td>{item.name}</td>
                            </tr>
                        )
                    }})}
                    </tbody>
                    </table>
        </div>
        <div>
            <h2>Recommended to me</h2>
            <div>
                <h3>Books</h3>
                <table>
                    <thead>
                        <tr>
                        <th>Rank</th>
                        <th>Score</th>
                        <th>Title</th>
                        <th>Author</th>
                        </tr>
                    </thead>
                    <tbody>
                    {books.map((book, _id) =>{
                        return(
                            <tr>
                                <td>{book.rank}</td>
                                <td>{book.value}</td>
                                <td>{book.name}</td>
                                <td>{book.Author}</td>
                                <td><button onClick={()=>{deleteEntry(book._id)}}>Delete</button></td>
                                <td><button onClick={()=>{consumed(currentUser._id, book._id)}}>Read it!</button></td>
                                <td><button onClick={()=>{blackList(currentUser._id, book._id)}}>No thanks!</button></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
        <div>
            <div>
            <h3>Movies</h3>
            <table>
                <thead>
                    <tr>
                    <th>Rank</th>
                    <th>Score</th>
                    <th>Title</th>
                    <th>Release Year</th>
                    </tr>
                </thead>
                <tbody>
                {movies.map((movie, _id) =>{
                    return(
                        <tr>
                            <td>{movie.rank}</td>
                            <td>{movie.value}</td>
                            <td>{movie.name}</td>
                            <td>{movie.ReleaseYear}</td>
                            <td><button onClick={()=>{deleteEntry(movie._id)}}>Delete</button></td>
                            <td><button onClick={()=>{consumed(currentUser._id, movie._id)}}>Seen it!</button></td>
                                <td><button onClick={()=>{blackList(currentUser._id, movie._id)}}>No thanks!</button></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            </div>
        </div>
        <div>
            <div>
            <h3>Music</h3>
            <table>
                <thead>
                    <tr>
                    <th>Rank</th>
                    <th>Score</th>
                    <th>Title</th>
                    <th>Artist</th>
                    </tr>
                </thead>
                <tbody>
                {musics.map((music, _id) =>{
                    return(
                        <tr>
                            <td>{music.rank}</td>
                            <td>{music.value}</td>
                            <td>{music.name}</td>
                            <td>{music.Artist}</td>
                            <td><button onClick={()=>{deleteEntry(music._id)}}>Delete</button></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            </div>
        </div>
        <div>
            <h2>Consumed it!</h2>
                <h2>Books</h2>
                {consumedd.map((item, id) =>{
                    if(item.lists==="Books"){
                        return(
                            <p>{item.name}</p>
                        )
                    }
                })}
                <h2>Movies</h2>
                {consumedd.map((item, id) =>{
                    if(item.lists==="Movies"){
                        return(
                            <p>{item.name}</p>
                        )
                    }
                })}
                <h2></h2>
                <h2>Music</h2>
                {consumedd.map((item, id) =>{
                    if(item.lists==="Music"){
                        return(
                            <p>{item.name}</p>
                        )
                    }
                })}
        </div>
        <div>
            <h3>No thanks!</h3>
            <h2>Books</h2>
                {doNotWantIt.map((item, id) =>{
                    if(item.lists==="Books"){
                        return(
                            <p>{item.name}</p>
                        )
                    }
                })}
                <h2>Movies</h2>
                {doNotWantIt.map((item, id) =>{
                    if(item.lists==="Movies"){
                        return(
                            <p>{item.name}</p>
                        )
                    }
                })}
                <h2></h2>
                <h2>Music</h2>
                {doNotWantIt.map((item, id) =>{
                    if(item.lists==="Music"){
                        return(
                            <p>{item.name}</p>
                        )
                    }
                })}
        </div>
    </div>
    )
}

export default Dashboard