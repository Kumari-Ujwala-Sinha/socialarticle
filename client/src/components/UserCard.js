import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'

const UseCard = ({user, border, handleClose}) => {
    const handleCloseall=()=>{
        if(handleClose) handleClose()
    }
    return (
        
        <div className={` p-2 ${border}`}>
            <div>
            <Link to={`/profile/${user._id}`} className="d-flex align-item-center" onClick={handleCloseall}>
            <Avatar src={user.avatar} size="big-avatar"/>
            <div className='ml-1'>
                <span className='d-block'>{user.username}</span>
                <small style={{opacity:"0.7"}}>{user.fullname}</small>
            </div>
            </Link>
            </div>
         

        </div>
        
    )
}

export default UseCard
