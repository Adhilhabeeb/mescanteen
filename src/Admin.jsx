import { 
  collection, limit, onSnapshot, orderBy, query, doc, updateDoc , where, getDocs,
  Timestamp
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
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [hostelerpenarr, sethostelerpenarr] = useState([])

  useEffect(() => {
   console.log(hostelerpenarr,"hostelerpenarrupdated")
  }, [hostelerpenarr])
  
  let amopuint=0
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
      orderBy("createdAt", "desc")
    );

  
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      let newTotal = 0; // Recalculate from scratch
      let hosteluserrsoendingarray= []
  
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
          // let foods = JSON.parse(order.foods);
          // let orderTotal = foods.reduce((sum, food) => sum + food.price * food.quantity, 0);
          // newTotal += orderTotal; // Add to total
        //  console.log(order,"orderrhosteler")
        }
      });

      sortedMessages.forEach(order => {
  
        if (order.hosteluser && !order.done) {
           let foods = JSON.parse(order.foods);
          let orderTotal = foods.reduce((sum, food) => sum + food.price * food.quantity, 0);
// sethosteluserrsoendingarray(prev=>{

//  let checkhostelerexist=prev.some(el=>el.email===order.email)
// if (checkhostelerexist) {
// console.log("exist",order.email)
// return
// }

// return [...prev,{email:order.email,monthlyamnt:orderTotal}]

// })
let checkhostelerexist=hosteluserrsoendingarray.some(el=>el.email===order.email)

if (checkhostelerexist) {
hosteluserrsoendingarray.forEach(el=>{
if (el.email==order.email) {
  
  el.monthlyamnt+=orderTotal

}
})

  
}   else{
  
console.log(order.email,"nboteixts",orderTotal)

 hosteluserrsoendingarray.push({email:order.email,monthlyamnt:orderTotal})

}   

console.log(hosteluserrsoendingarray,"hosteluserrsoendingarray")
sethostelerpenarr(hosteluserrsoendingarray)
// console.log(order.email,"order.email")
let filterhostuser=hosteluserrsoendingarray.filter(el=>el.email===order.email)
amopuint=filterhostuser[0].monthlyamnt
console.log("filkterrrrerwtwrtwrtgrw",filterhostuser[0].monthlyamnt,"oooooo",amopuint)
// order.monthlyamnt=filterhostuser[0].monthlyamnt

        }
      })

  // alert(newTotal)
      // sethstelusertotalbill(newTotal); // Set the correct total
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
console.log(order,"order")
     
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


  let newTotal = 0;
  let onlinepay = 0;
  let offlinepay = 0;
  let odr=[]
  async function getTodayOrders() {
    const today = new Date();
    
    // Set start of the day (00:00:00)
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const startTimestamp = Timestamp.fromDate(startOfDay);
  
    // Set end of the day (23:59:59)
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    const endTimestamp = Timestamp.fromDate(endOfDay);
  
    const q = query(
      collection(db, "canteen"),
      where("createdAt", ">=", startTimestamp),
      where("createdAt", "<=", endTimestamp),
      orderBy("createdAt", "desc") // Newest first
    );
  
    const querySnapshot = await getDocs(q);
    let orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
  
    console.log(orders,"today orders")
  
  
  
  orders.forEach(order => {
  
  
   
    let foods = JSON.parse(order.foods);
  
  
    let orderTotal = foods.reduce((sum, food) => sum + food.price * food.quantity, 0);
  
  
    newTotal += orderTotal;
  if (order.done) {
  if (order.paymenttype === "online") {
  onlinepay += orderTotal;
  
  console.log(onlinepay,"onl")
  } else {
  offlinepay += orderTotal;
  console.log(offlinepay,"off")
  }
  }
   
  });
  
  
  console.log(totalonlinepayment,"onl","off",totalofflinepayment,)
  
  settotalonlinepayment(onlinepay);
  settotalofflinepayment(offlinepay);
    return orders;
  }
  

  

  const fetchOrders = async () => {
   
    if (!fromDate || !toDate) {
      alert("Please select both dates.");
      return;
    }

    const fromTimestamp = new Date(fromDate);
    const toTimestamp = new Date(toDate);

    try {
      const ordersRef = collection(db, "canteen");
      const q = query(
        ordersRef,
        where("createdAt", ">=", fromTimestamp),
        where("createdAt", "<=", toTimestamp)
      );

      const querySnapshot = await getDocs(q);
      const filteredOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(filteredOrders,"filtiyewgihfgvkndvfkn8364987311497139749713")

      let newTotal = 0;
      let onlinepay = 0;
      let offlinepay = 0;
  
      filteredOrders.forEach(order => {
  
       
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
  


      console.log(onlinepay,"onl","off",offlinepay,)
    
      settotalonlinepayment(onlinepay);
      settotalofflinepayment(offlinepay);
  
      
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  return (
    <>
      <TableContainer component={Paper} sx={{ maxWidth: "90%", margin: "auto", mt: 3 }}>
        <Box width={"100%"} minHeight={"5vh"} height={"auto"} display={'flex'} justifyContent={"space-around"} p={2}>
        <input
        type="date"
        value={fromDate}
        onChange={(e) => {setFromDate(e.target.value)

          
        }}
      />
      <input
        type="date"
        value={toDate}
        onChange={(e) => {setToDate(e.target.value)
          
        }}
      />
       <button className="btn bg-blue-500  py-2 px-2" onClick={fetchOrders}> Filter Date wise </button>
       <button className="btn bg-blue-500  py-2 px-2" onClick={  getTodayOrders}> get today amount </button>

          <Typography variant="p">Money Received: ₹{totalbudgey}</Typography>
          <Typography variant="p">Online Payment Received: ₹{totalonlinepayment}</Typography>
          <Typography variant="p">Offline Payment Received: ₹{totalofflinepayment}</Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><strong>Order ID </strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Total Price</strong></TableCell>
              <TableCell><strong>Payment</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Markpaid</strong></TableCell>
              <TableCell><strong>hosteller</strong></TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {fetchedarray.map(order => {

          //  hosteluserrsoendingarray[0].email &&hosteluserrsoendingarray.forEach(el=>{


            if (hostelerpenarr!=[]) {
              hostelerpenarr.forEach(el=>{
                if (el.email==order.email) {
                  order.monthlyamnt=el.monthlyamnt
                }
              })
              
            }


          //   console.log(el,"elllllllll087i9089475802475860248602746")
          //  })  

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
                    <TableCell>
{/* {order.hosteluser &&hosteluserrsoendingarray.length>0 && hosteluserrsoendingarray.map(el=>{

  if (el.name==order.email) {
alert(el.monthlyamnt)
  }
})} */}
{order.hosteluser  &&   order.monthlyamnt && <Typography>Monthly Bill: ₹{order.monthlyamnt}</Typography>}



</TableCell>
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





