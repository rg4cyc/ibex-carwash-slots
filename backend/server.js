const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const slots = [
  {
    id: "slot-001",
    date: "2026-02-07",
    time: "09:00",
    location: "IBEX Community Carwash",
    service: "Lavado exterior",
    capacity: 3,
    available: 3,
  },
  {
    id: "slot-002",
    date: "2026-02-07",
    time: "10:30",
    location: "IBEX Community Carwash",
    service: "Lavado exterior + aspirado",
    capacity: 2,
    available: 2,
  },
  {
    id: "slot-003",
    date: "2026-02-07",
    time: "12:00",
    location: "IBEX Community Carwash",
    service: "Lavado premium",
    capacity: 2,
    available: 2,
  },
];

let bookings = [
  {
    id: "booking-demo-001",
    customerName: "Cliente demo",
    vehicle: "SUV gris",
    slotId: "slot-001",
    notes: "Reserva de ejemplo para demostrar la tabla.",
    createdAt: new Date().toISOString(),
  },
];

function findSlot(slotId) {
  return slots.find((slot) => slot.id === slotId);
}

function updateAvailability() {
  slots.forEach((slot) => {
    const used = bookings.filter((booking) => booking.slotId === slot.id).length;
    slot.available = Math.max(slot.capacity - used, 0);
  });
}

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "IBEX Carwash Slots API",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/slots", (req, res) => {
  updateAvailability();
  res.json({ data: slots });
});

app.get("/api/bookings", (req, res) => {
  res.json({ data: bookings });
});

app.post("/api/bookings", (req, res) => {
  const { customerName, vehicle, slotId, notes } = req.body;

  if (!customerName || !vehicle || !slotId) {
    return res.status(400).json({
      error: "customerName, vehicle y slotId son obligatorios.",
    });
  }

  updateAvailability();
  const slot = findSlot(slotId);

  if (!slot) {
    return res.status(404).json({ error: "El slot seleccionado no existe." });
  }

  if (slot.available <= 0) {
    return res.status(409).json({ error: "El slot seleccionado ya no tiene cupo." });
  }

  const booking = {
    id: `booking-${Date.now()}`,
    customerName: customerName.trim(),
    vehicle: vehicle.trim(),
    slotId,
    notes: notes ? notes.trim() : "",
    createdAt: new Date().toISOString(),
  };

  bookings = [booking, ...bookings];
  updateAvailability();

  res.status(201).json({
    message: "Reserva creada correctamente.",
    data: booking,
  });
});

app.delete("/api/bookings/:id", (req, res) => {
  const { id } = req.params;
  const exists = bookings.some((booking) => booking.id === id);

  if (!exists) {
    return res.status(404).json({ error: "La reserva no existe." });
  }

  bookings = bookings.filter((booking) => booking.id !== id);
  updateAvailability();

  res.json({
    message: "Reserva eliminada correctamente.",
    deletedId: id,
  });
});

app.listen(PORT, () => {
  console.log(`IBEX Carwash Slots API running on http://localhost:${PORT}`);
});
