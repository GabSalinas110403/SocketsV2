const Producto = require("../modelos/productos");
function socket(io) {
    io.on("connection", (socket) => {
        // MOOSTRAR PRODUCTOS
        mostrarProductos();
        async function mostrarProductos(){
            const productos = await Producto.find();
            //console.log(productos);
            io.emit("servidorEnviarProducto", productos)
        }

        //GUARDAR producto
        socket.on("clienteGuardarProducto", async (producto) => {
            try {
                await new Producto(producto).save();
                io.emit("servidorProductoGuardado", "producto guardado");
            }
            catch (err){
                console.log("Error al registrar producto " +err);
            }
        });
    }); //FIN IO.ON
}

module.exports= socket;