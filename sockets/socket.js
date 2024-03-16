const Usuario = require("../modelos/usuarios");
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
    }); //FIN IO.ON
}

module.exports= socket;