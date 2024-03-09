// Importing the modules ...
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js'
import authRoutes from './routes/authRoute.js'

dotenv.config();

// Connecting to database ...
mongoose.connect(process.env.MONGO_DB_URL)
.then(()=>{
    console.log('Database is connected');
})
.catch((err) => {
    console.log(err);
});

// Configuring the app ...
const app = express();
app.use(express.json());


// Routing the app ...
app.get('/', (req, res) => {
    res.send("Hello world!");
});

app.use('/api/user' , userRoutes);
app.use('/api/auth' , authRoutes);


app.use((err , req,res,next) =>{
    const statusCode =err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})



app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
