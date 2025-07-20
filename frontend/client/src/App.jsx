import "./App.css";
import { useEffect, useState } from "react";
import FlightSearch from "./components/FlightSearch";
import CartManager from "./components/CartManager";

function App() {
  const [cart, setCart] = useState([]);

useEffect(() => {
  const savedCart = localStorage.getItem("splickets_cart");

  if (savedCart) {
    try {
      const parsed = JSON.parse(savedCart);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setCart(parsed);
        console.log("Cart restored from storage:", parsed);
      }
    } catch (e) {
      console.error("Failed to parse saved cart:", e);
    }
  }
}, []);


  useEffect(() => {
    console.log("Saving");
    
    localStorage.setItem("splickets_cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="bg-amber-300">
      <h1 className="text-emerald-600 text-2xl">Splickets Alpha</h1>
      <FlightSearch cart={cart} setCart={setCart} />
      <CartManager cart={cart} setCart={setCart} />
    </div>
  );
}

export default App;
