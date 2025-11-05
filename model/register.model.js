import fs from "fs";
import path from "path";
import {db} from "../model/dbConnection.js";

const folderPath = path.join(import.meta.dirname, "../data", "register.student.json");

export const loadRegisterStudent =  async() => {
    try {
        const [data] = await db.execute("SELECT * FROM `student`");
        console.log(data);
        return data != "" ? data : [];
    } catch (error) {
        console.log(error,"error");
        console.log(error.code);
        throw error;
    }
}

export const checkEmailDuplicate = async (current_email,type) => {
    try {
        const [match_data] = await db.execute(`SELECT id from ${type} where email = ? `, [current_email]);
        return (match_data.length > 0) ? {success : false , message : "Email already present"} : {success : true};  
    } catch (error) {
        return {success : false , message : error.message};
    }
};


export const saveRegisterUser = async (registerUser,type) => {
    try {
        const [insert_details] = await db.execute(`INSERT INTO ${type} (name,email,password) VALUES (?,?,?)`,[registerUser.name,registerUser.email,registerUser.password]);
        console.log(insert_details.insertId);
        return {success:true}
    } catch (error) {
        return {success : false , message : error.message};
    }
}