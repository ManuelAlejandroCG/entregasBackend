const Contenedor = require("./Contenedor");

const contenedor = new Contenedor ("./productos.txt");


(async function (){
    await contenedor.iniciar()
    console.log("se trae el listado original")
    console.log(contenedor.buscarTodos())
    console.log("se procede a cargar un producto nuevo y se recarga el listado completo")
    contenedor.guardar({nombre:"taza chica",precio:45,imagen:"imagen4"})
    console.log(contenedor.buscarTodos())
    console.log("se busca un objeto por id(3)")
    console.log(contenedor.buscarId(3))
    console.log("se elimina el objeto 4 y se recarga listado")
    //contenedor.borrarId(4)
    console.log(contenedor.buscarTodos())
    console.log("se procede a eliminar todo")
    //contenedor.borrarTodo()
    console.log(contenedor.buscarTodos())
})();