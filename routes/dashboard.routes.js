import { loadDashBoardPage , loadInsertAndUpdateSubjectForm } from "../model/dashboard.model.js";
import { insertOrUpdateSubjectDetails , showAllSubject , fetchSubjectDetails , deleteSubject } from "../controller/subject.controller.js";

export const dashboardRoutes = (req,res) => {
    if(req.method == "GET") {
        if(req.url.includes("dashboard")) {
            let [dashboard_type,id] = req.url.split("/").filter((param) => param);
            const [type] = dashboard_type.split("_");
            loadDashBoardPage(req,res,id,type); 
        }
        if(req.url.startsWith("/insertAndUpdateSubject")) {
            const url_arr = req.url.split("/").filter((param) => param);
            if(url_arr.length > 1 ) {
                loadInsertAndUpdateSubjectForm(req,res,url_arr[1]);
            } else {
                loadInsertAndUpdateSubjectForm(req,res);
            }
        }
        if(req.url.startsWith("/subject")) {
            let id = req.url.split("/").filter((param) => param)[1];
            fetchSubjectDetails(req,res,id);  
        } 
        if(req.url == "/showAllSubject") showAllSubject(req,res);
    }

    if (req.method == "POST") {
        if(req.url == "/insertOrUpdateSubjectDetails") insertOrUpdateSubjectDetails(req,res);
        if(req.url == "/deleteSubject") deleteSubject(req,res);
    }
}