// components/CartManager.jsx
import { useState } from "react";
import Cart from "./Cart";

function CartManager({cart, setCart}) {

  const bookNow = async () => {
    if (cart.length === 0) {
      return alert(`You cannot book with an empty cart`);
    }

    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });

    const data = await res.json();
    alert(`Booking confirmed: ${data.bookingId}`);
    setCart([]);
  };

  return (
    <>
      <Cart cart={cart} setCart={setCart} />
      <button onClick={bookNow}>Book Now</button>
    </>
  );
}

export default CartManager;
