import {db} from "./dbConnection.js";

export const getQuestionDetailsOnSbjectBasis = async (subject_id) => {
    try { 
        const [questions] = await db.execute("SELECT question_details , id , option_1 , option_2 , option_3 , option_4 FROM online_exam_portal.question WHERE subject_id = ? and deleted_at IS NULL",[subject_id]);
        const question_list = questions.reduce((acc,question) => {
            let q_id = question.id;
            delete question.id;
            acc[q_id] = question;
            return acc;
        } , {});
        return { success : true , message : question_list};
    } catch (error) {
        return { success : false , message : error};
    }
}

export const storeExamDetails = async (...exam_details) => {
    try {
        const [data] = await db.execute("insert into online_exam_portal.exam (student_id,subject_id,marks) values(?,?,?)", exam_details);
        console.log(data);
        return {success : true , message : "Exam Completed Successfully"};
    } catch (error) {
        return {success : false , message : error.message};
    }
}