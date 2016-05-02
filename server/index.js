var http = require("http")
var express = require("express");
var logger = require("morgan");
var path = require("path")
var bodyParser = require("body-parser")
var app = express();
var middlewares   = require('./middleware')
var api = require('./router')

const server = http.createServer(app)
const port = process.env.PORT || 3000

//MIDDLEWARE*******************************************************************/
app.use(logger("short"));
app.use(function(request,response,next) {
      console.log("IP:",request.ip)
    //console.log("In comes a" + request.method  + "to " + request.url)
    next();
})

var EVIL_IP = "127.0.0.1";
app.use(function(request, response, next) {
  console.log('valida ip')
 if (request.ip === EVIL_IP) {
 response.status(401).send("Not allowed!");
 } else {
 next();
 }
});


for(var middleware in middlewares) {
  app.use(middlewares[middleware])
}
/*BODY-PARSER******************************************************************/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
/*ROUTER**********************************************************************/
app.use('/api',api)
/*****************************************************************************/

/*VIEWS***********************************************************************/
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
/******************************************************************************/






server.listen(port,()=> {

  console.log(`Server Listening on port ${port}`)
})
