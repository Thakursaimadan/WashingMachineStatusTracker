//coder1729c
//JaiPsrKga2TzXz2h

/*
the below function helps us to connect server
*/
const mongoose=require('mongoose');
const serverconfig=require('./serverconfig');
async function connectDB()
{
    try{
        await mongoose.connect(serverconfig.DB_URL);
        console.log("succesfully connected to server");
    }
    catch(error)
    {
        console.log('not able to connect ',error);
    }
}

module.exports=connectDB; 