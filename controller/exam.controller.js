import fs from "fs";
import path from "path";
import {getSubjectDetails} from "../model/subject.model.js";
import {getQuestionDetailsOnSbjectBasis} from "../model/exam.model.js";

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