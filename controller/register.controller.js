import { loadRegisterStudent , saveRegisterStudent , checkEmailDuplicate } from "../model/register.model.js";

/**
 * Process for register the student 
 * 1) Get all the list of register student 
 * 2) Check same email is not present on any student 
 * 3) If all good then save the student and referd back the resposne 
 */

export const submitAndValidateRegisterStudent = async (req,res) => {
    const registerStudentList = await loadRegisterStudent();
    let body = "";
    req.on("data" , (chunk) => {
        body += chunk;
    });  
    req.on("end" , async () => {
        let student = JSON.parse(body);
        let checkEmailResponse = await checkEmailDuplicate(student.email);
        if(!checkEmailResponse.success) {
            res.writeHead(403,{"content-type":"text/plain"});
            return res.end(checkEmailResponse.message);
        }

        const resposne = await saveRegisterStudent(student);
        if (resposne.success) {
            res.writeHead(200,{"content-type":"application/json"});
            return res.end(JSON.stringify({success : true , message : `${student.name} Registerd Successfully`}));
        } else {
            res.writeHead(403,{"content-type":"text/plain"});
            return res.end(resposne.message);
        }
    })
}

