import fs from "fs";
import path from "path";

const folderPath = path.join(import.meta.dirname, "../data", "register.student.json");

export const loadRegisterStudent =  async() => {
    try {
        const data = await fs.promises.readFile(folderPath,"utf-8");
        return data != "" ? JSON.parse(data) : {};
    } catch (error) {
        console.log(error,"error");
        console.log(error.code);
        if(error.code == "ENOENT") {
            await fs.promises.writeFile(folderPath,JSON.stringify({}),"utf-8");
            return {};
        }
        throw error;
    }
}

export const saveRegisterStudent = async (registerStudentList) => {
    await fs.promises.writeFile(folderPath,JSON.stringify(registerStudentList),"utf-8");
}