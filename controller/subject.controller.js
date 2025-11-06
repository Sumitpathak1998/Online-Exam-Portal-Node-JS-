import { insertSubjectDetails , getAllSubject } from "../model/subject.model.js";

// Method for insert and update the subject data
export const insertOrUpdateSubjectDetails = async (req,res) => {
    let body = "";
    req.on("data" , (chunk) => {
        body += chunk;
    });
    req.on("end" , async() => {
        const subject = JSON.parse(body);
        if ("id" in subject) {
            //await updateSubjectDetails(subject);
        } else {
           const response = await insertSubjectDetails(subject);
           sendResponse(response,"Subject Inserted Successfully",res);
        }
    })
}

export const showAllSubject = async(req,res) => {
    const response = await getAllSubject();
    console.log(response);
    if (response.success) {
        res.writeHead(200,{"content-type":"application/json"});
        return res.end(JSON.stringify({success : true , message : JSON.stringify(response.message)}));
    } else {
        res.writeHead(403,{"content-type":"text/plain"});
        return res.end(response.message);
    }
}

function sendResponse(response,message,res) {
    if (response.success) {
        res.writeHead(200,{"content-type":"application/json"});
        return res.end(JSON.stringify({success : true , message : message}));
    } else {
        res.writeHead(403,{"content-type":"text/plain"});
        return res.end(response.message);
    }
}