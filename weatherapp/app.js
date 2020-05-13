const request = require("request");

const url = "https://www.google.co.in";

request(url, (error, response) => {
    //console.log("error : " + error);
    //console.log("response : " + response);
    //console.log("body : " + body); 
    const respBody = JSON.parse(response.body);
    console.log(respBody);
});