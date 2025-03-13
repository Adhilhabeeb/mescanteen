import React, { useContext, useEffect, useState } from "react";
import { CgMenuRight, CgClose } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { ourcontext } from "../main";

function Header({ bg, p }) {
  let { user,admin ,sethoste,hoste,hosteluser,setopenmenuadd,openmenuadd,setshowdeclareditem,showdeclareditem,cashier,setcashier,setshowfilterorderhis,showfilterorderhis,setadmnodrhstryshow,admnodrhstryshow} = useContext(ourcontext);
  const navigate = useNavigate();

 
  const [menuOpen, setMenuOpen] = useState(false);
const [addmenuopen, setaddmenuopen] = useState(false)
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem("auth");

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("users");
    navigate("/login");
    window.location.reload();
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`flex items-center justify-between ${bg || "bg-transparent"} sm:px-[10%] ${p || "p-6"}`}>
      <h1 className="text-white font-extrabold text-3xl sm:text-5xl italic font-serif py-1 sm:p-2">
        Cafetech
      </h1>

      {/* User Info */}
      {isAuthenticated && user && (
        <div className="flex items-center gap-4">
          {user.photoUrl ? (
            <img
              src={user.photoUrl}
              alt="User"
              className="w-10 h-10 rounded-full border border-white"
            />
          ) : (
            <p className="text-white font-semibold">{user.email}    {hosteluser&&  "You are a hostler"}  </p>
          )}
        </div>
      )}

      {/* Desktop Menu */}
      <nav className="hidden lg:flex items-center gap-6">
        <p className="font-bold text-white">Cafetech Corporate</p>
        <p className="font-bold text-white">Partner with us</p>
        {admin&&  <button onClick={() => {
             setcashier(false)
             sethoste(false)
                             setopenmenuadd(false)
                             setshowdeclareditem(false)
                             setshowfilterorderhis(false)
                             setadmnodrhstryshow(false)
          }} className="btn bg-blue-500 px-4 py-2">Main</button>}
        {isAuthenticated && (
          <>
           {!admin&& !cashier && <>
           <button onClick={() => navigate("/cart")} className="btn bg-orange-500 px-4 py-2">Cart</button>
           <button onClick={() => navigate("/wishlist")} className="btn bg-blue-500 px-4 py-2">Wishlist</button></>}
          </>
        )}
            <button onClick={handleLogout} className="btn bg-red-500 px-4 py-2">Logout</button>


        {!admin&&  !cashier &&user && <button onClick={() => navigate("/history")} className="btn bg-orange-500 px-4 py-2">History</button>
      }
        {!isAuthenticated && (
          <Link to="/about" className="btn border-white text-white px-4 py-2">About Us</Link>
        )}
          {admin&&  <button onClick={() => {
       setcashier(false)
sethoste(true)
                setopenmenuadd(false)
                setshowdeclareditem(false)
                setshowfilterorderhis(false)
                setadmnodrhstryshow(false)
          }} className="btn bg-blue-500 px-4 py-2">Add hosteller</button>}
{( cashier )  && 
  <button onClick={() => {

    sethoste(false)
                    setopenmenuadd(false)
                    setshowdeclareditem(false)
                    setshowfilterorderhis(!showfilterorderhis)
                    setadmnodrhstryshow(false)
    

  }} className="btn bg-blue-500 px-4 py-2">{ !showfilterorderhis?" Order History":" Cashier page"}</button>
}
          
