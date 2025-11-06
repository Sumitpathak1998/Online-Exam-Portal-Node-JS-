import { db } from "./dbConnection.js";

export const insertSubjectDetails = async (subject) => {
    try {
        await db.execute("INSERT INTO `subject`(`name`,`code`,`max_marks`,`time_duration`,`num_of_question`) VALUES(?,?,?,?,?)" , Object.values(subject));
        return {success : true};   
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