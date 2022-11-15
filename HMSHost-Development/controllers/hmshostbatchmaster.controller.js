const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const BatchMaster = db.hostbatchmasters;
exports.list = async(req,res)=>{
    const hostbatchmasters = await BatchMaster.findAll({order: [['HMSHost_Batch_ID', 'DESC']]});
    if(hostbatchmasters)
    {
        res.json({"status":"Success","message":"hostbatchmasters List",'data':hostbatchmasters});
    }
    else
    {
        
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);
    var addstatus = BatchMaster.create(req.body);
    if(addstatus)
    {
        res.json({"status":"Success","message":"Success"});
    }
    else
    {
        res.json({"status":"Fail","message":"Could not save record. Please try again"});
    }
    
}
exports.view = async (req,res)=>
{
    const batchMaster = await BatchMaster.findOne({where:{HMSHost_Batch_ID:req.params.id}})
    if(batchMaster)
    {        
        res.json({"status":"Success","message":"batchMaster view",'data':batchMaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    const batchMaster = await BatchMaster.findOne({where:{HMSHost_Batch_ID:req.params.id}})
    batchMaster.Uploaded_Date = req.body.Uploaded_Date; 
    batchMaster.Transaction_Start_Date = req.body.Transaction_Start_Date;
    batchMaster.Transaction_End_Date = req.body.Transaction_End_Date; 
    batchMaster.Batch_directory_address = req.body.Batch_directory_address;
    batchMaster.status = req.body.status
    var addstatus = await batchMaster.save();
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
    const batchMaster = await BatchMaster.findOne({where:{HMSHost_Batch_ID:req.params.id}})
    batchMaster.status = 'In-active';
    var addstatus = await batchMaster.save();
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
                        const newbatchMaster = 
                        {
                            Batch_directory_address :rows[key][0],
                            Transaction_Start_Date: rows[key][1],
                            Transaction_End_Date:rows[key][2],
                            Uploaded_Date:rows[key][3],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await BatchMaster.create(newbatchMaster)                    
                    
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}