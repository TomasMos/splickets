import { formatDuration, parseDuration } from "../utils/formatters";

function FlightResults({
  sortedResults,
  loading,
  hasSearched,
  addToCart,
  sortBy,
  setSortBy,
}) {
  if (!loading && hasSearched && sortedResults.length === 0) {
    return <p>No flights found for this search</p>;
  }

  return (
    <ul>
      <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
        <option value="asc price">Asc Price</option>
        <option value="desc price">Desc Price</option>
        <option value="asc duration">Asc Duration</option>
        <option value="desc duration">Desc Duration</option>
      </select>
      {sortedResults.map((f) => (
        <li key={f.id}>
          <div>
            <strong>{f.origin}</strong>→<strong>{f.destination}</strong>
          </div>
          <div>
            {new Date(f.depTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            –{" "}
            {new Date(f.arrTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div>{formatDuration(f.duration)}</div>
          <div>
            {f.stops === 0
              ? "Direct"
              : `${f.stops} stop${f.stops > 1 ? "s" : ""}`}
          </div>
          <div>Airline: {f.airline}</div>
          <img
            src={`https://content.airhex.com/content/logos/airlines_${f.airline}_60_60_s.png`}
            alt={f.airline}
          />
          <div>
            <strong>${f.price}</strong>
          </div>
          <button onClick={() => addToCart(f)}>Add to Cart</button>
        </li>
      ))}
    </ul>
  );
}

export default FlightResults;
