document.getElementById('cantidadForm').addEventListener('submit', generarFormulario);

function generarFormulario(event) {
  event.preventDefault(); 

  var cantidadInput = document.getElementById('cantidad');
  var cantidadAlumnos = parseInt(cantidadInput.value);

  if (cantidadAlumnos > 0) {
    var formContainer = document.getElementById('formContainer');
    formContainer.innerHTML = ''; 

    var notasMatematicas = [];
    var notasFisica = [];
    var notasProgramacion = [];

    for (var i = 0; i < cantidadAlumnos; i++) {
      var formulario = document.createElement('form');
      formulario.classList.add('alumnoForm');
      formulario.innerHTML = `
        <h2>👩‍💻Alumno ${i + 1}</h2>
        <label for="cedula${i}">Cédula de Identidad:</label>
        <input type="text" id="cedula${i}" required pattern="[0-9]+" title="Ingrese solo números">

        <label for="nombre${i}">Nombre del Alumno:</label>
        <input type="text" id="nombre${i}" required pattern="[A-Za-z]+" title="Ingrese solo letras">

        <label for="matematicas${i}">Nota de Matemáticas:</label>
        <input type="number" id="matematicas${i}" min="1" max="20" required>

        <label for="fisica${i}">Nota de Física:</label>
        <input type="number" id="fisica${i}" min="1" max="20" required>

        <label for="programacion${i}">Nota de Programación:</label>
        <input type="number" id="programacion${i}" min="1" max="20" required>
      `;

      formContainer.appendChild(formulario);
      notasMatematicas.push(document.getElementById(`matematicas${i}`));
      notasFisica.push(document.getElementById(`fisica${i}`));
      notasProgramacion.push(document.getElementById(`programacion${i}`));
    }

    var resultadoDiv = document.createElement('div');
    resultadoDiv.id = 'resultado';
    resultadoDiv.classList.add('resultado');
    formContainer.appendChild(resultadoDiv);

    var mostrarPromedioButton = document.createElement('button');
    mostrarPromedioButton.textContent = 'Mostrar Promedio';
    mostrarPromedioButton.addEventListener('click', function() {
      if (validarFormulario(cantidadAlumnos)) {
        calcularPromedio(notasMatematicas, notasFisica, notasProgramacion, resultadoDiv);
        contarAprobadosAplazados(notasMatematicas, notasFisica, notasProgramacion, resultadoDiv);
        contarAprobadosTodasMaterias(notasMatematicas, notasFisica, notasProgramacion, resultadoDiv);
        contarAprobadosUnaMateria(notasMatematicas, notasFisica, notasProgramacion, resultadoDiv);
        contarAprobadosDosMaterias(notasMatematicas, notasFisica, notasProgramacion, resultadoDiv);
        obtenerNotaMaxima(notasMatematicas, notasFisica, notasProgramacion, resultadoDiv);
      }
    });
    formContainer.appendChild(mostrarPromedioButton);
  }
}

function validarFormulario(cantidadAlumnos) {
  for (var i = 0; i < cantidadAlumnos; i++) {
    var cedulaInput = document.getElementById(`cedula${i}`);
    var nombreInput = document.getElementById(`nombre${i}`);
    var matematicasInput = document.getElementById(`matematicas${i}`);
    var fisicaInput = document.getElementById(`fisica${i}`);
    var programacionInput = document.getElementById(`programacion${i}`);

    if (!cedulaInput.checkValidity()) {
      alert('Por favor, ingrese solo números en la cédula de identidad.');
      return false;
    }

    if (!nombreInput.checkValidity()) {
      alert('Por favor, ingrese solo letras en el nombre del alumno.');
      return false;
    }

    if (matematicasInput.value < 1 || matematicasInput.value > 20 ||
        fisicaInput.value < 1 || fisicaInput.value > 20 ||
        programacionInput.value < 1 || programacionInput.value > 20) {
      alert('Por favor, ingrese notas válidas (entre 1 y 20) para cada materia.');
      return false;
    }
  }

  return true;
}

function calcularPromedio(notasMatematicas, notasFisica, notasProgramacion, resultadoDiv) {
  var promedioMatematicas = calcularPromedioMateria(notasMatematicas);
  var promedioFisica = calcularPromedioMateria(notasFisica);
  var promedioProgramacion = calcularPromedioMateria(notasProgramacion);

  resultadoDiv.innerHTML = `
  ✔️Nota promedio de cada materia:<br>
    Matemáticas: ${promedioMatematicas}<br>
    Física: ${promedioFisica}<br>
    Programación: ${promedioProgramacion}<br><br>
  `;
}

function calcularPromedioMateria(notas) {
  var suma = 0;

  for (var i = 0; i < notas.length; i++) {
    suma += parseInt(notas[i].value);
  }

  return (suma / notas.length).toFixed(2);
}

function contarAprobadosAplazados(notasMatematicas, notasFisica, notasProgramacion, resultadoDiv) {
  var aprobadosMatematicas = contarAprobadosMateria(notasMatematicas);
  var aprobadosFisica = contarAprobadosMateria(notasFisica);
  var aprobadosProgramacion = contarAprobadosMateria(notasProgramacion);

  var aplazadosMatematicas = contarAplazadosMateria(notasMatematicas);
  var aplazadosFisica = contarAplazadosMateria(notasFisica);
  var aplazadosProgramacion = contarAplazadosMateria(notasProgramacion);

  resultadoDiv.innerHTML += `
  ✔️Numero de alumnos aprobados en cada materia:<br>
    Matemáticas: ${aprobadosMatematicas}<br>
    Física: ${aprobadosFisica}<br>
    Programación: ${aprobadosProgramacion}<br><br>
    ✔️Numero de alumnos aplazados en cada materia:<br>
    Matemáticas: ${aplazadosMatematicas}<br>
    Física: ${aplazadosFisica}<br>
    Programación: ${aplazadosProgramacion}<br><br>
  `;
}

