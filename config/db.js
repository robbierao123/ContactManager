const mongoose = require('mongoose');

const config = require('config');
const db = config.get('mongoURI');


//connect db
const connectDB = async ()=>{
    try {
        mongoose.connect(db, {
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify:false
        }
       )
       console.log('db connected')
    } catch (error) {
        console.error(err.message);
        process.exit(1);
    }
 

}


module.exports = connectDB