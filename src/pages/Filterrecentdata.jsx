
import { 
  collection, limit, onSnapshot, orderBy, query, doc, updateDoc ,where, getDocs, Timestamp
} from "firebase/firestore";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
  
    
    <div>Filterrecentdata</div>

    { filteredaray.length>0 && filteredaray?.map((el,ind)=>(
<>   
{`   ${ind+1}  is  the  ${ el.email}` }  <br/>

</>
    
    ))}
  </>
  )
}

export default Filterrecentdata