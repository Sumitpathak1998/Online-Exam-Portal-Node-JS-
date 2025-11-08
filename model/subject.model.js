import { db } from "./dbConnection.js";

export const insertSubjectDetails = async (subject) => {
    try {
        await db.execute("INSERT INTO `subject`(`name`,`code`,`max_marks`,`time_duration`,`num_question`) VALUES(?,?,?,?,?)" , Object.values(subject));
        return {success : true};   
    } catch (error) {
        return {success : false , message : error.message};
    }
}

export const updateSubjectDetails = async (subject) => {
    try {
        const update_result = await db.execute(`UPDATE subject set name = ? , code = ? , max_marks = ? , time_duration = ? , num_question = ? where id = ?` , [subject.name,subject.code,subject.max_marks,subject.time_duration,subject.num_question,subject.subject_id]);
        console.log("update result : ",update_result);
        return {success : true};   
    } catch (error) {
        return {success : false , message : error.message};
    }
}

export const getSubjectDetails = async (id) => {
    try {
        const [sub_data] = await db.execute("SELECT `name`,`code`,`max_marks`,`time_duration`,`num_question` FROM `subject` WHERE id =?" , [id]);
        console.log(sub_data[0]);
        return {success : true , message : sub_data[0]};
    } catch (error) {
        return {success : false , message : error.message};
    }
}

export const getAllSubject = async () => {
    try {
        const [data] = await db.execute("SELECT * FROM `subject` where deleted_at is null");
        return {success : true , message : data};
    } catch (error) {
        return {success : false , message : error.message};
    }
}

export const removeSubject = async (id) => {
    try {
        const data = await db.execute("UPDATE `subject` SET `deleted_at` = CURRENT_TIMESTAMP WHERE `id` = ?", [id]);
        return {success : true};
    } catch (error) {
        return {success : false , message : error.message};
    }
}