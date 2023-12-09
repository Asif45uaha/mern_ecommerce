import { useState } from "react"
import Signup from "../components/auth/Signup"
import Signin from "../components/auth/Signin"

const AuthPage = () => {
    const [variant, setVariant] = useState("signup")
    return (
        <div>
            {
                variant === "signup" ? <Signup setVariant={setVariant} /> : <Signin setVariant={setVariant} />
            }

        </div>
    )
}
export default AuthPage