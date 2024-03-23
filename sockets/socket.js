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
                if (usuario.id == ""){
                    await new Usuario(usuario).save();
                    io.emit("servidorUsuarioGuardado", "Usuario guardado");
                }
                else{
                    await Usuario.findByIdAndUpdate(usuario.id, usuario);
                    io.emit("servidorUsuarioGuardado", "Usuario modificado");
                }
                mostrarUsuarios();
            }
            catch (err){
                console.log("Error al registrar usuario " +err);
            }
        });

        // OBTENER USUARIO POR ID
        socket.on("clienteObtenerUsuarioPorID", async (id) => {
            const usuario =  await Usuario.findById(id);
            io.emit("servidorObtenerUsuarioPorID", usuario);
        });

        // BORRAR USUARIO POR ID
        socket.on("clienteBorrarUsuario", async (id) => {
            await Usuario.findByIdAndDelete(id);
            io.emit("servidorUsuarioGuardado", "Usuario borrado");
            mostrarUsuarios();
        });

        ////////////////////////// CODIGO DE  PRODUCTOS //////////////////////////

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