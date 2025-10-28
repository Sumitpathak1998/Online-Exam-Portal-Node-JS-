import mysql from "mysql2/promise";

// Connect to mysql server 
const connectDB = async() => {
    try {
        const db = await mysql.createConnection({
            host : process.env.DB_HOST , 
            user : process.env.DB_USERNAME , 
            password : process.env.DB_PASSWORD,
            port : process.env.DB_PORT, 
            database : process.env.DB_NAME
        });
        console.log(`Database connected Successfully`);
        return db;
    } catch (error) {
        console.error(`CODE : ${error.code}`);
        console.error(`Error Message : ${error.message}`);
        return null;
    }
}

export const db = await connectDB();