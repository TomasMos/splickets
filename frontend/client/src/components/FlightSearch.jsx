import { useState } from "react";
import FlightForm from "./FlightForm";
import FlightResults from "./FlightResults";

function FlightSearch({ cart, setCart }) {
  const [form, setForm] = useState({ origin: "", destination: "", date: "" });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchFlights = async () => {
    setLoading(true);
    setHasSearched(true);
    const qs = new URLSearchParams(form).toString();
    const res = await fetch(`/api/search?${qs}`);
    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  const addToCart = (flight) => {
    setCart([...cart, flight]);
  };

  return (
    <>
      <FlightForm form={form} setForm={setForm} onSearch={searchFlights} />
      {loading && <p>Loading...</p>}
      <FlightResults
        results={results}
        loading={loading}
        hasSearched={hasSearched}
        addToCart={addToCart}
      />
    </>
  );
}

export default FlightSearch;
