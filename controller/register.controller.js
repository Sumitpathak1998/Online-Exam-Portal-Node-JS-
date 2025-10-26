import { loadRegisterStudent , saveRegisterStudent } from "../model/register.model.js";

const checkEmailDuplicate = (current_email,emailList) => emailList.includes(current_email);

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
        const emailList = Object.values(registerStudentList).map((param) => param.email);
        if(checkEmailDuplicate(student.email,emailList)) {
            res.writeHead(403,{"content-type":"text/plain"});
            return res.end("This email already register");
        }

        let studentKey = student.name.split(" ").join("_");
        registerStudentList[studentKey] = student;
        await saveRegisterStudent(registerStudentList);

        res.writeHead(200,{"content-type":"application/json"});
        return res.end(JSON.stringify({success : true , message : `${student.name} Registerd Successfully`}));
    })
}

