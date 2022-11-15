const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const StoreStyleMaster = db.storestylemasters;
exports.list = async(req,res)=>{
    const storestylemasters = await StoreStyleMaster.findAll({order: [['Comp_Store_Style_ID', 'DESC']]});
    if(storestylemasters)
    {
        res.json({"status":"Success","message":"storestylemasters List",'data':storestylemasters});
    }
    else
    {
        
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var storestylemaster = await StoreStyleMaster.findOne({where:{Comp_Store_Style_Name:req.body.Comp_Store_Style_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);
    if(!storestylemaster)
    {
    var addstatus = StoreStyleMaster.create(req.body);
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
    const storestylemaster = await StoreStyleMaster.findOne({where:{Comp_Store_Style_ID:req.params.id}})
    if(storestylemaster)
    {        
        res.json({"status":"Success","message":"storestylemaster view",'data':storestylemaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    const storestylemaster = await StoreStyleMaster.findOne({where:{Comp_Store_Style_ID:req.params.id}})
    storestylemaster.Comp_Store_Style_Name = req.body.Comp_Store_Style_Name; 
    storestylemaster.Comp_Store_Style_Description = req.body.Comp_Store_Style_Description;
    storestylemaster.status = req.body.status
    var addstatus = await storestylemaster.save();
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
    const storestylemaster = await StoreStyleMaster.findOne({where:{Comp_Store_Style_ID:req.params.id}})
    storestylemaster.status = 'In-active';
    var addstatus = await storestylemaster.save();
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
                    var storestylemaster = await StoreStyleMaster.findOne({where:{Comp_Store_Style_Name:rows[key][0]}});
                    if(storestylemaster)
                    {
                        storestylemaster.Comp_Store_Style_Name = rows[key][0]; 
                        storestylemaster.Comp_Store_Style_Description = rows[key][1];  
                        await storestylemaster.save();
                    }
                    else
                    {
                        const newstorestylemaster = 
                        {
                            Comp_Store_Style_Name :rows[key][0],
                            Comp_Store_Style_Description: rows[key][1],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await StoreStyleMaster.create(newstorestylemaster)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}