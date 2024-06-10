// models/Contact.js
const mongoose = require('mongoose');
// Definición del esquema del contacto
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    edad: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    }
});
// Creación del modelo de contacto
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;