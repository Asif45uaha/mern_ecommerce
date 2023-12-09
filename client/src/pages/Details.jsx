
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import ArrowLeft from "../components/arrows/ArrowLeft"
import ArrowRight from "../components/arrows/ArrowRight"
import {
    Card,
    CardBody,
    Typography,
    Button, Breadcrumbs, Avatar
} from "@material-tailwind/react";
import { data } from '../data'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/ProductSlice'
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDownLong } from "react-icons/fa6";

const Details = () => {
    const dispatch = useDispatch();
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [isScrolled, setIsScrolled] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setIsScrolled(true)
            }
            else {
                setIsScrolled(false)
            }
        })
    }, [])
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    };
    useEffect(() => {
        const fetchById = () => {
            const item = data?.filter((item) => item?.id?.toString() === id?.toString())
            setProduct(item[0])
        }
        fetchById()
    }, [id])
    const interestedProducts = data?.filter((item) => item?.id?.toString() !== id?.toString() && item?.category === product?.category)
    const scrollLeft = () => {
        let slider = document.getElementById('slider' + 3);
        slider.scrollLeft = slider.scrollLeft - 500
    }
    const scrollRight = () => {
        let slider = document.getElementById('slider' + 3);
        slider.scrollLeft = slider.scrollLeft + 500
    }
    const handleAdd = (data) => {
        dispatch(addToCart(data))
        navigate("/cart")
    }
    return (
        <div className="bg-white flex flex-col gap-2 z-[43]">
            <div className="mx-auto  grid max-w-7xl  grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-4 sm:px-6 sm:py-32 lg:grid-cols-2 lg:px-8">
                <div className="flex md:sticky md:top-10  flex-col justify-center gap-2">
                    <div className="mx-auto">
                        <img
                            src={product?.imgSrc}
                            alt=""
                            className="rounded-lg  h-full w-full md:w-[500px] md:h-[400px] object-contain"
                        />
                    </div>
                    <div className="flex flex-row items-center justify-center gap-4 py-6  md:py-8">
                        <Button variant="filled" className="md:w-[35%]">
                            Buy Now
                        </Button>
                        <Button variant="outlined" className="md:w-[35%]" onClick={() => handleAdd(
                            {
                                id: product?.id,
                                title: product?.title,
                                name: product?.title,
                                price: product?.price,
                                imgSrc: product?.imgSrc,
                                category: product?.category,
                                subcategory: product?.subcategory,
                                quantity: 1
                            }
                        )}>
                            Add To Cart
                        </Button>

                    </div>
                </div>
                <div className="flex flex-col justify-start overflow-hidden md:overflow-y-scroll z-[40]">
                    <div className="py-2">
                        <Breadcrumbs >
                            <p className="opacity-60">
                                {product?.category}
                            </p>
                            <p className="opacity-80">
                                {product?.subcategory}
                            </p>
                        </Breadcrumbs>
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{product.name}</h2>
                    <p className="mt-4 text-gray-500 font-Poppins">
                        {product?.title}
                    </p>

                    <div className="flex flex-col justify-start   md:gap-1 gap-0 py-2">
                        <div className="flex flex-row items-center  gap-2">
                            <h2 className="font-bold text-lg md:text-2xl font-Poppins">
                                ₹{product?.price}
                            </h2>

                            <h2 className="font-normal text-gray-700 line-through font-Poppins">
                                ₹{product?.price > 10000 ? product?.price + 2500 : product?.price + 500}
                            </h2>
                        </div>
                        <p className="font-Poppins">Upto {product?.discount ? product?.discount : product.id}% off</p>
                    </div>
                    <div className='flex flex-row items-center justify-center px-2 py-0 font-Poppins bg-green-700 text-white w-[25%] md:w-[13%]'>
                        <Typography variant='lead' className="font-bold">{product?.rating}</Typography>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 md:w-6 md:h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                    </div>
                    <div className="flex flex-col items-start ">
                        <h2 className="text-start font-Poppins py-2 text-xl md:text-2xl font-bold">Available Offers</h2>
                        <div className="flex flex-row items-center gap-2 font-Poppins py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-green-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                            </svg>
                            <p className="text-gray-700"> 10% off on HDFC Bank Credit Card EMI Transactions, up to ₹1,500 on orders of ₹7,500 and above</p>
                        </div>
                        <div className="flex flex-row items-center gap-2 font-Poppins py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-green-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                            </svg>
                            <p className="text-gray-700">Extra ₹500 off on HDFC Bank Credit Card EMI on 6 months and above tenure, Min. Product Value ₹24,990</p>
                        </div>
                        <div className="flex flex-row items-center gap-2 font-Poppins py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-green-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                            </svg>
                            <p className="text-gray-700">Extra ₹750 off on HDFC Bank Credit Card EMI on 9 months and above tenure, Min. Product Value ₹50,000</p>
                        </div>
                    </div>
                    <div className="flex flex-col py-2 justify-start font-Poppins">
                        <h2 className="font-bold text-xl md:text-2xl">Payment Options</h2>
                        <p className="text-gray-700">{product?.price > 50000 ? "EMI starting from ₹4000/month" : "No EMI"}</p>
                        <p className="text-gray-700">Cash on Delivery</p>
                        <p className="text-gray-700">Net banking & Credit/ Debit/ ATM card</p>
                    </div>
                    <div className="flex flex-col py-2 justify-start font-Poppins" >
                        <h2 className="font-bold text-xl md:text-2xl">Customer Reviews</h2>
                        <div className="flex flex-col gap-2 md:gap-4 py-4">
                            <div className="flex flex-row justify-start gap-2">
                                <div>
                                    <Avatar withBorder src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80" alt="error" className="object-contain" />
                                </div>
                                <div className="flex flex-col item-center">
                                    <p className="text-sm md:text-lg font-bold">User 1</p>
                                    <p className="text-xs md:text-lg text-gray-600">{product?.reviews?.r1}</p>
                                </div>
                            </div>
                            <hr className="bg-gray-500" />

                            <div className="flex flex-row justify-start  gap-2">
                                <div>
                                    <Avatar withBorder src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" alt="error" className="object-contain" />
                                </div>
                                <div className="flex flex-col item-center">
                                    <p className="text-sm md:text-lg font-bold">User 2</p>
                                    <p className="text-xs md:text-lg text-gray-600">{product?.reviews?.r2}</p>
                                </div>
                            </div>
                            <hr className="bg-gray-500" />
                            <div className="flex flex-row  justify-start  gap-2">
                                <div>
                                    <Avatar withBorder src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80" alt="error" className="object-contain" />
                                </div>
                                <div className="flex flex-col item-center">
                                    <p className="text-sm md:text-lg font-bold">User 3</p>
                                    <p className="text-xs md:text-lg text-gray-600">{product?.reviews?.r3}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <div className="flex item-center  justify-center py-2">
                {
                    isScrolled && <Button variant="filled" className="z-[40] rounded-full " onClick={scrollToBottom} >
                        <FaArrowDownLong />
                    </Button>
                }
            </div>
            <div className="flex flex-col max-w-full md:max-w-7xl mx-auto justify-start font-Poppins">
                <h2 className="py-2 font-bold text-xl md:text-2xl pl-4 text-start">Similar Products</h2>
                <div className="flex flex-row justify-center relative">
                    <div onClick={scrollLeft} className="hidden md:inline-flex absolute left-1 z-[40] top-40 bg-gray-500 p-3 rounded-full cursor-pointer">
                        <ArrowLeft />
                    </div>
                    <div id={"slider" + 3} className="flex flex-row overflow-x-scroll relative gap-4 py-2 px-4">
                        {interestedProducts?.map((item, id) =>
                            <div key={id} className="flex flex-row">
                                <Card className="relative w-48 md:w-64 mx-auto hover:scale-105 cursor-pointer transition-all duration-300 delay-200 ease-in-out" >
                                    <Typography className="absolute text-xs top-1 left-3 z-[40] bg-red-700 px-2  text-white">{item?.subcategory}</Typography>
                                    <div className='z-[41] absolute right-4 top-0 flex flex-col items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>
                                    </div>
                                    <CardBody>
                                        <div className="mb-2 flex flex-col items-center ">
                                            <img
                                                src={item?.imgSrc}
                                                alt="card-image"
                                                className="md:h-[200px] h-[100px] w-[100px] md:w-[300px] object-contain"
                                            />
                                            <div className="py-2 flex flex-col justify-start md:justify-center items-center">
                                                <Typography color="blue-gray" className="text-xs md:text-sm md:font-medium font-Poppins">
                                                    {item?.name}
                                                </Typography>
                                                <Typography color="blue-gray" className="font-bold font-Poppins">
                                                    ₹{item?.price}
                                                </Typography>
                                            </div>
                                        </div>
                                        <Button
                                            ripple={false}
                                            fullWidth={true}
                                            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 font-Poppins"
                                            onClick={() => navigate(`/${item?.id}`)}
                                        >
                                            Check Out
                                        </Button>
                                    </CardBody>
                                </Card>
                            </div>
                        )}
                    </div>
                    <div onClick={scrollRight} className="hidden md:inline-flex absolute right-1 z-[40] top-40 bg-gray-500 p-3 rounded-full cursor-pointer">
                        <ArrowRight />
                    </div>
                </div>
            </div>
            <div className="flex item-center justify-center py-2">
                {
                    isScrolled && <Button variant="filled" className="z-[45] rounded-full " onClick={scrollToTop} >
                        <FaArrowUp />
                    </Button>
                }
            </div>
        </div>



    )
}
export default Details

