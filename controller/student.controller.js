import { getAllSubject } from "../model/subject.model.js";
import { getStudentAttemptDetails } from "../model/student.model.js"; 

export const fetchAllSubjectList = async (req,res) => {
    try {
        const subjectList_result = await getAllSubject();
        let body = "";
        req.on("data" , (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            let request_data = JSON.parse(body);
            let student_id = request_data.student_id;
            if (subjectList_result.success) {
                const subjectList = subjectList_result.message;
                const final_list = await subjectListWithStdentMark(subjectList,student_id); 
                res.writeHead(200,  { "Content-Type": "application/json" });
                res.end(JSON.stringify(final_list));
            } else {
                throw new Error(subjectList_result.message);
            }
        })
    } catch (error) {
        console.error("Error : "+ error);
        res.writeHead(400,  { "Content-Type": "application/json" });
        res.end(JSON.stringify({success : false , message : error}));
    }
}

export const subjectListWithStdentMark = async (subjectList,student_id) => {
    try {
        const subject_ids = subjectList.map(subject => subject.id);
        const student_attempt_details_result = await getStudentAttemptDetails(subject_ids,student_id);
        if (student_attempt_details_result.success) {
            const student_attempt_details = student_attempt_details_result.message;
            const finalRes = subjectList.reduce((acc,param) => {
                acc[param.id] = {
                    "subject_name" : param.name,
                    "subject_code" : param.code,
                    "student_marks" : student_attempt_details[param.id]
                };
                return acc; 
            } , {});
            return {success : true , message : finalRes};
        } else {
            throw new Error(student_attempt_details_result.message);
        }   
    } catch (error) {
        return {success : false , message : error};
    }
} 