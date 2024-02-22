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
const express_1 = __importDefault(require("express"));
const host_js_1 = require("./host.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.get('/deploy', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { repo, folder, port } = req.query;
    console.log(repo, folder);
    const result = yield (0, host_js_1.deploy)(repo, folder, port).catch((err) => {
        res.send(err);
    })
        .then((result) => {
        res.send(result);
    });
    res.send(result);
}));
app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
});
