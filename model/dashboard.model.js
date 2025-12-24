import fs from "fs";
import path from "path";
import {fetchStudentInfo} from "./student.model.js";

const serverFile = async (req,res,content_type,folderPath) => {
    try {
        const file = await fs.promises.readFile(folderPath,"utf-8");
        res.writeHead(200 , {'content-type': content_type});
        res.end(file);
    } catch (error) {
        res.writeHead(404 , {'content-type': 'text/html'});
        res.end("<h1 style = 'text-align:center'>404 Page not Found</h1>");
    }
}

export const loadDashBoardPage = (req,res,id,type) => serverFile(req,res,"text/html",path.join("views",`${type}_dashboard.html`));

export const loadStudentDashBoardPage = async (req,res,id,type) => {
    try {
        let content = fs.promises.readFile(path.join("views",`${type}_dashboard.html`),"utf-8");
        let [file,db_resposne] = await Promise.all([content,fetchStudentInfo(id)]);
        if (db_resposne.success) {
            const student_info = db_resposne.message;
            file = file.replace("{{student_id}}",student_info.student_id).replace("{{student_name}}",student_info.student_name).replace("{{numOfattempt}}",student_info.numOfattempt).replace("{{percentage}}",student_info.percentage);
        } else {
            file = file.replace("{{STUDENT_ID}}",id);
        }
        
        res.writeHead(200 , {'content-type': "text/html"});
        res.end(file);
    } catch (error) {
        console.log(error);
        res.writeHead(404 , {'content-type': 'text/html'});
        res.end("<h1 style = 'text-align:center'>404 Page not Found</h1>");
    }
} 

export const loadInsertAndUpdateSubjectForm = async (req,res,id=null) => {
    if (id != null) {
        try {
            const file = await fs.promises.readFile(path.join("views","insertAndUpdateSubject.html"),"utf-8");
            const files = file.replace("{{subject_id}}",id);
            res.writeHead(200 , {'content-type': "text/html"});
            res.end(files);
        } catch (error) {
            console.log(error);
            res.writeHead(404 , {'content-type': 'text/html'});
            res.end("<h1 style = 'text-align:center'>404 Page not Found</h1>");
        }   
    } else {
        serverFile(req,res,"text/html",path.join("views","insertAndUpdateSubject.html"));
    }
};
