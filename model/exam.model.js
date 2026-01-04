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