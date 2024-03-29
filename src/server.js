const fileUpload = require("express-fileupload")
const express = require("express");
const path = require("path")
const fs = require("fs/promises")
const PORT = 5000;
const app = express();

app.use(express.static(path.join(__dirname, "public")))
app.use("/bootstrap/", express.static(path.join(__dirname, "public", "views", "bootstrap")))
app.use("/getFile/", express.static(path.join(__dirname, "public", "images")))
app.use(fileUpload());

app.get("/", (_, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "index.html"))
});
app.get("/login", (_, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "login.html"))
})
app.get("/files", (_, res) => {
    res.send(require(path.join(process.cwd(), "database", "users.json")))
})
app.get("/download/:downloadFile", async (req, res) => {
    const {downloadFile} = req.params;
    const file = path.join(__dirname, "public", "images", downloadFile)
    res.download(file)
})
app.post("/upload", async (req, res) => {
    const {file} = req.files;
    const filePath = path.join(__dirname, "public", "images", file.name.replaceAll(" ", ""))
    if(filePath){
        file.mv(filePath)
        res.json({
            message: "Success"
        })
        const newData = {
            avtor: req.body.username,
            fileText: req.body.title,
            fileName: file.name
        }
        const database = JSON.parse(await fs.readFile(path.join(process.cwd(), "database", "users.json")))
        database.push(newData)
        await fs.writeFile(path.join(process.cwd(), "database", "users.json"), JSON.stringify(database, null, 4))
    }
})
app.listen(PORT, ( ) => {
    console.log(`Server is running http://localhost:${PORT}`)
})