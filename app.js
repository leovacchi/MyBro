document.addEventListener("DOMContentLoaded", function () {
    const nuevaTareaInput = document.getElementById("nuevaTarea");
    const agregarTareaBtn = document.getElementById("agregarTarea");
    const listaTareas = document.getElementById("listaTareas");

    // Recupera las tareas almacenadas en localStorage
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

    // Carga las tareas almacenadas en la página
    cargarTareas();
  

    agregarTareaBtn.addEventListener("click", function () {
        const nuevaTareaTexto = nuevaTareaInput.value.trim();

        if (nuevaTareaTexto !== "") {
            agregarTarea(nuevaTareaTexto);
            nuevaTareaInput.value = "";
        }
    });

    nuevaTareaInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            const nuevaTareaTexto = nuevaTareaInput.value.trim();

            if (nuevaTareaTexto !== "") {
                agregarTarea(nuevaTareaTexto);
                nuevaTareaInput.value = "";
            }
        }
    });

    listaTareas.addEventListener("click", function (e) {
        if (e.target.classList.contains("completar")) {
            const tareaElement = e.target.closest("li"); // Obtén el elemento <li> padre
            const tareaIndex = tareaElement.getAttribute("data-index");
    
            // Verifica si la tareaIndex es un índice válido en el arreglo de tareas
            if (tareaIndex !== null && tareaIndex >= 0 && tareaIndex < tareas.length) {
                // Cambia el estado de la tarea (completada o no completada)
                tareas[tareaIndex].completada = !tareas[tareaIndex].completada;
                guardarTareas();
                cargarTareas();
            }
        } else if (e.target.classList.contains("eliminar")) {
            const tareaElement = e.target.closest("li"); // Obtén el elemento <li> padre
            const tareaIndex = tareaElement.getAttribute("data-index");
    
            // Verifica si la tareaIndex es un índice válido en el arreglo de tareas
            if (tareaIndex !== null && tareaIndex >= 0 && tareaIndex < tareas.length) {
                const confirmarEliminar = confirm("¿Estás seguro de que deseas eliminar esta tarea?");
    
                if (confirmarEliminar) {
                    // Elimina la tarea del arreglo
                    tareas.splice(tareaIndex, 1);
                    guardarTareas();
                    cargarTareas();
                }
            }
        }
    });
    

    function agregarTarea(texto) {
        const nuevaTarea = {
            texto: texto,
            completada: 0
        };

        tareas.push(nuevaTarea);
        guardarTareas();
        cargarTareas();
    }

    function guardarTareas() {
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }

    function cargarTareas() {
        listaTareas.innerHTML = "";

        tareas.forEach(function (tarea, index) {
            const nuevaTarea = document.createElement("li");
            nuevaTarea.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
            nuevaTarea.setAttribute("data-index", index);

            const spanTexto = document.createElement("span");
            spanTexto.classList.add("tarea-texto");
            spanTexto.textContent = tarea.texto;

            const spanBotones = document.createElement("span");

            const botonCompletar = document.createElement("button");
            botonCompletar.classList.add("btn", "btn-success", "btn-sm", "completar");
            botonCompletar.textContent = tarea.completada ? "Desmarcar" : "Completar";

            const botonEliminar = document.createElement("button");
            botonEliminar.classList.add("btn", "btn-danger", "btn-sm", "eliminar");
            botonEliminar.textContent = "Eliminar";

            spanBotones.appendChild(botonCompletar);
            spanBotones.appendChild(botonEliminar);

            nuevaTarea.appendChild(spanTexto);
            nuevaTarea.appendChild(spanBotones);

            if (tarea.completada) {
                nuevaTarea.classList.add("completada");
            }

            listaTareas.appendChild(nuevaTarea);
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const formularioTransaccion = document.getElementById("formularioTransaccion");
    const cantidadInput = document.getElementById("cantidad");
    const descripcionInput = document.getElementById("descripcion");
    const listaTransacciones = document.getElementById("listaTransacciones");
    const totalDineroEnMano = document.getElementById("totalDineroEnMano");

    let transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
    calcularTotalDinero();

    formularioTransaccion.addEventListener("submit", function (e) {
        e.preventDefault();

        const cantidad = parseFloat(cantidadInput.value);
        const descripcion = descripcionInput.value.trim();

        if (!isNaN(cantidad) && descripcion !== "") {
            agregarTransaccion(cantidad, descripcion);
            cantidadInput.value = "";
            descripcionInput.value = "";
        }
    });

    function agregarTransaccion(cantidad, descripcion) {
        const nuevaTransaccion = {
            cantidad: cantidad,
            descripcion: descripcion
        };
        transacciones.push(nuevaTransaccion);
        guardarTransacciones();
        cargarTransacciones();
        calcularTotalDinero();
    }

    function guardarTransacciones() {
        localStorage.setItem("transacciones", JSON.stringify(transacciones));
    }

    function cargarTransacciones() {
        listaTransacciones.innerHTML = "";

        transacciones.forEach(function (transaccion, index) {
            const nuevaTransaccion = document.createElement("li");
            nuevaTransaccion.classList.add("list-group-item");
            nuevaTransaccion.innerHTML = `${transaccion.descripcion}: $${transaccion.cantidad}`;
            listaTransacciones.appendChild(nuevaTransaccion);
        });
    }

    function calcularTotalDinero() {
        const saldoTotal = transacciones.reduce(function (total, transaccion) {
            return total + transaccion.cantidad;
        }, 0);

        totalDineroEnMano.textContent = `Efectivo: $${saldoTotal.toFixed(2)}`;
    }
      cargarTransacciones();
});
