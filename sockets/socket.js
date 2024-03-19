const Usuario = require("../modelos/usuarios");
const Producto = require("../modelos/productos");

function socket(io) {
    io.on("connection", (socket) => {
        // MOOSTRAR USUARIOS
        mostrarUsuarios();
        async function mostrarUsuarios(){
            const usuarios = await Usuario.find();
            //console.log(usuarios);
            io.emit("servidorEnviarUsuarios", usuarios)
        }

        //GUARDAR USUARIO
        socket.on("clienteGuardarUsuario", async (usuario) => {
            try {
                await new Usuario(usuario).save();
                io.emit("servidorUsuarioGuardado", "Usuario guardado");
            }
            catch (err){
                console.log("Error al registrar usuario " +err);
            }
        });

                // MOOSTRAR PRODUCTOS
                mostrarProductos();
                async function mostrarProductos(){
                    const productos = await Producto.find();
                    //console.log(productos);
                    io.emit("servidorEnviarProductos", productos)
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