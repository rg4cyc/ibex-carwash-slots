# Pruebas manuales y depuración

## Pruebas realizadas

| Prueba | Resultado esperado | Resultado |
|---|---|---|
| Abrir front-end en Chrome | La aplicación carga correctamente | Correcto |
| Abrir modal informativo | El modal muestra el flujo de uso | Correcto |
| Consultar slots | El front muestra slots recibidos desde API | Correcto |
| Seleccionar slot | El formulario actualiza el slot elegido | Correcto |
| Ver servicios | Lavado exterior activo y aspirado interior deshabilitado | Correcto |
| Crear reserva válida | La reserva aparece en la tabla | Correcto |
| Eliminar reserva | La reserva desaparece de la tabla | Correcto |
| Formulario incompleto | El navegador solicita completar campos requeridos | Correcto |
| Probar vista móvil | La interfaz se adapta a pantalla pequeña | Correcto |

## Depuración realizada

Durante el desarrollo se corrigió la primera versión del modelo porque inicialmente los slots estaban acoplados a servicios específicos. Se ajustó la lógica para separar slots y servicios, de modo que un horario pueda asignarse a diferentes servicios según disponibilidad operativa.

También se eliminó una métrica decorativa que no aportaba lógica de negocio y se sustituyó por un estado operativo real: aspirado pendiente por equipo.

## Observaciones

La versión actual no usa base de datos formal porque la actividad solicita back-end básico sin almacenamiento persistente. Para una fase posterior, el modelo ERD permite evolucionar hacia una base de datos relacional o documental.
