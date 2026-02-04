import {checkLoginDetails} from "../model/login.model.js";

export const submitLoginRequest = async (req,res) => {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk;
    });
    req.on("end" , async() => {
        let loginDetails = JSON.parse(body);
        let loginResponse = await checkLoginDetails(loginDetails)
        if(loginResponse.success) {
            res.setHeader("Set-Cookie" , [
                "isLoggedIn=true; path = /;",
                `student_id = ${loginResponse.user_id};path=/;`
            ] );
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ success: true, message: "Login Successfully"  , user_id : loginResponse.user_id}));
        } else {
            res.writeHead(403, {"content-type" : "text/plain"});
            return res.end(loginResponse.message);
        }
    })
}