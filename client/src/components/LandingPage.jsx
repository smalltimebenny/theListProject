import React, {useState, useEffect} from 'react'
import { useNavigate, Link, useParams, NavLink } from 'react-router-dom'
import axios from 'axios'

const LandingPage = (props) => {
    const [books, setBooks] =useState([])
    const [movies, setMovies] =useState([])
    const [musics, setMusics] =useState([])

    const {currentUser, setCurrentUser} =props

    useEffect(
        ()=>{
            getBookRecs()
            getMovieRecs()
            getMusicRecs()
        },[]
    )

    const getBookRecs = ()=>{
        axios.get("http://localhost:8000/api/getBooks")
        .then(res=>{
            console.log("books res data",res.data)
            setBooks(aggregateRank(res.data))
        })
        .catch(err=>console.log("Book List didn't load.", err))
    }

    const getMovieRecs = ()=>{
        axios.get("http://localhost:8000/api/getMovies")
        .then(res=> {
            console.log(res.data)
            setMovies(aggregateRank(res.data))
        })
        .catch(err=>console.log("Movie List didn't load.", err))
    }

    const getMusicRecs=()=>{
        axios.get("http://localhost:8000/api/getMusic")
        .then(res=> {
            console.log(res.data)
            setMusics(aggregateRank(res.data))
        })
        .catch(err=>console.log("Music List didn't load.", err))
    }

    const aggregateRank = (array1) => {
        let namesSeen = []
        for (let i=0; i<array1.length;i++){
        let title = array1[i].name
        if(!namesSeen.includes(title)){
            let temper = {
                name: array1[i].name,
                lists: array1[i].lists,
                _id: array1[i]._id,
                Author: array1[i].Author,
                ReleaseYear: array1[i].ReleaseYear,
                Artist:array1[i].Artist,
            }
            namesSeen.push(temper)
        }
}console.log ("names seen", namesSeen)

// console.log(namesSeen)
let groups =[]
for(let i=0; i<namesSeen.length;i++){
    let rankk = array1.filter(item =>item.name == namesSeen[i].name)
    console.log("rankk", rankk)
    let group = {
        value:0,
        name: namesSeen[i].name,
        lists: namesSeen[i].lists,
        _id: namesSeen[i]._id,
        Author: array1[i].Author,
        ReleaseYear: array1[i].ReleaseYear,
        Artist:array1[i].Artist,
    }
    for(let j=0; j<rankk.length;j++){
        let tempVal = group.value + rankk[j].value
        group = {
            value: tempVal,
            name: namesSeen[i].name,
            lists: namesSeen[i].lists,
            _id: namesSeen[i]._id,
            Author: array1[i].Author,
            ReleaseYear: array1[i].ReleaseYear,
            Artist:array1[i].Artist,
        }
        
    }groups.push(group)
}

console.log("groups",groups)
let sortedGroups = groups.sort(
    (a,b)=>(a.value<b.value) ? 1 : (a.value>b.value) ? -1 : 0
    )
console.log(sortedGroups)

return sortedGroups
    }

    // const logBooks = () =>{
        
    //         for(let i=0; i<books.length; i++){
    //             console.log(books[i].name)
    //         }
        
    // }

    // const deleteEntry = (entryId) =>{
    //     axios.delete("http://localhost:8000/api/entry/"+entryId,{withCredentials:true, credentials:"include"})
    //         .then(res=> {
    //             console.log(res.data)
    //             const newBooksList = books.filter((item, index) => item._id!==entryId)
    //             const newMoviesList = movies.filter((item, index) => item._id!==entryId)
    //             const newMusicsList = musics.filter((item, index) => item._id!==entryId)
    //             setBooks(newBooksList)
    //             setMovies(newMoviesList)
    //             setMusics(newMusicsList)
    //         })
    // }

    return (
    <div>
        <div>
            <div>
                <h2>Books</h2>
                <table>
                    <thead>
                        <tr>
                        <th>Score</th>
                        <th>Title</th>
                        <th>Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        books.map((book,id)=>{
                            
                                return(
                                    <tr>
                                        <td>{book.value}</td>
                                        <td>{book.name}</td>
                                        <td>{book.Author}</td>
                                    </tr>
                                )
                            })
                        
                    }
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
                    <th>Score</th>
                    <th>Title</th>
                    <th>Release Year</th>
                    </tr>
                </thead>
                <tbody>
                {
                        movies.map((movie,id)=>{
                            
                                return(
                                    <tr>
                                        <td>{movie.value}</td>
                                        <td>{movie.name}</td>
                                        <td>{movie.Author}</td>
                                    </tr>
                                )
                            })
                        
                    }
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
                    <th>Score</th>
                    <th>Title</th>
                    <th>Artist</th>
                    </tr>
                </thead>
                <tbody>
                {musics.map((music, _id) =>{
                    return(
                        <tr>
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