import { loadDashBoardPage , loadInsertAndUpdateSubjectForm  } from "../model/dashboard.model.js";
import { insertOrUpdateSubjectDetails , showAllSubject } from "../controller/subject.controller.js";

export const dashboardRoutes = (req,res) => {
    if(req.method == "GET") {
        if(req.url.includes("dashboard")) {
            let [dashboard_type,id] = req.url.split("/").filter((param) => param);
            const [type] = dashboard_type.split("_");
            loadDashBoardPage(req,res,id,type); 
        }
        if(req.url == "/insertAndUpdateSubject") loadInsertAndUpdateSubjectForm(req,res);
        if(req.url == "/showAllSubject") showAllSubject(req,res);
    }

    if (req.method == "POST") {
        if(req.url == "/insertOrUpdateSubjectDetails") insertOrUpdateSubjectDetails(req,res);
    }
}