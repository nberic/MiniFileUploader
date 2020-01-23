const path = require("path");
const fs = require("fs");
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const app = express();

const DIR = "./uploads";
const fileNameHeader = "File-Name";
const usernameHeader = "User-Name"

const getAttributeFromHeaders = (headerStyleName, jsonObject) => 
    jsonObject[headerStyleName] === undefined ? headerStyleName.toLowerCase() : headerStyleName;

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // get attribute name
        const attributeName = getAttributeFromHeaders(usernameHeader, req.headers);
        const username = req.headers[attributeName];
        const dirName = `${ DIR }/${ username }`;

        // create directory for user if it doesn't exist
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName);
        }
        cb(null, dirName);
    },
    filename: (req, file, cb) => {
        // get attribute name
        const attributeName = getAttributeFromHeaders(fileNameHeader, req.headers);
        const fileName = req.headers[attributeName];
        
        // write files to storage
        cb(null, `${ fileName }-${ Date.now() }${ path.extname(file.originalname) }`);
    }
});

let upload = multer({ storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", `X-Requested-With, Content-Type, ${ fileNameHeader }, ${ usernameHeader }`);
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.get("/api", (req, res) => {
    res.end("File Upload");
});

app.post("/api/upload", upload.array("file"), (req, res) => {
    if (!req.file) {
        console.log("Your request doesn't have any file.");
        return res.send({ success: false });
    }
    else {
        console.log("Your file has been received successfully.");
        return res.send({ success: true });
    }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Node.js server is running on port ${ PORT }`);
});