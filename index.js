var http = require("http")
var express = require("express");
var logger = require("morgan");
var path = require("path")
var app = express();
var middlewares   = require('./middleware')

const server = http.createServer(app)
const port = process.env.PORT || 3000


app.use(logger("short"));
for(var middleware in middlewares) {
  app.use(middlewares[middleware])
}
app.use(function(request,response,next){

    console.log("In comes a" + request.method  + "to " + request.url)
    next();
})
/*
app.use(function(request,response,next){

    var minute = (new Date()).getMinutes();
    console.log(minute)
    if((minute % 2) === 0){
      next();
    }
    else{
      response.statusCode=403;
      response.end("No authorized")
    }
})
*/
server.listen(port,()=> {

  console.log(`Server Listening on port ${port}`)
})
