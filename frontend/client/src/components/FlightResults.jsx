function FlightResults({ results, loading, hasSearched, addToCart }) {
  if (!loading && hasSearched && results.length === 0) {
    return <p>No flights found for this search</p>;
  }

  return (
    <ul>
      {results.map((f) => (
        <li key={f.id}>
          {f.origin} → {f.destination} on {f.date} – ${f.price}
          <button onClick={() => addToCart(f)}>Add to Cart</button>
        </li>
      ))}
    </ul>
  );
}

export default FlightResults;
