import {useState, useEffect} from 'react'
import axios from "axios"

const basicList = (props) => {
    const {masterList, setMasterList} =props

    useEffect = (()=> {
        axios.get("http://localhost:8000/api/getList/")
    })


  return (
    <div>
        {
            masterList.map(entry, index)
        }
    </div>
  )
}

export default basicList