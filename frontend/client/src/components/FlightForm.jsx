const airports = [
  { code: "CPT", name: "Cape Town" },
  { code: "DUR", name: "Durban" },
  { code: "JNB", name: "Johannesburg" },
  { code: "PLZ", name: "Port Elizabeth" },
  { code: "ELS", name: "East London" },
  { code: "GRJ", name: "George" },
  { code: "ZNZ", name: "Zanzibar" },
];

function FlightForm({ form, setForm, onSearch }) {
  const searchDisabled = !form.origin || !form.destination || !form.date;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="origin" onChange={handleChange} value={form.origin}>
        <option value="">Origin</option>
        {airports.map((a) => (
          <option key={a.code} value={a.code}>
            {a.name} {a.code}
          </option>
        ))}
      </select>

      <select
        name="destination"
        onChange={handleChange}
        value={form.destination}
      >
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
        value={form.date}
        min={new Date().toISOString().split("T")[0]}
      />

      <button type="submit" disabled={searchDisabled}>
        Search
      </button>
    </form>
  );
}

export default FlightForm;
