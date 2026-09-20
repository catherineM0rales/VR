document.addEventListener('DOMContentLoaded', () => {

  const pantallaCarga = document.querySelector('#pantalla-carga');
  const barraProgreso = document.querySelector('#barra-progreso');
  const porcentajeTexto = document.querySelector('#porcentaje');

  const jugador = document.querySelector('#jugador');
  const camara = document.querySelector('#camara');
  const textoPuntaje = document.querySelector('#texto-puntaje');

  const panel = document.querySelector('#panel-info');
  const textoPanel = document.querySelector('#texto-panel');
  const btnA = document.querySelector('#btn-a');
  const btnB = document.querySelector('#btn-b');
  const txtA = document.querySelector('#txt-a');
  const txtB = document.querySelector('#txt-b');

  const sndCorrecto = document.querySelector('#snd-correcto');
  const sndIncorrecto = document.querySelector('#snd-incorrecto');

  let puntos = 0;
  let indicePlanetaActual = 0;

  // Datos y secuencia de viaje
  const datosPlanetas = [
    { id: 'mercurio', posX: -9, pregunta: 'MERCURIO:\n\n¿Tiene atmósfera para retener el calor?', a: 'A) Si, muy densa', b: 'B) No, casi no tiene', correcta: 'B', proxX: -6 },
    { id: 'venus', posX: -6, pregunta: 'VENUS:\n\n¿Es el planeta mas caluroso del sistema?', a: 'A) Si, por invernadero', b: 'B) No, es Mercurio', correcta: 'A', proxX: -3 },
    { id: 'tierra', posX: -3, pregunta: 'TIERRA:\n\n¿Que porcentaje de superficie es agua?', a: 'A) Aprox 70%', b: 'B) Aprox 50%', correcta: 'A', proxX: 0 },
    { id: 'marte', posX: 0, pregunta: 'MARTE:\n\n¿Por que se le conoce como Planeta Rojo?', a: 'A) Oxido de Hierro', b: 'B) Rios de lava', correcta: 'A', proxX: 4 },
    { id: 'jupiter', posX: 4, pregunta: 'JUPITER:\n\n¿Es el planeta mas grande del Sistema Solar?', a: 'A) Si, gigante gaseoso', b: 'B) No, es Saturno', correcta: 'A', proxX: 8 },
    { id: 'saturno', posX: 8, pregunta: 'SATURNO:\n\n¿De que estan hechos sus anillos?', a: 'A) Hielo y roca', b: 'B) Fuego y gas', correcta: 'A', proxX: 12 },
    { id: 'urano', posX: 12, pregunta: 'URANO:\n\n¿Como rotan sus polos?', a: 'A) Inclinado de lado', b: 'B) Totalmente vertical', correcta: 'A', proxX: 16 },
    { id: 'neptuno', posX: 16, pregunta: 'NEPTUNO:\n\n¿Tiene los vientos mas rapidos del sistema?', a: 'A) Si, mas de 2000 km/h', b: 'B) No, no hay viento', correcta: 'A', proxX: null }
  ];

  // 1. Carga
  let progreso = 0;
  const intervaloCarga = setInterval(() => {
    progreso += 5;
    barraProgreso.style.width = progreso + '%';
    porcentajeTexto.textContent = progreso + '%';

    if (progreso >= 100) {
      clearInterval(intervaloCarga);
      setTimeout(() => {
        pantallaCarga.style.display = 'none';
      }, 300);
    }
  }, 30);

  // 2. Interacción planetas
  datosPlanetas.forEach((p, idx) => {
    const el = document.querySelector('#' + p.id);
    if (el) {
      el.addEventListener('click', () => {
        if (idx !== indicePlanetaActual) return;
        abrirPregunta(p);
      });
    }
  });

  function abrirPregunta(p) {
    camara.appendChild(panel);
    panel.setAttribute('position', '0 0 -1.3');
    panel.setAttribute('visible', 'true');

    textoPanel.setAttribute('value', p.pregunta);
    txtA.setAttribute('value', p.a);
    txtB.setAttribute('value', p.b);
    btnA.setAttribute('visible', 'true');
    btnB.setAttribute('visible', 'true');
  }

  function responder(opcion) {
    const p = datosPlanetas[indicePlanetaActual];
    btnA.setAttribute('visible', 'false');
    btnB.setAttribute('visible', 'false');

    if (opcion === p.correcta) {
      puntos += 100;
      textoPuntaje.setAttribute('value', 'PUNTOS: ' + puntos);
      if (sndCorrecto.src) sndCorrecto.play();
      textoPanel.setAttribute('value', '¡CORRECTO! +100 PTS 🎉\n\nDesplazandote al siguiente planeta...');
    } else {
      if (sndIncorrecto.src) sndIncorrecto.play();
      textoPanel.setAttribute('value', 'INCORRECTO ❌\n\nDesplazandote al siguiente planeta...');
    }

    setTimeout(() => {
      panel.setAttribute('visible', 'false');
      if (p.proxX !== null) {
        desplazarJugador(p.proxX);
        indicePlanetaActual++;
      } else {
        textoPanel.setAttribute('value', '¡SISTEMA SOLAR COMPLETADO! 🚀\nPUNTOS TOTALES: ' + puntos);
        panel.setAttribute('visible', 'true');
      }
    }, 2000);
  }

  btnA.addEventListener('click', () => responder('A'));
  btnB.addEventListener('click', () => responder('B'));

  // Transición de Flotación en el espacio
  function desplazarJugador(destinoX) {
    jugador.setAttribute('animation', `property: position; to: ${destinoX} 1.6 3.5; dur: 3500; easing: easeInOutCubic`);
  }

});



