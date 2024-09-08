import React from 'react';

const ContactList = ({ selectContact, searchTerm, contacts, setContacts }) => {
    // Filtrage des contacts basé sur le terme de recherche
    const filteredContacts = contacts.filter(contact => {
        const fullText = `${contact.prenom} ${contact.nom} ${contact.email} ${contact.telephone} ${contact.ville}`.toLowerCase();
        return fullText.includes(searchTerm.toLowerCase());
    });

    const styles = {
        ul: {
            width: "50%",
            listStyleType: 'none',
            padding: 0,
            maxWidth: '400px',
            margin: '20px auto',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            border: '1px solid #ccc',
        },
        li: {
            padding: '15px',
            borderBottom: '1px solid #ccc',
            cursor: 'pointer',
            fontSize: '18px',
            transition: 'background-color 0.3s',
        },
        liHover: {
            backgroundColor: '#f1f1f1',
        },
        liLast: {
            borderBottom: 'none',
        }
    };

    return (
        <ul style={styles.ul}>
            {filteredContacts.map((contact, index) => (
                <li
                    key={contact.id}
                    onClick={() => selectContact(contact)}
                    style={{
                        ...styles.li,
                        ...(index === filteredContacts.length - 1 ? styles.liLast : {}),
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f1f1')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                    {contact.prenom} {contact.nom}
                </li>
            ))}
        </ul>
    );
};

export default ContactList;
