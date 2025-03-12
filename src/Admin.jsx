import { 
  collection, limit, onSnapshot, orderBy, query, doc, updateDoc 
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "./Firebase";
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Collapse, Box, Typography, Button 
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { ourcontext } from "./main";
import { useNavigate } from "react-router-dom";
import newStyled from "@emotion/styled";

function Admin() {
  let navigate=useNavigate()
    let {user,setuser,sethstelusertotalbill,hstelusertotalbill}=useContext(ourcontext)
  useEffect(() => {
  if(hstelusertotalbill!=0){
//  localStorage.setItem("hosteltotalpay",hstelusertotalbill)
// alert(hstelusertotalbill)
    
  }
  }, [hstelusertotalbill])
  

  
  const [fetchedarray, setfetchedarray] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [totalbudgey, setTotalbudgey] = useState(0);
  const [totalonlinepayment, settotalonlinepayment] = useState(0);
  const [totalofflinepayment, settotalofflinepayment] = useState(0);

//   useEffect(() => {
//     const q = query(
//       collection(db, "canteen"),
//       orderBy("createdAt", "desc"),
//       limit(50)
//     );
    
//     const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
//       const fetchedMessages = [];
//       QuerySnapshot.forEach((doc) => {
//         fetchedMessages.push({ ...doc.data(), id: doc.id });
//       });

//       fetchedMessages.forEach(el => {
//         el.createdAt = new Date(el.createdAt.seconds * 1000);
//       });

//       const sortedMessages = fetchedMessages.sort((a, b) => b.createdAt - a.createdAt);

//       sortedMessages.forEach(el => {
//         el.createdAt = el.createdAt.toLocaleString();
//       });

//       // let arrro=sortedMessages.reduce((total,orders)=>{


//       // })

//       let totalHostelBill = 0;

//       sortedMessages.forEach(order => {
//         if (order.hosteluser && !order.done) {
//           let foods = JSON.parse(order.foods);
//           let orderTotal = foods.reduce((sum, food) => sum + food.price * food.quantity, 0);
//           order.monthlyamnt = orderTotal;
//           totalHostelBill += order.monthlyamnt;
//         }
//       });
      
//       // Update state only once after loop finishes
//       sethstelusertotalbill(totalHostelBill);
      

// navigate("/")
//       setfetchedarray(sortedMessages);
//     });


// let ee=localStorage.getItem("hosteltotalpay")
// if (ee) {
//   // sethstelusertotalbill(ee)
// }

//     return () =>{ unsubscribe()
//       // window.location.reload()
  
// };




//   }, []);

  // Update total budget when fetchedarray changes
 
  useEffect(() => {
    const q = query(
      collection(db, "canteen"),
      orderBy("createdAt", "desc"),
      limit(50)
    );
  
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      let newTotal = 0; // Recalculate from scratch
  
      QuerySnapshot.forEach((doc) => {
        const orderData = { ...doc.data(), id: doc.id };
        orderData.createdAt = new Date(orderData.createdAt.seconds * 1000);
        fetchedMessages.push(orderData);
      });
  
      const sortedMessages = fetchedMessages.sort((a, b) => b.createdAt - a.createdAt);
      
      sortedMessages.forEach(order => {
        order.createdAt = order.createdAt.toLocaleString();
  
        // Only consider hostel users & orders that are NOT done
        if (order.hosteluser && !order.done) {
          let foods = JSON.parse(order.foods);
          let orderTotal = foods.reduce((sum, food) => sum + food.price * food.quantity, 0);
          newTotal += orderTotal; // Add to total
         
        }
      });

      sortedMessages.forEach(order => {

        if (order.hosteluser && !order.done) {

          order.pendingamounttotl=newStyled
        }
      })

  // alert(newTotal)
      sethstelusertotalbill(newTotal); // Set the correct total
      setfetchedarray(sortedMessages);
    });
  
    return () => {
      unsubscribe();
    };
  }, []);
  
  
 
  useEffect(() => {
    let newTotal = 0;
    let onlinepay = 0;
    let offlinepay = 0;

    fetchedarray.forEach(order => {

     
      let foods = JSON.parse(order.foods);
      let orderTotal = foods.reduce((sum, food) => sum + food.price * food.quantity, 0);
      newTotal += orderTotal;
if (order.done) {
  if (order.paymenttype === "online") {
    onlinepay += orderTotal;
  } else {
    offlinepay += orderTotal;
  }
}
     
    });

  
    settotalonlinepayment(onlinepay);
    settotalofflinepayment(offlinepay);

    




  }, [fetchedarray]);

  useEffect(() => {

    setTotalbudgey((prev=>{

return prev=totalofflinepayment+totalonlinepayment
      console.log(prev,"pppprprruyekgfkhwgdfkhnvbdwmnv msc")
    }))
  }, [totalofflinepayment,totalonlinepayment])
  

  // Function to update 'done' field in Firestore
  const markAsDone = async (orderId) => {
    try {
      const orderRef = doc(db, "canteen", orderId);
      await updateDoc(orderRef, {
        done: true, // Set the 'done' field to true
      });

      // Update local state to reflect changes immediately
      setfetchedarray((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, done: true } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ maxWidth: 900, margin: "auto", mt: 3 }}>
        <Box width={"100%"} minHeight={"5vh"} height={"auto"} display={'flex'} justifyContent={"space-around"} p={2}>
          <Typography variant="p">Money Received: ₹{totalbudgey}</Typography>
          <Typography variant="p">Online Payment Received: ₹{totalonlinepayment}</Typography>
          <Typography variant="p">Offline Payment Received: ₹{totalofflinepayment}</Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><strong>Order ID</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Total Price</strong></TableCell>
              <TableCell><strong>Payment</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>hosteller</strong></TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {fetchedarray.map(order => {

             
       
              let foods = JSON.parse(order.foods);
              const totalPrice = foods.reduce((sum, food) => sum + food.price * food.quantity, 0);

              return (
                <React.Fragment key={order.id}>
                  <TableRow>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.email}</TableCell>
                    <TableCell>{order.createdAt}</TableCell>
                    <TableCell>₹{totalPrice}</TableCell>
                    <TableCell>{order.paymenttype}</TableCell>
{order.hosteluser && hstelusertotalbill  &&<h1> crt pending {hstelusertotalbill}</h1>}
                    <TableCell>
                      <IconButton onClick={() => setExpanded(prev => ({ ...prev, [order.id]: !prev[order.id] }))}>
                        {expanded[order.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      {order.done ? (
                        <Typography color="green">✅ Completed</Typography>
                      ) : (
                        <Button 
                          variant="contained" 
                          color="success" 
                          onClick={() => markAsDone(order.id)}
                        >
                          Mark as Done ✅
                        </Button>
                      )}
                    </TableCell>

                    <TableCell><Button sx={{background:order.hosteluser?"green":"red",color:"white"}}>{order.hosteluser?"True":"False"}</Button></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={7} sx={{ padding: 0 }}>
                      <Collapse in={expanded[order.id]} timeout="auto" unmountOnExit>
                        <Box sx={{ padding: 2, backgroundColor: "#fafafa" }}>
                          <Typography variant="h6" sx={{ mb: 2 }}>Ordered Items</Typography>
                          {foods.map(food => (
                            <Box key={food.id} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                              <img src={food.image} alt={food.name} width="60" height="60" style={{ borderRadius: "8px" }} />
                              <Typography variant="body1">{food.name}</Typography>
                              <Typography variant="body2" color="gray">₹{food.price}</Typography>
                              <Typography>Qty: {food.quantity}</Typography>
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
    </>
  );
}

export default Admin;
