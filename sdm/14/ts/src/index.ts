// const http = require("http");
import * as http from "http";
// const fs = require("fs/promises");
import * as fs from "fs/promises";
// const path = require("path");
import * as path from "path";

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
let currentID: number = 2;

http
  .createServer(async (req, res) => {
    try {
      if (req.method === "GET" && req.url === "/") {
        console.log("get /");
        const data = await fs.readFile(path.join(__dirname, "user.html"));
        res.writeHead(200, { "Content-Type": "text/html; charset-utf-8" });
        return res.end(data);
      } else if (req.method === "GET" && req.url === "/v2/users") {
        console.log("get /v2/users");
        res.writeHead(200, {
          "Content-Type": "application/json; charset=utf-8",
        });
        return res.end(JSON.stringify(db.users));
      } else if (req.method === "POST" && req.url === "/v2/users") {
        console.log("post /v2/users");
        let body = "";
        req.on("data", (data) => {
          body += data;
        });

        return req.on("end", () => {
          let json = JSON.parse(body);
          json = { ...{ id: ++currentID }, ...json };

          db.users.push(json);
          res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        });
      } else if (req.method === "PUT" && req.url?.startsWith("/v2/users/")) {
        console.log("put /v2/users");
        let id: string|number = req.url.split("/")[3];
        id = Number(id);
        let body = "";
        req.on("data", (data) => {
          body += data;
        });
        return req.on("end", () => {
          let json = JSON.parse(body);
          json = { ...{ id }, ...json };

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
      } else if (req.method === "DELETE" && req.url?.startsWith("/v2/users/")) {
        console.log("delete /v2/users");
        let id:string|number = req.url.split("/")[3];
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
      } else {
        res.writeHead(404);
        return res.end("NOT FOUND");
      }
    } catch (error) {
      console.log(error);
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    }
  })
  .listen(8080, () => {
    console.log("8080 port 대기중");
  });
