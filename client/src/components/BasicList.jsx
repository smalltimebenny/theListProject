import React from 'react'

const basicList = (props) => {
    const {masterList, setMasterList} =props
  return (
    <div>
        {
            masterList.map(entry, index)
        }
    </div>
  )
}

export default basicList