{( admin )  && 
  <button onClick={() => {
   

    setcashier(false)
    sethoste(false)
                    setopenmenuadd(false)
                    setshowdeclareditem(false)
                    setshowfilterorderhis(false)
                    setadmnodrhstryshow(true)


  }} className="btn bg-blue-500 px-4 py-2">  Order History</button>
}
         
 {admin&&  <button onClick={() => {
          
          setcashier(false)
          sethoste(false)
                          setopenmenuadd(true)
                          setshowdeclareditem(false)
                          setshowfilterorderhis(false)
                          setadmnodrhstryshow(false)
         
          }} className="btn bg-blue-500 px-4 py-2">Add menu</button>}
           {admin&&  <button onClick={() => {
             setcashier(false)
             sethoste(false)
                             setopenmenuadd(false)
                             setshowdeclareditem(true)
                             setshowfilterorderhis(false)
                             setadmnodrhstryshow(false)
          }} className="btn bg-blue-500 px-4 py-2">Add declared</button>}
      </nav>

      {/* Mobile Menu Button */}
      <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
        {menuOpen ? <CgClose className="text-4xl text-white" /> : <CgMenuRight className="text-4xl text-white" />}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-0 w-64 bg-gray-900 p-6 rounded-lg flex flex-col items-center gap-4 shadow-lg lg:hidden"  style={{zIndex:99999}}>
          <p className="font-bold text-white">Cafetech Corporate</p>
          <p className="font-bold text-white">Partner with us</p>
          {!admin&& !cashier && (
            <>
              <button onClick={() => navigate("/cart")} className="btn bg-orange-500 w-full px-4 py-3">Cart</button>
              <button onClick={() => navigate("/wishlist")} className="btn bg-blue-500 w-full px-4 py-3">Wishlist</button>
              <button onClick={handleLogout} className="btn bg-red-500 w-full px-4 py-3">Logout</button>
            </>
          )}


{admin&&  <button onClick={() => {
             setcashier(false)
             sethoste(false)
                             setopenmenuadd(false)
                             setshowdeclareditem(false)
                             setshowfilterorderhis(false)
                             setadmnodrhstryshow(false)
          }} className="btn bg-blue-500 px-4 py-2">Main</button>}

{!admin&&  !cashier &&user && <button onClick={() => navigate("/history")} className="btn bg-orange-500 px-4 py-2">History</button>
      }
 {admin&&  <button onClick={() => {
       setcashier(false)
sethoste(true)
                setopenmenuadd(false)
                setshowdeclareditem(false)
                setshowfilterorderhis(false)
                setadmnodrhstryshow(false)
          }} className="btn bg-blue-500 px-4 py-2">Add hosteller</button>}


{( cashier )  && 
  <button onClick={() => {

    sethoste(false)
                    setopenmenuadd(false)
                    setshowdeclareditem(false)
                    setshowfilterorderhis(!showfilterorderhis)
                    setadmnodrhstryshow(false)
    

  }} className="btn bg-blue-500 px-4 py-2">{ !showfilterorderhis?" Order History":" Cashier page"}</button>
}

          
{( admin )  && 
  <button onClick={() => {
   

    setcashier(false)
    sethoste(false)
                    setopenmenuadd(false)
                    setshowdeclareditem(false)
                    setshowfilterorderhis(false)
                    setadmnodrhstryshow(true)


  }} className="btn bg-blue-500 px-4 py-2">  Order History</button>
}
         
 {admin&&  <button onClick={() => {
          
          setcashier(false)
          sethoste(false)
                          setopenmenuadd(true)
                          setshowdeclareditem(false)
                          setshowfilterorderhis(false)
                          setadmnodrhstryshow(false)
         
          }} className="btn bg-blue-500 px-4 py-2">Add menu</button>}
           {admin&&  <button onClick={() => {
             setcashier(false)
             sethoste(false)
                             setopenmenuadd(false)
                             setshowdeclareditem(true)
                             setshowfilterorderhis(false)
                             setadmnodrhstryshow(false)
          }} className="btn bg-blue-500 px-4 py-2">Add declared</button>}

          {!isAuthenticated && (
            <Link to="/about" className="btn border-white text-white w-full px-4 py-3">About Us</Link>
          )}

<button onClick={handleLogout} className="btn bg-red-500 px-4 py-2">Logout</button>

        </div>
      )}
    </header>
  );
}

export default Header;
