import Navbar from "./components/navbar/Navbar"
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import LaptopPage from "./pages/LaptopPage"
import MobilePage from "./pages/MobilePage"
import MensPage from './pages/Mens-Page'
import WomensPage from './pages/Womens-Page'
import Groceries from './pages/Groceries'
import Watches from './pages/Watches'
import WishList from "./pages/WishList"
import Details from "./pages/Details"
import CartPage from './pages/CartPage'
import Footer from "./components/footer/Footer"
import SearchingRoute from "./pages/SearchingRoute"
import AuthPage from "./pages/AuthPage"
import { UserAuth } from "./context/AuthContext"
import { Navigate } from 'react-router-dom'
import PaymentSuccess from "./pages/PaymentSuccess"
import Orders from "./pages/Orders"
import ProfilePage from "./pages/ProfilePage"
import ScrollToTop from "./scroll/ScrolltoTop"
import { Toaster } from 'react-hot-toast'
import axios from 'axios'

function App() {
  const { user } = UserAuth()
  axios.defaults.baseURL = "http://localhost:8000"
  axios.defaults.withCredentials = true

  return (
    <main>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to={'/'} />} />
        <Route path="/laptops" element={user && <LaptopPage />} />
        <Route path="/mobiles" element={user && <MobilePage />} />
        <Route path="/mens" element={user && <MensPage />} />
        <Route path="/womens" element={user && <WomensPage />} />
        <Route path="/groceries" element={user && <Groceries />} />
        <Route path="/watches" element={user && <Watches />} />
        <Route path="/wishlist" element={user && <WishList />} />
        <Route path="/:id" element={user && <Details />} />
        <Route path="/cart" element={user && <CartPage />} />
        <Route path="/search" element={user && <SearchingRoute />} />
        <Route path="/paymentsuccess" element={user && <PaymentSuccess />} />
        <Route path="/orders" element={user && <Orders />} />
        <Route path="/profile" element={user && <ProfilePage />} />
      </Routes>
      <Footer />
      <Toaster />

    </main>
  )
}

export default App
