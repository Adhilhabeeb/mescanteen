import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../Firebase";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  Collapse,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

function Cashier() {
  const [tokennum, settokennum] = useState("");
  const [fetchedarray, setfetchedarray] = useState([]);
  const [openRows, setOpenRows] = useState({});

  useEffect(() => {
    const q = query(
      collection(db, "canteen"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedOrders = [];

      QuerySnapshot.forEach((doc) => {
        fetchedOrders.push({ ...doc.data(), id: doc.id });
      });

      fetchedOrders.forEach((el) => {
        el.createdAt = new Date(el.createdAt.seconds * 1000).toLocaleString();
      });

      setfetchedarray(fetchedOrders);
    });

    return () => unsubscribe();
  }, []);

  const markAsPaid = async (orderId) => {
    const orderRef = doc(db, "canteen", orderId);
    await updateDoc(orderRef, { done: true });
    window.location.reload();
  };

  const searchbtn = () => {
    if (tokennum.trim() === "") {
      return;
    }
    const filteredOrders = fetchedarray.filter((el) => el.uid === tokennum);
    setfetchedarray(filteredOrders);
  };

  const toggleRow = (id) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", textAlign: "center", p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Cashier Dashboard
      </Typography>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 3 }}>
        <TextField
          label="Search by Token Number"
          variant="outlined"
          value={tokennum}
          onChange={(e) => settokennum(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={searchbtn}>
          Search
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell align="center" sx={{ width: "5%" }}>
                #
              </TableCell>
              <TableCell align="center" sx={{ width: "10%" }}>
                Token
              </TableCell>
              <TableCell align="center" sx={{ width: "15%" }}>
                Payment Status
              </TableCell>
              <TableCell align="center" sx={{ width: "15%" }}>
               
              </TableCell>
              <TableCell align="center" sx={{ width: "10%" }}>
                Details
              </TableCell>
              <TableCell align="center" sx={{ width: "10%" }}>
                Hostler
              </TableCell>
              <TableCell align="center" sx={{ width: "15%" }}>
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fetchedarray.length > 0 ? (
              fetchedarray.map((order, index) => {
                let foods = JSON.parse(order.foods);
                let orderTotal = foods.reduce(
                  (sum, food) => sum + food.price * food.quantity,
                  0
                );

                return (
                  <React.Fragment key={order.id}>
                    <TableRow>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{order.uid}</TableCell>
                      <TableCell align="center">
                        {order.done ? (
                          <Typography color="green">
                            <CheckCircleIcon sx={{ verticalAlign: "middle" }} />{" "}
                            Paid
                          </Typography>
                        ) : (
                          <Typography color="error">
                            <PendingActionsIcon
                              sx={{ verticalAlign: "middle" }}
                            />{" "}
                            Pending
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {!order.done && (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => markAsPaid(order.id)}
                          >
                            Mark as Paid
                          </Button>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => toggleRow(order.id)}>
                          {openRows[order.id] ? (
                            <KeyboardArrowUp />
                          ) : (
                            <KeyboardArrowDown />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        {order.hosteluser ? (
                          <Button variant="contained" color="success">
                            Hosteler
                          </Button>
                        ) : (
                          <Button variant="contained" color="error">
                            Not
                          </Button>
                        )}
                      </TableCell>
                      <TableCell align="center">₹{orderTotal}</TableCell>
                    </TableRow>

                    {/* Collapsible Row for Food Items */}
                    <TableRow>
                      <TableCell colSpan={7} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                        <Collapse in={openRows[order.id]} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 2 }}>
                            <Typography variant="h6">Ordered Items</Typography>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell align="center">Image</TableCell>
                                  <TableCell align="center">Item</TableCell>
                                  <TableCell align="center">Quantity</TableCell>
                                  <TableCell align="center">Price</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {foods.map((food, idx) => (
                                  <TableRow key={idx}>
                                    <TableCell align="center">
                                      <img
                                        src={food.image}
                                        alt={food.name}
                                        style={{
                                          width: 50,
                                          height: 50,
                                          borderRadius: 5,
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell align="center">{food.name}</TableCell>
                                    <TableCell align="center">{food.quantity}</TableCell>
                                    <TableCell align="center">₹{food.price * food.quantity}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No Orders Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Cashier;
