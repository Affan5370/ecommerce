import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();    
import { notFound,errorHandler } from './middleware/errorHandler.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/uesrRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js' 
import connectDB from './config/db.js'; 
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';


const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/uploads',uploadRoutes);

app.get('/api/config/paypal',(req,res)=>res.send({clientId:process.env.PAYPAL_CLIENT_ID}))

// const __dirname = path.resolve();
// app.use('/uploads',express.static(path.join(__dirname,'uploads')));

// const uploadsPath = path.join(__dirname, 'uploads');

// // Serve static files from the 'uploads' folder
// app.use('/uploads', express.static(uploadsPath));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsPath));


if(process.env.NODE_ENV=='production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })
}else{
    app.get('/',(req,res)=>{
        res.send("Hello World");
    });    
}

app.use(notFound);
app.use(errorHandler);



app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
});