const API_BASE_URL = "http://localhost:8080/api";

export async function getSlots() {
  const response = await fetch(`${API_BASE_URL}/slots`);
  if (!response.ok) {
    throw new Error("No se pudieron cargar los slots.");
  }
  return response.json();
}

export async function getBookings() {
  const response = await fetch(`${API_BASE_URL}/bookings`);
  if (!response.ok) {
    throw new Error("No se pudieron cargar las reservas.");
  }
  return response.json();
}

export async function createBooking(payload) {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "No se pudo crear la reserva.");
  }

  return result;
}

export async function deleteBooking(id) {
  const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "No se pudo eliminar la reserva.");
  }

  return result;
}
