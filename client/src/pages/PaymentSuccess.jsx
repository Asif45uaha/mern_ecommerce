import { useSearchParams } from "react-router-dom"
const PaymentSuccess = () => {
    const query = useSearchParams()[0]
    const referenceNum = query.get("reference")
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <p>Dear Customer We have Received  Your Payment </p>
            <p>Order reference Number is : {referenceNum}S</p>
        </div>
    )
}
export default PaymentSuccess