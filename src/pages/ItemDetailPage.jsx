import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ourcontext } from "../main";
import { Card, CardMedia, CardContent, Typography, Button, Grid, Box } from "@mui/material";

function ItemDetailPage() {
  let navigate = useNavigate();
  let foodcontex = useContext(ourcontext);
  const location = useLocation();
  const { food } = location.state || {}; // Retrieve food data passed via navigation

  if (!food) {
    return <Typography variant="h5" align="center">Item not found!</Typography>;
  }

  food.quantity = 1;

  const getRandomPrice = () => Math.floor(Math.random() * (500 - 50 + 1)) + 50;
  food.price = getRandomPrice();

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem("wishlist")) || []);

  // Add to Cart
  const addToCart = () => {
    let exist = cart.some(el => el.name === food.name);
    if (exist) {
      let newCart = cart.map(el => el.name === food.name ? { ...el, quantity: el.quantity + 1 } : el);
      setCart(newCart);
      foodcontex.setcart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      const newCart = [...cart, food];
      setCart(newCart);
      foodcontex.setcart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
    navigate("/cart");
  };

  // Add to Wishlist
  const addToWishlist = () => {
    if (!wishlist.some(el => el.name === food.name)) {
      const newWishlist = [...wishlist, food];
      setWishlist(newWishlist);
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    }
  };

  // Buy Now
  const buyNow = () => {
    const newCart = [...cart, food];
    setCart(newCart);
    foodcontex.setcart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    navigate("/cart");
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "auto", padding: 3 }}>
      <Card sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, boxShadow: 3 }}>
        {/* Left Side - Image */}
        <CardMedia
          component="img"
          image={food.image}
          alt={food.name}
          sx={{ width: { xs: "100%", md: 350 }, height: 300, objectFit: "cover" }}
        />

        {/* Right Side - Details */}
        <CardContent sx={{ flex: 1, padding: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {food.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {food.description}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Rating: ⭐ {food.rating} / 5
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Preparation Time: {food.prepTimeMinutes} - {food.prepTimeMinutes + 5} min
          </Typography>
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
            Price: ₹{food.price}
          </Typography>

          {/* Buttons */}
          <Grid container spacing={2} sx={{ marginTop: 3 }}>
            <Grid item xs={12} sm={4}>
              <Button fullWidth variant="contained" color="primary" onClick={addToCart}>
                Add to Cart 🛒
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button fullWidth variant="contained" color="secondary" onClick={addToWishlist}>
                Add to Wishlist ❤️
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button fullWidth variant="contained" color="success" onClick={buyNow}>
                Buy Now 🛍️
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ItemDetailPage;
