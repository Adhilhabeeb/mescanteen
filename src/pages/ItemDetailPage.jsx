import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ourcontext } from "../main";

function ItemDetailPage() {
let navigate=useNavigate()
  let foodcontex=useContext(ourcontext)
  const location = useLocation();
  const { food } = location.state || {}; // Retrieve food data passed via navigation
food.quantity=1
console.log(food,"food")
const getRandomPrice = () => {
  return Math.floor(Math.random() * (500 - 50 + 1)) + 50;
};
food.price=getRandomPrice()

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  // Add to Cart
  const addToCart = () => {
    
    
let exist=cart.some(el=>{
 return el.name==food.name
})


if (exist) {
  alert("Exist")
  let newcart=cart.map(el=>{
    return el.name==food.name?{...el,quantity:el.quantity+1}:el
 })

 setCart(newcart);


console.log(newcart,"nnnnnnnnneewwwwww")
foodcontex.setcart(newcart)
localStorage.setItem("cart", JSON.stringify(newcart)); // Store updated cart in localStorage

}else{
  const newCart = [...cart, food];
 setCart(newCart);
 foodcontex.setcart(newCart)
 localStorage.setItem("cart", JSON.stringify(newCart)); // Store updated cart in localStorage


}

   
    alert(`${food.name} added to Cart!`);
   navigate("/cart")

  };

  // Add to Wishlist
  const addToWishlist = () => {
    const newWishlist = [...wishlist, food];
    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist)); // Store updated wishlist in localStorage
    alert(`${food.name} added to Wishlist!`);
  };

  // Buy Now (for demonstration, we'll just add it to the cart and redirect to the cart page)
  const buyNow = () => {
    const newCart = [...cart, food];
    setCart(newCart);
    foodcontex.setcart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart)); // Store updated cart in localStorage
    alert(`${food.name} added to Cart!`);
    // Redirect to Cart Page (if you have a cart page set up)
    navigate("/cart"); // Uncomment this if you have a cart page
  };

  if (!food) {
    return <p>Item not found!</p>;
  }

  return (
    <div className="p-10">
      <h1>{food.name}</h1>
      <img src={food.image} alt={food.name} />
      <p>{food.description}</p>
      <p>Rating: {food.rating}</p>
      <p>
        Preparation time: {food.prepTimeMinutes} - {food.prepTimeMinutes + 5}{" "}
        min
      </p>
      <p>price:{food.price}</p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={addToCart}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Add to Cart
        </button>
        <button
          onClick={addToWishlist}
          className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
        >
          Add to Wishlist
        </button>
        <button
          onClick={buyNow}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default ItemDetailPage;
