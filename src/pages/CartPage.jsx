import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ourcontext } from "../main";

import { db } from "../Firebase";
import { addDoc, collection, doc, query, serverTimestamp ,orderBy,limit,onSnapshot} from "firebase/firestore";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { Box, Container, Grid, Typography, Link, IconButton, Button } from "@mui/material";
let limitrestrict=3
function CartPage() {
  const [fetchedarray, setfetchedarray] = useState([])
const [restricted, setrestricted] = useState(false)
  const [sended, setsended] = useState(false)
     let {items,cart,setcart,user,token,settoken,hosteluser,hstelusertotalbill,sethstelusertotalbill }=useContext(ourcontext)
  const [paymenttype, setpaymenttype] = useState("online")
  
  // Example Usage

  ///////
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

useEffect(() => {
 
 

  if (user  && cart && paymenttype) {

    console.log(cart,"carrtyujk")
    let {uid,email}=user
   settoken({
    uid,email,foods:JSON.stringify(cart),

       createdAt: serverTimestamp(),
   
paymenttype,done:false,
hosteluser
     })

     localStorage.setItem("token",JSON.stringify(token))

   
// console.log(JSON.parse(token.foods)[0],"978787")

   
  }
  
}, [cart,user,paymenttype])

useEffect(() => {
 console.log(JSON.parse(localStorage.getItem("cart")),"cccccc")
//  setcart(JSON.parse(localStorage.getItem("cart")))
} )


  // Load saved cart items from localStorage
  useEffect(() => {
  let loca=localStorage.getItem("cart")
setCartItems(JSON.parse(loca))
setcart(JSON.parse(loca))
console.log(loca,"looocartyh")

const q = query(
  collection(db, "canteen"),
  orderBy("createdAt", "desc"),
  limit(50)
);

const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
  const fetchedMessages = [];
  let newTotal = 0; // Recalculate from scratch

  
  QuerySnapshot.forEach((doc) => {
    fetchedMessages.push({ ...doc.data(), id: doc.id });
  });

  fetchedMessages.forEach(el => {
    el.createdAt = new Date(el.createdAt.seconds * 1000);
  });

  const sortedMessages = fetchedMessages.sort((a, b) => b.createdAt - a.createdAt);

  sortedMessages.forEach(el => {
    el.createdAt = el.createdAt.toLocaleString();
  });
  sortedMessages.forEach(order => {
    order.createdAt = order.createdAt.toLocaleString();

    // Only consider hostel users & orders that are NOT done
    if (order.hosteluser && !order.done  ) {
      let foods = JSON.parse(order.foods);
      let orderTotal = foods.reduce((sum, food) => sum + food.price * food.quantity, 0);
      newTotal += orderTotal; // Add to total
    }
  });

  sethstelusertotalbill(newTotal); // Set the correct total
  setfetchedarray(sortedMessages);
});

return () => unsubscribe();




  }, []);



    useEffect(() => {
    

      
   let newar=   fetchedarray?.filter(e=>{
    console.log(e,"eeee",user)

return e.email==user.email  && !e.done &&!e.hosteluser
      })
  

if (newar.length>limitrestrict) {
  setrestricted(true)
}
     

    }, [fetchedarray])
    

    useEffect(() => {
     

      console.log(restricted,"refhvne")
    }, [restricted])
    
  // Handle checkout
  const handleCheckout = () => {
    // You can add payment gateway logic or navigate to a checkout page
    // alert("Proceeding to checkout!");

sendMessage()

    
    // Example: navigate('/checkout'); // Uncomment to navigate to checkout page
  };
  const sendMessage = async (event) => {
    

   let {uid,email}=user
   
 
 

if (!cart) {
  alert("empty cart")
  
  return
}
if (token) {
 console.log(token,"yyy")
}




await addDoc(collection(db, "canteen"),token );

   setsended(true)
  
  };

  // Remove item from cart
  const removeItemFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    setcart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
  };


useEffect(() => {
// alert(paymenttype)
}, [paymenttype])

  // Update quantity of item in cart
  const updateItemQuantity = (itemId, quantity) => {


    console.log(itemId,quantity,"qqqq")
    // quantity
    const updatedCart = cartItems.map((item) =>
      item.id === itemId
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
    setCartItems(updatedCart);
    setcart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
  };


  
  // Calculate total price
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(1);
  };

  // Handle "Back to Home" navigation
  const handleBackToHome = () => {
    navigate("/"); // Navigate to the home page
  };


  // let addcart=useCallback(e=>{
  //     let itemName = e.currentTarget.name;
  
  //     console.log(itemName,"iii")
  // let ar=cart.some(el=>{
  
  //    return el.name==itemName
  // })
  
  
  
  // if (ar) {
    
  // let newarr=cart.map(e=>{
  
  
  //     if (e.name==itemName) {
  //     return {name:e.name,quantity:e.quantity+1}
  //     }
  //     return e
  // })
  // setcart(newarr)
  
  
  
  // }else{
  
     
  //     setcart(prev=>{
  
  
        
  //       return[...prev,{
  //         name:e.target.name,quantity:1
  //       }]
  //     })
  // }
  
  // })


  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart pending bill {hstelusertotalbill} </h1>
      {cartItems.length === 0 ? (
        <p className="text-lg">Your cart is empty!</p>
      ) : (
        <div>
          <ul className="space-y-6">
            {cartItems.map((item) => (
              <>
             
              
               <li
                key={item.id}
                className="flex items-center gap-6 border-b pb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-600">${item.price}</p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateItemQuantity(item.id, -1)}
                      className="px-2 py-1 bg-gray-200 rounded-full text-gray-600"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateItemQuantity(item.id, 1)}
                      className="px-2 py-1 bg-gray-200 rounded-full text-gray-600"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItemFromCart(item.id)}
                  className="text-red-500 font-semibold"
                >
                  Remove
                </button>
              </li>


              </>
             
            ))}
          </ul>

<Box  bgcolor={"red"}  height={"5vh"} width={"100%"}  display={"flex"}  justifyContent={"space-around"} alignItems={"center"} >
<p>payment:</p>
<Box sx={{display:"flex",justifyContent:"space-around",alignItems:"center"}}  width={"70%"} height={"100%"}>

 <div> <input  onChange={(e)=>setpaymenttype(e.currentTarget.value)}  checked={paymenttype=="online"&&true}  type="radio" id="Online" name="fav_language" value="online"  />
 <label for="Online">Online</label><br/></div>
 <div> <input  onChange={(e)=>setpaymenttype(e.currentTarget.value)} checked={paymenttype=="Offline"&&true}   type="radio" id="Offline" name="fav_language" value="Offline"  />
 <label for="Offline">Offline</label><br/></div>
</Box>
</Box>
          {/* Total Price */}
          <div className="flex justify-between items-center mt-6"  style={{display:"block"}}>
            <p className="font-semibold text-xl">Total: ${calculateTotal()}</p>
           {!restricted?
            <button 
            onClick={handleCheckout}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
          >
            Proceed to Checkout
           {sended&&<FileDownloadDoneIcon/>} 

          </button>:
          <Button sx={{background:"red",color:"white"}}  >  you are Restricted  until pay remaind bills </Button>
          }
            {sended && !restricted&&<button  
              onClick={()=>navigate("/token")}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 ml-1"
            >
              view  token 
            

            </button>}

          </div>
        </div>
      )}

      {/* Back to Home Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleBackToHome}
          className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default CartPage;
