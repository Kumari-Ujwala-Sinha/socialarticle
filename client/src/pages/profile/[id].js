import React from 'react'
import Info from '../../components/profile/Info'
import Post from '../../components/profile/Post'
import { useSelector } from 'react-redux'
import LoadIcon from "../../images/loading.gif"

const Profile = () => {
    const {profile}=useSelector(state=>state)
    return (
        <div>
            {
                profile.loading ? <img className='d-block mx-auto my-4' src={LoadIcon} alt="loading"/> :<Info/>
            }
            
            <Post/>
        </div>
    )
}

export default Profile
