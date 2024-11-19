import mongoose from 'mongoose';

const connectDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`database connection successful ${connect.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;