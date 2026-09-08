//Ejercicio 1
console.log("Ejercicio 1");
function sumar(a,b) {
    return a + b;
}

console.log("La suma de 5 y 3 es: " + sumar(5,3));
console.log("La suma de 10 y 20 es: " + sumar(10,20));
console.log("La suma de -5 y 5 es: " + sumar(-5,5));
console.log("La suma de 7 y 0 es: " + sumar(7,0));


// Ejercicio 2
console.log("Ejercicio 2");
function multiplicar (a,b) {
    return a * b;
}

console.log("La multiplicación de 5 y 3 es: " + multiplicar(5,3));
console.log("La multiplicación de 10 y 20 es: " + multiplicar(10,13));
console.log("La multiplicación de -5 y 5 es: " + multiplicar(15,5));
console.log("La multiplicación de 7 y 0 es: " + multiplicar(7,9));  

// Ejercicio 3
console.log("Ejercicio 3");
function saludar(nombre = "invitado") {
    return `Hola, ${nombre}`;
}
console.log(saludar("Carlos"));
console.log(saludar("Patricia"));
console.log(saludar("Lorena"));

// Ejercicio 4
console.log("Ejercicio 4");
function crearPersona(nombre, edad) {
    return {
        nombre: nombre,
        edad: edad
    };
}

let persona1 = crearPersona("Juan", 25);
console.log(persona1);
let persona2 = crearPersona("María", 30);
console.log(persona2);

// Ejercicio 5
console.log("Ejercicio 5");
function actualizarEdad(persona, nuevaEdad) {
    persona.edad = nuevaEdad;
    return persona;
}

persona1 = actualizarEdad(persona1, 26);
console.log(`Edad actualizada de persona1: ${persona1.edad}`);

// Ejercicio 6
console.log("Ejercicio 6");
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}
console.log(`El factorial de 5 es: ${factorial(5)}`);
console.log(`El factorial de 9 es: ${factorial(9)}`);
console.log(`El factorial de 16 es: ${factorial(16)}`); 

//ejercicio 7
console.log("Ejercicio 7");
function despedir(adios) {
    function adios() {
        return "Adiós!";
    }
    return adios();

}

console.log(despedir());

//ejercicio 8
console.log("Ejercicio 8");
function procesarArray(array, funcion) {
    const resultado = [];
    for (let i = 0; i < array.length; i++) {
        resultado.push(funcion(array[i]));
    }
    return resultado;   

}

function multiplicarPorDos(numero) {
    return numero * 2;
}

const numeros = [1, 2, 3, 4, 5];
console.log("array original: ", numeros);

const resultado = procesarArray(numeros, multiplicarPorDos);
console.log("array procesado: ", resultado);

//ejercicio 9
console.log("Ejercicio 9");
function crearMultiplicador(x) {
    return function(y) {
        return x * y;
    };
}

const multiplicarPorTres = crearMultiplicador(3);
console.log(multiplicarPorTres(5));
const multiplicarPorCinco = crearMultiplicador(5);
console.log(multiplicarPorCinco(10));
const multiplicarPorDiez = crearMultiplicador(10);
console.log(multiplicarPorDiez(2));

//ejercicio 10
console.log("Ejercicio 10");
const sumarAnonima = function(a, b) {
    return a + b;
}

console.log("5 + 3 = " + sumarAnonima(5, 3));
console.log("15 + 20 = " + sumarAnonima(15, 20));
console.log("25 + 5 = " + sumarAnonima(25, 5));
console.log("7 + 14 " + sumarAnonima(7, 14));