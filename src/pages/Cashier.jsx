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
  const [openRows, setOpenRows] = useState({}); // Track which row is open

  useEffect(() => {
    if (tokennum.trim() === "") {
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
    }
  }, [tokennum]);

  const markAsPaid = async (orderId) => {
    const orderRef = doc(db, "canteen", orderId);
    await updateDoc(orderRef, { done: true });
    window.location.reload();
  };

  function searchbtn() {
    if (tokennum.trim() === "") {
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
    } else {
      let filteredOrders = fetchedarray.filter((el) => el.uid == tokennum);
      setfetchedarray(filteredOrders);
    }
  }

  const toggleRow = (id) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "auto", textAlign: "center", p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Cashier Dashboard
      </Typography>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 2 }}>
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
              <TableCell />
              <TableCell>
                <strong>No</strong>
              </TableCell>
              <TableCell>
                <strong>Token</strong>
              </TableCell>
              <TableCell>
                <strong>Payment Status</strong>
              </TableCell>
              <TableCell>
                <strong>Action</strong>
              </TableCell>
              <TableCell>
                <strong>Hostler</strong>
              </TableCell>
              <TableCell>
                <strong>Amount</strong>
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
                      <TableCell>
                        <IconButton onClick={() => toggleRow(order.id)}>
                          {openRows[order.id] ? (
                            <KeyboardArrowUp />
                          ) : (
                            <KeyboardArrowDown />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{order.uid}</TableCell>
                      <TableCell>
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
                      <TableCell>
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
                      <TableCell>
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
                      <TableCell>₹{orderTotal}</TableCell>
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
                                  <TableCell>Image</TableCell>
                                  <TableCell>Item</TableCell>
                                  <TableCell>Quantity</TableCell>
                                  <TableCell>Price</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {foods.map((food, idx) => (
                                  <TableRow key={idx}>
                                    <TableCell>
                                      <img
                                        src={food.image}
                                        alt={food.name}
                                        style={{ width: 50, height: 50, borderRadius: 5 }}
                                      />
                                    </TableCell>
                                    <TableCell>{food.name}</TableCell>
                                    <TableCell>{food.quantity}</TableCell>
                                    <TableCell>₹{food.price * food.quantity}</TableCell>
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
