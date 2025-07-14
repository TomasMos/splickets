import "./App.css";
// import debounce from lodash.debounce
import { useEffect, useState } from "react";

function App() {
  const [form, setForm] = useState({ origin: "", destination: "", date: "" });
  const [results, setResults] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const searchDisabled = !form.origin || !form.destination || !form.date

  const airports = [
    { code: "CPT", name: "Cape Town" },
    { code: "DUR", name: "Durban" },
    { code: "JNB", name: "Johannesburg" },
    { code: "PLZ", name: "Port Elizabeth" },
    { code: "ELS", name: "East London" },
    { code: "GRJ", name: "George" },
    { code: "ZNZ", name: "Zanzibar" },
  ];

  const updateCart = (f) => {
    setCart([...cart, f]);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    setHasSearched(true);

    e.preventDefault();
    const qs = new URLSearchParams(form).toString();
    const res = await fetch(`/api/search?${qs}`);
    const data = await res.json();
    setResults(data);
    console.log(results);
    setLoading(false);
  };

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
    <div>
      <h1>Splickets Alpha (Vite + React)</h1>
      <form onSubmit={handleSubmit}>
        <select name="origin" onChange={handleChange}>
          <option value="">Origin</option>
          {airports.map((a) => (
            <option key={a.code} value={a.code}>
              {a.name} {a.code}
            </option>
          ))}
        </select>
        <select name="destination" onChange={handleChange}>
          <option value="">Destination</option>
          {airports.map((a) => (
            <option key={a.code} value={a.code}>
              {a.name} {a.code}
            </option>
          ))}
        </select>
        <input
          name="date"
          type="date"
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
        />
        <button type="submit" disabled={searchDisabled}>Search</button>
      </form>
      {loading && <p>Loading...</p>}
      <ul>
        {results.map((f) => (
          <li key={f.id}>
            {f.origin} → {f.destination} on {f.date} – ${f.price}
            <button onClick={() => updateCart(f)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      {!loading && results.length === 0 && hasSearched && (
        <p>No flights found for this search</p>
      )}
      <h2>Cart</h2>
      <ul>
        {cart.map((f, idx) => (
          <li key={idx}>
            {f.origin} → {f.destination} on {f.date} - ${f.price}
            <button
              onClick={() => {
                setCart(cart.filter((flight) => flight.id !== f.id));
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => bookNow()}>Book Now</button>
    </div>
  );
}

export default App;
