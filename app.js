const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https");
const { options } = require("request");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    var data={
        members: [
            {
             email_address: email,
             status: "Subscribed",
             merged_fields: {
                FNAME:firstName,
                LNAME:lastName
                
             }
            }
        ]
    };
    var jsonData = JSON.stringify(data);
    console.log(firstName, lastName, email);

    var jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/a59a50d09c";

    const options ={
        method: "POST",
        auth: "tchtinku: e183b1b054059e143b444706f9e87efe-us14"
    }

  
  const request = https.request(url, options, function(response){

    
const request = https.request(url, options, function(response){
    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else {
      res.sendFile(__dirname + "/failure.html");
    }
  
  response.on("data",function(data){
    console.log(JSON.parse(data));
    })
  })
  })

  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
})


//API Key
// e183b1b054059e143b444706f9e87efe-us14

//audience id
// a59a50d09c