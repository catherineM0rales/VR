// Ejemplo de cómo manejar las posiciones en main.js al seleccionar un planeta:

function moverAPlaneta(nombrePlaneta, posicionPlanetaX) {
  const jugador = document.querySelector('#jugador');
  const panelInfo = document.querySelector('#panel-info');

  let distanciaJugadorZ = 2.5; // Distancia normal (Eje Z)
  let distanciaPanelZ = 0.8;   // Posición del panel frente al jugador

  // Ajuste especial para planetas gigantes
  if (nombrePlaneta === 'jupiter') {
    distanciaJugadorZ = 4.2; // Movemos al usuario más atrás (Z mayor)
    distanciaPanelZ = 2.0;    // Colocamos el panel flotando justo entre el jugador y Júpiter
  } else if (nombrePlaneta === 'saturno') {
    distanciaJugadorZ = 3.8;
    distanciaPanelZ = 1.6;
  }

  // 1. Mover al jugador frente a Júpiter
  jugador.setAttribute('position', `${posicionPlanetaX} 1.6 ${distanciaJugadorZ}`);

  // 2. Mover la pantalla emergente frente a Júpiter sin que quede adentro
  panelInfo.setAttribute('position', `${posicionPlanetaX} 2.1 ${distanciaPanelZ}`);
  
  // Mostrar el panel con la animación
  panelInfo.emit('mostrar-panel');
}