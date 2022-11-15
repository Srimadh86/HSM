const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const RoundingMaster = db.roundingmaster;
exports.list = async(req,res)=>{
    const roundingmasters = await RoundingMaster.findAll({order: [['Rounding_ID', 'DESC']]});
    if(roundingmasters)
    {
        res.json({"status":"Success","message":"roundingmasters List",'data':roundingmasters});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var roundingmaster = await RoundingMaster.findOne({where:{Rounding_Rule_Description:req.body.Rounding_Rule_Description}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!roundingmaster)
    {
    var addstatus = RoundingMaster.create(req.body);
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
    const roundingmaster = await RoundingMaster.findOne({where:{Rounding_ID:req.params.id}})
    if(roundingmaster)
    {        
        res.json({"status":"Success","message":"roundingmaster view",'data':roundingmaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    var roundingmaster= await RoundingMaster.findOne({where:{Rounding_ID:req.params.id}});
    roundingmaster.Rounding_Value = req.body.Rounding_Value; 
    roundingmaster.Rounding_Rule_Description = req.body.Rounding_Rule_Description;
    roundingmaster.status = req.body.status
    var addstatus = await roundingmaster.save();
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
    const roundingmaster = await RoundingMaster.findOne({where:{Rounding_ID:req.params.id}});
    roundingmaster.status = 'In-active';
    var addstatus = await roundingmaster.save();
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
                    var roundingmaster = await RoundingMaster.findOne({where:{Rounding_Rule_Description:rows[key][1]}});
                    if(roundingmaster)
                    {
                        roundingmaster.Rounding_Value = rows[key][0]; 
                        roundingmaster.Rounding_Rule_Description = rows[key][1];  
                        await roundingmaster.save();
                    }
                    else
                    {
                        const newrounding = 
                        {
                            Rounding_Value :rows[key][0],
                            Rounding_Rule_Description: rows[key][1],
                            created_date:Date.now(),
                            updated_date:Date.now(),
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await RoundingMaster.create(newrounding)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}
exports.Pricing_Model_Rounding_Maste = async(rows,clientIp)=>{
    for(var key in rows)
    {
        if(rows[key] != [])
        {
            var roundingmaster = await RoundingMaster.findOne({where:{Rounding_Value:rows[key]['Rounding_Value']}});
            if(roundingmaster)
            {
                roundingmaster.Rounding_Value = rows[key]['Rounding_Value']; 
                roundingmaster.Rounding_Rule_Description = rows[key]['Rounding_Rule_description'];  
                await roundingmaster.save();
            }
            else
            {
                const newrounding = 
                {
                    Rounding_Value :rows[key]['Rounding_Value'],
                    Rounding_Rule_Description: rows[key]['Rounding_Rule_description'],
                    ipAddress:clientIp,
                    status:"Active"
                }
                await RoundingMaster.create(newrounding)                    
            }
        }
    }
}