import { createContext, StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
 
  Route,
  RouterProvider,
  
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
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { Token } from "@mui/icons-material";
import TokenPage from "./pages/Tokenpage.jsx";
import Footer from "./components/Footer.jsx";
import Addhostelers from "./pages/Addhostelers.jsx";
import { db } from "./Firebase.js";
import Historypage from "./pages/History.jsx";
import MenuAddingPage from "./pages/Menuaddingpage.jsx";
import AddDeclaredItems from "./components/Adddeclareditems.jsx";
import Filterrecentdata from "./pages/Filterrecentdata.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} /> {/* Default route for root (/) */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="about" element={<AboutUs />} />
      <Route path="token" element={<TokenPage />} />

      <Route path="/item/:id" element={<ItemDetailPage />} />
      <Route path="/cart" element={<CartPage />} /> {/* Cart Route */}
      <Route path="addhostel" element={<Addhostelers />} /> {/* Cart Route */}
      <Route path="history" element={<Historypage />} /> {/* Cart Route */}
      
      <Route path="menuadd" element={<MenuAddingPage />} /> {/* Cart Route */}
      <Route path="adddeclared" element={<AddDeclaredItems />} /> {/* Cart Route */}
      <Route path="filtereddata" element={<Filterrecentdata />} /> {/* Cart Route */}
     


      
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
export let ourcontext =createContext()
function Main(props) {

  const [hstelusertotalbill, sethstelusertotalbill] = useState(0)
const [showdeclareditem, setshowdeclareditem] = useState(false)
  const [cartempty, setcartempty] = useState(false)
   const [hostelarr, sethostelarr] = useState([])
   const [admnodrhstryshow, setadmnodrhstryshow] = useState(false)
   useEffect(() => {
    const q = query(collection(db, "hostelers"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      sethostelarr(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
   }, [])
   
  const [hoste, sethoste] = useState(false)
  const [proceedcart, setproceedcart] = useState(false)
const [openmenuadd, setopenmenuadd] = useState(false)
  const [showfilterorderhis, setshowfilterorderhis] = useState(false)
  const [hosteluser, sethosteluser] = useState(false)
const [token, settoken] = useState(JSON.parse(localStorage.getItem("token")))
const [cashierarr, setcashierarr] = useState(['cashier@mbits.ac.in'])
const [cashier, setcashier] = useState(false)
const [admins, setadmins] = useState(["abhinavraj.cse22@mbits.ac.in","adhilhabeeb960571@gmail.com"])
  const [user, setuser] = useState(null)
const [admin, setadmin] = useState(false)
const [cart, setcart] = useState([])
  const [items, setitems] = useState(["Biriyani", "Fried Rice", "Noodles", "Grilled Chicken", "Shawarma", "Parotta", "Butter Chicken", "Fish Curry", "Paneer Tikka", "Dosa", "Idli", "Pasta", "Pizza", "Burger", "Sandwich", "Mutton Curry", "Chicken 65", "Ghee Rice", "Kebab", "Mojito"])
 useEffect(() => {
  localStorage.setItem("cart",JSON.stringify(cart))




 }, [cart])
 
 useEffect(() => {
 if (user) {

  localStorage.setItem("auth",JSON.stringify(user))
  
 }

 if(user&&  user.email && admins.includes(user.email)){

  setadmin(true)
 
 }
 
 if (user &&cashierarr.includes(user.email) && user.email  ) {
setcashier(true)

 }
 
 }, [user])
 
 useEffect(() => {
  if (user && hostelarr.length>0) {
    let hoste=hostelarr.some(el=>{
      return el.email===user.email
      })

    


     sethosteluser(hoste)





     }
 }, [user,hostelarr])
 
 useEffect(() => {
  

  let authuser=JSON.parse(localStorage.getItem("auth"))
if (authuser) {
setuser(authuser)
}
 }, [])
 

  return(
    <ourcontext.Provider value={{items,setitems,cart,setcart,user,setuser,admin,setadmins,admins,settoken,token,sethoste,hoste,sethostelarr,hostelarr,hosteluser,sethstelusertotalbill,hstelusertotalbill,cashier,setproceedcart,setopenmenuadd,openmenuadd,setcartempty,cartempty,setshowdeclareditem,showdeclareditem,setshowfilterorderhis,showfilterorderhis,setadmnodrhstryshow,admnodrhstryshow,setcashier}}>

{props.children}

    </ourcontext.Provider>
  )



}
createRoot(document.getElementById("root")).render(
<>

<Main>
<RouterProvider router={router} />
<Footer/>

</Main>

</>

);





