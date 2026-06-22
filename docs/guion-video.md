# Guion de video - Actividad 1

Duración sugerida: 5 a 7 minutos.

## 1. Presentación

Hola, en este video presento la Actividad 1 del curso de Desarrollo Full Stack. El proyecto se llama IBEX Carwash Slots y consiste en una aplicación web informativa y dinámica para gestionar slots de lavado de autos dentro de un programa de práctica prelaboral para adolescentes.

## 2. Problema y objetivo

El objetivo es organizar horarios de servicio de forma clara para clientes y coordinadores. La aplicación permite consultar slots disponibles, seleccionar un servicio, registrar una reserva y visualizar las reservas creadas.

## 3. Stack utilizado

Para el front-end utilicé React con Vite, porque permite construir una interfaz modular mediante componentes reutilizables y mantiene una estructura ligera.

Para el back-end utilicé Node.js con Express, porque permite crear rutas HTTP de forma simple y responder datos en formato JSON.

## 4. UI/UX

La interfaz fue diseñada con un enfoque simple y responsivo. La navegación tiene tres secciones principales: Programa, Slots y Reservas.

El diseño prioriza claridad, botones visibles, textos breves y retroalimentación inmediata al usuario.

## 5. Demo del front-end

Aquí se muestra la pantalla principal con el título Agenda Slots IBEX. En la sección de beneficios se explica el valor del programa. Después se muestran los slots disponibles, todos con duración de 30 minutos.

Al seleccionar un slot, el formulario se actualiza para crear una reserva.

## 6. Regla de negocio

Una decisión importante fue separar slots y servicios. Un slot no representa un tipo de lavado, sino disponibilidad de tiempo.

El servicio se elige aparte. En esta versión, lavado exterior está activo y aspirado interior aparece deshabilitado porque todavía no se cuenta con equipo de aspirado.

## 7. Demo de reserva

Ahora creo una reserva de prueba. Ingreso nombre del cliente, vehículo, selecciono slot, confirmo servicio y registro la reserva.

La reserva aparece en la tabla. Después puedo eliminarla y el sistema muestra un mensaje de confirmación.

## 8. Back-end y rutas HTTP

El back-end corre en Node.js y Express. Las rutas principales son:

GET /api/health para verificar el servidor.
GET /api/services para consultar servicios.
GET /api/slots para consultar slots.
GET /api/bookings para consultar reservas.
POST /api/bookings para crear reservas.
DELETE /api/bookings/:id para eliminar reservas.

## 9. Diagrama ERD

Aunque esta actividad no requiere base de datos formal, se diseñó un ERD conceptual en Mermaid. El modelo contempla estudiantes, tutores, clientes, vehículos, servicios, slots, reservas, asistencia, pagos y remuneraciones.

Esto permite que el proyecto pueda crecer en fases posteriores.

## 10. Pruebas y depuración

Se realizaron pruebas manuales en navegador, validando carga de la aplicación, modal, selección de slots, creación y eliminación de reservas, servicio deshabilitado y vista responsiva.

También se corrigió la lógica inicial porque los slots estaban acoplados a servicios. La solución fue separar entidades para tener un modelo más flexible.

## 11. Cierre

En conclusión, este proyecto demuestra una primera versión full stack funcional con front-end, back-end, rutas HTTP, diseño responsivo, reglas de negocio y documentación técnica.
