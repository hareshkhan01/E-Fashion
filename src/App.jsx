import React from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Home from './pages/home/Home'
import Order from './pages/order/Order'
import Cart from './pages/cart/Cart'
import Dashboard from './pages/admin/dashboard/Dashboard'
import NoPage from './pages/nopage/NoPage'
import MyState from './context/data/myState'
import Signup from './pages/registration/Signup'
import ProductInfo from './pages/prodctinfo/Productinfo'
import AddProduct from "./pages/admin/pages/AddProduct"
import UpdateProduct from "./pages/admin/pages/UpdateProduct"
import Login from './pages/registration/Login'
import AllProducts from "./pages/allproducts/AllProducts"
import WishList from "./pages/prodctinfo/wishlist/WishList"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import ForgotPassowrd from "./pages/registration/ForgotPassowrd"
function App() {

  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<ProtectedRoute><Order /></ProtectedRoute>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<ProtectedRouteForAdmin><Dashboard /></ProtectedRouteForAdmin>} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/forgotpassword" element={<ForgotPassowrd />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/addproduct" element={<ProtectedRouteForAdmin><AddProduct /></ProtectedRouteForAdmin>} />
          <Route path="/updateproduct" element={<ProtectedRouteForAdmin><UpdateProduct /></ProtectedRouteForAdmin>} />
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  )
}

export default App
//user
export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user_login')
  if (user) {
    return children
  } else {
    return <Navigate to={'/login'} />
  }
}
//admin
const ProtectedRouteForAdmin = (
  { children }
) => {
  const admin = JSON.parse(localStorage.getItem('user_login'))
  if (admin.user.email === 'sukanyaparh@gmail.com') {
    return children
  }
  else {
    return <Navigate to={'/login'} />

  }
}