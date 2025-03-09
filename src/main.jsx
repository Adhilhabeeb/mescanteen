import { createContext, StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
 
  Route,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // Make sure to import the signup page if needed
import AboutUs from "./pages/AboutUs.jsx";
import NotFound from "./pages/NotFound.jsx";
import ItemDetailPage from "./pages/ItemDetailPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";
import Food from "./food.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} /> {/* Default route for root (/) */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="about" element={<AboutUs />} />
      <Route path="/item/:id" element={<ItemDetailPage />} />
      <Route path="/cart" element={<CartPage />} /> {/* Cart Route */}
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
export let ourcontext =createContext()
function Main(props) {

const [admins, setadmins] = useState(["abhinavraj.cse22@mbits.ac.in","adhilhabeeb960571@gmail.com"])
  const [user, setuser] = useState(null)
const [admin, setadmin] = useState(false)
const [cart, setcart] = useState([])
  const [items, setitems] = useState(["Biriyani", "Fried Rice", "Noodles", "Grilled Chicken", "Shawarma", "Parotta", "Butter Chicken", "Fish Curry", "Paneer Tikka", "Dosa", "Idli", "Pasta", "Pizza", "Burger", "Sandwich", "Mutton Curry", "Chicken 65", "Ghee Rice", "Kebab", "Mojito"])
 useEffect(() => {
  localStorage.setItem("cart",JSON.stringify(cart))
console.log(cart,"cartyty")

console.log(localStorage.getItem("cart"))
 }, [cart])
 
 useEffect(() => {
 if (user) {
  localStorage.setItem("auth",JSON.stringify(user))
  
 }

 if(user&&  user.email && admins.includes(user.email)){

  setadmin(true)
 
 }
 
 
 }, [user])
 
 useEffect(() => {
  

  let authuser=JSON.parse(localStorage.getItem("auth"))
if (authuser) {
setuser(authuser)
}
 }, [])
 

  return(
    <ourcontext.Provider value={{items,setitems,cart,setcart,user,setuser,admin,setadmins,admins}}>

{props.children}

    </ourcontext.Provider>
  )



}
createRoot(document.getElementById("root")).render(
<Main>
<RouterProvider router={router} />

</Main>

);





