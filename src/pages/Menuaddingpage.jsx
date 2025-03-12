import { useContext, useEffect, useState } from "react";
import { Button, Card, Typography, Grid, Stack, Container } from "@mui/material";
import { CheckCircle, Circle } from "@mui/icons-material"; // Icons for tick and untick
// import { declaredmenuitems } from "./dat"; // Import menu data
import { collection, addDoc, getDocs, deleteDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { ourcontext } from "../main";
export default function MenuList() {

    let {admin ,hoste,cashier,user,openmenuadd,setopenmenuadd,setcartempty,cartempty}  =useContext(ourcontext)
  const [declaredmenuitems, setdeclaredmenuitems] = useState({})
  const [selectedDishes, setSelectedDishes] = useState(new Set());
  const [breakfstar, setbreakfstar] = useState([])
  const [luncharr, setluncharr] = useState([])
  const [specialsarr, setspecialsarr] = useState([])
  const [snackarr, setsnackarr] = useState([])
const [sentitems, setsentitems] = useState({
  breakfast:[],
  lunch:[],
  specialFoods:[],
  snacks:[]
})

const [menuItem, setMenuItem] = useState("");
  const [menuList, setMenuList] = useState([]);
  async function fetchMenuItemexps() {
    const querySnapshot = await getDocs(collection(db, "foodCategories"));
    const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    let arrnnnn=[]
// console.log(items,"oiii")
let obj={}
items.forEach(el=>{
let {id,items}=el
// console.log(id,items,"uu")
obj[id]=items
})

// console.log(obj,"9890789698769769767965795t795t975")
setdeclaredmenuitems(obj)

  }
  useEffect(() => {
    fetchMenuItemexps()
    
    checkAndResetMenus(); // Reset menu if it's a new day
    fetchMenuItems(); // Fetch menu items
  }, []);

  // Fetch menu items from Firebase
  const fetchMenuItems = async () => {
    const querySnapshot = await getDocs(collection(db, "menus"));
    const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    console.log(items,":oyyeyeyey")
   if (items.length>0) {
    // alert("hhh")
    setMenuList(items);

 
    // setbreakfstar(items[0].breakfast)
    // setluncharr(items[0].lunch)
    // setsnackarr(items[0].snacks)
    // setspecialsarr(items[0].specialFoods)
    let mm={
      breakfast:items[0].breakfast,
      lunch:items[0].lunch,
      snacks:items[0].snacks,
      specialFoods:items[0].specialFoods
    }
  
    let farr=[]
  //   Object.values(mm).forEach(el=>{
  //  el.forEach(emm=>{
  //   setSelectedDishes((prev) => {
  //     const newSelection = new Set(prev);
  //     if (newSelection.has(emm.name)) {
  //       newSelection.delete(emm.name); // Remove if already selected
  //     } else {
  //       newSelection.add(emm.name); // Add if not selected
  //     }
  //     return newSelection;
  //   });
  //  })
  
  
  //   })
   }

 

  };

  // Add menu item to Firebase
  const addMenuItem = async () => {
    if (!breakfstar.length && !luncharr.length && !specialsarr.length && !snackarr.length) {
      alert("Please select the dishes");
      return;
    }
  
    const today = new Date().toISOString().split("T")[0]; // Get today's date
    const menuRef = collection(db, "menus"); // Reference to the menus collection
    const querySnapshot = await getDocs(menuRef);
  
    let existingMenuId = null;
  
    // Check if a menu already exists for today
    querySnapshot.forEach((doc) => {
      if (doc.data().createdAt.startsWith(today)) {
        existingMenuId = doc.id;
      }
    });
  
    const menuData = {
      ...sentitems,
      createdAt: new Date().toISOString(),
    };
  
    if (existingMenuId) {
      // Update existing document
      await setDoc(doc(db, "menus", existingMenuId), menuData, { merge: true });
      console.log("Menu updated!");
    } else {
      // Add new document
      await addDoc(menuRef, menuData);
      console.log("New menu added!");
    }
  
    setopenmenuadd(!openmenuadd);
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
  const handleToggle = (dish) => {
    setSelectedDishes((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(dish.name)) {
        newSelection.delete(dish.name); // Remove if already selected
      } else {
        newSelection.add(dish.name); // Add if not selected
      }
      return newSelection;
    });
  };
  


  useEffect(() => {
  
    setsentitems({
      breakfast:breakfstar,
  lunch:luncharr,
  specialFoods:specialsarr,
  snacks:snackarr
    })

  // console.log(breakfstar,luncharr,specialsarr,snackarr,"arrayssettingvaues")
  }, [breakfstar,luncharr,specialsarr,snackarr])
  

  useEffect(() => {
    

    console.log(sentitems,"senttt")
  }, [sentitems])
  

  function addmenuusent(category, item) {
    let exists = false;
  
    switch (category) {
      case "breakfast":
        exists = breakfstar.some((dish) => dish.name === item.name);
        if (!exists) setbreakfstar([...breakfstar, item]);
        break;
  
      case "lunch":
        exists = luncharr.some((dish) => dish.name === item.name);
        if (!exists) setluncharr([...luncharr, item]);
        break;
  
      case "specialFoods":
        exists = specialsarr.some((dish) => dish.name === item.name);
        if (!exists) setspecialsarr([...specialsarr, item]);
        break;
  
      case "snacks":
        exists = snackarr.some((dish) => dish.name === item.name);
        if (!exists) setsnackarr([...snackarr, item]);
        break;
  
      default:
        break;
    }
  
    if (exists) {
      alert(`${item.name} is already in the menu.`);
    }
  }
  

  useEffect(() => {
  

    // console.log(selectedDishes,"selectedDishesselectedDishesselectedDishes")
  }, [selectedDishes])
  
  return (
    <Container>
      {Object.entries(declaredmenuitems).map(([category, items]) => (
        <div key={category}>
          <Typography variant="h5" sx={{ mt: 2, mb: 1, fontWeight: "bold", textTransform: "capitalize" }}>
            {category.replace(/([A-Z])/g, " $1")} {/* Format category names */}
          </Typography>
          <Grid container spacing={2}>
            {items.map((dish) => (
              <Grid item xs={12} sm={6} md={4} key={dish.id}>
                <Card sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <img src={dish.image} alt={dish.name} width={100} />
                  <Typography variant="h6">{dish.name}</Typography>
                  <Button variant="outlined" onClick={() => {
  handleToggle(dish);
  addmenuusent(category, dish);
}} sx={{ mt: 1 }}>
  {selectedDishes.has(dish.name) ? <CheckCircle /> : <Circle />} Select
</Button>

                </Card>
              </Grid>
            ))}
          </Grid>
         
        </div>
      ))}
       <Button   variant="contained" onClick={addMenuItem}>

sent our dishes
</Button>
    </Container>
  );
}

