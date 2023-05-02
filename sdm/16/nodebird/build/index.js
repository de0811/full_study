"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// const http = require("http");
const http = __importStar(require("http"));
// const fs = require("fs/promises");
const fs = __importStar(require("fs/promises"));
// const path = require("path");
const path = __importStar(require("path"));
const db = {
    users: [
        {
            id: 1,
            name: "fuck",
            password: "123",
        },
        {
            id: 2,
            name: "sam",
            password: "333",
        },
    ],
};
// const db: {
// users: {
// id: number;
// name: string;
// password: string;
// }[];
// }
//
let currentID = 2;
http
    .createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (req.method === "GET" && req.url === "/") {
            console.log("get /");
            const data = yield fs.readFile(path.join(__dirname, "user.html"));
            res.writeHead(200, { "Content-Type": "text/html; charset-utf-8" });
            return res.end(data);
        }
        else if (req.method === "GET" && req.url === "/v2/users") {
            console.log("get /v2/users");
            res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
            });
            return res.end(JSON.stringify(db.users));
        }
        else if (req.method === "POST" && req.url === "/v2/users") {
            console.log("post /v2/users");
            let body = "";
            req.on("data", (data) => {
                body += data;
            });
            return req.on("end", () => {
                let json = JSON.parse(body);
                json = Object.assign({ id: ++currentID }, json);
                db.users.push(json);
                res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            });
        }
        else if (req.method === "PUT" && ((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith("/v2/users/"))) {
            console.log("put /v2/users");
            let id = req.url.split("/")[3];
            id = Number(id);
            let body = "";
            req.on("data", (data) => {
                body += data;
            });
            return req.on("end", () => {
                let json = JSON.parse(body);
                json = Object.assign({ id }, json);
                db.users.forEach((user) => {
                    if (user.id === id) {
                        user.name = json.name;
                        user.password = json.password;
                    }
                });
                res.writeHead(201, {
                    "Content-Type": "text/plain; charset=utf-8",
                    Location: "/",
                });
            });
        }
        else if (req.method === "DELETE" && ((_b = req.url) === null || _b === void 0 ? void 0 : _b.startsWith("/v2/users/"))) {
            console.log("delete /v2/users");
            let id = req.url.split("/")[3];
            id = Number(id);
            let body = '';
            req.on("data", (data) => {
                body += data;
            });
            req.on("end", () => {
                db.users.forEach((user, idx) => {
                    if (user.id === id) {
                        delete db.users[idx];
                        // delete user;
                    }
                });
                db.users = db.users.filter((user) => user.id !== id);
            });
        }
        else {
            res.writeHead(404);
            return res.end("NOT FOUND");
        }
    }
    catch (error) {
        console.log(error);
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    }
}))
    .listen(8080, () => {
    console.log("8080 port 대기중");
});
