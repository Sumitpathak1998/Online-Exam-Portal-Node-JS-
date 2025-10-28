import fs from "fs";
import path from "path";
import {db} from "./dbConnection.js";

const serverFile = async (req,res,content_type,folderPath) => {
    try {
        const file = await fs.promises.readFile(folderPath,"utf-8");
        res.writeHead(200 , {'content-type': content_type});
        res.end(file);
    } catch (error) {
        res.writeHead(404 , {'content-type': 'text/html'});
        res.end("<h1 style = 'text-align:center'>404 Page not Found</h1>");
    }
}

export const checkLoginDetails = async (loginDetails) => {
    try{
        const [db_res] = await db.execute("select id from `student` where student_email = ? and password = ?" , [loginDetails.email, loginDetails.password]);
        return (db_res.length > 0) ? {success : true , user_id : db_res[0].id} : {success : false , message : "Credential Not Matched"};
    }catch(error) {
        return {success : false , message : error.message};
    }
}

export const loginReadFile = (req,res) => {serverFile(req,res,"text/html",path.join("views","login.html"))}

export const registerReadFile = async (req,res) => { serverFile(req,res,"text/html",path.join("views","register.html"))} 