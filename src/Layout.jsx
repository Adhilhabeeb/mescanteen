import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ourcontext } from "./main";
import Admin from "./Admin";

function Layout() {
  
  let {admin ,hoste}  =useContext(ourcontext)

  

  return (
    <div>
      <Header bg="bg-blue-900" p="p-2" />
      {/* <Outlet /> ✅ This will render HomePage or Login based on route */}
{ !hoste &&admin?<Admin/>:<Outlet />}

    </div>
  );
}

export default Layout;
