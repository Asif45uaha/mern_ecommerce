import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useState, useRef } from "react";
import axios from 'axios'
import { UserAuth } from "../../context/AuthContext";
import { toast } from 'react-hot-toast'
const Signup = ({ setVariant }) => {
    const { setUser } = UserAuth()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [imgUrl, setImgUrl] = useState("");
    const fileRef = useRef(null)

    const handleImageChange = (ev) => {

        const file = ev.target.files[0]


        if (file && file.type.startsWith("image/")) {
            const fileReader = new FileReader()

            fileReader.onloadend = () => {
                setImgUrl(fileReader.result)
            }

            fileReader.readAsDataURL(file)
        }


    }

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        try {
            const response = await axios.post("https://mern-ecommerce-l443.onrender.com/api/auth/register", { name, email, password, profilePic: imgUrl })

            if (response.status === 201) {
                localStorage.setItem("jwt_auth", JSON.stringify(response?.data))
                setUser(response?.data)
                toast.success("Signup Success", {
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
        <div className="flex flex-col justify-center h-screen">
            <Card color="transparent" shadow={false} className="max-w-7xl mx-auto">
                <Typography variant="h4" color="blue-gray">
                    Sign up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Enter your details to register.
                </Typography>
                <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your Name
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="Name"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            value={name} onChange={(ev) => setName(ev.target.value)}
                        />
                    </div>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your Email
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            value={email} onChange={(ev) => setEmail(ev.target.value)}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Password
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            placeholder="********"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            value={password} onChange={(ev) => setPassword(ev.target.value)}
                        />
                    </div>
                    <div className="pt-6 w-full mx-auto">
                        <Button variant="filled" className="w-full" onClick={() => fileRef.current.click()}>Upload Profile</Button>
                        <input onChange={handleImageChange} type="file" ref={fileRef} className="hidden" />
                    </div>
                    <Button type="submit" className="mt-6" fullWidth>
                        sign up
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Already have an account?
                        <a className="font-medium text-gray-900 cursor-pointer" onClick={() => setVariant("signin")}>
                            Sign In
                        </a>
                    </Typography>
                </form>
            </Card>
        </div>
    )
}
export default Signup