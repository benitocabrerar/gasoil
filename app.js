// Almacenamiento local de registros
let registros = JSON.parse(localStorage.getItem('registrosGasoil')) || [];

// Referencias a elementos del DOM
const gasoilForm = document.getElementById('gasoilForm');
const consumoTotalElement = document.getElementById('consumoTotal');
const gastoTotalElement = document.getElementById('gastoTotal');
const promedioMensualElement = document.getElementById('promedioMensual');

// Función para guardar registros en localStorage
function guardarRegistros() {
    localStorage.setItem('registrosGasoil', JSON.stringify(registros));
}

// Función para actualizar estadísticas
function actualizarEstadisticas() {
    // Calcular consumo total
    const consumoTotal = registros.reduce((total, registro) => total + parseFloat(registro.cantidad), 0);
    consumoTotalElement.textContent = `${consumoTotal.toFixed(2)} L`;

    // Calcular gasto total
    const gastoTotal = registros.reduce((total, registro) => {
        return total + (parseFloat(registro.cantidad) * parseFloat(registro.precio));
    }, 0);
    gastoTotalElement.textContent = `$${gastoTotal.toFixed(2)}`;

    // Calcular promedio mensual
    const mesesUnicos = new Set(registros.map(registro => {
        const fecha = new Date(registro.fecha);
        return `${fecha.getFullYear()}-${fecha.getMonth()}`;
    }));
    const promedioMensual = consumoTotal / Math.max(mesesUnicos.size, 1);
    promedioMensualElement.textContent = `${promedioMensual.toFixed(2)} L`;
}

// Manejador del formulario
gasoilForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener valores del formulario
    const fecha = this.fecha.value;
    const cantidad = parseFloat(this.cantidad.value);
    const precio = parseFloat(this.precio.value);

    // Crear nuevo registro
    const nuevoRegistro = {
        fecha,
        cantidad,
        precio,
        total: cantidad * precio
    };

    // Agregar al array de registros
    registros.push(nuevoRegistro);

    // Guardar en localStorage
    guardarRegistros();

    // Actualizar estadísticas
    actualizarEstadisticas();

    // Limpiar formulario
    this.reset();

    // Mostrar mensaje de éxito
    alert('Registro guardado exitosamente');
});

// Inicializar estadísticas al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    actualizarEstadisticas();
});