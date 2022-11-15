const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const PricingModelMatchQualityScoreMaster = db.pricingmodelmatchqualityscoremaster;
exports.list = async(req,res)=>{
    const pricingmodelmatchqualityscoremasters = await PricingModelMatchQualityScoreMaster.findAll({order: [['Match_Quality_Score_ID', 'DESC']]});
    if(pricingmodelmatchqualityscoremasters)
    {
        res.json({"status":"Success","message":"pricingmodelmatchqualityscoremasters List",'data':pricingmodelmatchqualityscoremasters});
    }
    else
    {
        
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var pricingmodelmatchqualityscoremaster = await PricingModelMatchQualityScoreMaster.findOne({where:{Match_Quality_Score_Name:req.body.Match_Quality_Score_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!pricingmodelmatchqualityscoremaster)
    {
    var addstatus = PricingModelMatchQualityScoreMaster.create(req.body);
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
    const pricingmodelmatchqualityscoremaster = await PricingModelMatchQualityScoreMaster.findOne({where:{Match_Quality_Score_ID:req.params.id}})
    if(pricingmodelmatchqualityscoremaster)
    {        
        res.json({"status":"Success","message":"pricingmodelmatchqualityscoremaster view",'data':pricingmodelmatchqualityscoremaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    const pricingmodelmatchqualityscoremaster = await PricingModelMatchQualityScoreMaster.findOne({where:{Match_Quality_Score_ID:req.params.id}})
    pricingmodelmatchqualityscoremaster.Match_Quality_Score_Name = req.body.Match_Quality_Score_Name; 
    pricingmodelmatchqualityscoremaster.Match_Quality_Score_value = req.body.Match_Quality_Score_value;
    pricingmodelmatchqualityscoremaster.status = req.body.status
    var addstatus = await pricingmodelmatchqualityscoremaster.save();
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
    const pricingmodelmatchqualityscoremaster = await PricingModelMatchQualityScoreMaster.findOne({where:{Match_Quality_Score_ID:req.params.id}})
    pricingmodelmatchqualityscoremaster.status = 'In-active';
    var addstatus = await pricingmodelmatchqualityscoremaster.save();
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
                    var pricingmodelmatchqualityscoremaster = await PricingModelMatchQualityScoreMaster.findOne({where:{Match_Quality_Score_Name:rows[key][0]}});
                    if(pricingmodelmatchqualityscoremaster)
                    {
                        pricingmodelmatchqualityscoremaster.Match_Quality_Score_Name = rows[key][0]; 
                        pricingmodelmatchqualityscoremaster.Match_Quality_Score_value = rows[key][1];  
                        await pricingmodelmatchqualityscoremaster.save();
                    }
                    else
                    {
                        const newpricingmodelmatchqualityscoremaster = 
                        {
                            Match_Quality_Score_Name :rows[key][0],
                            Match_Quality_Score_value: rows[key][1],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await PricingModelMatchQualityScoreMaster.create(newpricingmodelmatchqualityscoremaster)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}