import { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import axios from 'axios'
const ProfilePage = () => {
    const { user } = UserAuth()
    const [data, setData] = useState({})
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/getuser/${user?._id}`)
                setData(res?.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData()
    }, [user])
    console.log(data);
    return (
        <div className="h-screen max-w-2xl gap-2 md:gap-10 mx-auto flex flex-col md:flex-row justify-center md:justify-around items-center">
            <div>
                <img src={data?.profilePic} alt="error" className='object-contain rounded-lg' />
            </div>
            <div>
                <p className='font-bold text-xl'>{data?.name}</p>
                <p className='font-bold text-xl w-full'>{data?.email}</p>
            </div>
        </div>
    )
}
export default ProfilePage