const fs = require('fs')

class Contenedor{
    constructor(archivo){
        this.filename = archivo
        this.productos = []
        this.nuevoID = 1
    }

    async iniciar() {
        try {
            const datos = await this.leerArchivo()
            if (datos.length > 0){
                this.productos = datos
                this.nuevoID = this.productos[datos.length-1].id + 1
            }
        } catch(err){
            console.log("Error en lectura, verifique la consola")
            console.log(err)
        }
    }

    async guardar(item){
        item.id = this.nuevoID
        this.productos.push(item)
        this.nuevoID++

        try{
            await this.escribirArchivo()
        }catch(err){
            console.log("Error en guardado, verifique la consola")
            console.log(err)
        }
    }

    buscarTodos(){
        return this.productos
    }

    buscarId(id){
        const datos = this.productos.find(prod => prod.id == id)
        return datos ? datos : null
    }

    async borrarId(id){
        const buscador = this.productos.findIndex(prod =>prod.id == id)
        this.productos.splice(buscador, 1)

    try{
        await this.escribirArchivo()
    }catch(err){
        alert("Error en guardado, verifique la consola")
        console.log(err)
    }
    }

    borrarTodo(){
        this.productos=[]
        try{
            this.escribirArchivo()
        }catch(err){
            console.log("Error en guardado, verifique la consola")
            console.log(err)
        }
    }
    
    async leerArchivo(){
        return fs.promises.readFile(this.filename, "utf-8")
        .then(datos => JSON.parse(datos))
    }
    escribirArchivo(){
        return fs.promises.writeFile(this.filename, JSON.stringify(this.productos))
    }
}

module.exports = Contenedor