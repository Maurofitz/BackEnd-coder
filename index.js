class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
 
    getFullName() { 
        return `${this.nombre} ${this.apellido}`; 
    }

    addMascota(nombre) { 
        this.mascotas.push(nombre); 
    }

    countMascotas() { 
        return this.mascotas.length; 
    }

    addBook(nombre, autor) { 
        this.libros.push({nombre, autor}); 
    }

    getBookNames() { 
        return this.libros.map(libro => libro.nombre); 
    }

}

let usuario = new Usuario("Mauro", "Fitz Maurice", [], []);

usuario.addMascota("Perro"); 
usuario.addMascota("Gato"); 
usuario.addMascota("Pajaro"); 

usuario.addBook("Harry Potter", "J. K. Rowling"); 
usuario.addBook("El principito", " Antoine de Saint-Exupéry"); 

console.log("El usuario es: ",usuario); 
console.log("Cantidad de mascotas: ", usuario.countMascotas());
console.log("Nombre de libros: ", usuario.getBookNames()); 