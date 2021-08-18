import React,{useContext, useState} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

const ConversationsContext = React.createContext()

export function useConversations(){
    return useContext(ConversationsContext)
}

export function ConversationsProvider({ children}) {

    const [conversations, setConversations] = useLocalStorage('conversations', []) 

    const {contacts} = useContacts()

    const [selectedConversationIdex, setSelectedConversationIdex] = useState(0)

    const formattedConversations = conversations.map((conversation,index) =>{
        const recipients = conversation.recipients.map(recipient=>{
            const contact = contacts.find(contact =>{
                return contact.id === recipient;
            })
            
            const name = (contact && contact.name) || recipient

            return {id: recipient, name}
        })
        const selected = index === selectedConversationIdex
        return {...conversation, recipients, selected}
    })

    function createConversation(recipients) {
        setConversations(prevConversations => {
          return [...prevConversations, { recipients, messages: [] }]
        })
      }

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIdex],
        selectConversationIndex: setSelectedConversationIdex,
        createConversation
    }

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}