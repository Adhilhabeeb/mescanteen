import React, { useContext, useEffect,useState } from "react";
import html2canvas from "html2canvas";
import { ourcontext } from "../main";
import "./Tokenpage.css"; // Import the CSS file

const TokenPage = () => {
  const { token ,settoken} = useContext(ourcontext);
const [loadtoken, setloadtoken] = useState([])
useEffect(() => {
  

// if ( JSON.parse(localStorage.getItem("token"))) {
//     settoken( JSON.parse(localStorage.getItem("token")))
// }

// console.log(token,"frstokem")

 console.log(token,"tokennn")
}, [])


// useEffect(() => {
  

// //  console.log(token,"yytttt")


// }, [token])

// useEffect(() => {


// }, [loadtoken])


  const handleDownload = () => {
    const captureElement = document.getElementById("tokenContainer");

    // Force colors to avoid oklch() issues
    captureElement.style.color = "rgb(0, 0, 0)";
    captureElement.style.backgroundColor = "rgb(255, 255, 255)";

    setTimeout(() => {
      html2canvas(captureElement, { scale: 2, useCORS: true }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "token.png";
        link.click();
      });
    }, 500);
  };

  return (
    <div className="container">
      <div id="tokenContainer" className="token-container">
        <h2>User Token</h2>
        <p><strong>UID:</strong> {token.uid}</p>
        <p><strong>Email:</strong> {token.email}</p>

        <div className="food-list">
          <h3>Ordered Foods:</h3>
          <ul>
            {JSON.parse(token.foods).map((food, index) => (
              <li key={index} className="food-item">
                <img src={food.image} alt={food.name} />
                <div>
                  <p className="food-name">{food.name}</p>
                  <p className="food-quantity">Qty: {token.paymenttype=="online"  &&food.quantity>1?food.quantity:food.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p><strong>Created At:</strong> {new Date().toLocaleString()}</p>
      </div>

      <button onClick={handleDownload} className="download-btn">
        Download as Image
      </button>
    </div>
  );
};

export default TokenPage;
