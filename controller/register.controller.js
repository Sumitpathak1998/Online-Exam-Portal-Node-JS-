import { loadRegisterStudent , saveRegisterUser , checkEmailDuplicate } from "../model/register.model.js";

/**
 * Process for register the student 
 * 1) Get all the list of register student 
 * 2) Check same email is not present on any student 
 * 3) If all good then save the student and referd back the resposne 
 */

export const submitAndValidateRegisterUser = async (req,res) => {
    let body = "";
    req.on("data" , (chunk) => {
        body += chunk;
    });  
    req.on("end" , async () => {
        let user = JSON.parse(body);
        let checkEmailResponse = await checkEmailDuplicate(user.email,user.register_type);
        if(!checkEmailResponse.success) {
            res.writeHead(403,{"content-type":"text/plain"});
            return res.end(checkEmailResponse.message);
        }

        const resposne = await saveRegisterUser(user,user.register_type);
        if (resposne.success) {
            res.writeHead(200,{"content-type":"application/json"});
            return res.end(JSON.stringify({success : true , message : `${user.name} Registerd Successfully`}));
        } else {
            res.writeHead(403,{"content-type":"text/plain"});
            return res.end(resposne.message);
        }
    })
}

