import React, { useState, useEffect } from "react";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../Firebase";
import {
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";

function AddHostelers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phumber, setphumber] = useState("")
  const [location, setlocation] = useState("")
  const [hostelers, setHostelers] = useState([]);

  // Function to add a new hosteler
  async function addNewHosteler() {
    if (!name || !email) {
      alert("Invalid input!");
      return;
    }

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

    try {
      await addDoc(collection(db, "hostelers"), {
        name,
        email,location,phumber,
        joindate: today,
        timestamp: new Date(),
      });
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  // Fetch and listen to changes in Firestore
  useEffect(() => {
    const q = query(collection(db, "hostelers"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setHostelers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Add New Hosteler
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
           <TextField
          label="phnumber"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={phumber}
          onChange={(e) => setphumber(e.target.value)}
        />
          <TextField
          label="address&&location"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={location}
          onChange={(e) => setlocation(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "10px" }}
          onClick={addNewHosteler}
        >
          Add Hosteler
        </Button>
      </Paper>

      <Typography variant="h5" style={{ marginTop: "20px" }}>
        Hostelers List
      </Typography>
      <List>
        {hostelers.map((hosteler) => (
          <Paper key={hosteler.id} style={{ margin: "10px 0", padding: "10px" }}>
            <ListItem>
            <ListItemText
  primary={hosteler.name}
  secondary={
    <>
      <Typography variant="body2">Email: {hosteler.email}</Typography>
      <Typography variant="body2">Phone: {hosteler.phumber}</Typography>
      <Typography variant="body2">Location: {hosteler.location}</Typography>
      <Typography variant="body2">Joined: {hosteler.joindate}</Typography>
    </>
  }
/>

                
            </ListItem>
          </Paper>
        ))}
      </List>
    </Container>
  );
}

export default AddHostelers;
