// src/components/ContactForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ContactForm = ({ fetchContacts, currentContact, setCurrentContact }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState('');
    const [correo, setCorreo] = useState('');
    // Efecto para actualizar el formulario cuando se selecciona un contacto para editar
    useEffect(() => {
        if (currentContact) {
            setName(currentContact.name);
            setPhone(currentContact.phone);
            setApellido(currentContact.apellido);
            setEdad(currentContact.edad);
            setCorreo(currentContact.correo);
        }
    }, [currentContact]);
    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentContact) {
                // Actualizar contacto existente
                await axios.patch(`http://localhost:3001/contacts/${currentContact._id}`, { name, phone, apellido, edad, correo });
                setCurrentContact(null);
            } else {
                // Crear nuevo contacto
                await axios.post('http://localhost:3001/contacts', { name, phone, apellido, edad, correo });
            }
            fetchContacts();
            setName('');
            setPhone('');
            setApellido('');
            setEdad('');
            setCorreo('');
        } catch (error) {
            console.error('Error saving contact', error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Phone</label>
                <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div>
                <label>Apellido</label>
                <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
            </div>
            <div>
                <label>Edad</label>
                <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} required />
            </div>
            <div>
                <label>Correo</label>
                <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
            </div>
            <button type="submit">{currentContact ? 'Update Contact' : 'Add Contact'}</button>
        </form>
    );
};
export default ContactForm;