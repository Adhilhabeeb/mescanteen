import React, { useContext } from "react";
import { ourcontext } from "./main";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

const CartList = () => {
  const { cart, setcart } = useContext(ourcontext);

  const increaseQuantity = (itemName) => {
    setcart((prev) =>
      prev.map((item) =>
        item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemName) => {
    setcart((prev) =>
      prev
        .map((item) =>
          item.name === itemName ? { ...item, quantity: item.quantity - 1 } : item
        )
        
    );
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "20px auto", padding: "10px" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          🛒 Cart List
        </Typography>
        {cart.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            Your cart is empty.
          </Typography>
        ) : (
          <List>
            {cart.map((item, index) => (
              <ListItem key={index} divider>
                <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => decreaseQuantity(item.name)} color="secondary">
                    {item.quantity > 1 ? <RemoveIcon /> : <DeleteIcon />}
                  </IconButton>
                  <IconButton onClick={() => increaseQuantity(item.name)} color="primary">
                    <AddIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default CartList;
