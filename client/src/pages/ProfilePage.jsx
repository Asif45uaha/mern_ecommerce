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
                const res = await axios.get(`https://mern-ecommerce-l443.onrender.com/getuser/${user?._id}`, { withCredentials: true, baseURL: "https://mern-ecommerce-l443.onrender.com" })
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
            <Card className="max-w-3xl mx-auto ">
                <CardHeader floated={false} className="h-80">
                    <img src={data?.user?.profilePic} alt="profile-picture" className='object-contain ' />
                </CardHeader>
                <CardBody className="text-center">
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        {data?.user?.name}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium" textGradient>
                        {data?.user?.email}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium" textGradient>
                        Orders Placed: {data?.orders?.length}
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