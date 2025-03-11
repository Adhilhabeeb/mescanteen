import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  MenuItem,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { doc, setDoc, arrayUnion, arrayRemove, getDocs, collection } from "firebase/firestore";
import { db } from "../Firebase"; // Ensure Firebase is initialized

const categories = ["breakfast", "lunch", "snacks", "specialfood"];

function AddDeclaredItems() {
  const [formData, setFormData] = useState({
    name: "",
    caloriesPerServing: "",
    cookTimeMinutes: "",
    cuisine: "",
    difficulty: "",
    image: "",
    category: "breakfast",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [foodItems, setFoodItems] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async () => {
    const { category, ...newItem } = formData;

    // Validation
    if (Object.values(newItem).some((val) => val.trim() === "")) {
      setMessage({ type: "error", text: "All fields are required!" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const categoryRef = doc(db, "foodCategories", category);
      await setDoc(
        categoryRef,
        { items: arrayUnion(newItem) },
        { merge: true }
      );

      setMessage({ type: "success", text: "Item added successfully!" });

      // Reset Form
      setFormData({
        name: "",
        caloriesPerServing: "",
        cookTimeMinutes: "",
        cuisine: "",
        difficulty: "",
        image: "",
        category: "breakfast",
      });

      fetchFoodItems(); // Refresh the list after adding
    } catch (error) {
      console.error("Error adding item:", error);
      setMessage({ type: "error", text: "Failed to add item." });
    } finally {
      setLoading(false);
    }
  };

  // Fetch All Food Items Grouped by Category
  const fetchFoodItems = async () => {
    try {
      const foodCategoriesRef = collection(db, "foodCategories");
      const snapshot = await getDocs(foodCategoriesRef);

      let categoryData = {};
      snapshot.forEach((doc) => {
        categoryData[doc.id] = doc.data().items || [];
      });

      setFoodItems(categoryData);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchFoodItems();
  }, []);

  // Handle Delete Item
  const handleDelete = async (category, item) => {
    if (!window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      return;
    }

    try {
      const categoryRef = doc(db, "foodCategories", category);
      await setDoc(
        categoryRef,
        { items: arrayRemove(item) },
        { merge: true }
      );

      fetchFoodItems(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add a New Food Item
      </Typography>

      {message && (
        <Typography color={message.type === "error" ? "error" : "green"} sx={{ mb: 2 }}>
          {message.text}
        </Typography>
      )}

      <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Calories Per Serving" name="caloriesPerServing" type="number" value={formData.caloriesPerServing} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Cook Time (Minutes)" name="cookTimeMinutes" type="number" value={formData.cookTimeMinutes} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Cuisine" name="cuisine" value={formData.cuisine} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Image URL" name="image" value={formData.image} onChange={handleChange} fullWidth margin="normal" />

      <TextField select label="Category" name="category" value={formData.category} onChange={handleChange} fullWidth margin="normal">
        {categories.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth disabled={loading} sx={{ mt: 2 }}>
        {loading ? <CircularProgress size={24} /> : "Add Item"}
      </Button>

      {/* Display Food Items in Table Format */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Food Items List:
      </Typography>

      {categories.map((category) => (
        <div key={category}>
          <Typography variant="h6" sx={{ mt: 3 }}>
            {category.toUpperCase()}
          </Typography>

          {foodItems[category] && foodItems[category].length > 0 ? (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Calories</TableCell>
                    <TableCell>Cook Time</TableCell>
                    <TableCell>Cuisine</TableCell>
                    <TableCell>Difficulty</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {foodItems[category].map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.caloriesPerServing}</TableCell>
                      <TableCell>{item.cookTimeMinutes} min</TableCell>
                      <TableCell>{item.cuisine}</TableCell>
                      <TableCell>{item.difficulty}</TableCell>
                      <TableCell>
                        {item.image ? (
                          <img src={item.image} alt={item.name} width="50" height="50" style={{ borderRadius: "8px" }} />
                        ) : (
                          "No Image"
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton color="error" onClick={() => handleDelete(category, item)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No items found in {category}.</Typography>
          )}
        </div>
      ))}
    </Container>
  );
}

export default AddDeclaredItems;
