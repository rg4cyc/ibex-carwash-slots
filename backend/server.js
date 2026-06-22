const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const services = [
  {
    id: "service-exterior-wash",
    name: "Lavado exterior",
    available: true,
    reasonUnavailable: "",
  },
  {
    id: "service-interior-vacuum",
    name: "Aspirado interior",
    available: false,
    reasonUnavailable: "No disponible temporalmente: todavía no se cuenta con equipo de aspirado.",
  },
];

const slots = [
  {
    id: "slot-001",
    date: "2026-02-07",
    time: "09:00",
    durationMinutes: 30,
    location: "IBEX Community Carwash",
    capacity: 3,
    available: 3,
  },
  {
    id: "slot-002",
    date: "2026-02-07",
    time: "09:30",
    durationMinutes: 30,
    location: "IBEX Community Carwash",
    capacity: 3,
    available: 3,
  },
  {
    id: "slot-003",
    date: "2026-02-07",
    time: "10:00",
    durationMinutes: 30,
    location: "IBEX Community Carwash",
    capacity: 3,
    available: 3,
  },
  {
    id: "slot-004",
    date: "2026-02-07",
    time: "10:30",
    durationMinutes: 30,
    location: "IBEX Community Carwash",
    capacity: 3,
    available: 3,
  },
];

let bookings = [
  {
    id: "booking-demo-001",
    customerName: "Cliente demo",
    vehicle: "SUV gris",
    slotId: "slot-001",
    serviceId: "service-exterior-wash",
    notes: "Reserva de ejemplo para demostrar la tabla.",
    createdAt: new Date().toISOString(),
  },
];

function findSlot(slotId) {
  return slots.find((slot) => slot.id === slotId);
}

function findService(serviceId) {
  return services.find((service) => service.id === serviceId);
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

app.get("/api/services", (req, res) => {
  res.json({ data: services });
});

app.get("/api/slots", (req, res) => {
  updateAvailability();
  res.json({ data: slots });
});

app.get("/api/bookings", (req, res) => {
  res.json({ data: bookings });
});

app.post("/api/bookings", (req, res) => {
  const { customerName, vehicle, slotId, serviceId, notes } = req.body;

  if (!customerName || !vehicle || !slotId || !serviceId) {
    return res.status(400).json({
      error: "customerName, vehicle, slotId y serviceId son obligatorios.",
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

  const service = findService(serviceId);
  if (!service) {
    return res.status(404).json({ error: "El servicio seleccionado no existe." });
  }

  if (!service.available) {
    return res.status(409).json({
      error: service.reasonUnavailable || "El servicio seleccionado no está disponible.",
    });
  }

  const booking = {
    id: `booking-${Date.now()}`,
    customerName: customerName.trim(),
    vehicle: vehicle.trim(),
    slotId,
    serviceId,
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
