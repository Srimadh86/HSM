const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
var corOptions = 
{
    origin:"*",
    credentials:true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionSuccessStatus:200
}
app.use(cors(corOptions));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');    
    next();
});  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const db = require('./models');
const PORT = process.env.PORT || 8000;

require('./routes/restAPI')(app);
app.listen(PORT,()=>{
    console.log('HMS Server is running on port 8000')
})
app.post("/user/generateToken", (req, res) => {
    // Validate User Here
    // Then generate JWT Token
  
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }
  
    const token = jwt.sign(data, jwtSecretKey);
  
    res.send(token);
});
app.get("/user/validateToken", (req, res) => {
    // Tokens are generally passed in header of request
    // Due to security reasons.
  
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
        const token = req.header(tokenHeaderKey);
  
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return res.send("Successfully Verified");
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});
