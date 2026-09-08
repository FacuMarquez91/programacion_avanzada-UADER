//Ejercicio 1
console.log("Ejercicio 1")

const frutas = ["manzana", "banana", "pera"];


console.log("Array inicial:");
console.log(frutas);

console.log("\n")
console.log("Agregando 'naranja' al final");
frutas.push("naranja");
console.log(frutas);

console.log("\n")
console.log("Eliminando la última fruta");
const frutaEliminada = frutas.pop();
console.log(`Fruta eliminada: "${frutaEliminada}"`);
console.log(frutas);

//Ejercicio 2
console.log("\n")
console.log("Ejercicio 2")
const matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log("Matriz completa:");
console.log(matriz);

console.log("\n")
console.log("Elemento en la posición [1][1]:", matriz[1][1]); // 5


//Ejercicio 3
console.log("\n")
console.log("Ejercicio 3")
console.log("Lista de frutas:");
for (let i = 0; i < frutas.length; i++) {
    console.log(`   ${i + 1}. ${frutas[i]}`);
}
console.log("\n")
console.log(`Total: ${frutas.length} frutas`);

//Ejercicio 4
console.log("\n")
console.log("Ejercicio 4")
function elevarAlCuadrado(numeros) {
    return numeros.map(numero => numero * numero);
}

console.log("=== ELEVAR AL CUADRADO ===\n");

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const cuadrados = elevarAlCuadrado(numeros);

console.log("Array original:", numeros);
console.log("Array elevado al cuadrado:", cuadrados);


//Ejercicio 5
console.log("\n")
console.log("Ejercicio 5")
function filtrarMayoresDe(numeros, valorReferencia) {
    return numeros.filter(numero => numero > valorReferencia);
}

const numerosFiltro = [1, 5, 3, 8, 2, 10, 7, 4, 6, 9];
const valor = 5;

const mayores = filtrarMayoresDe(numerosFiltro, valor);

console.log("\n")
console.log("filtrar numeros mayores que");
console.log(`Array original: [${numerosFiltro.join(', ')}]`);
console.log(`Valor de referencia: ${valor}`);
console.log(`Números mayores que ${valor}: [${mayores.join(', ')}]`);


//Ejercicio 6
console.log("\n")
console.log("Ejercicio 6")
function sumarElementos(numeros) {
    return numeros.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
}

function ejecutarEjercicioSuma() {
    const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const resultado = sumarElementos(numeros);
    
    console.log("\n");
    console.log(`Array: [${numeros.join(', ')}]`);
    console.log(`Suma total: ${resultado}`);
}

ejecutarEjercicioSuma();


//Ejercicio 7
console.log("\n")
console.log("Ejercicio 7 ")
function ejecutarEjercicioSome() {
    const numeros = [3, 7, 12, 5, 9, 15, 2, 8];
   
    const hayMayorQue10 = numeros.some(numero => numero > 10);
    
    console.log("\n");
    console.log(`Array: [${numeros.join(', ')}]`);
    console.log(`¿Algún número es mayor que 10? ${hayMayorQue10 ? 'Sí' : 'No'}`);
 
    if (hayMayorQue10) {
        const mayores = numeros.filter(num => num > 10);
        console.log(`Números mayores que 10: [${mayores.join(', ')}]`);
    }
}

ejecutarEjercicioSome();

//Ejercicio 8
console.log("\n")
console.log("Ejercicio 8")
function ejecutarEjercicioEvery() {
    const numeros = [3, 7, 12, 5, 9, 15, 2, 8];
    
    const todosPositivos = numeros.every(numero => numero > 0);
    
    console.log("=== VERIFICAR CON EVERY ===\n");
    console.log(`Array: [${numeros.join(', ')}]`);
    console.log(`¿Todos los números son positivos? ${todosPositivos ? 'Sí' : 'No'}`);
}

ejecutarEjercicioEvery();

//Ejercicio 9 
console.log("\n")
console.log("Ejercicio 9")
function ejecutarEjercicioFind() {
    const personas = [
        { nombre: "Ana", edad: 25 },
        { nombre: "Carlos", edad: 32 },
        { nombre: "María", edad: 28 },
        { nombre: "Juan", edad: 35 },
        { nombre: "Laura", edad: 22 },
        { nombre: "Pedro", edad: 40 }
    ];

    const personaEncontrada = personas.find(persona => persona.edad > 30);
    
    console.log("\n");
    console.log("Lista de personas:");
    personas.forEach(p => console.log(`   ${p.nombre} (${p.edad} años)`));
    
    if (personaEncontrada) {
        console.log("\n");
        console.log(`Primera persona mayor de 30 años:`);
        console.log(`   Nombre: ${personaEncontrada.nombre}`);
        console.log(`   Edad: ${personaEncontrada.edad} años`);
    } else {
        console.log("\n");
        console.log("No se encontró ninguna persona mayor de 30 años");
    }
}

ejecutarEjercicioFind();

//Ejercicio 10
console.log("\n");
console.log("Ejercicio 10");
function ejecutarEjercicioSort() {
    const palabras = ["manzana", "banana", "pera", "naranja", "uva", "sandía", "kiwi"];
    console.log("Array original:", palabras);
    palabras.sort();
    console.log("Array ordenado:", palabras);
}

ejecutarEjercicioSort();