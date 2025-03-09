import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ourcontext } from "../main";
import { db } from "../Firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
function CartPage() {

  const [sended, setsended] = useState(false)
     let {items,cart,setcart,user}=useContext(ourcontext)

  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);


  
  // Load saved cart items from localStorage
  useEffect(() => {
  let loca=localStorage.getItem("cart")
setCartItems(JSON.parse(loca))
setcart(JSON.parse(loca))
console.log(loca,"looocartyh")
  }, []);

  // Handle checkout
  const handleCheckout = () => {
    // You can add payment gateway logic or navigate to a checkout page
    alert("Proceeding to checkout!");

sendMessage()

    
    // Example: navigate('/checkout'); // Uncomment to navigate to checkout page
  };
  const sendMessage = async (event) => {
    

   let {uid,email}=user
   
   
  

if (!cart) {
  alert("emo")
  
  return
}

  
await addDoc(collection(db, "canteen"), {
     uid,email,foods:JSON.stringify(cart),

        createdAt: serverTimestamp(),
    


      });
   setsended(true)
   
  };

  // Remove item from cart
  const removeItemFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    setcart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
  };



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
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg">Your cart is empty!</p>
      ) : (
        <div>
          <ul className="space-y-6">
            {cartItems.map((item) => (
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
            ))}
          </ul>

          {/* Total Price */}
          <div className="flex justify-between items-center mt-6">
            <p className="font-semibold text-xl">Total: ${calculateTotal()}</p>
            <button
              onClick={handleCheckout}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
            >
              Proceed to Checkout
             {sended&&<FileDownloadDoneIcon/>} 

            </button>
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
