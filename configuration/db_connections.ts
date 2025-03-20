import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongoURI || 'mongodb://127.0.0.1:27017');
        console.log('Databse is connected.');
        return mongoose.connection;
    } catch (error) {
        console.log('Database connection error.', error);
        throw new Error('Database connection failed.');     
        
        return error;
    }
}

export default connectDB;

