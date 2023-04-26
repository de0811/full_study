import mongoose, { ConnectOptions } from "mongoose";

/*
docker run --name mongodb-container \
-e MONGO_INITDB_ROOT_USERNAME=root \
-e MONGO_INITDB_ROOT_PASSWORD=mongo \
-e MONGO_INITDB_DATABASE=todo \
-d --rm -p 27017:27017 mongo 
*/

const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  const options: ConnectOptions = {
    dbName: "todo",
  };
  mongoose
    .connect("mongodb://root:mongo@localhost:27017/todo?authSource=admin", options)
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((error) => {
      console.error("몽고디비 연결 에러1", error);
      console.error(error);
    });
  // mongoose.connection.on('error', (error:any) => {
  // console.error('몽고디비 연결 에러2', error);
  // });
  mongoose.connection.on("disconnected", () => {
    console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
    // connect();
  });
};

const User = require('./user');
const Todo = require('./todo');
const Calendar = require('./calendar');

const DB = {
  User,
  Todo,
  Calendar,
 };

export { DB, connect };

// module.exports = connect;
