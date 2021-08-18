import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider';

export default function Contacts() {

    const { contacts } = useContacts();

    return (
        <ListGroup>
            {contacts.map(contact=>(
                <ListGroup.Item key={contact.id}>
                    {contact.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
