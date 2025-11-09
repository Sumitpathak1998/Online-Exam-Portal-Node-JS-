import fs from "fs";
import path from "path";
import {db} from "./dbConnection.js";

export const loadQuestionPage = async (req,res,id) => {
    try {
        const file = await fs.promises.readFile(path.join("views","question_list.html"),'utf-8');
        let [db_data] = await db.execute("SELECT `name` FROM `subject` WHERE `id` = ?" , [id]);
        const files = file.replace("{{Subject_name}}",db_data[0].name);
        res.writeHead(200 , {'content-type': 'text/html'});
        res.end(files);
    } catch (error) {
        res.writeHead(404 , {'content-type': 'text/html'});
        res.end(`<h1 style = 'text-align:center'>${error}</h1>`);
    }
}
