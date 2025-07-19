import { useState, useEffect } from "react";
import FlightForm from "./FlightForm";
import FlightResults from "./FlightResults";
import { formatDuration, parseDuration } from "../utils/formatters";

function FlightSearch({ cart, setCart }) {
  const [form, setForm] = useState({ origin: "", destination: "", date: "" });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [sortBy, setSortBy] = useState("asc price");

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === "asc price") return a.price - b.price;
    if (sortBy === "desc price") return b.price - a.price;
    if (sortBy === "asc duration")
      return parseDuration(a.duration) - parseDuration(b.duration);
    if (sortBy === "desc duration")
      return parseDuration(b.duration) - parseDuration(a.duration);
    return 0;
  });

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
        sortedResults={sortedResults}
        loading={loading}
        hasSearched={hasSearched}
        sortBy={sortBy}
        setSortBy={setSortBy}
        addToCart={addToCart}
      />
    </>
  );
}

export default FlightSearch;
