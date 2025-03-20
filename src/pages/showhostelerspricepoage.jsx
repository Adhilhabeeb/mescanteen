import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, query, serverTimestamp ,orderBy,limit,onSnapshot} from "firebase/firestore";
import { db } from '../Firebase';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography
  } from '@mui/material';
function Showhostelerspricepoage() {
  const [fetchedarray, setfetchedarray] = useState([])
const [hostelarr, sethostelarr] = useState([])
const [filterer, setfilterer] = useState([])
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
            order.pendingamount=orderTotal
            console.log(order.email ,"snnn",order.pendingamount)
            newTotal += orderTotal; // Add to total
          }
        });
      
    let hostelers=sortedMessages.filter(el=>el.hosteluser==true)
    // console.log(hostelers,"hhh")
    // console.log(sortedMessages,"soo")
        setfetchedarray(hostelers);
      });
      
      
      
      
      
      const b = query(collection(db, "hostelers"), orderBy("timestamp", "desc"));
      const unssubscribe = onSnapshot(b, (snapshot) => {
        sethostelarr(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
      
      return () => unsubscribe();
      
      
      
      
        }, []);

        useEffect(() => {
            hostelarr.forEach(el => {
              let email = el.email // Trim any extra spaces if needed
              // Log email to check for any unexpected characters
              console.log("Hostel Email:", el);
              let amountopending=0
              if (email) {
                let fikltt = fetchedarray.filter(order => {
                  
                  // Ensure that both `order.email` and `el.email` are trimmed and valid
                  const orderEmail = order.email ? order.email : null;
                //   console.log("Comparing:", orderEmail, "with", email); // Log both emails
          
                  return orderEmail === email && order.hosteluser;
                });
               
          
                // console.log(fikltt, "Filtered Orders");
          fikltt.forEach(mo=>{
amountopending+=mo.pendingamount??0
console.log(amountopending,"aammoyy",el.email,"annnn",mo.pendingamount)

          })

          if (fikltt.length>0) {
         console.log(fikltt,"ffffffff")
            setfilterer([...fikltt])
          }

                // If you want to check if there was any result
                if (fikltt.length === 0) {
                //   console.log("No matching orders found for email:", email);
                }
              } else {
              
                // console.log("No email found for hostel:", el);
              
              }

            el.totalpending=amountopending
            
            });
          }, [hostelarr, fetchedarray]); // added fetchedarray dependency to track updates
          
        useEffect(() => {
          console.log(filterer,"097089708768")
        }, [filterer])
        
  return (
    <div>
    <Typography variant="h4" gutterBottom>
      Hostel User Pending Amounts
    </Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Room Number</TableCell>
            <TableCell>Total Pending Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hostelarr.length > 0 ? (
            hostelarr.map((el) => (
              <TableRow key={el.id}>
                <TableCell>{el.email}</TableCell>
                <TableCell>{el.name}</TableCell>
                <TableCell>{el.department}</TableCell>
                <TableCell>{el.roomnum}</TableCell>
                <TableCell>{el.totalpending}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No hostel users available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </div>

  )
}

export default Showhostelerspricepoage