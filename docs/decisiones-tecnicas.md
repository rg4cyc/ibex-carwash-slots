# Decisiones técnicas

## Tema elegido

Se eligió IBEX Carwash Slots, una aplicación web informativa y dinámica para organizar slots de lavado de autos dentro de un programa de práctica prelaboral para adolescentes.

El tema se relaciona con tecnología e impacto social porque usa una aplicación web para coordinar horarios, clientes, servicios y operación básica de un programa comunitario.

## Front-end

Se eligió React con Vite para construir una interfaz modular, rápida y mantenible. React permite dividir la interfaz en componentes reutilizables como Header, HeroSection, SlotList, BookingForm, BookingTable e InfoModal.

Vite se utilizó porque permite levantar un entorno de desarrollo ligero, rápido y sin configuración innecesaria. Esto ayuda a mantener el proyecto limpio y evita estructuras pesadas.

## Back-end

Se utilizó Node.js con Express para crear un servidor básico con rutas HTTP. El servidor responde en formato JSON y permite consultar servicios, consultar slots, crear reservas y eliminar reservas.

## Persistencia

La actividad solicita back-end básico sin almacenamiento formal en base de datos. Por eso, esta versión usa datos en memoria para demostrar lógica full stack sin introducir una base de datos real.

Sin embargo, se diseñó un diagrama entidad-relación conceptual para mostrar cómo crecería el sistema en fases posteriores, incluyendo clientes, vehículos, servicios, slots, reservas, asistencia, pagos y remuneraciones.

## Regla de negocio implementada

Los slots están desacoplados del tipo de servicio. Cada slot representa fecha, hora, duración, capacidad y ubicación. El servicio se selecciona aparte.

En esta versión solo está activo el servicio de lavado exterior. El aspirado interior existe como opción futura, pero aparece deshabilitado porque todavía no se cuenta con equipo de aspirado.

## Diseño UI/UX

La interfaz se diseñó con enfoque mobile first, navegación clara, textos breves, botones visibles y retroalimentación inmediata al usuario. La aplicación busca que el usuario pueda entender el flujo sin instrucciones extensas.

## Optimización

Se evitó usar imágenes pesadas o librerías innecesarias. La interfaz usa CSS propio, componentes reutilizables y peticiones HTTP simples.
