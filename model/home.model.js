import fs from "fs";
import path from "path";

const serverFile = async (req,res,content_type,folderPath) => {
    try {
        const file = await fs.promises.readFile(folderPath,"utf-8");
        res.writeHead(200 , {'content-type': content_type});
        res.end(file);
    } catch (error) {
        res.writeHead(404 , {'content-type': 'text/html'});
        res.end("<h1 style = 'text-align:center'>404 Page not Found</h1>");
    }
}

export const loadDashBoardPage = (req,res,id,type) => serverFile(req,res,"text/html",path.join("views",`${type}_dashboard.html`));