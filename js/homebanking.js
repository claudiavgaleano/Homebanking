//Declaración de variables

//Usuario

var codigoDeSeguridad = "2327";
var nombreUsuario = "Galeano, Claudia";
var saldoCuenta = 3500;
var limiteExtraccion = 5000;
var saldoHistorico = saldoCuenta;

//Servicios
var servicioAgua = 350;
var servicioTelefono = 425;
var servicioLuz = 210;
var servicioInternet = 570;

//Cuentas amigas
var cuentaAmiga1 = "1234567";
var cuentaAmiga2 = "7654321";

var dolar = 45;




//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
	iniciarSesion(prompt("Ingrese su código de seguridad"));
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}


//Funciones que tenes que completar

function sumarACuenta(movimiento) {	
	saldoCuenta += movimiento;
	actualizarSaldoEnPantalla();
}


function restarACuenta(movimiento) {
	movimiento *= (-1);
	sumarACuenta(movimiento);
}

function cambiarLimiteDeExtraccion(limiteDeExtraccion) {
	limiteDeExtraccion = parseInt(limiteDeExtraccion);

	if (!limiteDeExtraccion) {
		alert("Debe ingresar un nuevo límite de extracción");
	} else if (typeof limiteDeExtraccion === 'number') {
		if( limiteDeExtraccion < 0){
			alert("Debe ingresar un monto positivo");
		} else {
			limiteExtraccion = limiteDeExtraccion;
			actualizarLimiteEnPantalla();				
		}
	} else {
		alert("Debe ingresar un nuevo límite de extracción");
	}
}


function extraerDinero(extraccion) {
	extraccion = parseInt(extraccion);
	

	if (!extraccion) {
		alert("Debe ingresar un monto a extraer");
	} else if (typeof extraccion === 'number') {
		if ( extraccion < 0) {
			alert("Debe extraer un monto positivo");
		} else {
			if (extraccion <= saldoCuenta) {
				if (extraccion <= limiteExtraccion) {
					if (extraccion % 100 == 0) {				
						restarACuenta(extraccion);
						alert("Has retirado: $" + extraccion + "\nSaldo Anterior: $" + saldoHistorico + "\nSaldo Actual: $" + saldoCuenta );				
					} else {
						alert("Sólo puedes extraer billetes de $100");
					}

				} else {
					alert("La cantidad de dinero que deseas extraer es mayor a tu límite de extracción");
				}
			} else {
				alert("No hay saldo disponible en tu cuenta para extraer esa cantidad de dinero");
			}				
		}
	} 
}


function depositarDinero(deposito) {
	deposito = parseInt(deposito);

	if (!deposito) {
		alert( "Debe ingresar un monto a depositar");
	} else if (typeof deposito === 'number') {
		if (deposito < 0) {
			alert ("Debe depositar un monto positivo");
		} else {			
			sumarACuenta(deposito);		
			alert("Has depositado: $" + deposito + "\nSaldo Anterior: $" + saldoHistorico + "\nSaldo Actual: $" + saldoCuenta );			
		}
	}
}

function depositarCheques(numeroCheque) {		
	numeroChequeLongitud = numeroCheque.length;
	numeroCheque = parseInt (numeroCheque);

	if (numeroChequeLongitud == 10 && typeof numeroCheque === 'number' && numeroCheque > 0) {
		var montoCheque = prompt('Ingrese el monto del cheque')
		montoCheque = parseInt(montoCheque);
		if (!montoCheque) {
			alert( "Debe ingresar un monto a depositar");
		} else  if (typeof montoCheque === 'number') {
			if (montoCheque < 0) {
				alert ("Debe depositar un monto positivo");
			} else {				
				sumarACuenta(montoCheque);
				alert("Has depositado el cheque: " + numeroCheque + " \nMonto del cheque: $" + montoCheque + "\nSaldo Anterior: $" + saldoHistorico + "\nSaldo Actual: $" + saldoCuenta);			
			}
		} else {
			alert("Debe ingresar un monto numérico");
		}		
	} else {
		alert ("El número del cheque debe contener 10 dígitos numéricos");
	}

}


function pagarServicio(servicio) {	
	switch (servicio){
		case "1":
			abonarServicio(servicioAgua, "Agua");			
		break;
		case "2":
			abonarServicio(servicioLuz, "Luz");
		break;
		case "3":
			abonarServicio(servicioInternet, "Internet");
		break;
		case "4":
			abonarServicio(servicioTelefono, "Teléfono");
		break;
		default:
			alert("No existe el servicio que se ha seleccionado");
	}
}


function abonarServicio(costo, nombre) {

	if (saldoCuenta < costo) {
		 alert("No hay suficiente saldo en su cuenta para pagar este servicio");
	} else {
		restarACuenta(costo);
		alert("Has pagado el servicio de " + nombre + ": $" + costo + "\nSaldo Anterior: $" + saldoHistorico + "\nSaldo Actual: $" + saldoCuenta );		
	}
}


function transferirDinero(transferencia) {
	transferencia = parseInt(transferencia);

	if (!transferencia) {
		alert("Debe ingresar un monto a transferir");

	} else if ( typeof transferencia === 'number') {	
		if ( transferencia < 0) {
			alert ("Debe transferir un monto positivo");
		} else {
			if (transferencia <= saldoCuenta) {
				numeroCuenta = prompt("Ingrese el número de cuenta");
				if (numeroCuenta == cuentaAmiga1 || numeroCuenta == cuentaAmiga2) {
					restarACuenta(transferencia);
					alert("Se ha transferido $" + transferencia + "\nCuenta destino: " + numeroCuenta);
				} else {
					alert("Solo puede transferirse dinero a una cuenta amiga");
				}
			} else {
				alert("No puede transferirse esa cantidad de dinero");
			}			
		}
	}
}





function comprarDolares(dolares) {	
	dolares = parseInt(dolares);

	if (!dolares) {
		alert("Ingrese una cantidad de dólares a adquirir");
	} else if ( typeof dolar === 'number') {
		var pesosRestados = dolares * dolar;

		 if (pesosRestados > saldoCuenta) {
			alert("No tiene saldo suficiente para comprar esta cantidad de dólares");
		 } else {
			restarACuenta(pesosRestados);
			alert("Ha comprado USD $" + dolares + 
			"\nSe han restado de su cuenta $" + pesosRestados + 
			"\nEl valor actual del dolar es $" + dolar);
		 }
	}	
}


function iniciarSesion(codigoIngresado) {
	if (codigoIngresado == codigoDeSeguridad) {
		alert("Bienvenido/a " + nombreUsuario + ". Ya puedes comenzar a realizar operaciones");
	} else {
		saldoCuenta = 0;
		alert("Código incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad");
	}
}


//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}