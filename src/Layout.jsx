import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ourcontext } from "./main";
import Admin from "./Admin";
import Cashier from "./pages/Cashier";
import MenuAddingPage from "./pages/Menuaddingpage";

function Layout() {
  
  let {admin ,hoste,cashier,user,openmenuadd,setopenmenuadd}  =useContext(ourcontext)

alert(openmenuadd)

  return (
    <div>
      <Header bg="bg-blue-900" p="p-2" />
      {/* <Outlet /> ✅ This will render HomePage or Login based on route */}
{ !hoste &&admin  ?openmenuadd?<MenuAddingPage/>:<Admin/>:cashier?<Cashier/>:<Outlet />}

    </div>
  );
}

export default Layout;
