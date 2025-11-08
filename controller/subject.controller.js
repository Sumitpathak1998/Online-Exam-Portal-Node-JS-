import { insertSubjectDetails , getAllSubject , updateSubjectDetails , getSubjectDetails , removeSubject} from "../model/subject.model.js";

// Method for insert and update the subject data
export const insertOrUpdateSubjectDetails = async (req,res) => {
    let body = "";
    req.on("data" , (chunk) => {
        body += chunk;
    });
    req.on("end" , async() => {
        const subject = JSON.parse(body);
        if ("subject_id" in subject) {
            const response = await updateSubjectDetails(subject);
            sendResponse(response,"Subject Updated Successfully",res);
        } else {
           const response = await insertSubjectDetails(subject);
           sendResponse(response,"Subject Inserted Successfully",res);
        }
    })
}

export const showAllSubject = async(req,res) => {
    const response = await getAllSubject();
    if (response.success) {
        res.writeHead(200,{"content-type":"application/json"});
        return res.end(JSON.stringify({success : true , message : JSON.stringify(response.message)}));
    } else {
        res.writeHead(403,{"content-type":"text/plain"});
        return res.end(response.message);
    }
}

export const fetchSubjectDetails = async(req,res,id) => {
    const response = await getSubjectDetails(id);
    if (response.success) {
        res.writeHead(200,{"content-type":"application/json"});
        return res.end(JSON.stringify({success : true , message : JSON.stringify(response.message)}));
    } else {
        res.writeHead(403,{"content-type":"text/plain"});
        return res.end(response.message);
    }
}

export const deleteSubject = (req,res) => {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk;
    });  
    req.on("end", async () => {
        const {id} = JSON.parse(body);
        const response = await removeSubject(id);
        sendResponse(response,"Subject Deleted", res);
    })
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