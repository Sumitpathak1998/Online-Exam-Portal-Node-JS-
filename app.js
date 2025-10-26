import http from "http";
import { loginRoutes } from "./routes/login.routes.js";
import { registerRoutes} from "./routes/register.routes.js";
import { homeRoutes } from "./routes/home.routes.js";
// create the server 
const server = http.createServer( async (req,res) => {
    loginRoutes(req,res);
    registerRoutes(req,res);
    homeRoutes(req,res);
})

const PORT = process.env.PORT;
server.listen(PORT , () => {
    console.log(`Server start at PORT : ${PORT}`);
})