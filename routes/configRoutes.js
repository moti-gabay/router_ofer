const indexR = require("./index");
const usersR = require("./users");
const tvsR = require("./tvs");
const drinksR = require("./drinks");
const songsR = require("./songs")

exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
  app.use("/tvs",tvsR);
  app.use("/drinks",drinksR);
  app.use("/songs",songsR);
}