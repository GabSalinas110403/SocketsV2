const {mongoose} = require ("../bd/conexion");
const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    precio: {
        type: String,
        require: true
    }, estatus: {
        type: Boolean,
        require: true
    }
});

module.exports = mongoose.model("producto", productoSchema);
