const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const StoreSectionMaster = db.storesectionmaster;
exports.list = async(req,res)=>{
    const storesectionmasters = await StoreSectionMaster.findAll({order: [['Comp_Store_Section_ID', 'DESC']]});
    if(storesectionmasters)
    {
        res.json({"status":"Success","message":"storesectionmasters List",'data':storesectionmasters});
    }
    else
    {
        
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var storesectionmaster = await StoreSectionMaster.findOne({where:{Comp_Store_Section_Name:req.body.Comp_Store_Section_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);
    if(!storesectionmaster)
    {
    var addstatus = StoreSectionMaster.create(req.body);
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
    const storesectionmaster = await StoreStyleMaster.findOne({where:{Comp_Store_Section_ID:req.params.id}})
    if(storesectionmaster)
    {        
        res.json({"status":"Success","message":"storesectionmaster view",'data':storesectionmaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    const storesectionmaster = await StoreStyleMaster.findOne({where:{Comp_Store_Section_ID:req.params.id}})
    storesectionmaster.Comp_Store_Section_Name = req.body.Comp_Store_Section_Name; 
    storesectionmaster.Comp_Store_Section_Description = req.body.Comp_Store_Section_Description;
    storesectionmaster.status = req.body.status
    var addstatus = await storesectionmaster.save();
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
    const storesectionmaster = await StoreStyleMaster.findOne({where:{Comp_Store_Section_ID:req.params.id}})
    storesectionmaster.status = 'In-active';
    var addstatus = await storesectionmaster.save();
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
                    var storesectionmaster = await StoreSectionMaster.findOne({where:{Comp_Store_Section_Name:rows[key][0]}});
                    if(storesectionmaster)
                    {
                        storesectionmaster.Comp_Store_Section_Name = rows[key][0]; 
                        storesectionmaster.Comp_Store_Section_Description = rows[key][1];  
                        await storesectionmaster.save();
                    }
                    else
                    {
                        const newstoresectionmaster = 
                        {
                            Comp_Store_Section_Name :rows[key][0],
                            Comp_Store_Section_Description: rows[key][1],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await StoreSectionMaster.create(newstoresectionmaster)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}