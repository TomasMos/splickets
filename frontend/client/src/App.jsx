import "./App.css";
import { useState } from "react";
import FlightSearch from "./components/FlightSearch";
import CartManager from "./components/CartManager";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <div>
      <h1>Splickets Alpha</h1>
      <FlightSearch cart={cart} setCart={setCart} />
      <CartManager cart={cart} setCart={setCart} />
    </div>
  );
}

export default App;
