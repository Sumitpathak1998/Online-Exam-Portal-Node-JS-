import { db } from "./dbConnection.js";

export const fetchStudentInfo = async (stu_id) => {
    try {
        const [student_info] = await db.execute("select stu.id as `student_id` , stu.name as `student_name` , count(e.id) as `numOfattempt` , if(sum(e.marks) is null, 0 , sum(e.marks)) as `total_marks` from student as stu left join exam as e on stu.id = e.student_id where stu.id = ? GROUP BY stu.id, stu.name",[stu_id]); 
        let student_detils = student_info[0];
        if(student_detils.numOfattempt == 0) {
            student_detils['percentage'] = 0;
        } else {
            student_detils['percentage'] = Math.round(student_detils.total_marks/student_detils.numOfattempt);
        }
        delete student_detils.total_marks;
        return {success : true , message : student_detils};   
    } catch (error) {
        console.log(error);
        return {success : false , message : error.message};
    }
}

export const getStudentAttemptDetails = async (subject_ids,student_id) => {
    try {
        const [rows] = await db.execute(`
        SELECT subject_id, SUM(marks) AS student_marks FROM exam WHERE student_id = ? AND subject_id IN (?) GROUP BY subject_id`,
        [student_id, subject_ids]);

        const marksBySubject = rows.reduce((acc, row) => {
            acc[row.subject_id] = row.student_marks;
            return acc;
        }, {});

        const final_response = subject_ids.reduce((acc, subject_id) => {
            acc[subject_id] = marksBySubject[subject_id] ?? "Not Attempt";
            return acc;
        }, {});

        return {success : true , message : final_response};
    } catch (error) {
        console.log(error);
        return {success : false , message : error.message};
    }
}
