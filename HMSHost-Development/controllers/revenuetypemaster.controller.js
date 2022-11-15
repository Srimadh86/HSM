const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const RevenueTypeMaster = db.revenuemasters;
exports.list = async(req,res)=>{
    const revenuemasters = await RevenueTypeMaster.findAll({order: [['Revenue_Type_ID', 'DESC']]});
    if(revenuemasters)
    {
        res.json({"status":"Success","message":"revenuemasters List",'data':revenuemasters});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var revenuemaster = await RevenueTypeMaster.findOne({where:{Revenue_Type_Description:req.body.Revenue_Type_Description}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);
    
    if(!revenuemaster)
    {
    var addstatus = RevenueTypeMaster.create(req.body);
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
    const revenuemaster = await RevenueTypeMaster.findOne({where:{Revenue_Type_ID:req.params.id}})
    if(revenuemaster)
    {        
        res.json({"status":"Success","message":"revenuemaster view",'data':revenuemaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    var revenuemaster = await RevenueTypeMaster.findOne({where:{Revenue_Type_ID:req.params.id}});
    console.log(req.params.id);
    revenuemaster.Revenue_Type_Description = req.body.Revenue_Type_Description; 
    revenuemaster.Revenue_Type_Value = req.body.Revenue_Type_Value;
    revenuemaster.status = req.body.status
    var addstatus = await revenuemaster.save();
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
    const revenuemaster = await RevenueTypeMaster.findOne({where:{Revenue_Type_ID:req.params.id}});
    revenuemaster.status = 'In-active';
    var addstatus = await revenuemaster.save();
    if(addstatus)
    {
        res.json({"status":"Success","message":"Success"});
    }
    else
    {
        res.json({"status":"Fail","message":"Could not Delete. Please try again"});
    } 
}
exports.uploadRevenueExcel = async(req,res)=>
{
    console.log('hello');
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
            console.log(rows);
            for(var key in rows)
            {
                if(rows[key] != [])
                {
                    var revenuemaster = await RevenueTypeMaster.findOne({where:{Revenue_Type_Description:rows[key][0]}});
                    if(revenuemaster)
                    {
                        revenuemaster.Revenue_Type_Description = rows[key][0];
                        revenuemaster.Revenue_Type_Value = rows[key][1];  
                        await revenuemaster.save();
                    }
                    else
                    {
                        const newrevenuemaster = 
                        {
                            Revenue_Type_Description: rows[key][0],
                            Revenue_Type_Value:rows[key][1],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await RevenueTypeMaster.create(newrevenuemaster)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}
exports.HMSHost_Revenue_Type_Master=async(rows,clientIp)=>{
    for(var key in rows)
            {
                if(rows[key] != [])
                {
                    var revenuemaster = await RevenueTypeMaster.findOne({where:{Revenue_Type_Value:rows[key]['Revenue_Type_Value']}});
                    if(revenuemaster)
                    {
                        revenuemaster.Revenue_Type_Description = rows[key]['Revenue_Type_Description'];
                        revenuemaster.Revenue_Type_Value = rows[key]['Revenue_Type_Value'];  
                        await revenuemaster.save();
                    }
                    else
                    {
                        const newrevenuemaster = 
                        {
                            Revenue_Type_Description: rows[key]['Revenue_Type_Description'],
                            Revenue_Type_Value:rows[key]['Revenue_Type_Value'],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await RevenueTypeMaster.create(newrevenuemaster)                    
                    }
                }
            }
}