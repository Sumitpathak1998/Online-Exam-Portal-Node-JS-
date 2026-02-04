import fs from "fs";
import path from "path";
import {getSubjectDetails} from "../model/subject.model.js";
import {getQuestionDetailsOnSbjectBasis , storeExamDetails} from "../model/exam.model.js";
import { getListOfQuestionSelectedOption } from "../model/question.model.js";
import { cookieDetails } from "../model/dbConnection.js";

export const loadExamPage = async (req,res,subject_id) => {
    try {
        const folderPath = path.join("views","exam_view.html");
        let [subject_detail, pageData] = await Promise.all([
            getSubjectDetails(subject_id),
            fs.promises.readFile(folderPath, "utf-8")
        ]);
        if(subject_detail.success) {
            const details = subject_detail.message;
            pageData = pageData.replace("{{subject_name}}", details.name + "(" + details.code + ")").replace("{{subject_id}}", subject_id).replace("{{time}}",String (details.time_duration).padStart(2,"0") + ":00");
            res.writeHead(200, {"content-type":"text/html"});
            res.end(pageData);
        } else {
            throw new Error(subject_detail.message);
        }   
    } catch (error) {
        res.writeHead(400, {"content-type":"text/html"});
        res.end(`<h1 style="text-align:center;">${error}</h1>`);
    }
}

export const loadExamPageCss = async (req,res) => {
    try {
        const pageStyle = await fs.promises.readFile(path.join("views","exam_page.css"),"UTF-8");
        res.writeHead(200, {"content-type":"text/css"});
        res.end(pageStyle);   
    } catch (error) {
        res.writeHead(400, {"content-type":"text/html"});
        res.end(`<h1 style="text-align:center;">${error}</h1>`);
    }
}

export const fetchSubjectQuestionDetails = async (req,res,subject_id) => {
    try {
        const filter_response = await getQuestionDetailsOnSbjectBasis(subject_id);
        if(filter_response.success) {
            res.writeHead(200,{"content-type":"text/json"});
            res.end(JSON.stringify(filter_response.message));
        } else {
            throw new Error(filter_response.message);
        }
    } catch (error) {
        res.writeHead(404,{"content-type" : "text/html"});
        res.end(`<h5 style="text-align:center;">${error}</h5>`);
    }
}

export const submitExamForm = async (req,res) => {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk;
    });
    req.on("end" , async() => {
        let exam_performance = JSON.parse(body);
        console.log(exam_performance);
        let question_ids = Object.keys(exam_performance.questions).map((param) => Number (param));
        const question_response = await getListOfQuestionSelectedOption(question_ids);
        if (question_response.success) {
            const right_option = question_response.message;
            const total_right_option = right_option.reduce((acc,param) => {
                let stu_ans = (exam_performance.questions[param.id]);
                if( stu_ans != null && param.right_option == stu_ans.split("_")[1]) {
                    ++acc;
                }
                return acc;
            } , 0);

            const marks = (total_right_option/(question_ids.length))* 100;

            let cookie_info = cookieDetails(req);
            const logged_student = cookie_info.student_id;
            const response = await storeExamDetails(logged_student,exam_performance.subject_id,marks);
            if(response.success) {
                res.writeHead(200, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ success: true, message: "Exam Completed"}));
            } else {
                res.writeHead(403, {"content-type" : "text/plain"});
                return res.end(response.message);
            } 
        } else {
            res.writeHead(403, {"content-type" : "text/plain"});
            return res.end(question_response.message);
        }
    })
}