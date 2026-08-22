// Ejercicio 1
console.log("Ejercicio 1")
const libro = {
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    _añoDePublicacion: 1943,

    get añoDePublicacion() {
        return this._añoDePublicacion;
    },
    
    
    set añoDePublicacion(nuevoAño) {
        if (typeof nuevoAño !== 'number') {
            console.log("Error: El año debe ser un número");
            return;
        }
        
        if (nuevoAño < 1900 || nuevoAño > new Date().getFullYear()) {
            console.log(`Error: El año debe estar entre 1900 y ${new Date().getFullYear()}`);
            return;
        }
        
        this._añoDePublicacion = nuevoAño;
        console.log(`Año de publicación actualizado a ${nuevoAño}`);
    },


    descripcion: function() {
        return `"${this.titulo}" es un libro escrito por ${this.autor}.`;
    }


};

console.log(libro.titulo);
console.log(libro.autor);
console.log(libro.año);

// Ejercicio 2
console.log("Ejercicio 2")
const estudiante = {
    nombre: "Juan",
    edad: 20,
    direccion: {
        calle: "Posadas 123",
        ciudad: "Concepcion del uruguay",
        pais: "Argentina"
    }
};

console.log(`Dirección completa: ${estudiante.direccion.calle}, ${estudiante.direccion.ciudad}, ${estudiante.direccion.pais}`);

// Ejercicio 3
console.log("Ejercicio 3");
 console.log(libro.descripcion());

 //Ejercicio 4
console.log("Ejercicio 4");
const producto = {
    nombre: "Camiseta",
    precio: 73.000,
    disponible: 50,

};

for (let propiedad in producto) {
    console.log(`${propiedad}: ${producto[propiedad]}`);
}


// Ejercicio 5
console.log("Ejercicio 5");
producto.precio = 64.000;
console.log(`Nuevo precio: ${producto.precio}`);

// Ejercicio 6
console.log("Ejercicio 6");
function tienePropiedad(objeto, propiedad) {
    return propiedad in objeto;
}
console.log(tienePropiedad(producto, "nombre"));

// Ejercicio 7
console.log("Ejercicio 7");
delete producto.disponible;
console.log(producto);

// Ejercicio 8
console.log("Ejercicio 8");
const persona1 = {
    nombre: "Juan",
    edad: 30,
    ciudad: "Concepcion del uruguay"
};
console.log(persona1);

const persona2 = {
    profesion: "Ingeniero",
    Hobby: "Futbol"
};
console.log(persona2);

const personaCombinada = Object.assign({}, persona1, persona2);
console.log(personaCombinada);

// Ejercicio 9
console.log("Ejercicio 9");
const copiaEstudiante = JSON.parse(JSON.stringify(estudiante));
console.log("Objeto copiado:", copiaEstudiante);
console.log("Objeto original:", estudiante);

// Ejercicio 10
console.log("Ejercicio 10");
console.log(`Año original: ${libro.añoDePublicacion}`);
libro.añoDePublicacion = 1982;
console.log(`Año actualizado: ${libro.añoDePublicacion}`);