//

const express = require('express');
const fs = require('file-system');
const https = require('https');
const bp = require('body-parser');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/" , function(req,res){
    let city = req.body.cn;
    console.log(city);
    const key = process.env.KEY;
    let url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+ key +"&units=metric";
    https.get(url , function(response){
        response.on("data",function(data){
            let weatherdata = JSON.parse(data);
            let temp = weatherdata.main.temp;
            let description = weatherdata.weather[0].description;
            let icon = "http://openweathermap.org/img/wn/"+weatherdata.weather[0].icon+"@2x.png"
            res.write("<h1>the tempratur in " +city+" is " + temp +" c </h1>");
            res.write("<h3>discription :"+description+" </h3>");
            res.write("<img src="+icon+">")
            res.send();
            // const temp = weaterdata.main.temp;
            // const obj = {
            //     name : "deep",
            //     city : "rajkot"
            // }
            //console.log(obj)
            fs.appendFile(__dirname + "/data.txt" ,city+"  ",'utf8',function(err){
                if(err) throw err;
                console.log("added successfully");
            })

        })
    })
})


app.listen(3000,function(){
    console.log("Server is running on port 3000");
});