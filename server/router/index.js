//import express from 'express'
var express = require('express')
const router = express();


router.get("/", function(request, response) {
 response.render("index", {
 message: "Hey everyone! This is my webpage."
 });
});

router.get('/shows',(req, res) => {
  res.json('Hello world! with routes')
})


module.exports = router
//export default router
