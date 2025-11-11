import { fetchQuestionOnSubjectBasis , fetchFormContent , insertQuestionDetails ,updateQuestionDetails , fetchQuestionDetail , removeQuestion} from "../model/question.model.js";

const sendResponse = (res,response) => {
    if(response.success) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            success : true , 
            message : response.message 
        }));
    } else {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            success : false , 
            message : response.message 
        }));
    }
}

export const fetchQuestionSubjectBasis = (req,res) => {
    let body = "";
    req.on("data" , (chunk) => {
        body += chunk;
    })
    req.on("end" , async() => {
        let data = JSON.parse(body);
        const response = await fetchQuestionOnSubjectBasis(data.subject_id);
        console.log(response);
        if(response.success) {
            if(response.message.length > 0) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    success : true , 
                    message : JSON.stringify(response.message) 
                }));
            } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    success : false , 
                    message : `Question  not assign to this Subject` 
                }));    
            }
        } else {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                success : false , 
                message : response.message 
            }));
        }
    });
}

export const getInsertAndUpdateForm = async (req,res,id=null) => {
    const file = await fetchFormContent();
    res.writeHead(200,"content-type:text/html");
    if( id != null) {
        const files = file.replace("{{question_id}}", id);
        res.end(files);
    } else {
        res.end(file);
    }
}

export const saveOrUpdateQuestionDetails = (req,res) => {
    let body = "";
    req.on("data",(chunk) => {
        body += chunk;
    }); 
    req.on("end", async () => {
        const question_details = JSON.parse(body);
        const response = ("question_id" in question_details) ? await updateQuestionDetails(question_details) : await insertQuestionDetails(question_details);
        sendResponse(res,response);
    })
}

export const getQuestionDetail = async (res,question_id) => {
    const response  = await fetchQuestionDetail(question_id);
    sendResponse(res,response);
}

export const deleteQuestion = async (req,res) => {
    let body = '';
    req.on("data" , (chunk) => {
        body += chunk;
    })
    req.on("end",async() => {
        const {id} = JSON.parse(body);
        const response = await removeQuestion(id);
        sendResponse(res,response);
    })
}

