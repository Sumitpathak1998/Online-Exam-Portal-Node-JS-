import { submitAndValidateRegisterUser } from "../controller/register.controller.js";

export const registerRoutes = (req,res) => {
    if (req.method == "POST" && req.url == "/registerForm") submitAndValidateRegisterUser(req,res);
}