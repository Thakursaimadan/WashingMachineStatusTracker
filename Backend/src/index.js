// const express=require('express');
// const bodyParser=require('body-parser')
// const ServerConfig=require('./config/serverconfig');
// const connectDB = require('./config/dbconfig');

// const app=express();
// app.use(bodyParser.json());
// app.use(bodyParser.text());
// app.use(bodyParser.urlencoded());

// app.listen(ServerConfig.PORT,async ()=>{
    
//     await connectDB();
//     console.log("server starded at ",ServerConfig.PORT);

// })   
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const {Machinerouter} = require('./routes/machineRoute');
const {Adminrouter} = require('./routes/adminRoute');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const cors = require('cors');
app.use(cors({
    origin: "https://your-frontend.onrender.com", // Allow only your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));

app.use(express.json()); // Parse JSON bodies
app.use('/api/machines', Machinerouter);
app.use('/api/admin', Adminrouter);
async function connectDB()
{
    try{
        console.log("enter waiting\n")
        await mongoose.connect(process.env.DB_URL);
        console.log("succesfully connected to server");
    }
    catch(error)
    {
        console.log('not able to connect ',error);
    }
}
// Connect to MongoDB
connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
