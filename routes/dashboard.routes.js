import { loadDashBoardPage } from "../model/home.model.js";

export const dashboardRoutes = (req,res) => {
    if(req.method == "GET") {
        if(req.url.includes("dashboard")) {
            let [dashboard_type,id] = req.url.split("/").filter((param) => param);
            const [type] = dashboard_type.split("_");
            loadDashBoardPage(req,res,id,type); 
        }
    }
}