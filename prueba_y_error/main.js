// ==========================================
// CONFIGURACIÓN Y BASE DE DATOS DEL SISTEMA SOLAR
// ==========================================

const datosPlanetas = [
  {
    id: 'mercurio',
    nombre: 'MERCURIO',
    info: 'Es el planeta mas cercano al Sol. Carece de una atmosfera significativa, por lo que experimenta temperaturas extremas: de 430°C de dia a -180°C de noche.',
    pregunta: '¿Tiene Mercurio una atmosfera que retenga el calor?',
    opcionA: 'A) Si, muy densa',
    opcionB: 'B) No, casi no tiene',
    correcta: 'B',
    posicionX: -9,
    distanciaCamaraZ: 4.2,
    distanciaPanelZ: 2.2,
    proxX: -6
  },
  {
    id: 'venus',
    nombre: 'VENUS',
    info: 'Tiene una atmosfera extremadamente densa llena de dioxido de carbono, lo que genera un potente efecto invernadero. Es el planeta mas caluroso del Sistema Solar.',
    pregunta: '¿Es Venus el planeta mas caluroso del sistema?',
    opcionA: 'A) Si, por invernadero',
    opcionB: 'B) No, es Mercurio',
    correcta: 'A',
    posicionX: -6,
    distanciaCamaraZ: 4.2,
    distanciaPanelZ: 2.2,
    proxX: -3
  },
  {
    id: 'tierra',
    nombre: 'TIERRA',
    info: 'Nuestro hogar es el unico planeta conocido con agua liquida en abundancia y vida. Aproximadamente el 71% de su superficie esta cubierta por oceanos.',
    pregunta: '¿Que porcentaje aproximado de la Tierra es agua?',
    opcionA: 'A) Aprox 70%',
    opcionB: 'B) Aprox 50%',
    correcta: 'A',
    posicionX: -3,
    distanciaCamaraZ: 4.2,
    distanciaPanelZ: 2.2,
    proxX: 0
  },
  {
    id: 'marte',
    nombre: 'MARTE',
    info: 'Conocido como el Planeta Rojo debido al oxido de hierro presente en su superficie. Posee el volcan mas grande del Sistema Solar: el Monte Olimpo.',
    pregunta: '¿Por que Marte tiene un color rojo caracteristico?',
    opcionA: 'A) Oxido de Hierro',
    opcionB: 'B) Rios de lava',
    correcta: 'A',
    posicionX: 0,
    distanciaCamaraZ: 4.2,
    distanciaPanelZ: 2.2,
    proxX: 4
  },
  {
    id: 'jupiter',
    nombre: 'JUPITER',
    info: 'Es el planeta mas gigante del Sistema Solar. Es un gigante gaseoso compuesto principalmente de hidrogeno y helio con una famosa Gran Mancha Roja.',
    pregunta: '¿Es Jupiter el planeta mas grande del Sistema Solar?',
    opcionA: 'A) Si, gigante gaseoso',
    opcionB: 'B) No, es Saturno',
    correcta: 'A',
    posicionX: 4,
    distanciaCamaraZ: 6.5,
    distanciaPanelZ: 3.5,
    proxX: 8
  },
  {
    id: 'saturno',
    nombre: 'SATURNO',
    info: 'Famoso por su impresionante sistema de anillos, los cuales estan formados por miles de millones de pedazos de hielo, roca y polvo.',
    pregunta: '¿De que estan compuestos principalmente sus anillos?',
    opcionA: 'A) Hielo y roca',
    opcionB: 'B) Fuego y gas',
    correcta: 'A',
    posicionX: 8,
    distanciaCamaraZ: 5.8,
    distanciaPanelZ: 3.0,
    proxX: 12
  },
  {
    id: 'urano',
    nombre: 'URANO',
    info: 'Es un gigante de hielo que rota casi completamente de lado, con un eje de inclinacion de 98 grados, probablemente debido a una antigua colision.',
    pregunta: '¿Como es la inclinacion de rotacion de Urano?',
    opcionA: 'A) Inclinado de lado',
    opcionB: 'B) Totalmente vertical',
    correcta: 'A',
    posicionX: 12,
    distanciaCamaraZ: 4.8,
    distanciaPanelZ: 2.5,
    proxX: 16
  },
  {
    id: 'neptuno',
    nombre: 'NEPTUNO',
    info: 'Es el planeta mas distante del Sol. Posee los vientos mas fuertes y violentos de todo el Sistema Solar, superando los 2000 km/h.',
    pregunta: '¿Tiene Neptuno los vientos mas rapidos del sistema?',
    opcionA: 'A) Si, mas de 2000 km/h',
    opcionB: 'B) No, no hay viento',
    correcta: 'A',
    posicionX: 16,
    distanciaCamaraZ: 4.8,
    distanciaPanelZ: 2.5,
    proxX: null
  }
];

