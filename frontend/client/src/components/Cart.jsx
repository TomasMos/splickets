function Cart({ cart, setCart }) {
  const removeFromCart = (id) => {
    setCart(cart.filter((f) => f.id !== id));
  };

  return (
    <>
      <h2>Cart</h2>
      <ul>
        {cart.map((f, idx) => (
          <li key={idx}>
            {f.origin} → {f.destination} on {f.date} - ${f.price}
            <button onClick={() => removeFromCart(f.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Cart;
