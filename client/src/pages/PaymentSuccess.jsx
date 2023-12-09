import { Button } from "@material-tailwind/react"
import { useSearchParams, useNavigate } from "react-router-dom"
const PaymentSuccess = () => {
    const query = useSearchParams()[0]
    const navigate = useNavigate()
    const referenceNum = query.get("reference")
    return (
        <div className="flex flex-col  font-Poppins justify-center items-center h-screen px-6 bg-gray-300">
            <div className=" shadow-md bg-white p-4  justify-center">
                <p className="font-bold">Dear Customer We have Received  Your Payment </p>
                <p>Order reference Number is : {referenceNum}</p>
                <Button onClick={() => navigate("/orders")} className="mx-auto py-2">Confirm Order</Button>
            </div>

        </div>
    )
}
export default PaymentSuccess