let puntos = 0;
let indicePlanetaActual = 0;
let cambiandoEstado = false;

// ==========================================
// CONTROL DEL VIDEO INTRODUCTORIO Y CARGA
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const contenedorIntro = document.querySelector('#contenedor-intro');
  const videoIntro = document.querySelector('#video-intro');
  const btnIniciarIntro = document.querySelector('#btn-iniciar-intro');
  const btnSaltarIntro = document.querySelector('#btn-saltar-intro');

  // Reproduce el video cuando el usuario interactúa
  btnIniciarIntro.addEventListener('click', () => {
    btnIniciarIntro.style.display = 'none';
    btnSaltarIntro.style.display = 'block';
    videoIntro.play().catch(() => {
      finalizarVideoIntro();
    });
  });

  // Al finalizar el video pasa automáticamente a la escena
  videoIntro.addEventListener('ended', () => {
    finalizarVideoIntro();
  });

  // Si el usuario toca "Saltar"
  btnSaltarIntro.addEventListener('click', () => {
    videoIntro.pause();
    finalizarVideoIntro();
  });

  function finalizarVideoIntro() {
    contenedorIntro.style.opacity = '0';
    setTimeout(() => {
      contenedorIntro.style.display = 'none';
      iniciarPantallaCargaVR();
    }, 800);
  }

  configurarPlanetas();
  configurarBotonesPanel();
});

// SIMULACIÓN DE CARGA LUEGO DE LA INTRO
function iniciarPantallaCargaVR() {
  const pantallaCarga = document.querySelector('#pantalla-carga');
  const barraProgreso = document.querySelector('#barra-progreso');
  const porcentajeTexto = document.querySelector('#porcentaje');

  let progreso = 0;
  const intervaloCarga = setInterval(() => {
    progreso += 5;
    if (barraProgreso) barraProgreso.style.width = progreso + '%';
    if (porcentajeTexto) porcentajeTexto.textContent = progreso + '%';

    if (progreso >= 100) {
      clearInterval(intervaloCarga);
      setTimeout(() => {
        if (pantallaCarga) pantallaCarga.style.display = 'none';
      }, 300);
    }
  }, 30);
}

// ==========================================
// INTERACCIÓN CON PLANETAS Y MOVIMIENTO
// ==========================================

function configurarPlanetas() {
  datosPlanetas.forEach((p, idx) => {
    const el = document.querySelector('#' + p.id);
    if (el) {
      el.addEventListener('click', () => {
        if (cambiandoEstado) return;
        if (idx !== indicePlanetaActual) return;
        abrirInformacionPlaneta(p);
      });
    }
  });
}

function posicionarPanelFrenteAJugador(planeta) {
  const panel = document.querySelector('#panel-info');
  if (panel) {
    const posX = planeta ? planeta.posicionX : -9;
    const distPanel = planeta ? planeta.distanciaPanelZ : 2.2;
    panel.setAttribute('position', `${posX} 2.4 ${distPanel}`);
    panel.setAttribute('rotation', '-8 0 0');
  }
}

function reiniciarCursor() {
  const cursorWrapper = document.querySelector('#cursor-wrapper');
  if (cursorWrapper) {
    cursorWrapper.emit('mouseleave');
  }
}

function abrirInformacionPlaneta(p) {
  cambiandoEstado = true;
  posicionarPanelFrenteAJugador(p);
  reiniciarCursor();

  actualizarContenidoPanel(
    `${p.nombre}\n\n${p.info}`,
    true,
    false,
    false
  );

  const panel = document.querySelector('#panel-info');
  if (panel) {
    panel.setAttribute('visible', 'true');
    panel.emit('mostrar-panel');
  }

  setTimeout(() => {
    cambiandoEstado = false;
  }, 800);
}

