import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

const App = () => {
    const [contacts, setContacts] = useState([]); // Gérer la liste des contacts ici
    const [selectedContact, setSelectedContact] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Fonction pour rafraîchir la liste des contacts
    const refreshContacts = () => {
        axios.get('http://127.0.0.1:8000/api/contacts')
            .then((response) => {
                setContacts(response.data); // Mettre à jour l'état avec la nouvelle liste de contacts
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des contacts", error);
            });
    };

    // Charger la liste des contacts au montage du composant
    useEffect(() => {
        refreshContacts();
    }, [contacts]);
// Styles pour le h1 et la div container
    const styles = {
        h1: {
            textAlign: 'center',
            color: '#333',
            fontSize: '36px',
            fontWeight: 'bold',
            margin: '20px 0',
            fontFamily: 'Arial, sans-serif',
        },
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            padding: '20px',
            gap: '20px',  // Ajoute de l'espace entre les éléments du formulaire et de la liste
        },
        searchBar: {
            width: '80%',
            padding: '10px',
            marginLeft: '10%',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
        },
    };

    return (
        <div>
            <h1 style={styles.h1}>Carnet d'Adresses</h1>
            <input
                type="text"
                style={styles.searchBar}
                placeholder="Rechercher un contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div style={styles.container}>
                <ContactList selectContact={setSelectedContact} contacts={contacts} setContacts={setContacts} searchTerm={searchTerm} />
                <ContactForm selectedContact={selectedContact} refreshContacts={refreshContacts} />
            </div>
        </div>
    );
};

export default App;
