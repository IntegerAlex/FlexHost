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
exports.generateNginxConfig = exports.projects = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const mustache_1 = __importDefault(require("mustache"));
const child_process_1 = require("child_process");
// import { promises } from 'node:fs/promises';
const node_path_1 = __importDefault(require("node:path"));
// Sample data representing your projects
exports.projects = [];
function generateNginxConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 1. Resolve the relative path
            const templatePath = node_path_1.default.resolve(__dirname, './nginx_template.mustache');
            // 2. Read the Mustache template
            const template = yield promises_1.default.readFile(templatePath, 'utf8');
            // 3. Render the template
            const nginxConfig = mustache_1.default.render(template, { projects: exports.projects });
            // 4. Write the generated configuration
            yield promises_1.default.writeFile(`/etc/nginx/nginx.conf`, nginxConfig);
            // 5. Reload Nginx 
            (0, child_process_1.exec)('sudo systemctl reload nginx', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Nginx reload failed: ${error.message}`);
                    throw error;
                }
                else {
                    console.log('Nginx reloaded successfully');
                }
            });
        }
        catch (error) {
            console.error("Error generating Nginx configuration:", error);
            // Handle the error appropriately 
        }
    });
}
exports.generateNginxConfig = generateNginxConfig;
