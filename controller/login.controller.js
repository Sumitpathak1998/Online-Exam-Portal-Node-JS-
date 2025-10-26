import { loadRegisterStudent } from "../model/register.model.js";

const getPasswordOrName = (param,type) => {
    let [password,name] = param.split("@@@@");
    return (type == "password") ? password : name;
}

export const submitLoginRequest = async (req,res) => {
    const listOfStudent = await loadRegisterStudent();
    if(Object.values(listOfStudent).length > 0) {
        const lists = Object.values(listOfStudent).reduce((acc,param) => {
            acc[param.email] = param.password+"@@@@"+param.name;
            return acc;
        }, {});
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        })
        req.on("end" , () => {
            let loginDetails = JSON.parse(body);
            if(loginDetails.email in lists && loginDetails.password == getPasswordOrName(lists[loginDetails.email],"password")) {
                res.writeHead(200, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ success: true, message: "Login Successfully"  , user : getPasswordOrName(lists[loginDetails.email],"name")}));
            } else {
                res.writeHead(403, {"content-type" : "text/plain"});
                return res.end("Credential Not Matched");
            }
        })
    }
}