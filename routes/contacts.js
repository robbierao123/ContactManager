const express = require('express')
const router = express.Router();
const {check, validationResult} = require("express-validator")
const User = require('../models/User');
const auth = require('../middleware/auth');
const Contact = require('../models/Contact')

//@route           GET api/contacts
//@desc            Get all users contact
//@acess           private
router.get('/',auth, async (req,res) =>{
  try {
      const contacts = await Contact.find({user:req.user.id}).sort({date: -1});
      res.json(contacts);

  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server ERROR');
  }
});


//@route           post api/contacts
//@desc           Add new contact
//@acess           private
router.post('/',auth,
   async (req,res) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const {name, email, phone, type} = req.body

        try {
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user:req.user.id
            });
            const contact = await newContact.save();
            res.json(contact)
        } catch (err) {
            
        }
    }
    );

//@route           PUT api/contacts
//@desc           update contact
//@acess           private
router.put('/:id', auth, async (req, res) => {
    const {name, email, phone, type} = req.body;
  
    // Build contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;
  
    try {
      let contact = await Contact.findById(req.params.id);
  
      if (!contact) return res.status(404).json({msg: 'Contact not found'});
  
      // Make sure user owns contact
      if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({msg: 'Not authorized'});
      }
  
      contact = await Contact.findByIdAndUpdate(
        req.params.id,
        {$set: contactFields},
        {new: true},
      );
  
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

//@route         POST api/contacts
//@desc           update contact
//@acess           private
router.delete('/:id',auth, async (req,res) =>{

    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({msg:'Contact not found'})
        
        if(contact.user.toString() != req.user.id){
            return res.status(401).json({msg:"Not authorized"});
         
        }
        await Contact.findByIdAndRemove(req.params.id);
        res.json("contact removed");
    } catch (err) {
        res.json(req.params.id);
  
    }
   
    });

    module.exports = router;