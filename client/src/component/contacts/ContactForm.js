import React, { useState, useContext, useEffect }  from 'react'

import ContactContext  from '../../context/contact/contactContext';

const ContactForm = (theme) => {

    const contactContext = useContext(ContactContext);

    const { addContact, current, clearCurrent, updateContact } = contactContext;

    useEffect(()=>{
        if(current !== null){
            setContact(current);
        }else{
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
    },[contactContext, current])
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const {name, email, phone, type} = contact;


    const onChange = e =>setContact({
        ...contact,
        [e.target.name]: e.target.value
    });

    const onSubmit =  e=> {
        e.preventDefault();
        if(current === null){
            addContact(contact);
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })

        }else{
            console.log('update')
            updateContact(contact)
        }
     
    }

    const clearAll = ()=>{
        clearCurrent();

    }

     const pStyle ={
         display:"inline",
         color:"blue"
     }

     const pStyle2 ={
        display:"inline",
        color:"green"
    }

   
    return (
       <form onSubmit={onSubmit}>
           <h2 className="text-primary" > {current?'Edit Contact':'Add Contact'}</h2>
           <input type="text" placeholder="name" name="name" 
           value={name} onChange={onChange} required/>

            <input type="email" placeholder="email" name="email" 
           value={email} onChange={onChange} required/>

           <input type="text" placeholder="phone" name="phone" 
           value={phone} onChange={onChange} required/>

            <label>
           <input type="radio" name="type" value="personal"
            checked={type === 'personal'} onChange={onChange}/>
          <p style={pStyle}>personal</p> {'    '}
            </label>

            <label>
           <input type="radio" name="type" value="professional"
            checked={type === 'professional'} onChange={onChange}/> 
             <p style={pStyle2}>professional</p> 
            </label>
            <input type="submit" value={current?'Edit Contact':'Add Contact'} 
            className="btn btn-primary btn-block" /> 

            {current && (<div>
                <button className="btn btn-danger btn-block" onClick={clearAll}>Clear</button>
            </div>)}
           </form>
           
           

           
    )
}

export default ContactForm
