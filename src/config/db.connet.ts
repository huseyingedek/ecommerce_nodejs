import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.MONGO_DB_URL || 'localhost',
};

export default dbConfig;