const express = require('express');
const https = require('https');
const bodyparser= require('body-parser');

const app = express();
app.use(bodyparser.urlencoded({extended:true}));

app.get('/', function (req, res) {
    res.sendFile(__dirname+"/index.html");
});


app.post('/', function(req, res){
    const city= req.body.city;
    const apiKey="50847d5858122efd60ba2ece854ea960";
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&appid="+apiKey;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherdata=JSON.parse(data);
            const temp= weatherdata.main.temp;
            const description= weatherdata.weather[0].description;
            const imageicon= weatherdata.weather[0].icon;
            const imgurl= "http://openweathermap.org/img/wn/" + imageicon + "@2x.png";
        
            res.write('<head><meta charset="utf-8"></head>');
            res.write("<img src=" + imgurl + ">");
            res.write("<h1>"+ description +"</h1>" + "<br>");
            res.write("<h2>the temperature is "+ temp + "</h2>");
            res.send()
        });
    });
});


app.listen(3000, function () {
    console.log("server running on port 3000");
});