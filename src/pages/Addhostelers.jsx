import React, { useState, useEffect, useRef } from "react";
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
  const [roomiderror, setroomiderror] = useState(false)
  const [roomnum, setroomnum] = useState("")
  const [department, setdepartment] = useState("")
  const [hostelers, setHostelers] = useState([]);
let roomidref=useRef()
  // Function to add a new hosteler
  async function addNewHosteler() {
    if (!name || !email ) {
      alert("Invalid input!");
      return;
    }
if (roomnum.length>3 ||  roomnum.length<3 ) {
 
  // roomidref.current.label="enter  3 digit number"
  setroomiderror(true)
  return
}else{
  setroomiderror(false)
}


let sta=hostelers.some(el=>el.email===email)
if (sta) {
  alert("alrady exusrt")
  return 
}
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

    try {
      await addDoc(collection(db, "hostelers"), {
        name,
        email,roomnum,phumber, department,
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
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={phumber}
          onChange={(e) => setphumber(e.target.value)}
        />
   <TextField
          label="Department"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
          value={department}
          onChange={(e) => setdepartment(e.target.value)}
        />

          <TextField
          label={roomiderror ?"enter a 3 digit number":"roomnumber"}
          type="email"
          variant="outlined"
          fullWidth
          sx={{border:roomiderror&& "1px solid red"}}
          margin="normal"
          ref={roomidref}
          value={roomnum}
          onChange={(e) =>{ setroomnum(e.target.value)}}
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
      <Typography variant="body2">roomnum: {hosteler.roomnum}</Typography>
      <Typography variant="body2">Joined: {hosteler.joindate}</Typography>
      <Typography variant="body2">Department: {hosteler.department}</Typography>

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
