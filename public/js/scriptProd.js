const socket= io();
var mensajeDiv = document.getElementById("mensaje");
var datos = document.getElementById("datosProd");

// MOSTRAR DATOS DE MONGODB
socket.on("servidorEnviarProductos", (productos) => {
    var tr = "";
    productos.forEach((producto, idLocal) => {
        tr=tr+`
            <tr>
                <td>${idLocal}</td>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.precio}</td>
                <td>
                    <a class="btn btn-outline-primary href= "#" onClick="editarProducto('${producto._id}')" >Editar</a>  
                    <a class="btn btn-outline-danger" href= "#" onClick="borrarProducto('${producto._id}')" >Borrar</a>
                </td>
            </tr>
        `;
    });  
    datosProd.innerHTML = tr;  
});

// GUARDAR DATOS A MONGODB
var enviarDatosProd = document.getElementById("enviarDatosProd");
enviarDatosProd.addEventListener("submit", (e) => {
    e.preventDefault();
    // RECIBIR LOS DATOS DEL FORMULARIO
    var producto = {
        id:document.getElementById("id").value,
        nombre:document.getElementById("nombre").value,
        descripcion:document.getElementById("descripcion").value,
        precio:document.getElementById("precio").value,
    }
    socket.emit("clienteGuardarProducto", producto);
    socket.on("servidorProductoGuardado", (mensaje) => {
        console.log(mensaje);
        mensajeDiv.innerHTML = mensaje;
        setTimeout(()=>{
            mensajeDiv.innerHTML="";
        }, 3000);
        // REINICIAR EL FORMULARIO
        document.getElementById("nombre").value ="";
        document.getElementById("descripcion").value ="";
        document.getElementById("precio").value ="";
        document.getElementById("nombre").focus();
    });

    console.log("Recibiendo datos...");
});

// MODIFICAR UN REGISTRO
function editarProducto(id){
    console.log(id);
    socket.emit("clienteObtenerProductoPorID",id);
}
socket.on("servidorObtenerProductoPorID", (producto)=>{
    console.log(producto);
    document.getElementById("id").value=producto._id;
    document.getElementById("nombre").value=producto.nombre;
    document.getElementById("descripcion").value=producto.descripcion;
    document.getElementById("precio").value=producto.precio;
    document.getElementById("txtNuevoProducto").innerHTML="Editar Producto";
    document.getElementById("txtGuardarProducto").innerHTML="Guardar cambios";

});

// ELIMINAR UN REGISTRO
function borrarProducto(id){
    console.log(id);
    socket.emit("clienteBorrarProducto", id);
}