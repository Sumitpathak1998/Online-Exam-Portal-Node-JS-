import {loginReadFile , registerReadFile} from "../model/login.model.js";
import { submitLoginRequest } from "../controller/login.controller.js";

export const loginRoutes = async (req,res) => {
    if(req.method == "GET") {
        if(req.url == "/") loginReadFile(req,res);
        if(req.url == "/student_register") registerReadFile(req,res);
    } else if (req.method == "POST") {
        if(req.url == "/loginForm") submitLoginRequest(req,res);
    }  
}