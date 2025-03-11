import React, { useEffect, useState } from "react";

import { collection, addDoc, getDocs, deleteDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";

function MenuAddingPage() {
  const [menuItem, setMenuItem] = useState("");
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    checkAndResetMenus(); // Reset menu if it's a new day
    fetchMenuItems(); // Fetch menu items
  }, []);

  // Fetch menu items from Firebase
  const fetchMenuItems = async () => {
    const querySnapshot = await getDocs(collection(db, "menus"));
    const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setMenuList(items);
  };

  // Add menu item to Firebase
  const addMenuItem = async () => {
    if (menuItem.trim() === "") return;

    await addDoc(collection(db, "menus"), {
      name: menuItem,
      createdAt: new Date().toISOString(),
    });

    setMenuItem(""); // Clear input
    fetchMenuItems(); // Refresh menu list
  };

  // Check and reset menu if it's a new day
  const checkAndResetMenus = async () => {
    const today = new Date().toISOString().split("T")[0];
    const settingsRef = doc(db, "config", "resetDate");

    const settingsSnap = await getDoc(settingsRef);
    const lastReset = settingsSnap.exists() ? settingsSnap.data().lastReset : null;

    if (lastReset !== today) {
      // Delete all menu items
      const menuRef = collection(db, "menus");
      const menuSnapshot = await getDocs(menuRef);
      menuSnapshot.forEach(async (docData) => {
        await deleteDoc(doc(db, "menus", docData.id));
      });

      console.log("Menu cleared for the new day!");

      // Update the last reset date
      await setDoc(settingsRef, { lastReset: today });

      setMenuList([]); // Update UI
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Menu Adding Page</h2>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Enter menu item"
        value={menuItem}
        onChange={(e) => setMenuItem(e.target.value)}
      />
      <button onClick={addMenuItem}>Add Item</button>

      {/* Display Menu List */}
      <ul>
        {menuList.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MenuAddingPage;
