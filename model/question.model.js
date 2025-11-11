import fs from "fs";
import path from "path";
import {db} from "./dbConnection.js";

export const loadQuestionPage = async (req,res,id) => {
    try {
        const file = await fs.promises.readFile(path.join("views","question_list.html"),'utf-8');
        let [db_data] = await db.execute("SELECT `name` FROM `subject` WHERE `id` = ?" , [id]);
        const files = file.replace("{{Subject_name}}",db_data[0].name);
        res.writeHead(200 , {'content-type': 'text/html'});
        res.end(files);
    } catch (error) {
        res.writeHead(404 , {'content-type': 'text/html'});
        res.end(`<h1 style = 'text-align:center'>${error}</h1>`);
    }
}

export const fetchQuestionOnSubjectBasis = async (subject_id) => {
    try {
        const [data] = await db.execute("SELECT * FROM online_exam_portal.question where subject_id = ? and deleted_at is null", [subject_id]);
        return {success : true , message : data};
    } catch (error) {
        return {success : false , message : error.message};
    }
}

export const fetchFormContent = () => {
    try {
        const file = fs.promises.readFile(path.join("views","insertAndUpdatequestion.html"),"utf-8"); 
        return file;   
    } catch (error) {
        console.log(error);
    }
}

export const insertQuestionDetails = async (question) => {
    try {
        const [result] = await db.execute("INSERT INTO question(`question_details`,`subject_id`,`option_1`,`option_2`,`option_3`,`option_4`,`right_option`) VALUES(?,?,?,?,?,?,?)", [question.question,question.subject_id,question.option_1,question.option_2,question.option_3,question.option_4,question.right_option]);
        console.log(result);
        return {success:true , message : "Question Details Inserted Successfully"};
    } catch (error) {
        return {success : false , message : error.message};
    }
}

export const updateQuestionDetails = async (question) => {
    try {
        const [result] = await db.execute("UPDATE online_exam_portal.question SET question_details = ? , subject_id = ? , option_1 = ? , option_2 = ? ,option_3 = ? , option_4 = ? , right_option = ?  WHERE id = ? ", [question.question,question.subject_id,question.option_1,question.option_2,question.option_3,question.option_4,question.right_option,question.question_id]);
        console.log(result);
        return {success:true , message : "Question Details Updated Successfully"};
    } catch (error) {
        return {success : false , message : error.message};
    }
}

export const fetchQuestionDetail = async (question_id) => {
    try {
        const [data] = await db.execute("SELECT question_details as `question` , option_1 , option_2, option_3 , option_4 , right_option FROM online_exam_portal.question where id = ? and deleted_at is null", [question_id]);
        return {success : true , message : JSON.stringify(data)};       
    } catch (error) {
        return {success : false , message : error.message};
    }
}

export const removeQuestion = async (id) => {
    try {
        const [data] = await db.execute("UPDATE question set deleted_at = CURRENT_TIMESTAMP where id = ?", [id]);
        return {success : true , message : "Queation Removed Successfully"};       
    } catch (error) {
        return {success : false , message : error.message};
    }
} 