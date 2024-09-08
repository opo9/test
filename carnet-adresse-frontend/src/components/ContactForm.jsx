import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactForm = ({ selectedContact, refreshContacts }) => {
    const [formData, setFormData] = useState({
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        ville: 'Paris'
    });

    useEffect(() => {
        if (selectedContact) {
            setFormData({
                prenom: selectedContact.prenom,
                nom: selectedContact.nom,
                email: selectedContact.email,
                telephone: selectedContact.telephone,
                ville: selectedContact.ville
            });
        } else {
            setFormData({
                prenom: '',
                nom: '',
                email: '',
                telephone: '',
                ville: 'Paris'
            });
        }
    }, [selectedContact]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedContact) {
            axios.put(`http://127.0.0.1:8000/api/contact/${selectedContact.id}`, formData)
                .then((response) => {
                    alert('Contact modifié avec succès !');
                    refreshContacts();
                })
                .catch((error) => {
                    console.error("Erreur lors de la modification du contact", error);
                });
        } else {
            axios.post('http://127.0.0.1:8000/api/contact', formData)
                .then((response) => {
                    alert('Nouveau contact ajouté !');
                    refreshContacts();
                    setFormData({ prenom: '', nom: '', email: '', telephone: '', ville: 'Paris' });
                })
                .catch((error) => {
                    console.error("Erreur lors de la création du contact", error);
                });
        }
    };

    // Styles inline pour les éléments du formulaire
    const styles = {
        form: {
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '400px',
            margin: '20px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            backgroundColor: '#f9f9f9'
        },
        input: {
            marginBottom: '10px',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc'
        },
        select: {
            marginBottom: '10px',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc'
        },
        button: {
            padding: '10px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <input
                type="text"
                name="prenom"
                placeholder="Prénom"
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                style={styles.input}
                required
            />
            <input
                type="text"
                name="nom"
                placeholder="Nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                style={styles.input}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={styles.input}
                required
            />
            <input
                type="text"
                name="telephone"
                placeholder="Téléphone"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                style={styles.input}
                required
            />
            <select
                value={formData.ville}
                onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                style={styles.select}
            >
                <option value="Paris">Paris</option>
                <option value="Lyon">Lyon</option>
                <option value="Marseille">Marseille</option>
            </select>
            <button type="submit" style={styles.button}>Valider</button>
        </form>
    );
};

export default ContactForm;
