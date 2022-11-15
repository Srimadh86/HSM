const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const StoreASMaster = db.storealcoholstatusmasters;
exports.list = async(req,res)=>{
    const storealcoholstatusmasters = await StoreASMaster.findAll({order: [['Alcohol_Status_ID', 'DESC']]});
    if(storealcoholstatusmasters)
    {
        res.json({"status":"Success","message":"storealcoholstatusmasters List",'data':storealcoholstatusmasters});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var storealcoholstatusmaster = await StoreASMaster.findOne({where:{Alcohol_status:req.body.Alcohol_status}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);
    
    if(!storealcoholstatusmaster)
    {
    var addstatus = StoreASMaster.create(req.body);
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
    const storealcoholstatusmaster = await StoreASMaster.findOne({where:{Alcohol_Status_ID:req.params.id}})
    if(storealcoholstatusmaster)
    {        
        res.json({"status":"Success","message":"storealcoholstatusmaster view",'data':storealcoholstatusmaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    const storealcoholstatusmaster = await StoreASMaster.findOne({where:{Alcohol_Status_ID:req.params.id}})
    console.log(req.params.id);
    storealcoholstatusmaster.Alcohol_status = req.body.Alcohol_status; 
    storealcoholstatusmaster.Alcohol_status_value = req.body.Alcohol_status_value;
    storealcoholstatusmaster.status = req.body.status
    var addstatus = await storealcoholstatusmaster.save();
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
    const storealcoholstatusmaster = await StoreASMaster.findOne({where:{Alcohol_Status_ID:req.params.id}})
    storealcoholstatusmaster.status = 'In-active';
    var addstatus = await storealcoholstatusmaster.save();
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
                    var storealcoholstatusmaster = await StoreASMaster.findOne({where:{Alcohol_status:rows[key][0]}});
                    if(storealcoholstatusmaster)
                    {
                        storealcoholstatusmaster.Alcohol_status = rows[key][0]; 
                        storealcoholstatusmaster.Alcohol_status_value = rows[key][1];  
                        await storealcoholstatusmaster.save();
                    }
                    else
                    {
                        const newstorealcoholmaster = 
                        {
                            Alcohol_status :rows[key][0],
                            Alcohol_status_value: rows[key][1],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await StoreASMaster.create(newstorealcoholmaster)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}