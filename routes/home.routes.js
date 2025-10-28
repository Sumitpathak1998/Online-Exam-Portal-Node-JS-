import { loadHomePage } from "../model/home.model.js";

export const homeRoutes = (req,res) => {
    if(req.method == "GET") {
        if(req.url.startsWith("/home/")) {
            let student_id = req.url.split("/")[2];
            loadHomePage(req,res,student_id); 
        }
    }
}