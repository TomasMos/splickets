import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Amadeus from "amadeus";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// initialise amadeus
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

// Location autocomplete
app.get("/api/autocomplete", async (req, res) => {
  const { keyword } = req.query;

  try {
    const response = await amadeus.referenceData.locations.get({
      keyword,
      subType: "CITY,AIRPORT",
      page: { limit: 5 },
    });

    console.log(response);
    

    const results = response.data.map((loc) => ({
      code: loc.iataCode,
      name: loc.name,
      city: loc.address.cityName,
      type: loc.subType
    }));
    res.json(results);
  } catch (error) {
    console.log("Error has occured");
    res.status(500).json({ error: "Autocomplete failed" });
  }
});

// Search available flights via Amadeus
app.get("/api/search", async (req, res) => {
  const { origin, destination, date } = req.query;

  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: date,
      adults: 1,
      max: 5,
    });
    const results = response.data.map((item, index) => {
      const firstSegment = item.itineraries[0].segments[0];
      const lastSegment = item.itineraries[0].segments.at(-1);

      return {
        id: index,
        origin: firstSegment.departure.iataCode,
        destination: firstSegment.arrival.iataCode,
        depTime: firstSegment.departure.at,
        arrTime: lastSegment.arrival.at,
        duration: item.itineraries[0].duration,
        stops: item.itineraries[0].segments.length - 1,
        date: firstSegment.departure.at.split("T")[0],
        price: item.price.total,
        airline: item.validatingAirlineCodes?.[0] || "N/A",
      };
    });
    res.json(results);
  } catch (error) {
    console.error("Amadeus error:", error);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
});

// Fake booking route
app.post("/api/book", (req, res) => {
  const bookingId = "BOOK - " + Math.floor(Math.random() * 10000);
  res.json({ success: true, bookingId });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
