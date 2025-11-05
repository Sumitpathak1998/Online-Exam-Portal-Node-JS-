Project: (Online Exam) 

Functionality for Project :
===========================

1) Student Registration or login 
login - On the basis of email and password
Registration - Username , email , password

2) After the student login the page open with there name and different box are present 
like : Java , JS , C++ , HTML , CSS 
Any of that student click then test will start for 10min 

/*
* Till now Registration of student and login is completed and home page present with static data 
*/
3) Once the test will run then 
  10 question came one by one 
  Two button : Next , previous 
  - Always four option present 

4) Once user submit the test or time complete then close that test and show the result 
  - and then refer back to home page;

After the data base these things are add 

What are the CRUD i required here 
1) Admin level , can able to add the New exam(subject) and there question 
2) Perform the crud mean (Insert the exam , delete , update , view)
3) Same questions are added on the basis of subject 
 - Which include 4 option , and right ans also need to be present there 
4) Question also read , add , delete and update by the admin 

Table
=====
1) Student Table = Where there regestration details are need to be there (Id , name , email and Password)
2) Admin Table = Where there regestration details are need to be there (Id , name , email and Password)
3) Subject Table = All the subject Details are present there (id , subject name , subject code , max_marks, time Duration , Total Question)
4) Question Table = Where questions are present with there option and right option and mapped with subject (id , question , option1 , option2 , option3 , option4 , right option , subject) 
5) exam table = contain the student id, subject id , marks (id , student_id , subject_id , marks_score, exam_status (pass/fail))
 
 
