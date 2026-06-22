# Actividad 1 - IBEX Carwash Slots

## Introducción

La presente actividad consiste en el desarrollo de una aplicación web informativa y dinámica llamada IBEX Carwash Slots. El proyecto tiene como finalidad organizar slots de lavado de autos dentro de un programa de práctica prelaboral para adolescentes.

La aplicación permite consultar horarios disponibles, seleccionar un servicio activo, registrar una reserva y visualizar las reservas creadas. El sistema fue desarrollado con una arquitectura full stack básica, separando la interfaz de usuario del servidor back-end.

## Objetivo general

Crear una aplicación web informativa y dinámica sobre un tema de interés mediante HTML, CSS, JavaScript, React y Node.js, demostrando interactividad, diseño responsivo y servicios básicos de back-end.

## Objetivos específicos

- Diseñar una interfaz clara, atractiva y responsiva.
- Implementar un flujo de usuario sencillo para consultar slots y registrar reservas.
- Utilizar React para estructurar la aplicación mediante componentes reutilizables.
- Configurar un servidor básico con Node.js y Express.
- Crear rutas HTTP para consultar servicios, consultar slots, crear reservas y eliminar reservas.
- Documentar decisiones técnicas, pruebas, depuración y modelo entidad-relación conceptual.

## Alcance

Esta primera versión funciona como prototipo full stack básico. La aplicación permite operar un flujo central: consultar slots, elegir servicio, crear reserva y eliminar reserva.

La versión actual no incluye base de datos formal porque la actividad solicita un back-end básico sin almacenamiento persistente. Los datos se manejan en memoria para demostrar la lógica del sistema. Sin embargo, se incluye un diagrama entidad-relación conceptual para mostrar cómo podría evolucionar el proyecto en futuras fases.

## Metodología

El desarrollo se realizó en etapas:

1. Análisis del problema y definición del alcance.
2. Diseño del flujo de usuario.
3. Creación del front-end con React y Vite.
4. Creación del back-end con Node.js y Express.
5. Conexión del front-end con el back-end mediante peticiones HTTP.
6. Pruebas manuales de funcionalidad, usabilidad y diseño responsivo.
7. Documentación del modelo, decisiones técnicas y mejoras futuras.

## Diseño UI/UX

La interfaz se diseñó con enfoque mobile first, navegación simple y textos breves. El objetivo fue que el usuario pueda entender rápidamente el propósito de la aplicación y registrar una reserva sin instrucciones extensas.

Las decisiones principales fueron:

- Encabezado con navegación directa a Programa, Slots y Reservas.
- Hero section con mensaje claro: Agenda Slots IBEX.
- Sección de beneficios para explicar valor social y operativo.
- Cards de slots con fecha, hora, duración y cupo.
- Formulario simple con campos mínimos.
- Servicio de aspirado interior visible pero deshabilitado para representar una regla de negocio.
- Mensajes de éxito y error para retroalimentación inmediata.

## Arquitectura técnica

La aplicación se divide en dos capas principales:

Front-end:
- React + Vite.
- HTML, CSS y JavaScript.
- Componentes reutilizables.
- Consumo de API mediante fetch.

Back-end:
- Node.js + Express.
- Rutas HTTP.
- Respuestas JSON.
- Datos en memoria.

Flujo técnico:

React + Vite
↓ fetch()
Node.js + Express
↓ rutas HTTP
Datos en memoria
↓ crecimiento futuro
Modelo ERD conceptual

## Desarrollo front-end

El front-end fue implementado en React. La interfaz se dividió en componentes para mejorar organización y mantenimiento:

- Header
- HeroSection
- ImpactCards
- SlotList
- ServiceSelector
- BookingForm
- BookingTable
- InfoModal
- Footer

React permite actualizar la interfaz dinámicamente cuando se crean o eliminan reservas. Esto mejora la experiencia del usuario y evita recargas completas de página.

## Desarrollo back-end

El back-end fue creado con Node.js y Express. Se configuraron rutas HTTP para responder a las necesidades del front-end.

Rutas implementadas:

- GET /api/health
- GET /api/services
- GET /api/slots
- GET /api/bookings
- POST /api/bookings
- DELETE /api/bookings/:id

El servidor valida que una reserva tenga cliente, vehículo, slot y servicio. También valida que el slot exista, tenga cupo y que el servicio esté disponible.

## Regla de negocio implementada

En la primera versión, los slots estaban acoplados a servicios específicos. Esta lógica fue corregida porque un slot debe representar disponibilidad de tiempo, no un tipo de servicio.

La versión final desacopla slot y servicio:

- Slot: fecha, hora, duración, cupo y ubicación.
- Servicio: lavado exterior o aspirado interior.
- Regla actual: solo lavado exterior está activo.
- Aspirado interior aparece deshabilitado porque no se cuenta con equipo de aspirado.

Esta decisión permite que el modelo sea más flexible y escalable.

## Diagrama entidad-relación

Se creó un diagrama ERD conceptual en Mermaid. El modelo incluye entidades para estudiantes, tutores, clientes, vehículos, servicios, slots, reservas, asistencia, pagos y remuneraciones.

Aunque esta versión no implementa base de datos formal, el diagrama permite visualizar la evolución futura del sistema.

## Pruebas realizadas

Se realizaron pruebas manuales en navegador:

- Carga de la aplicación.
- Apertura del modal informativo.
- Consulta de slots desde API.
- Selección de slot.
- Visualización de servicios.
- Validación de servicio deshabilitado.
- Creación de reserva.
- Visualización de reserva en tabla.
- Eliminación de reserva.
- Prueba de vista móvil mediante DevTools.

## Desafíos enfrentados

Uno de los principales desafíos fue definir correctamente la lógica de negocio entre slots y servicios. La primera interpretación asociaba un servicio específico a cada slot, pero esto reducía la flexibilidad del modelo.

Otro desafío fue mantener el alcance adecuado para una primera actividad. El sistema completo podría incluir login, asistencia, pagos y remuneraciones, pero para esta entrega se decidió implementar solo una rebanada vertical funcional.

## Soluciones implementadas

Para resolver el acoplamiento entre slots y servicios, se separaron ambas entidades. El servicio se selecciona al momento de crear la reserva.

Para mantener el alcance controlado, se implementó persistencia en memoria y se dejó el modelo de base de datos como diseño conceptual mediante ERD.

Para mejorar la experiencia de usuario, se agregaron mensajes de éxito y error, diseño responsivo, modal informativo y una interfaz limpia.

## Conclusiones

IBEX Carwash Slots demuestra una arquitectura full stack básica mediante React, Node.js y Express. La aplicación cumple con el objetivo de crear una interfaz informativa y dinámica con interactividad, rutas HTTP y diseño responsivo.

El proyecto también deja una base clara para futuras fases, incluyendo login, control de asistencia, pagos, remuneraciones, base de datos formal, Dockerización y despliegue en nube.

## Capturas sugeridas para insertar en Word

- Pantalla inicial desktop.
- Pantalla inicial móvil.
- Modal informativo.
- Lista de slots.
- Selector de servicios con aspirado interior deshabilitado.
- Formulario de reserva.
- Reserva creada en tabla.
- Ruta /api/health en navegador o terminal.
- Ruta /api/slots en navegador o terminal.
- Diagrama ERD.
- Repositorio GitHub.
