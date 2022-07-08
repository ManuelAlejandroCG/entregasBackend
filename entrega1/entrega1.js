class Usuario{
    constructor (nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return this.nombre + " " + this.apellido
    }

    addMascota(mascotaNueva){
         this.mascotas.push(mascotaNueva);
     }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(libroNuevo){
        this.libros.push(libroNuevo);
    }

    getBookNames(){
            const listaDeNombres = this.libros.map(function(items){return items.title}) 
        return listaDeNombres
    }
}

const usuario = new Usuario("Arturo", "De Leon",[{title:"Harry Potter", author:"J.k. Rowling"},{title:"Lord of the rings", author:"J.R.R. Tolkien"}], [("Panchito")])
console.log("Condición inicial")
console.log(usuario)
console.log("-----------")
console.log("EL usuario se llama " + usuario.getFullName());
usuario.addMascota("Pudin");
console.log(usuario.getFullName() +  " tiene " + usuario.countMascotas() + " mascotas");
usuario.addBook({title:"The da Vinci Code", author:"Dan Brown"})
console.log(usuario.getFullName() + " posee los libros: " + usuario.getBookNames());
console.log("-----------")
console.log(usuario)
