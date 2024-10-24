import mongoose from "mongoose";
import app from "./app";
import dbConnet from "./config/db.connet";

const PORT = process.env.PORT || 5000;

mongoose.connect(dbConnet.host, {}).then(() => {
}).then(() => {
    console.log(`Connected to MongoDB`);
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => console.error('Database connection error:', err));