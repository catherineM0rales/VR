window.addEventListener('load', () => {

  const jugador = document.querySelector('#jugador');
  const textoPuntaje = document.querySelector('#texto-puntaje');

  const panel = document.querySelector('#panel-info');
  const tituloPanel = document.querySelector('#titulo-panel');
  const textoPanel = document.querySelector('#texto-panel');
  
  const btnContinuar = document.querySelector('#btn-continuar');
  const btnA = document.querySelector('#btn-a');
  const btnB = document.querySelector('#btn-b');
  const txtA = document.querySelector('#txt-a');
  const txtB = document.querySelector('#txt-b');

  let puntos = 0;
  let indicePlanetaActual = 0;
  let posicionXJugador = -18;

  const datosPlanetas = [
    {
      id: 'mercurio',
      nombre: 'MERCURIO',
      info: 'Es el planeta mas cercano al Sol.\nAl no tener atmosfera que retenga el calor, sus noches alcanzan los -180 C.',
      pregunta: '¿Tiene Mercurio una atmosfera densa para conservar el calor?',
      a: 'A) Si, retiene calor',
      b: 'B) No, carece de ella',
      correcta: 'B',
      proxX: -11
    },
    {
      id: 'venus',
      nombre: 'VENUS',
      info: 'Es el planeta mas caluroso por su densa atmosfera rica en CO2, generando un efecto invernadero extremo.',
      pregunta: '¿Por que Venus es el mas caliente?',
      a: 'A) Efecto Invernadero',
      b: 'B) Por cercania al Sol',
      correcta: 'A',
      proxX: -3
    },
    {
      id: 'tierra',
      nombre: 'TIERRA',
      info: 'Es el unico mundo conocido con agua liquida en superficie, cubriendo el 70% de la Tierra.',
      pregunta: '¿Que porcentaje de la Tierra es agua?',
      a: 'A) Aprox 70%',
      b: 'B) Aprox 30%',
      correcta: 'A',
      proxX: 5
    },
    {
      id: 'marte',
      nombre: 'MARTE',
      info: 'Llamado el Planeta Rojo debido al oxido de hierro abundante en sus rocas y suelo.',
      pregunta: '¿A que se debe su color rojo?',
      a: 'A) Oxido de Hierro',
      b: 'B) Rios de Magma',
      correcta: 'A',
      proxX: 15
    },
    {
      id: 'jupiter',
      nombre: 'JUPITER',
      info: 'Gigante gaseoso capaz de albergar a todos los demas planetas juntos en su interior.',
      pregunta: '¿Jupiter es el planeta mas grande?',
      a: 'A) Si, es gigante',
      b: 'B) No, es Saturno',
      correcta: 'A',
      proxX: 26
    },
    {
      id: 'saturno',
      nombre: 'SATURNO',
      info: 'Posee un sistema de anillos formados por miles de millones de pedazos de hielo y roca.',
      pregunta: '¿De que estan compuestos sus anillos?',
      a: 'A) Hielo y Roca',
      b: 'B) Polvo de Carbon',
      correcta: 'A',
      proxX: 36
    },
    {
      id: 'urano',
      nombre: 'URANO',
      info: 'Tiene una inclinacion de eje de 98 grados, haciendo que gire de lado sobre su orbita.',
      pregunta: '¿Como rota Urano sobre su orbita?',
      a: 'A) Inclinado de lado',
      b: 'B) En posicion vertical',
      correcta: 'A',
      proxX: 45
    },
    {
      id: 'neptuno',
      nombre: 'NEPTUNO',
      info: 'Es el mundo mas lejano del Sol y posee los vientos mas violentos del sistema (>2.000 km/h).',
      pregunta: '¿Neptuno posee vientos de gran velocidad?',
      a: 'A) Si, supera 2000 km/h',
      b: 'B) No, es pacifico',
      correcta: 'A',
      proxX: null
    }
  ];

  datosPlanetas.forEach((p, idx) => {
    const el = document.querySelector('#' + p.id);
    if (el) {
      el.addEventListener('click', () => {
        if (idx !== indicePlanetaActual) return;
        mostrarContexto(p);
      });
    }
  });

  function mostrarContexto(p) {
    // Posicionar el panel flotando justo enfrente del jugador en el espacio 3D
    panel.setAttribute('position', `${posicionXJugador} 2 2`);
    panel.setAttribute('visible', 'true');
    tituloPanel.setAttribute('value', p.nombre);
    textoPanel.setAttribute('value', p.info);

    btnA.setAttribute('visible', 'false');
    btnB.setAttribute('visible', 'false');
    btnContinuar.setAttribute('visible', 'true');
  }

  btnContinuar.addEventListener('click', () => {
    const p = datosPlanetas[indicePlanetaActual];
    btnContinuar.setAttribute('visible', 'false');

    tituloPanel.setAttribute('value', 'PREGUNTA');
    textoPanel.setAttribute('value', p.pregunta);
    txtA.setAttribute('value', p.a);
    txtB.setAttribute('value', p.b);

    btnA.setAttribute('visible', 'true');
    btnB.setAttribute('visible', 'true');
  });

  function responder(opcion) {
    const p = datosPlanetas[indicePlanetaActual];
    btnA.setAttribute('visible', 'false');
    btnB.setAttribute('visible', 'false');

    if (opcion === p.correcta) {
      puntos += 100;
      textoPuntaje.setAttribute('value', 'PUNTOS: ' + puntos);
      tituloPanel.setAttribute('value', '¡CORRECTO! +100 PTS');
      textoPanel.setAttribute('value', 'Avanzando al siguiente planeta...');
    } else {
      tituloPanel.setAttribute('value', 'INCORRECTO');
      textoPanel.setAttribute('value', 'Avanzando al siguiente planeta...');
    }

    setTimeout(() => {
      panel.setAttribute('visible', 'false');
      if (p.proxX !== null) {
        desplazarJugador(p.proxX);
        indicePlanetaActual++;
      } else {
        tituloPanel.setAttribute('value', '¡EXPEDICION COMPLETA!');
        textoPanel.setAttribute('value', 'Puntaje final acumulado: ' + puntos);
        panel.setAttribute('visible', 'true');
      }
    }, 2200);
  }

  btnA.addEventListener('click', () => responder('A'));
  btnB.addEventListener('click', () => responder('B'));

  function desplazarJugador(destinoX) {
    posicionXJugador = destinoX;
    jugador.setAttribute('animation', `property: position; to: ${destinoX} 2 4; dur: 3000; easing: easeInOutCubic`);
  }

});