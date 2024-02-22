"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deploy = void 0;
const child_process_1 = require("child_process");
const promises_1 = __importDefault(require("node:fs/promises"));
const set_js_1 = require("./nginx/set.js");
function deploy(link, folder, port) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        //check if the link is valid
        if ((yield isValid(link)) === true) {
            const projectName = checkName(link);
            (0, child_process_1.exec)(`bash project.sh ${link} ${folder} ${projectName}`, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                }
                if (stdout) {
                    const filename = `test.txt`;
                    promises_1.default.writeFile(filename, stdout).then(() => {
                        if (err) {
                            console.log(err);
                        }
                        console.log("process written to file");
                        isHttpServerRunning(folder, projectName, port); //run the website
                        setTimeout(() => {
                            resolve("build done");
                            checkPort(port).then(() => {
                                set_js_1.projects.push({ path: projectName, port: { port } }); //add the project to the nginx config
                                (0, set_js_1.generateNginxConfig)().then(() => {
                                    // generate Config and reload nginx
                                    console.log(set_js_1.projects); //print the projects
                                });
                            });
                        }, 10000);
                    });
                }
                // console.log(stdout)
                resolve("build done");
            });
        }
        else {
            reject("Invalid Link");
        }
    }));
}
exports.deploy = deploy;
// to run the Http server
function isHttpServerRunning(folder, projectName, port) {
    return new Promise((resolve, reject) => {
        const command = `sudo bash deploy.sh ${folder} ${projectName} ${port}`;
        (0, child_process_1.exec)(command, (error, stdout, stderr) => {
            if (error) {
                return reject(error);
            }
            if (stdout) {
                console.log(stdout);
                return resolve(true);
            }
            if (stderr) {
                console.error(stderr);
                return reject(false);
            }
        });
    });
}
// this function is used to check Project Name
function checkName(link) {
    const repoUrl = link;
    const repoName = repoUrl.split('/').pop() || '';
    console.log("Repository name:", repoName);
    return repoName;
}
// this function is used to check if the port is running
function checkPort(port) {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(`lsof -i:${port}`, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }
            if (stdout) {
                console.log(stdout);
                resolve(stdout);
            }
            if (stderr) {
                console.log(stderr);
                reject(stderr);
            }
        });
    });
}
// this function is used to check if the link is valid
function isValid(link) {
    return new Promise((resolve, reject) => {
        fetch(link, { method: 'HEAD' })
            .then((res) => {
            if (res.status === 200) {
                console.log(res.status);
                resolve(true);
            }
            else {
                console.log(res.status);
                reject(false);
            }
        });
    });
}
