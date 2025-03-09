import { collection, limit, onSnapshot, or, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from './Firebase';
import { 
    Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, IconButton, Collapse, Box, Typography 
  } from "@mui/material";
  import AddIcon from "@mui/icons-material/Add";
  import RemoveIcon from "@mui/icons-material/Remove";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import ExpandLessIcon from "@mui/icons-material/ExpandLess";
  
function Admin() {
const [fetchedarray, setfetchedarray] = useState([])
const [orders, setorders] = useState([])
useEffect(() => {
//  console.log(fetchedarray[0].foods,"ffhfhcncv")

}, [fetchedarray])
const [expanded, setExpanded] = useState({});

  // Toggle Order Details
  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Handle Quantity Change
  const handleQuantityChange = (orderId, foodId, change) => {
    console.log(`Change quantity for order ${orderId}, food ${foodId}: ${change}`);
    // Add Firebase update logic here if needed
  };

    useEffect(() => {
        const q = query(
          collection(db, "canteen"),
          orderBy("createdAt", "desc"),
          limit(50)
        );
        
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          const fetchedMessages = [];
          QuerySnapshot.forEach((doc) => {
      
      
          console.log(doc.data(),"dattatatat")
            fetchedMessages.push({ ...doc.data(), id: doc.id });
          });

fetchedMessages.forEach(el => {
    el.createdAt = new Date(el.createdAt.seconds * 1000);
  });
  

  const sortedMessages = fetchedMessages.sort((a, b) => b.createdAt - a.createdAt);
  

  sortedMessages.forEach(el => {
    return el.createdAt = el.createdAt.toLocaleString();
  });
  

  console.log(sortedMessages,"soooooo");
  
        //   console.log(sortedMessages,"ff")
      setfetchedarray(sortedMessages)
      
        });
      
      
      
        
        // return () => unsubscribe;
      }, []);
      
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 900, margin: "auto", mt: 3 }}>
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
          <TableCell><strong>Order ID</strong></TableCell>
          <TableCell><strong>Email</strong></TableCell>
          <TableCell><strong>Date</strong></TableCell>
          <TableCell><strong>Total Price</strong></TableCell>
          <TableCell><strong>Actions</strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {fetchedarray.map((order) => {

        let foods=JSON.parse(order.foods)
          const totalPrice = foods.reduce((sum, food) => sum + food.price * food.quantity, 0);

        console.log(order,"oo",foods)

          return (
            <React.Fragment key={order.id}>
              <TableRow>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.createdAt}</TableCell>
                <TableCell>₹{totalPrice}</TableCell>
                <TableCell>
                  <IconButton onClick={() => toggleExpand(order.id)}>
                    {expanded[order.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </TableCell>
              </TableRow>

              {/* Expandable Row for Ordered Items */}
              <TableRow>
                <TableCell colSpan={5} sx={{ padding: 0 }}>
                  <Collapse in={expanded[order.id]} timeout="auto" unmountOnExit>
                    <Box sx={{ padding: 2, backgroundColor: "#fafafa" }}>
                      <Typography variant="h6" sx={{ mb: 2 }}>Ordered Items</Typography>
                      {foods.map((food) => (
                        <Box key={food.id} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                          <img src={food.image} alt={food.name} width="60" height="60" style={{ borderRadius: "8px" }} />
                          <Typography variant="body1">{food.name}</Typography>
                          <Typography variant="body2" color="gray">₹{food.price}</Typography>
                         
                          <Typography> qnty:{food.quantity}</Typography>
                        
                        </Box>
                      ))}
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          );
       
       })}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default Admin
