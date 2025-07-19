// components/AirportInput.jsx
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";

function AirportInput({ name, value, onSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = debounce(async (q) => {
    if (q.length < 2) {
      setSuggestions([]);
      return;
    }
    const res = await fetch(`/api/autocomplete?keyword=${q}`);
    const data = await res.json();
    setSuggestions(data);
  }, 300);

  useEffect(() => {
    fetchSuggestions(query);
    return fetchSuggestions.cancel;
  }, [query]);

  return (
    <div style={{ position: "relative" }}>
      <input
        name={name}
        placeholder={`Enter airport...`}
        value={value}
        onChange={(e) => {
          setQuery(e.target.value);
          onSelect(name, e.target.value);
        }}
        autoComplete="off"
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            background: "white",
            border: "1px solid #ccc",
            width: "100%",
            maxHeight: "150px",
            overflowY: "auto",
            zIndex: 1000,
            padding: 0,
            margin: 0,
            listStyle: "none",
          }}
        >
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => {
                onSelect(name, s.code);
                setQuery("");
                setSuggestions([]);
              }}
              style={{ padding: "8px", cursor: "pointer" }}
            >
              {s.type} – {s.name} ({s.code})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AirportInput;
