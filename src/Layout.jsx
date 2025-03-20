import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { ourcontext } from "./main";
import Admin from "./Admin";
import Cashier from "./pages/Cashier";
import MenuAddingPage from "./pages/Menuaddingpage";
import AddDeclaredItems from "./components/Adddeclareditems";
import Filterrecentdata from "./pages/Filterrecentdata";
import AddHostelers from "./pages/Addhostelers";
import Showhostelerspricepoage from "./pages/showhostelerspricepoage";

function Layout() {
  let navigate = useNavigate();
  let {
    admin,
    hoste,
    cashier,
    user,
    openmenuadd,
    setopenmenuadd,
    showdeclareditem,
    showfilterorderhis,
    admnodrhstryshow,
    showhostelerprpage

  } = useContext(ourcontext);
  useEffect(() => {
    if (showdeclareditem) {
      // alert("true")
    }
  }, [showdeclareditem]);
  useEffect(() => {
    console.log("admin:", admin);
    console.log("hoste:", hoste);
    console.log("cashier:", cashier);
    console.log("openmenuadd:", openmenuadd);
    console.log("showdeclareditem:", showdeclareditem);
    console.log("showfilterorderhis:", showfilterorderhis);
    console.log("admnodrhstryshow:", admnodrhstryshow);
  }, [
    admin,
    hoste,
    cashier,
    openmenuadd,
    showdeclareditem,
    showfilterorderhis,
    admnodrhstryshow
  ]);
  
  return (
    <div>
      <Header bg="bg-blue-900" p="p-2" />
      {/* <Outlet /> ✅ This will render HomePage or Login based on route */}
      {/* {!hoste && admin ? (
        openmenuadd ? (
          <MenuAddingPage />
        ) : showdeclareditem ? (
          <AddDeclaredItems key={showdeclareditem} />
        ) : admnodrhstryshow ? (
          <Filterrecentdata />
        ) : (
          <Admin />
        )
      ) : cashier ? (
        showfilterorderhis ? (
          <Filterrecentdata />
        ) : (
          <Cashier />
        )
      ) : (
        <Outlet />
      )} */}



      {admin ?
      //hostler check
      hoste  ?   
      <AddHostelers/>  :
      //adminorderhisry
      admnodrhstryshow?
      <Filterrecentdata />:
      //menuaddpage shwoing
   openmenuadd ?
   <MenuAddingPage/>:
   // Adddeclared item page showing  
  showdeclareditem?
  <AddDeclaredItems/>:
  showhostelerprpage?<Showhostelerspricepoage/>:
  <Admin/>
      
      
      
      :cashier?
      // Filterrecentdata  showing
      showfilterorderhis ?   <Filterrecentdata />:
      <Cashier/>
    
      
      
      :<Outlet />}
     
    </div>
  );
}

export default Layout;
