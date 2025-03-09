import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ourcontext } from './main'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

function Food() {
    
   let {items,cart,setcart}=useContext(ourcontext)

console.log(items,cart,setcart)
useEffect(() => {
localStorage.setItem("cart",JSON.stringify(cart))
}, [cart])


let addcart=useCallback(e=>{
    let itemName = e.currentTarget.name;

    console.log(itemName,"iii")
let ar=cart.some(el=>{

   return el.name==itemName
})



if (ar) {
  
let newarr=cart.map(e=>{


    if (e.name==itemName) {
    return {name:e.name,quantity:e.quantity+1}
    }
    return e
})
setcart(newarr)



}else{

   
    setcart(prev=>{


      
      return[...prev,{
        name:e.target.name,quantity:1
      }]
    })
}

})

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
    {items.map((item, index) => (
      <Button   name={item}  id={item} onClick={addcart}
        key={index}
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
      >
        {item}
      </Button>
    ))}
  </div>
  )
}

export default Food
