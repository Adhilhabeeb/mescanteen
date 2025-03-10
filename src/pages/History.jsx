import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../Firebase";
import { ourcontext } from "../main";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

function Historypage() {
  const { user } = useContext(ourcontext);
  const [filteredArr, setFilteredArr] = useState([]);
  const [fetchedArr, setFetchedArr] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "canteen"), orderBy("createdAt", "desc"), limit(50));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = QuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      fetchedMessages.forEach((el) => {
        el.createdAt = new Date(el.createdAt.seconds * 1000).toLocaleString();
      });

      setFetchedArr(fetchedMessages);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user && fetchedArr.length > 0) {
      const filteredData = fetchedArr.filter((e) => e.email === user.email);
      setFilteredArr(filteredData);
    }
  }, [user, fetchedArr]);

  const totalAmount = filteredArr.reduce((acc, order) => {
    const foods = JSON.parse(order.foods || "[]");
    return acc + foods.reduce((sum, food) => sum + (food.price * food.quantity || 0), 0);
  }, 0);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Foods</TableCell>
              <TableCell>Payment Type</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredArr.map((order) => {
              const foods = JSON.parse(order.foods || "[]");
              const orderTotal = foods.reduce((sum, food) => sum + (food.price * food.quantity || 0), 0);
              return (
                <TableRow key={order.id}>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>
                    {foods.map((food, index) => (
                      <div key={index}>{food.name} x {food.quantity}</div>
                    ))}
                  </TableCell>
                  <TableCell>{order.paymenttype}</TableCell>
                  <TableCell>{order.createdAt}</TableCell>
                  <TableCell>${orderTotal.toFixed(2)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Total Amount Spent: ${totalAmount.toFixed(2)}
      </Typography>
    </Container>
  );
}

export default Historypage;
