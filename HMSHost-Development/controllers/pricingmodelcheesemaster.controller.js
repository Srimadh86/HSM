const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const PricingModelCheeseMaster = db.pricingmodelcheesemaster;
exports.list = async(req,res)=>{
    const pricingmodelcheesemasters = await PricingModelCheeseMaster.findAll({order: [['Cheese_ID', 'DESC']]});
    if(pricingmodelcheesemasters)
    {
        res.json({"status":"Success","message":"pricingmodelcheesemasters List",'data':pricingmodelcheesemasters});
    }
    else
    {
        
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var pricingmodelcheesemaster = await PricingModelCheeseMaster.findOne({where:{Cheese_Name:req.body.Cheese_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!pricingmodelcheesemaster)
    {
    var addstatus = PricingModelCheeseMaster.create(req.body);
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
    const pricingmodelcheesemaster = await PricingModelCheeseMaster.findOne({where:{Cheese_ID:req.params.id}})
    if(pricingmodelcheesemaster)
    {        
        res.json({"status":"Success","message":"pricingmodelcheesemaster view",'data':pricingmodelcheesemaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    const pricingmodelcheesemaster = await PricingModelCheeseMaster.findOne({where:{Cheese_ID:req.params.id}})
    pricingmodelcheesemaster.Cheese_Name = req.body.Cheese_Name; 
    pricingmodelcheesemaster.Alias_Name = req.body.Alias_Name;
    pricingmodelcheesemaster.status = req.body.status
    var addstatus = await pricingmodelcheesemaster.save();
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
    const pricingmodelcheesemaster = await PricingModelCheeseMaster.findOne({where:{Cheese_ID:req.params.id}})
    pricingmodelcheesemaster.status = 'In-active';
    var addstatus = await pricingmodelcheesemaster.save();
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
                    var pricingmodelcheesemaster = await PricingModelCheeseMaster.findOne({where:{Cheese_Name:rows[key][0]}});
                    if(pricingmodelcheesemaster)
                    {
                        pricingmodelcheesemaster.Cheese_Name = rows[key][0]; 
                        pricingmodelcheesemaster.Alias_Name = rows[key][1];  
                        await pricingmodelcheesemaster.save();
                    }
                    else
                    {
                        const newpricingmodelcheesemaster = 
                        {
                            Cheese_Name :rows[key][0],
                            Alias_Name: rows[key][1],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await PricingModelCheeseMaster.create(newpricingmodelcheesemaster)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}