function configurarBotonesPanel() {
  const btnContinuar = document.querySelector('#btn-continuar');
  const btnA = document.querySelector('#btn-a');
  const btnB = document.querySelector('#btn-b');

  if (btnContinuar) {
    btnContinuar.addEventListener('click', () => {
      if (cambiandoEstado) return;
      cambiandoEstado = true;
      reiniciarCursor();

      const p = datosPlanetas[indicePlanetaActual];

      actualizarContenidoPanel(
        `${p.nombre}\n\n${p.pregunta}`,
        false,
        true,
        true
      );

      const txtA = document.querySelector('#txt-a');
      const txtB = document.querySelector('#txt-b');
      if (txtA) txtA.setAttribute('value', p.opcionA);
      if (txtB) txtB.setAttribute('value', p.opcionB);

      setTimeout(() => {
        cambiandoEstado = false;
        reiniciarCursor();
      }, 700);
    });
  }

  if (btnA) {
    btnA.addEventListener('click', () => responder('A'));
  }
  if (btnB) {
    btnB.addEventListener('click', () => responder('B'));
  }
}

function responder(opcion) {
  if (cambiandoEstado) return;
  cambiandoEstado = true;

  reiniciarCursor();

  const p = datosPlanetas[indicePlanetaActual];
  const sndCorrecto = document.querySelector('#snd-correcto');
  const sndIncorrecto = document.querySelector('#snd-incorrecto');
  const textoPuntaje = document.querySelector('#texto-puntaje');

  actualizarContenidoPanel('', false, false, false);

  if (opcion === p.correcta) {
    puntos += 100;
    if (textoPuntaje) textoPuntaje.setAttribute('value', 'PUNTOS: ' + puntos);
    if (sndCorrecto && sndCorrecto.src) sndCorrecto.play();
    document.querySelector('#texto-panel').setAttribute('value', '¡CORRECTO! +100 PTS 🎉\n\nViajando al siguiente planeta...');
  } else {
    if (sndIncorrecto && sndIncorrecto.src) sndIncorrecto.play();
    document.querySelector('#texto-panel').setAttribute('value', 'INCORRECTO ❌\n\nViajando al siguiente planeta...');
  }

  setTimeout(() => {
    cerrarPanel(() => {
      if (p.proxX !== null) {
        indicePlanetaActual++;
        const sigPlaneta = datosPlanetas[indicePlanetaActual];
        desplazarJugadorAlSiguiente(sigPlaneta);
      } else {
        posicionarPanelFrenteAJugador(p);
        document.querySelector('#texto-panel').setAttribute('value', '¡SISTEMA SOLAR COMPLETADO! 🚀\nPUNTOS TOTALES: ' + puntos);
        const panel = document.querySelector('#panel-info');
        if (panel) {
          panel.setAttribute('visible', 'true');
          panel.emit('mostrar-panel');
        }
      }
      cambiandoEstado = false;
    });
  }, 2200);
}

function cerrarPanel(callback) {
  const panel = document.querySelector('#panel-info');
  if (panel) {
    panel.emit('ocultar-panel');
    setTimeout(() => {
      panel.setAttribute('visible', 'false');
      actualizarContenidoPanel('', false, false, false);
      if (callback) callback();
    }, 320);
  }
}

function desplazarJugadorAlSiguiente(planeta) {
  const jugador = document.querySelector('#jugador');
  if (jugador && planeta) {
    jugador.setAttribute('animation', `property: position; to: ${planeta.posicionX} 1.6 ${planeta.distanciaCamaraZ}; dur: 3500; easing: easeInOutCubic`);
  }
}

function actualizarContenidoPanel(texto, verContinuar, verA, verB) {
  const textoPanel = document.querySelector('#texto-panel');
  const btnContinuar = document.querySelector('#btn-continuar');
  const btnA = document.querySelector('#btn-a');
  const btnB = document.querySelector('#btn-b');

  if (textoPanel) textoPanel.setAttribute('value', texto);

  if (btnContinuar) {
    btnContinuar.setAttribute('visible', verContinuar);
    if (verContinuar) btnContinuar.classList.add('interactivo');
    else btnContinuar.classList.remove('interactivo');
  }

  if (btnA && btnB) {
    btnA.setAttribute('visible', verA);
    btnB.setAttribute('visible', verB);

    if (verA) {
      btnA.classList.add('interactivo');
      btnB.classList.add('interactivo');
    } else {
      btnA.classList.remove('interactivo');
      btnB.classList.remove('interactivo');
    }
  }
}