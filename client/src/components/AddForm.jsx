import {useState} from 'react'
import axios from "axios"

const addForm = (props) => {
    const {masterList, setMasterList} =props;
    const [rank, setRank] =useState("")
    const [name, setName] =useState("")
    const [value, setValue] =useState(0.5)
    const [lists, setLists] =useState([])

    const [errors, setErros] =useState({})

    const entryAdd = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/createEntry", {
            rank,
            name,
            value,
            lists
        })
        .then(entry=>{
            console.log(res)
            setMasterList([...masterList, res.body])
        })
        .catch(err => {
            console.log("Error with entry submit function.")
            res.status(400).json(err)
            setErrors(err.response.data.errors)
        })
    }

    const handleRank = (e) => {
        setRank(Number(e.target.value))
        Number(e.target.value)==1? setValue(5)
            :Number(e.target.value)==2? setValue(4)
            :Number(e.target.value)==3? setValue(3)
            :Number(e.target.value)==4? setValue(2)
            :Number(e.target.value)==5? setValue(1)
            :setValue(0.5)
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
            <label>Lists:</label>
            <input type="text" onChange={(e)=>setLists(e.target.value)} />
        </form>
    </div>
  )
}

export default addForm