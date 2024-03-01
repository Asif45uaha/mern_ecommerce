import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import axios from 'axios'
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import toast from 'react-hot-toast';
const Signin = ({ setVariant }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setUser } = UserAuth()

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        try {
            const response = await axios.post("http://localhost:8000/api/auth/login", { email, password })
            localStorage.setItem("jwt_auth", JSON.stringify(response?.data))
            setUser(response?.data)
            if (response?.status === 200) {
                toast.success("Login Success", {
                    duration: 5000,
                    position: "top-center"
                })
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.error, {
                duration: 5000,
                position: "top-center"
            })
        }
    }
    return (
        <>
            <div className="flex flex-col justify-center h-screen">
                <Card color="transparent" shadow={false} className="max-w-7xl mx-auto">
                    <Typography variant="h4" color="blue-gray">
                        Sign In
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Enter your details to Login
                    </Typography>
                    <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-1 flex flex-col gap-6">

                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Your Email
                            </Typography>
                            <Input
                                value={email}
                                onChange={(ev) => setEmail(ev.target.value)}
                                size="lg"
                                placeholder="name@mail.com"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Password
                            </Typography>
                            <Input
                                value={password}
                                onChange={(ev) => setPassword(ev.target.value)}
                                type="password"
                                size="lg"
                                placeholder="********"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                        </div>
                        <Button type="submit" className="mt-6" fullWidth>
                            sign In
                        </Button>
                        <Typography color="gray" className="mt-4 text-center font-normal">
                            Doesn&apos;t have an Account?
                            <a className="font-medium text-gray-900 cursor-pointer" onClick={() => setVariant("signup")}>
                                Sign Up
                            </a>
                        </Typography>
                    </form>
                </Card>
            </div>
        </>
    )
}
export default Signin