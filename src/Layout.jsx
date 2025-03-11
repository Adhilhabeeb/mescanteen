import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { ourcontext } from "./main";
import Admin from "./Admin";
import Cashier from "./pages/Cashier";
import MenuAddingPage from "./pages/Menuaddingpage";
import AddDeclaredItems from "./components/Adddeclareditems";

function Layout() {
  let navigate =useNavigate()
  let {admin ,hoste,cashier,user,openmenuadd,setopenmenuadd,showdeclareditem}  =useContext(ourcontext)
  useEffect(() => {
if (showdeclareditem) {
alert("true")
}
    }, [showdeclareditem])


  return (
    <div>
      <Header bg="bg-blue-900" p="p-2" />
      {/* <Outlet /> ✅ This will render HomePage or Login based on route */}
{ !hoste &&admin  ?openmenuadd?<MenuAddingPage/>:showdeclareditem ? <AddDeclaredItems key={showdeclareditem} /> : <Admin />:cashier?<Cashier/>:<Outlet />}
{showdeclareditem&&<AddDeclaredItems key={showdeclareditem} />}
    </div>
  );
}

export default Layout;
