const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const POSmenucategory = db.menucategory;
exports.list = async(req,res)=>{
    const menucategories = await POSmenucategory.findAll({order: [['POS_Category_ID', 'DESC']]});
    if(menucategories)
    {
        res.json({"status":"Success","message":"menucategories List",'data':menucategories});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var menucategory = await POSmenucategory.findOne({where:{POS_Category_Name:req.body.POS_Category_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);
    if(!menucategory)
    {
    var addstatus = POSmenucategory.create(req.body);
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
    const menucategory = await POSmenucategory.findOne({where:{POS_Category_ID:req.params.id}})
    if(menucategory)
    {        
        res.json({"status":"Success","message":"menucategory view",'data':menucategory});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    var menucategory = await POSmenucategory.findOne({where:{POS_Category_ID:req.params.id}});
    menucategory.POS_Category_Name = req.body.POS_Category_Name; 
    menucategory.status = req.body.status
    var addstatus = await menucategory.save();
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
    const menucategory = await POSmenucategory.findOne({where:{POS_Category_ID:req.params.id}});
    menucategory.status = 'In-active';
    var addstatus = await menucategory.save();
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
        console.log(path);
        readXlsxFile(path).then(async(rows)=>{ 
            rows.shift(); 
            console.log(rows);
            for(var key in rows)
            {
                if(rows[key] != [])
                {
                    var menucategory = await POSmenucategory.findOne({where:{POS_Category_Name:rows[key][0]}});
                    if(menucategory)
                    {
                        menucategory.POS_Category_Name = rows[key][0];  
                        await menucategory.save();
                    }
                    else
                    {
                        const newmenucategory = 
                        {
                            POS_Category_Name: rows[key][0],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await POSmenucategory.create(newmenucategory)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}