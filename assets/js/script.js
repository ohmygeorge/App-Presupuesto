import { v4 as uuidv4 } from "https://jspm.dev/uuid";

function Finanzas() {
    this.presupuesto = 0;
    this.gastos = [];
    this.saldo = function () {
        return this.presupuesto - this.totalGastos();
    };
    this.totalGastos = function () {
        let totalGastos = 0;
        this.gastos.forEach((gasto) => {
            totalGastos += gasto.monto;
        });

        return totalGastos;
    };
    this.agregarGasto = function (gasto) {
        if (this.presupuesto - gasto.monto < 0) {
            alert("Usted no tiene presupuesto para comprar: " + gasto.glosa);
        } else {
            this.gastos.push(gasto);
        }
    };

    this.agregarPresupuesto = function (monto) {
        this.presupuesto += monto;
    };
}

function Gasto(glosa, monto) {
    this.id = uuidv4().slice(0, 6);
    this.glosa = glosa;
    this.monto = monto;
}

let misFinanzas = new Finanzas();

let formGasto = document.getElementById("formGasto");
formGasto.addEventListener("submit", function (event) {
    event.preventDefault();
    let glosa = nombreGasto.value;
    let monto = parseFloat(cantidadGasto.value);
    let nuevoGasto = new Gasto(glosa, monto);
    misFinanzas.agregarGasto(nuevoGasto);
    formGasto.reset();
    actualizarVista();
});

let formDataUsuario = document.getElementById("formDataUsuario");

formDataUsuario.addEventListener("submit", function (event) {
    event.preventDefault();
    let presupuesto = parseInt(
        document.querySelector("#presupuestoInicial").value
    );
    misFinanzas.agregarPresupuesto(presupuesto);
    formDataUsuario.reset();
    actualizarVista();
});


const actualizarVista = () => {
  
    let presupuesto = document.querySelector("#presupuesto");
    let gastos = document.querySelector("#gastos");
    let saldo = document.querySelector("#saldo");
    presupuesto.innerText = misFinanzas.presupuesto;
    gastos.innerText = misFinanzas.totalGastos();
    saldo.innerText = misFinanzas.saldo();

    let cuerpoTablaGastos = document.getElementById("cuerpoTablaGastos");
    cuerpoTablaGastos.innerHTML = "";
    let filas = "";
    misFinanzas.gastos.forEach((gasto, index) => {
        filas += `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${gasto.glosa}</td>
                <td>${gasto.monto}</td>
               
            </tr> 
        `;
    });
    cuerpoTablaGastos.innerHTML = filas;
};

function llenarTabla() {
    let cuerpoTabla = document.querySelector("#tablaGastos table tbody");
    console.log(cuerpoTabla);
    cuerpoTabla.style.display = "block";

    let acumulador = "";
    const gastosGuardados = JSON.parse(localStorage.getItem("gastos"));

    console.log(gastosGuardados.length);

    gastosGuardados.forEach(function (usuario, index) {
        acumulador += `
            <tr>
                <th scope="row">${1}</th>
                <td>dfdfdfdffd</td>
               
            </tr> 
        `;
    });

    cuerpoTabla.innerHTML = acumulador;
}
