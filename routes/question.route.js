import { fetchQuestionSubjectBasis , getInsertAndUpdateForm , saveOrUpdateQuestionDetails , getQuestionDetail , deleteQuestion} from "../controller/question.controller.js"; 

export const questionRoute = (req,res) => {
    if (req.method == "GET") {
        if(req.url.startsWith("/getInsertAndUpdateForm")) {
            let url_arr = req.url.split("/").filter((param) => param);
            (url_arr.length > 1) ? getInsertAndUpdateForm(req,res,url_arr[1]) : getInsertAndUpdateForm(req,res);
        }
        if (req.url.startsWith("/question/")) {
            let id = req.url.split("/").filter((param) => param)[1];
            getQuestionDetail(res,id);
        }
    }
    if(req.method == "POST") {
        if (req.url == "/fetchQuestionDetails") fetchQuestionSubjectBasis(req,res);
        if (req.url == "/saveOrUpdateQuestionDetails") saveOrUpdateQuestionDetails(req,res); 
        if (req.url == "/deleteQuestion") deleteQuestion(req,res); 
    }
}