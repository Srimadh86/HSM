const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const PriceNameMatchRangeMaster = db.pricenamematchrangemaster;
exports.list = async(req,res)=>{
    const pricenamematchrangemasters = await PriceNameMatchRangeMaster.findAll({order: [['Name_Match_ID', 'DESC']]});
    if(pricenamematchrangemasters)
    {
        res.json({"status":"Success","message":"pricenamematchrangemasters List",'data':pricenamematchrangemasters});
    }
    else
    {
        
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var pricenamematchrangemaster = await PriceNameMatchRangeMaster.findOne({where:{Name_Match_Description:req.body.Name_Match_Description}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);
    if(!pricenamematchrangemaster)
    {
    var addstatus = PriceNameMatchRangeMaster.create(req.body);
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
        res.json({"status":"Fail","message":"Could not save record. because country already exist"}); 
    }
}
exports.view = async (req,res)=>
{
    const pricenamematchrangemaster = await PriceNameMatchRangeMaster.findOne({where:{Name_Match_ID:req.params.id}})
    if(pricenamematchrangemaster)
    {        
        res.json({"status":"Success","message":"pricenamematchrangemaster view",'data':pricenamematchrangemaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    const pricenamematchrangemaster = await PriceNameMatchRangeMaster.findOne({where:{Name_Match_ID:req.params.id}})
    pricenamematchrangemaster.Name_Match_Description = req.body.Name_Match_Description; 
    pricenamematchrangemaster.Name_Match_Percentage = req.body.Name_Match_Percentage;
    pricenamematchrangemaster.Name_Weightage_Percentage = req.body.Name_Weightage_Percentage;
    pricenamematchrangemaster.status = req.body.status
    var addstatus = await pricenamematchrangemaster.save();
    if(addstatus)
    {
        res.json({"status":"Success","message":"Success"});
    }
    else
    {
        res.json({"status":"Fail","message":"Could not save record. Please try again"});
    }   
   
}

exports.delete = async(req,res)=>{
    const pricenamematchrangemaster = await PriceNameMatchRangeMaster.findOne({where:{Name_Match_ID:req.params.id}})
    pricenamematchrangemaster.status = 'In-active';
    var addstatus = await pricenamematchrangemaster.save();
    if(addstatus)
    {
        res.json({"status":"Success","message":"Success"});
    }
    else
    {
        res.json({"status":"Fail","message":"Could not Delete. Please try again"});
    } 
}
exports.uploadExcel = async(req,res)=>
{
    var clientIp = requestIp.getClientIp(req); 
    if (req.file == undefined) 
    {
       res.json({"Status":"Fail","message":"Please upload an excel file!"});
    }
    else
    {
        let path = 'uploads/'+req.file.filename;
        readXlsxFile(path).then(async(rows)=>{ 
            rows.shift(); 
            for(var key in rows)
            {
                if(rows[key] != [])
                {
                    var pricenamematchrangemaster = await PriceNameMatchRangeMaster.findOne({where:{Name_Match_Description:rows[key][0]}});
                    if(pricenamematchrangemaster)
                    {
                        pricenamematchrangemaster.Name_Match_Description = rows[key][0]; 
                        pricenamematchrangemaster.Name_Match_Percentage = rows[key][1]; 
                        pricenamematchrangemaster.Name_Weightage_Percentage = rows[key][2];  
                        await pricenamematchrangemaster.save();
                    }
                    else
                    {
                        const newpricenamematchrangemaster = 
                        {
                            Name_Match_Description :rows[key][0],
                            Name_Match_Percentage: rows[key][1],
                            Name_Weightage_Percentage: rows[key][2],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await PriceNameMatchRangeMaster.create(newpricenamematchrangemaster)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}