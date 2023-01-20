import React, {useState, useEffect} from 'react'
import { useNavigate, Link, useParams, NavLink } from 'react-router-dom'
import axios from 'axios'
import LandingPage from './LandingPage'
import AddForm from './AddForm'

const Dashboard = (props) => {
    const [books, setBooks] =useState([])
    const [movies, setMovies] =useState([])
    const [musics, setMusics] =useState([])
    const [consumedd, setConsumedd] =useState([])
    const [doNotWant, setDoNotWant] =useState([])
    const {currentUser, setCurrentUser} =props
    const {_id, entryTitle,entrySpecial} =useParams()
    const navigate = useNavigate()

useEffect(
    ()=>{
        axios.get("http://localhost:8000/api/lister/loggedIn",{withCredentials:true})
                .then(res =>{
                    console.log("getloggedinfo",res.data)
                    setCurrentUser({
                        _id:res.data._id,
                        listerName:res.data.listerName,
                        email:res.data.email,
                        consumed:res.data.consumed,
                        doNotWant:res.data.doNotWant})
                })
                .catch(err=>{
                    console.log("Didn't get info for logged in user on dashboard.", err)
                    navigate("/logRegPage")
                })
        }, []
)

    // useEffect(
    //     ()=>{
    //         // console.log("dashboard",currentUser)
    //         if(currentUser===null){
    //             return navigate("/logRegPage")
    //         }else{
    //             return
    //         }
    //         },[1]
    //     )

        useEffect(()=>{
            axios.get("http://localhost:8000/api/getBooks")
            .then(res=> {
                console.log(res.data)
                setBooks(res.data)
            })
            .catch(err=>console.log("Book List didn't load.", err))
        }, [1])
    
        useEffect(()=>{
            axios.get("http://localhost:8000/api/getMovies")
            .then(res=> {
                console.log(res.data)
                setMovies(res.data)
            })
            .catch(err=>console.log("Movie List didn't load.", err))
        }, [1])
    
        useEffect(()=>{
            axios.get("http://localhost:8000/api/getMusic")
            .then(res=> {
                console.log(res.data)
                setMusics(res.data)
            })
            .catch(err=>console.log("Music List didn't load.", err))
        }, [1])

        const deleteEntry = (entryId) =>{
            axios.delete("http://localhost:8000/api/entry/"+entryId,{withCredentials:true, credentials:"include"})
                .then(res=> {
                    console.log(res.data)
                    const newBooksList = books.filter((item, index) => item._id!==entryId)
                    const newMoviesList = movies.filter((item, index) => item._id!==entryId)
                    const newMusicsList = musics.filter((item, index) => item._id!==entryId)
                    setBooks(newBooksList)
                    setMovies(newMoviesList)
                    setMusics(newMusicsList)
                })
                .catch(err=> console.log("Dashboard delte entry error.", err))
        }

        const consumed = (entryId, entryTitle,entrySpecial) => {
            console.log("consumed", entryId, entryTitle, entrySpecial)
            axios.put(`http://localhost:8000/api/lister/addToConsumed/`+entryId,{withCredentials:true, credentials:"include"})
                .then(res=>{
                    console.log(res.data)
                    const newBooksList2 = books.filter((item,index) =>item._id!=entryId)
                    const newMoviesList2 = books.filter((item,index) =>item._id!=entryId)
                    const newMusicsList2 = books.filter((item,index) =>item._id!=entryId)
                    setBooks(newBooksList2)
                    setMovies(newMoviesList2)
                    setMusics(newMusicsList2)
                    // getLoggedInfo()
                    setConsumedd(currentUser.consumed)
                })
        }
        // const getLoggedInfo = () => {
        //     axios.get("http://localhost:8000/api/lister/loggedIn",{withCredentials:true})
        //         .then(res =>{
        //             console.log("getloggedinfo",res.data)
        //             setCurrentUser({
        //                 _id:res.data._id,
        //                 listerName:res.data.listerName,
        //                 email:res.data.email,
        //                 consumed:res.data.consumed,
        //                 doNotWant:res.data.doNotWant})
        //         })
        //         .catch(err=>console.log("Didn't get info for logged in user on dashboard.", err))
        // }

    return (
    <div>
        <div>
            <h2>My Recommendations</h2>
            <AddForm setCurrentUser={setCurrentUser} currentUser={currentUser}/>
            //get entries by user and list
            //separate into lists
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
                                <td><button onClick={()=>{consumed(book._id, book.name, book.Author)}}>Read it!</button></td>
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
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <h2>Movies</h2>
                <h2>Music</h2>
        </div>
        <div>
            <h3>No thanks!</h3>
        </div>
    </div>
    )
}

export default Dashboard