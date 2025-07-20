import { formatDuration, parseDuration } from "../utils/formatters";

function FlightResults({
  sortedResults,
  loading,
  hasSearched,
  addToCart,
  sortBy,
  setSortBy,
  cart,
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
      {sortedResults.map((f) => {
        const isInCart = cart.some((c) => c.id === f.id);
        return (
          <li
            key={f.id}
            className="transition-opacity duration-300 hover:opacity-80"
          >
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
            <button
              className={`text-gray-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${
                isInCart
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl cursor-pointer focus:ring-red-100 dark:focus:ring-red-400"
              }`}
              disabled={isInCart}
              onClick={() => addToCart(f)}
            >
              {isInCart ? "In Cart" : "Add to Cart"}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default FlightResults;
