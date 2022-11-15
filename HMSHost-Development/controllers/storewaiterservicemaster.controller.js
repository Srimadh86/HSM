const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const StoreWSMaster = db.storewaiterservicemasters;
exports.list = async(req,res)=>{
    const storewaiterservicemasters = await StoreWSMaster.findAll({order: [['Waiter_service_ID', 'DESC']]});
    if(storewaiterservicemasters)
    {
        res.json({"status":"Success","message":"storewaiterservicemasters List",'data':storewaiterservicemasters});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var storewaiterservicemaster = await StoreWSMaster.findOne({where:{Waiter_service_status:req.body.Waiter_service_status}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!storewaiterservicemaster)
    {
    var addstatus = StoreWSMaster.create(req.body);
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
    const storewaiterservicemaster = await StoreWSMaster.findOne({where:{Waiter_service_ID:req.params.id}})
    if(storewaiterservicemaster)
    {        
        res.json({"status":"Success","message":"storealcoholstatusmaster view",'data':storewaiterservicemaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    const storewaiterservicemaster = await StoreWSMaster.findOne({where:{Waiter_service_ID:req.params.id}})
    
    storewaiterservicemaster.Waiter_service_Value = req.body.Waiter_service_Value; 
    storewaiterservicemaster.Waiter_service_status = req.body.Waiter_service_status;
    storewaiterservicemaster.status = req.body.status
    var addstatus = await storewaiterservicemaster.save();
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
    const storewaiterservicemaster = await StoreWSMaster.findOne({where:{Waiter_service_ID:req.params.id}})
    storewaiterservicemaster.status = 'In-active';
    var addstatus = await storewaiterservicemaster.save();
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
                    var storewaiterservicemaster = await StoreWSMaster.findOne({where:{Waiter_service_status:rows[key][0]}});
                    if(storewaiterservicemaster)
                    {
                        storewaiterservicemaster.Waiter_service_status = rows[key][0]; 
                        storewaiterservicemaster.Waiter_service_Value = rows[key][1];  
                        await storewaiterservicemaster.save();
                    }
                    else
                    {
                        const newstorewaitermaster = 
                        {
                            Waiter_service_status :rows[key][0],
                            Waiter_service_Value: rows[key][1],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await StoreWSMaster.create(newstorewaitermaster)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}