function contarAprobadosMateria(notas) {
  var aprobados = 0;

  for (var i = 0; i < notas.length; i++) {
    if (parseInt(notas[i].value) >= 10) {
      aprobados++;
    }
  }

  return aprobados;
}

function contarAplazadosMateria(notas) {
  var aplazados = 0;

  for (var i = 0; i < notas.length; i++) {
    if (parseInt(notas[i].value) <= 9) {
      aplazados++;
    }
  }

  return aplazados;
}

function contarAprobadosTodasMaterias(notasMatematicas, notasFisica, notasProgramacion, resultadoDiv) {
  var aprobadosTodasMaterias = 0;

  for (var i = 0; i < notasMatematicas.length; i++) {
    if (
      parseInt(notasMatematicas[i].value) >= 10 &&
      parseInt(notasFisica[i].value) >= 10 &&
      parseInt(notasProgramacion[i].value) >= 10
    ) {
      aprobadosTodasMaterias++;
    }
  }

  resultadoDiv.innerHTML += `✔️Numero de alumnos que aprobaron todas las materias: ${aprobadosTodasMaterias}<br><br>`;
}

function contarAprobadosUnaMateria(notasMatematicas, notasFisica, notasProgramacion, resultadoDiv) {
  var aprobadosUnaMateria = 0;

  for (var i = 0; i < notasMatematicas.length; i++) {
    if (
      (parseInt(notasMatematicas[i].value) >= 10 && parseInt(notasFisica[i].value) < 10 && parseInt(notasProgramacion[i].value) < 10) ||
      (parseInt(notasMatematicas[i].value) < 10 && parseInt(notasFisica[i].value) >= 10 && parseInt(notasProgramacion[i].value) < 10) ||
      (parseInt(notasMatematicas[i].value) < 10 && parseInt(notasFisica[i].value) < 10 && parseInt(notasProgramacion[i].value) >= 10)
    ) {
      aprobadosUnaMateria++;
    }
  }

  resultadoDiv.innerHTML += `✔️Numero de alumnos que aprobaron una sola materia: ${aprobadosUnaMateria}<br><br>`;
}

function contarAprobadosDosMaterias(notasMatematicas, notasFisica, notasProgramacion, resultadoDiv) {
  var aprobadosDosMaterias = 0;

  for (var i = 0; i < notasMatematicas.length; i++) {
    if (
      (parseInt(notasMatematicas[i].value) >= 10 && parseInt(notasFisica[i].value) >= 10 && parseInt(notasProgramacion[i].value) < 10) ||
      (parseInt(notasMatematicas[i].value) >= 10 && parseInt(notasFisica[i].value) < 10 && parseInt(notasProgramacion[i].value) >= 10) ||
      (parseInt(notasMatematicas[i].value) < 10 && parseInt(notasFisica[i].value) >= 10 && parseInt(notasProgramacion[i].value) >= 10)
    ) {
      aprobadosDosMaterias++;
    }
  }

  resultadoDiv.innerHTML += `✔️Numero de alumnos que aprobaron dos materias: ${aprobadosDosMaterias}<br><br>`;
}

function obtenerNotaMaxima(notas) {
  var maximaNota = parseInt(notas[0].value);

  for (var i = 1; i < notas.length; i++) {
    var notaActual = parseInt(notas[i].value);

    if (notaActual > maximaNota) {
      maximaNota = notaActual;
    }
  }

  return maximaNota;
}


function contarAprobadosDosMaterias(notasMatematicas, notasFisica, notasProgramacion, resultadoDiv) {
  var aprobadosDosMaterias = 0;

  for (var i = 0; i < notasMatematicas.length; i++) {
    if (
      (parseInt(notasMatematicas[i].value) >= 10 && parseInt(notasFisica[i].value) >= 10 && parseInt(notasProgramacion[i].value) < 10) ||
      (parseInt(notasMatematicas[i].value) >= 10 && parseInt(notasFisica[i].value) < 10 && parseInt(notasProgramacion[i].value) >= 10) ||
      (parseInt(notasMatematicas[i].value) < 10 && parseInt(notasFisica[i].value) >= 10 && parseInt(notasProgramacion[i].value) >= 10)
    ) {
      aprobadosDosMaterias++;
    }
  }

  resultadoDiv.innerHTML += `✔️Numero de alumnos que aprobaron dos materias: ${aprobadosDosMaterias}<br><br>`;
  mostrarNotasMasAltas(notasMatematicas, notasFisica, notasProgramacion, resultadoDiv);
}

function mostrarNotasMasAltas(notasMatematicas, notasFisica, notasProgramacion, resultadoDiv) {
  var notaMasAltaMatematicas = obtenerNotaMaxima(notasMatematicas);
  var notaMasAltaFisica = obtenerNotaMaxima(notasFisica);
  var notaMasAltaProgramacion = obtenerNotaMaxima(notasProgramacion);

  resultadoDiv.innerHTML += `
  ✔️Nota maxima en cada materia:<br>
    Matemáticas: ${notaMasAltaMatematicas}<br>
    Física: ${notaMasAltaFisica}<br>
    Programación: ${notaMasAltaProgramacion}<br>
  `;
}

function obtenerNotaMaxima(notas) {
  var maximaNota = parseInt(notas[0].value);

  for (var i = 1; i < notas.length; i++) {
    var notaActual = parseInt(notas[i].value);

    if (notaActual > maximaNota) {
      maximaNota = notaActual;
    }
  }

  return maximaNota;
}
