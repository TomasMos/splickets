import AirportInput from "./AirportInput";

function FlightForm({ form, setForm, onSearch }) {
  const searchDisabled = !form.origin || !form.destination || !form.date;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit}>
      <AirportInput
        name="origin"
        value={form.origin}
        onSelect={handleSelect}
      />
      <AirportInput
        name="destination"
        value={form.destination}
        onSelect={handleSelect}
      />
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
