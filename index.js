const express = require("express");
const https=require("https"); 
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post("/",(req,res)=>{
    const a="hyderabad";
    var link ="https://api.openweathermap.org/data/2.5/weather?q="+req.body.city+"&appid=3b24f2a7300fa460ad0383dae4a40a2b";
    https.get(link,(response)=>{
        response.on("data",(data)=>{
            const weatherData = JSON.parse(data);
            res.write("<h1>The weather in "+req.body.city+" is "+weatherData.main.temp+"F</h1>");
            res.write("<h1>The weather in "+req.body.city+" is "+weatherData.weather[0].description+"</h1>");
        })
    });
});

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});