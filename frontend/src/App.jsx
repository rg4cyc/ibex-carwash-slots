import { useEffect, useMemo, useState } from "react";
import {
  createBooking,
  deleteBooking,
  getBookings,
  getServices,
  getSlots,
} from "./services/api";
import "./styles/main.css";

const initialForm = {
  customerName: "",
  vehicle: "",
  slotId: "",
  serviceId: "service-exterior-wash",
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
        <h1>Agenda Slots IBEX</h1>
        <p className="hero-copy">
          IBEX Carwash Slots organiza horarios de media hora para que
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
          <span className="metric">30</span>
          <p>minutos por slot</p>
        </div>
        <div>
          <span className="metric">1</span>
          <p>servicio activo</p>
        </div>
        <div>
          <span className="metric">Aspirado</span>
          <p>pendiente por equipo</p>
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
      <div className="section-heading compact-heading">
        <h2>Beneficios:</h2>
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
        <h2>Selecciona un horario de 30 minutos.</h2>
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
            <span>{slot.durationMinutes} minutos</span>
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

function ServiceSelector({ services, selectedServiceId, onChange }) {
  return (
    <fieldset className="service-selector">
      <legend>Servicio solicitado</legend>
      <div className="service-options">
        {services.map((service) => (
          <label
            className={`service-option ${!service.available ? "disabled-service" : ""}`}
            key={service.id}
          >
            <input
              type="radio"
              name="serviceId"
              value={service.id}
              checked={selectedServiceId === service.id}
              onChange={onChange}
              disabled={!service.available}
            />
            <span>
              <strong>{service.name}</strong>
              {!service.available && <small>{service.reasonUnavailable}</small>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function BookingForm({ form, setForm, slots, services, onSubmit, loading }) {
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
            placeholder="Ej. Carlos Gómez"
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
                {slot.date} {slot.time} — {slot.durationMinutes} min.
              </option>
            ))}
          </select>
        </label>

        <ServiceSelector
          services={services}
          selectedServiceId={form.serviceId}
          onChange={handleChange}
        />

        <label className="full">
          Notas
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Ej. Cliente solicita cuidado especial en rines."
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

function BookingTable({ bookings, slotsById, servicesById, onDelete }) {
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
              <th>Servicio</th>
              <th>Notas</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              const slot = slotsById[booking.slotId];
              const service = servicesById[booking.serviceId];
              return (
                <tr key={booking.id}>
                  <td>{booking.customerName}</td>
                  <td>{booking.vehicle}</td>
                  <td>
                    {slot
                      ? `${slot.date} ${slot.time} (${slot.durationMinutes} min.)`
                      : "Slot no encontrado"}
                  </td>
                  <td>{service ? service.name : "Servicio no encontrado"}</td>
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
          <li>El cliente revisa slots de 30 minutos disponibles.</li>
          <li>Selecciona un servicio disponible.</li>
          <li>Registra nombre, vehículo y horario.</li>
          <li>El sistema valida cupo y crea la reserva.</li>
        </ol>
        <p>
          El aspirado interior aparece deshabilitado porque todavía no se cuenta
          con equipo de aspirado. Esta decisión refleja una regla de negocio del
          prototipo actual.
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
  const [services, setServices] = useState([]);
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

  const servicesById = useMemo(() => {
    return services.reduce((acc, service) => {
      acc[service.id] = service;
      return acc;
    }, {});
  }, [services]);

  async function loadData() {
    const [servicesResponse, slotsResponse, bookingsResponse] = await Promise.all([
      getServices(),
      getSlots(),
      getBookings(),
    ]);
    setServices(servicesResponse.data);
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
          services={services}
          onSubmit={handleSubmit}
          loading={loading}
        />
        <BookingTable
          bookings={bookings}
          slotsById={slotsById}
          servicesById={servicesById}
          onDelete={handleDelete}
        />
      </main>
      <Footer />
      {modalOpen && <InfoModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
