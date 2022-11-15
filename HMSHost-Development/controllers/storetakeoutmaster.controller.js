const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const StoreTOMaster = db.storetakeoutmasters;
exports.list = async(req,res)=>{
    const storetakeoutmasters = await StoreTOMaster.findAll({order: [['Takeout_ID', 'DESC']]});
    if(storetakeoutmasters)
    {
        res.json({"status":"Success","message":"storetakeoutmasters List",'data':storetakeoutmasters});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var storetakeoutmaster = await StoreTOMaster.findOne({where:{Takeout_status:req.body.Takeout_status}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);
    
    if(!storetakeoutmaster)
    {
    var addstatus = StoreTOMaster.create(req.body);
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
    const storetakeoutmaster = await StoreTOMaster.findOne({where:{Takeout_ID:req.params.id}})
    if(storetakeoutmaster)
    {        
        res.json({"status":"Success","message":"storetakeoutmaster view",'data':storetakeoutmaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    const storetakeoutmaster = await StoreTOMaster.findOne({where:{Takeout_ID:req.params.id}})
    console.log(req.params.id);
    storetakeoutmaster.Takeout_status = req.body.Takeout_status; 
    storetakeoutmaster.Takeout_value = req.body.Takeout_value;
    storetakeoutmaster.status = req.body.status
    var addstatus = await storetakeoutmaster.save();
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
    const storetakeoutmaster = await StoreTOMaster.findOne({where:{Takeout_ID:req.params.id}})
    storetakeoutmaster.status = 'In-active';
    var addstatus = await storetakeoutmaster.save();
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
                    var storetakeoutmaster = await StoreTOMaster.findOne({where:{Takeout_status:rows[key][0]}});
                    if(storetakeoutmaster)
                    {
                        storetakeoutmaster.Takeout_status = rows[key][0]; 
                        storetakeoutmaster.Takeout_value = rows[key][1];  
                        await storetakeoutmaster.save();
                    }
                    else
                    {
                        const newtakeoutmaster = 
                        {
                            Takeout_status :rows[key][0],
                            Takeout_value: rows[key][1],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await StoreTOMaster.create(newtakeoutmaster)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}