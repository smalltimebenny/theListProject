import React, {useState, useEffect} from 'react'
import { useNavigate, Link, useParams, NavLink } from 'react-router-dom'
import axios from 'axios'

const LandingPage = (props) => {
    const [books, setBooks] =useState([])
    const [movies, setMovies] =useState([])
    const [musics, setMusics] =useState([])

    const {currentUSer, setCurrentUser} =props

    useEffect(()=>{
        axios.get("http://localhost:8000/api/getBooks")
        .then(res=> {
            console.log(res.data)
            setBooks(res.data)
        })
        .catch(err=>console.log("Book List didn't load.", err))
    }, [])

    useEffect(()=>{
        axios.get("http://localhost:8000/api/getMovies")
        .then(res=> {
            console.log(res.data)
            setMovies(res.data)
        })
        .catch(err=>console.log("Movie List didn't load.", err))
    }, [])

    useEffect(()=>{
        axios.get("http://localhost:8000/api/getMusic")
        .then(res=> {
            console.log(res.data)
            setMusics(res.data)
        })
        .catch(err=>console.log("Music List didn't load.", err))
    }, [])

    const logBooks = () =>{
        
            for(let i=0; i<books.length; i++){
                console.log(books[i].name)
            }
        
    }

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
    }

    return (
    <div>
        <div>
            <div>
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
                                {/* <td><button onClick={()=>{deleteEntry(book._id)}}>Delete</button></td> */}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
        <div>
            <div>
            <h2>Movies</h2>
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
                            {/* <td><button onClick={()=>{deleteEntry(movie._id)}}>Delete</button></td> */}
                        </tr>
                    )
                })}
                </tbody>
            </table>
            </div>
        </div>
        <div>
            <div>
            <h2>Music</h2>
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
                            {/* <td><button onClick={()=>{deleteEntry(music._id)}}>Delete</button></td> */}
                        </tr>
                    )
                })}
                </tbody>
            </table>
            </div>
        </div>
    </div>
    )
}

export default LandingPage