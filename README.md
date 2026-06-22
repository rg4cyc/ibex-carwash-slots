# IBEX Carwash Slots

Aplicación web informativa y dinámica para gestionar slots de lavado de autos como práctica prelaboral para adolescentes.

## Objetivo

Crear una aplicación web full stack básica que permita mostrar información del programa IBEX Carwash, consultar slots disponibles y registrar reservas de demostración mediante una interfaz responsiva conectada a un servidor Node.js/Express.

## Tema

El proyecto aborda tecnología con impacto social. La aplicación ayuda a organizar una actividad comunitaria en la que adolescentes pueden practicar habilidades prelaborales como puntualidad, atención al cliente, responsabilidad y trabajo en equipo.

## Stack

- React + Vite para front-end.
- HTML, CSS y JavaScript para estructura, estilos e interactividad.
- Node.js + Express para back-end básico.
- Rutas HTTP con respuestas JSON.
- Datos en memoria para cumplir el alcance sin base de datos formal.
- Mermaid para el diagrama entidad-relación conceptual.

## Funcionalidades

- Landing page informativa.
- Diseño responsivo.
- Modal informativo.
- Consulta de slots desde API.
- Selección de slot de 30 minutos.
- Selección de servicio.
- Servicio de lavado exterior activo.
- Servicio de aspirado interior deshabilitado por regla de negocio.
- Registro de reservas.
- Consulta de reservas.
- Eliminación de reservas.
- Mensajes de éxito y error.

## Arquitectura

React + Vite
↓ fetch()
Node.js + Express
↓ rutas HTTP
Datos en memoria
↓ crecimiento futuro
Modelo ERD conceptual

## Rutas del back-end

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/health | Verifica que el servidor esté activo |
| GET | /api/services | Consulta servicios disponibles y no disponibles |
| GET | /api/slots | Consulta slots de 30 minutos |
| GET | /api/bookings | Consulta reservas |
| POST | /api/bookings | Crea una reserva |
| DELETE | /api/bookings/:id | Elimina una reserva |

## Regla de negocio principal

Los slots no pertenecen a un servicio específico. Un slot representa únicamente disponibilidad de tiempo: fecha, hora, duración, cupo y ubicación.

El servicio se asigna al momento de crear la reserva. En esta versión, el único servicio activo es lavado exterior. El aspirado interior aparece deshabilitado porque todavía no se cuenta con equipo de aspirado.

## Cómo ejecutar

### Back-end

cd backend
npm install
npm run dev

Servidor:

http://localhost:8080

### Front-end

En otra terminal:

cd frontend
npm install
npm run dev

Aplicación:

http://localhost:5173

## Pruebas sugeridas

1. Abrir la aplicación en navegador.
2. Abrir el modal ¿Cómo funciona?
3. Seleccionar un slot.
4. Confirmar que el servicio de lavado exterior está activo.
5. Confirmar que aspirado interior aparece deshabilitado.
6. Crear una reserva.
7. Ver la reserva en la tabla.
8. Eliminar la reserva.
9. Probar vista móvil con DevTools.

## Estructura del proyecto

ibex-carwash-slots/
  backend/
    server.js
    package.json
  frontend/
    src/
      services/
      styles/
      App.jsx
      main.jsx
  docs/
    erd.mmd
    decisiones-tecnicas.md
    pruebas.md

## Documentación

- docs/erd.mmd: diagrama entidad-relación conceptual.
- docs/decisiones-tecnicas.md: decisiones de arquitectura, UI/UX y reglas de negocio.
- docs/pruebas.md: pruebas manuales y depuración.

## Futuras mejoras

- Login para coordinadores.
- Registro de estudiantes y tutores.
- Control de asistencia.
- Pagos.
- Remuneraciones.
- Base de datos formal.
- Dockerización.
- Despliegue en nube.
