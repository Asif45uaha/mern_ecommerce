import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import Search from "../search/Search"
import { RxHamburgerMenu } from "react-icons/rx";
import {
    Drawer,
    Button,
    Typography,
    IconButton, Avatar
} from "@material-tailwind/react";
import { IoCubeOutline } from "react-icons/io5";
import { UserAuth } from '../../context/AuthContext'
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,

} from "@material-tailwind/react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
const Navbar = () => {
    const { user, setUser } = UserAuth()
    const [isSticky, setIsSticky] = useState(false)
    const [open, setOpen] = useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    const navigate = useNavigate()
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY
            if (offset > 0) {
                setIsSticky(true)
            }
            else {
                setIsSticky(false)
            }
        }
        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    const handleLogout = async () => {
        try {
            await axios.post("https://mern-ecommerce-l443.onrender.com/logout", { withCredentials: true, baseURL: "https://mern-ecommerce-l443.onrender.com" })
            toast.success("Logout Success!!", {
                duration: 5000,
                position: "top-center",

            })
            localStorage.removeItem("jwt_auth")
            setUser(null)
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.error, {
                duration: 5000,
                position: "top-center"
            })
        }
    }
    return (
        <nav className={`flex flex-row items-center justify-between font-Poppins h-[60px] md:h-[100px] md:px-24 w-full px-4 mx-auto md:w-full py-4 bg-[#fff] z-[42] sticky top-0 ${isSticky ? "shadow-md py-2" : ""}`}>
            <div className="flex flex-row justify-center items-center gap-0 md:gap-1">
                <Link to="/" className="flex flex-row gap-2 items-center text-2xl md:text-3xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <h2 className="font-bold ">Store</h2>
                </Link>
            </div>
            <div className="hidden md:inline-flex ">
                <Search />
            </div>
            <div className="hidden md:flex flex-row justify-center items-center gap-6 font-bold cursor-pointer">
                <Link to={'/cart'} className="flex flex-row justify-center gap-1 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    <p>Cart</p>
                </Link>
                <Link to={"/wishlist"} className="flex flex-row justify-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    <p>WishList</p>
                </Link>
                <Menu className="z-[100]">
                    <MenuHandler>
                        <div className="flex flex-row items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                            <p>Profile</p>
                        </div>
                    </MenuHandler>
                    <MenuList>
                        <MenuItem onClick={() => navigate("/profile")}>
                            {
                                user && <div className="flex flex-row items-center gap-1">
                                    <Avatar src={user?.profilePic} alt="avatar" />
                                    <Typography >{`${user?.name}`}</Typography>
                                </div>
                            }
                        </MenuItem>
                        <MenuItem>
                            <div className="flex flex-col justify-start">
                                <Link to={'/auth'} className="flex flex-row items-center py-1 gap-1 rounded-md">
                                    {
                                        user ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                        </svg>
                                            : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                            </svg>
                                    }
                                    {
                                        user && <div>
                                            <p onClick={handleLogout}>Logout</p>
                                        </div>
                                    }
                                    {
                                        !user && <p>Signup</p>
                                    }

                                </Link>
                            </div>
                        </MenuItem>
                        <MenuItem>
                            <Link to={`/orders`} className="flex flex-row items-center gap-1">
                                <IoCubeOutline size={25} />
                                <p>Orders</p>
                            </Link>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </div>
            <div className="flex flex-col justify-start item-scenter md:hidden">
                <Button variant="outlined">
                    <RxHamburgerMenu onClick={openDrawer} />
                </Button>
                <Drawer open={open} onClose={closeDrawer} className="p-4 ">
                    <div className="mb-6 flex items-center justify-between">
                        <Typography onClick={() => navigate("/")} variant="h5" color="blue-gray">
                            Store
                        </Typography>
                        <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </IconButton>
                    </div>
                    <div >
                        <Search />
                    </div>
                    <div className="py-2">
                        <Typography className="text-center">{user && `Welcome ${user?.name}`}</Typography>
                    </div>
                    <div className="flex flex-col gap-4 pt-4 justify-start items-center">
                        <div className="flex flex-row items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                            <Link to={'/cart'}>
                                <Typography variant="h5">Cart</Typography>
                            </Link>

                        </div>
                        <div className="flex flex-row items-center gap-1">
                            {
                                user ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                    </svg>
                            }

                            {
                                user && <div>
                                    <Typography variant="h5" onClick={handleLogout}>Logout</Typography>
                                </div>

                            }
                            {
                                !user && <Typography variant="h5">Signup</Typography>
                            }
                        </div>
                        <div onClick={() => navigate("/profile")} className="flex flex-row items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                            <Typography variant="h5">Profile</Typography>
                        </div>
                        <div onClick={() => navigate(`/wishlist`)} className="flex flex-row items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                            <Typography variant="h5">WishList</Typography>
                        </div>
                        <div onClick={() => navigate(`/orders`)} className="flex flex-row items-center gap-1">
                            <IoCubeOutline size={25} />
                            <Typography variant="h5"><p>Orders</p></Typography>
                        </div>
                    </div>
                </Drawer>


            </div>
        </nav>
    )
}
export default Navbar