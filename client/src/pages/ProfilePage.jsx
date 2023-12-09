import { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import axios from 'axios'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";


const ProfilePage = () => {
    const { user } = UserAuth()
    const [data, setData] = useState({})
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`https://ecommerce-4y88.onrender.com/getuser/${user?._id}`)
                setData(res?.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData()
    }, [user])
    console.log(data);
    return (
        <div className='h-screen flex justify-center items-center'>
            <Card className="w-96 mx-auto">
                <CardHeader floated={false} className="h-80">
                    <img src={data?.profilePic} alt="profile-picture" />
                </CardHeader>
                <CardBody className="text-center">
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        {data?.name}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium" textGradient>
                        {data?.email}
                    </Typography>
                </CardBody>
                <CardFooter className="flex justify-center gap-7 pt-2">
                    <Tooltip content="Like">
                        <Typography
                            as="a"
                            href="https://www.linkedin.com/in/aasif-ali-6909b8200/"
                            variant="lead"
                            color="blue"
                            textGradient
                        >
                            <i className="fab fa-linkedin" />
                        </Typography>
                    </Tooltip>
                    <Tooltip content="Follow">
                        <Typography
                            as="a"
                            href="https://www.instagram.com/_asif_ali10/"
                            variant="lead"
                            color="light-blue"
                            textGradient
                        >
                            <i className="fab fa-instagram" />
                        </Typography>
                    </Tooltip>
                    <Tooltip content="Follow">
                        <Typography
                            as="a"
                            href="https://www.facebook.com/profile.php?id=100061316587296"
                            variant="lead"
                            color="purple"
                            textGradient
                        >
                            <i className="fab fa-facebook" />
                        </Typography>
                    </Tooltip>
                </CardFooter>
            </Card>
        </div>
    )
}
export default ProfilePage