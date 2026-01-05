import {loadExamPage , loadExamPageCss , fetchSubjectQuestionDetails} from "../controller/exam.controller.js";

export const examRoutes = (req,res) => {
    if(req.method == "GET") {
        if (req.url.startsWith("/start_exam")) {
            const subject_id = req.url.split("/").filter(param => param)[1];
            loadExamPage(req,res,subject_id);
        }
        if(req.url == "/exam_page.css") loadExamPageCss(req,res);
        if(req.url.startsWith("/fetchSubjectQuestionDetails")) {
            const subject_id = req.url.split("/").filter(param => param)[1];
            fetchSubjectQuestionDetails(req,res,subject_id);
        }
    } else  {}
}