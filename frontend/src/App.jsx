import { useEffect, useMemo, useState } from "react";
import {
  createBooking,
  deleteBooking,
  getBookings,
  getSlots,
} from "./services/api";
import "./styles/main.css";

const initialForm = {
  customerName: "",
  vehicle: "",
  slotId: "",
  notes: "",
};

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Ir al inicio">
        <span className="brand-mark">IB</span>
        <span>
          <strong>IBEX Carwash Slots</strong>
          <small>Formación prelaboral con impacto social</small>
        </span>
      </a>

      <nav className="nav-links" aria-label="Navegación principal">
        <a href="#programa">Programa</a>
        <a href="#slots">Slots</a>
        <a href="#reservas">Reservas</a>
      </nav>
    </header>
  );
}

function HeroSection({ onOpenModal }) {
  return (
    <section className="hero" id="inicio">
      <div className="hero-content">
        <p className="eyebrow">Tecnología + comunidad + aprendizaje</p>
        <h1>Agenda slots de lavado de autos para prácticas prelaborales.</h1>
        <p className="hero-copy">
          IBEX Carwash Slots organiza horarios, clientes y servicios para que
          adolescentes practiquen puntualidad, atención al cliente y trabajo en
          equipo en un entorno supervisado.
        </p>

        <div className="hero-actions">
          <a className="button primary" href="#slots">
            Ver slots disponibles
          </a>
          <button className="button secondary" type="button" onClick={onOpenModal}>
            ¿Cómo funciona?
          </button>
        </div>
      </div>

      <aside className="hero-panel" aria-label="Resumen del programa">
        <div>
          <span className="metric">3</span>
          <p>slots activos</p>
        </div>
        <div>
          <span className="metric">7</span>
          <p>lugares disponibles</p>
        </div>
        <div>
          <span className="metric">100%</span>
          <p>flujo responsivo</p>
        </div>
      </aside>
    </section>
  );
}

