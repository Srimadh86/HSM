const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const StoreCatersMaster = db.storecatersmasters;
exports.list = async(req,res)=>{
    const storecatersmasters = await StoreCatersMaster.findAll({order: [['Caters_ID', 'DESC']]});
    if(storecatersmasters)
    {
        res.json({"status":"Success","message":"storecatersmasters List",'data':storecatersmasters});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var storecatersmaster = await StoreCatersMaster.findOne({where:{Caters_status:req.body.Caters_status}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!storecatersmaster)
    {
    var addstatus = StoreCatersMaster.create(req.body);
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
    const storecatersmaster = await StoreCatersMaster.findOne({where:{Caters_ID:req.params.id}})
    if(storecatersmaster)
    {        
        res.json({"status":"Success","message":"storecatersmaster view",'data':storecatersmaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    const storecatersmaster = await StoreCatersMaster.findOne({where:{Caters_ID:req.params.id}});    
    storecatersmaster.Caters_Value = req.body.Caters_Value; 
    storecatersmaster.Caters_status = req.body.Caters_status;
    storecatersmaster.status = req.body.status;
    var addstatus = await storecatersmaster.save();
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
    const storecatersmaster = await StoreCatersMaster.findOne({where:{Caters_ID:req.params.id}});    
    storecatersmaster.status = 'In-active';
    var addstatus = await storecatersmaster.save();
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
                    var storecatersmaster = await StoreCatersMaster.findOne({where:{Caters_status:rows[key][0]}});
                    if(storecatersmaster)
                    {
                        storecatersmaster.Caters_status = rows[key][0]; 
                        storecatersmaster.Caters_Value = rows[key][1]; 
                        await storecatersmaster.save();
                    }
                    else
                    {
                        const newstorecatermaster = 
                        {
                            Caters_status : rows[key][0],
                            Caters_Value : rows[key][1],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await StoreCatersMaster.create(newstorecatermaster)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}