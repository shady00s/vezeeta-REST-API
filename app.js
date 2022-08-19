import express from 'express';
import mongoose from 'mongoose';
import adminRoutes from './routes/adminRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import subAminRoutes from './routes/subAdminRoutes.js';
import UserRoutes from './routes/userRoutes.js';
//import cors from 'cors';
import dotenv  from "dotenv"
dotenv.config();

const app = express()


//app.use(cors());
app.use(express.json())
//app.use(express.urlencoded({ extended: true }));




// Public Folder
//app.use(static('./public'));

// headers settings
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader('Access-Control-Allow-Credentials',"true")
    
    next();
});


// routes 


app.use('/', doctorRoutes)
app.use('/', adminRoutes)
app.use('/', UserRoutes)
app.use('/', subAminRoutes)
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true }).then(() => app.listen(process.env.PORT||3000), console.log("connected to database and server")).catch(e => console.log(e))




