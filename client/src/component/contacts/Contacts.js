
import React, { useEffect,Fragment, useContext} from 'react'
import ContactContext from '../../context/contact/contactContext'
import ContactState from '../../context/contact/ContactState'
import ContactItem from './ContactItem';


const Contacts = () => {


    const contactContext = useContext(ContactContext);
    const {contacts, filtered, getContacts, loading} = contactContext;
 

    useEffect(()=>{
        getContacts();
        //eslint-disable-next-line
        
    },[])



    if(contacts.length === 0){
        return <h1>please add contacts...</h1>
    }
    
    return (
        <Fragment>

         {filtered !== null ? filtered.map(contact =>
         (<ContactItem key={contact._id} contact={contact}/>)
         ):
         contacts.map(contact =>(
                <ContactItem key={contact._id} contact={contact}/>
            ))}


        
        </Fragment>
    )
}

export default Contacts 