function ImpactCards() {
  const cards = [
    {
      title: "Habilidades laborales",
      text: "Los participantes practican asistencia, servicio, seguimiento de instrucciones y responsabilidad.",
    },
    {
      title: "Operación clara",
      text: "Los clientes identifican horarios disponibles y registran su vehículo en pocos pasos.",
    },
    {
      title: "Modelo escalable",
      text: "El prototipo puede crecer hacia login, asistencia, pagos, remuneraciones y reportes.",
    },
  ];

  return (
    <section className="section" id="programa">
      <div className="section-heading">
        <p className="eyebrow">UI/UX centrado en usuarios reales</p>
        <h2>Un flujo simple para clientes y coordinadores.</h2>
      </div>

      <div className="card-grid">
        {cards.map((card) => (
          <article className="info-card" key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SlotList({ slots, selectedSlotId, onSelectSlot }) {
  return (
    <section className="section" id="slots">
      <div className="section-heading">
        <p className="eyebrow">Disponibilidad</p>
        <h2>Selecciona un horario de servicio.</h2>
      </div>

      <div className="slot-grid">
        {slots.map((slot) => (
          <button
            className={`slot-card ${selectedSlotId === slot.id ? "selected" : ""}`}
            key={slot.id}
            type="button"
            onClick={() => onSelectSlot(slot.id)}
          >
            <span className="slot-date">{slot.date}</span>
            <strong>{slot.time}</strong>
            <span>{slot.service}</span>
            <small>{slot.location}</small>
            <span className={slot.available > 0 ? "badge" : "badge danger"}>
              {slot.available > 0
                ? `${slot.available} lugares disponibles`
                : "Sin cupo"}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function BookingForm({ form, setForm, slots, onSubmit, loading }) {
  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  return (
    <section className="section form-section" aria-labelledby="booking-title">
      <div className="section-heading">
        <p className="eyebrow">Registro rápido</p>
        <h2 id="booking-title">Crea una reserva de demostración.</h2>
      </div>

      <form className="booking-form" onSubmit={onSubmit}>
        <label>
          Nombre del cliente
          <input
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            placeholder="Ej. Rodrigo Garza"
            required
          />
        </label>

        <label>
          Vehículo
          <input
            name="vehicle"
            value={form.vehicle}
            onChange={handleChange}
            placeholder="Ej. Sedán azul"
            required
          />
        </label>

        <label>
          Slot
          <select
            name="slotId"
            value={form.slotId}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un slot</option>
            {slots.map((slot) => (
              <option key={slot.id} value={slot.id} disabled={slot.available <= 0}>
                {slot.date} {slot.time} — {slot.service}
              </option>
            ))}
          </select>
        </label>

        <label className="full">
          Notas
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Ej. Cliente solicita aspirado adicional."
            rows="3"
          />
        </label>

        <button className="button primary full" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Registrar reserva"}
        </button>
      </form>
    </section>
  );
}

function BookingTable({ bookings, slotsById, onDelete }) {
  return (
    <section className="section" id="reservas">
      <div className="section-heading">
        <p className="eyebrow">Panel operativo</p>
        <h2>Reservas registradas.</h2>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Vehículo</th>
              <th>Slot</th>
              <th>Notas</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              const slot = slotsById[booking.slotId];
              return (
                <tr key={booking.id}>
                  <td>{booking.customerName}</td>
                  <td>{booking.vehicle}</td>
                  <td>
                    {slot ? `${slot.date} ${slot.time}` : "Slot no encontrado"}
                  </td>
                  <td>{booking.notes || "Sin notas"}</td>
                  <td>
                    <button
                      className="text-button"
                      type="button"
                      onClick={() => onDelete(booking.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <p className="empty-state">Todavía no hay reservas registradas.</p>
        )}
      </div>
    </section>
  );
}

function InfoModal({ onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <article
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose}>
          ×
        </button>
        <p className="eyebrow">Flujo principal</p>
        <h2 id="modal-title">¿Cómo funciona IBEX Carwash Slots?</h2>
        <ol>
          <li>El cliente revisa slots disponibles.</li>
          <li>Registra nombre, vehículo y horario.</li>
          <li>El sistema valida cupo y crea la reserva.</li>
          <li>El coordinador puede consultar o eliminar registros.</li>
        </ol>
        <p>
          En siguientes fases, el modelo puede crecer hacia login, asistencia,
          pagos, remuneraciones y reportes de desempeño.
        </p>
      </article>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>
        Proyecto académico full stack — React, Node.js, Express y rutas HTTP.
      </p>
    </footer>
  );
}

export default function App() {
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const slotsById = useMemo(() => {
    return slots.reduce((acc, slot) => {
      acc[slot.id] = slot;
      return acc;
    }, {});
  }, [slots]);

  async function loadData() {
    const [slotsResponse, bookingsResponse] = await Promise.all([
      getSlots(),
      getBookings(),
    ]);
    setSlots(slotsResponse.data);
    setBookings(bookingsResponse.data);
  }

  useEffect(() => {
    loadData().catch((err) => {
      setError(err.message);
    });
  }, []);

  function handleSelectSlot(slotId) {
    setForm((current) => ({ ...current, slotId }));
    setStatus("Slot seleccionado. Completa tus datos para registrar la reserva.");
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setStatus("");

    try {
      await createBooking(form);
      setForm(initialForm);
      await loadData();
      setStatus("Reserva creada correctamente.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    setError("");
    setStatus("");

    try {
      await deleteBooking(id);
      await loadData();
      setStatus("Reserva eliminada correctamente.");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <Header />
      <main>
        <HeroSection onOpenModal={() => setModalOpen(true)} />
        <ImpactCards />
        <SlotList
          slots={slots}
          selectedSlotId={form.slotId}
          onSelectSlot={handleSelectSlot}
        />

        {(status || error) && (
          <div className={error ? "alert error" : "alert success"}>
            {error || status}
          </div>
        )}

        <BookingForm
          form={form}
          setForm={setForm}
          slots={slots}
          onSubmit={handleSubmit}
          loading={loading}
        />
        <BookingTable
          bookings={bookings}
          slotsById={slotsById}
          onDelete={handleDelete}
        />
      </main>
      <Footer />
      {modalOpen && <InfoModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
