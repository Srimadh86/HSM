const request = require('express');
var requestIp = require('request-ip');
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const validator = require('../helpers/validate');
const Country = db.countries;
exports.list = async(req,res)=>{
    const countries = await Country.findAll({order: [['Country_ID', 'DESC']]});
    if(countries)
    {
        res.json({"status":"Success","message":"Countries List",'data':countries});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    //console.log(req.body);
    var country = await Country.findOne({where:{Country_Name:req.body.Country_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);   
    const validationRule = {
        "Country_Name": "required|string|max:200",
        "Country_Short_Name": "required|string|max:200",
        "Currency": "required|string|max:200",
        "Currency_Symbol": "required|string|max:200" 
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) 
        {
            console.log(status);
            res.json({"status":"Fail","message":'Validation failed',data: err}); 
        } 
        else 
        {
            if(!country)
    {        
    var addstatus = Country.create(req.body);
    if(addstatus)
    {
        res.json({"status":"Success","message":"Success"});
    }
    else
    {
        res.json({"status":"Fail","message":"Could not save record. Please try again"});
    }
            }
            else{
                res.json({"status":"Fail","message":"Could not save record. because country already exist",data:[]}); 
            }
        }
    });
   
}
exports.view = async (req,res)=>
{
    const country = await Country.findOne({where:{Country_ID:req.params.id}})
    if(country)
    {
        res.json({"status":"Success","message":"Country view",'data':[country]});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    var country = await Country.findOne({where:{Country_ID:req.params.id}});
    var Country_Name = country.Country_Name;
    country.Country_Name = req.body.Country_Name; 
    country.Country_Short_Name = req.body.Country_Short_Name;
    country.Currency = req.body.Currency;
    country.Currency_Symbol = req.body.Currency_Symbol;
    country.status = "Active";
    
    const validationRule = {
        "Country_Short_Name": "required|string|max:200",
        "Currency": "required|string|max:200",
        "Currency_Symbol": "required|string|max:200" 
    };
    await validator(req.body, validationRule, {}, async(err, status) => {
        if (!status) 
        {
            console.log(status);
            res.json({"status":"Fail","message":'Validation failed',data: err}); 
        } 
        else 
        {            
               var addstatus = await country.save();
                if(addstatus)
                {
                    res.json({"status":"Success","message":"Success"});
                }
                else
                {
                    res.json({"status":"Fail","message":"Could not save record. Please try again",data: err});
                }
        }
    });
}

exports.delete = async(req,res)=>{
    const country = await Country.findOne({where:{Country_ID:req.params.id}});
    country.status = 'In-active';
    var addstatus = await country.save();
    if(addstatus)
    {
        res.json({"status":"Success","message":"Success"});
    }
    else
    {
        res.json({"status":"Fail","message":"Could not Delete. Please try again"});
    } 
}
exports.GlobalCountryMaster= async(rows,clientIp)=>{
    for(var key in rows)
    {
        if(rows[key] != [])
        {
            var country = await Country.findOne({where:{Country_Name:rows[key]['Country_Name']}});
            if(country)
            {
                country.Country_Name = rows[key]['Country_Name']; 
                country.Country_Short_Name = rows[key]['Country_Short_Name'];  
                country.Currency = rows[key]['Currency']; 
                country.Currency_Symbol = rows[key]['Currency_Symbol']; 
                await country.save();
            }
            else
            {
                const newcountry = 
                {
                    Country_Name :rows[key]['Country_Name'],
                    Country_Short_Name: rows[key]['Country_Short_Name'],
                    Currency :rows[key]['Currency'],
                    Currency_Symbol: rows[key]['Currency_Symbol'],
                    ipAddress:clientIp,
                    status:"Active"
                }
                await Country.create(newcountry)                    
            }
        }
    }
}