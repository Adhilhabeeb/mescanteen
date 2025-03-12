
import { 
  collection, limit, onSnapshot, orderBy, query, doc, updateDoc ,where, getDocs, Timestamp
} from "firebase/firestore";



import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';



import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';

import FormControl from '@mui/material/FormControl';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useContext, useEffect, useState } from "react";
import { db } from "../Firebase";


function Filterrecentdata() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    useEffect(() => {
     callfetch(age)
    }, [age])
    

  const [filteredaray, setfilteredaray] = useState([])
      const [fetchedarray, setfetchedarray] = useState([]);
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
      // alert(newTotal)
        setfilteredaray(sortedMessages)
          setfetchedarray(sortedMessages);
        });
      
        return () => {
          unsubscribe();
        };
      }, []);



      useEffect(() => {
       console.log(filteredaray,"fgkhgvkhvb,n ")
      }, [filteredaray])
      
      async function getmonthsorders(months) {
        const today = new Date();
        const pastDate = new Date();
        pastDate.setMonth(today.getMonth() - months); // Get the date 3 months ago
    
        const startTimestamp = Timestamp.fromDate(pastDate);  // Convert JS Date to Firestore Timestamp
    
        const q = query(
            collection(db, "canteen"), 
            where("createdAt", ">=", startTimestamp)  // Get orders from the last 3 months
        );
    
        const querySnapshot = await getDocs(q);
        let orders = [];
        querySnapshot.forEach((doc) => {
            orders.push({ id: doc.id, ...doc.data() });
        });
    
        console.log(orders,"months order");
        setfilteredaray(orders)

        return orders;
    }
      

    async function getRecentWeekOrders() {
        const today = new Date();
        const pastDate = new Date();
        pastDate.setDate(today.getDate() - 1); // Get the date 7 days ago
    
        const startTimestamp = Timestamp.fromDate(pastDate);  // Convert JS Date to Firestore Timestamp
    
        const q = query(
            collection(db, "canteen"),
            where("createdAt", ">=", startTimestamp), // Get orders from the last 7 days
            orderBy("createdAt", "desc")  // Sort by newest first
        );
    
        const querySnapshot = await getDocs(q);
        let orders = [];
        querySnapshot.forEach((doc) => {
            orders.push({ id: doc.id, ...doc.data() });
        });
    
        console.log(orders ,"weekordrsss");
        setfilteredaray(orders)

        return orders;
    }

function callfetch(age) {
    switch (age) {
        case  "All":
            setfilteredaray(fetchedarray)
            break;
      case "Week":
          getRecentWeekOrders()
     
        break ;

        case "Month":
getmonthsorders(1)

        break ;
        case "Month":
            getmonthsorders(12)
            
                    break ;

        
        default:
            setfilteredaray(fetchedarray)
            break;
    }
}

  return (
  <>

<FormControl  sx={{ m: 5, minWidth: 150,width:"80%" }}>
<Select  
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={"All"}>All</MenuItem>
          <MenuItem value={"Week"}>Week</MenuItem>
          <MenuItem value={"Month"}>Month</MenuItem>
          <MenuItem value={"Year"}>Year</MenuItem>
        </Select>
</FormControl>
  
    
    <div>Filterrecentdata</div>

    {/* { filteredaray.length>0 && filteredaray?.map((el,ind)=>(
<>   


</>
    
    ))} */}

<TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Payment Type</TableCell>
                            <TableCell>Foods Ordered</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredaray.length > 0 ? (
                            filteredaray.map((el, index) =>

                              {

                                let date;
                                if ( typeof el.createdAt =="object") {
                                  const timestamp = el.createdAt;
                                  // console.log(timestamp,"9999999")

 date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
console.log(date.toLocaleString(),"jkhkdjbfckqdvcknvancvxan,vc,nxavc,nvax,ncv,nxvc,nxa,ncv,naxc"); // Format it to a readable date-time


                                }
                         

                             return    (
                                  <TableRow key={el.name}>
                                      <TableCell>{index + 1}</TableCell>
                                      <TableCell>{el.email}</TableCell>
                                      <TableCell>{el.createdAt ?`${ typeof el.createdAt =="string"?el.createdAt:date.toLocaleString()}` : "N/A"}</TableCell>
                                      
                                      <TableCell>{el.paymenttype}</TableCell>
                                      <TableCell>
                                          {el.foods ? JSON.parse(el.foods).map(food => food.name).join(", ") : "N/A"}
                                      </TableCell>
                                  </TableRow>
                              )
                              }
                               )
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No Data Available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
  </>
  )
}

export default Filterrecentdata