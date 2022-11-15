const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const PricingModelVeggieMaster = db.pricingmodelveggiemaster;
exports.list = async(req,res)=>{
    const pricingmodelveggiemasters = await PricingModelVeggieMaster.findAll({order: [['Veggie_ID', 'DESC']]});
    if(pricingmodelveggiemasters)
    {
        res.json({"status":"Success","message":"pricingmodelveggiemasters List",'data':pricingmodelveggiemasters});
    }
    else
    {
        
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var pricingmodelveggiemaster = await PricingModelVeggieMaster.findOne({where:{Veggie_Name:req.body.Veggie_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!pricingmodelveggiemaster)
    {
    var addstatus = PricingModelVeggieMaster.create(req.body);
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
    const pricingmodelveggiemaster = await PricingModelVeggieMaster.findOne({where:{Veggie_ID:req.params.id}})
    if(pricingmodelveggiemaster)
    {        
        res.json({"status":"Success","message":"pricingmodelveggiemaster view",'data':pricingmodelveggiemaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    const pricingmodelveggiemaster = await PricingModelVeggieMaster.findOne({where:{Veggie_ID:req.params.id}})
    pricingmodelveggiemaster.Veggie_Name = req.body.Veggie_Name; 
    pricingmodelveggiemaster.Alias_Name = req.body.Alias_Name;
    pricingmodelveggiemaster.status = req.body.status
    var addstatus = await pricingmodelproteinmaster.save();
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
    const pricingmodelveggiemaster = await PricingModelVeggieMaster.findOne({where:{Veggie_ID:req.params.id}})
    pricingmodelveggiemaster.status = 'In-active';
    var addstatus = await pricingmodelveggiemaster.save();
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
                    var pricingmodelveggiemaster = await PricingModelVeggieMaster.findOne({where:{Veggie_Name:rows[key][0]}});
                    if(pricingmodelveggiemaster)
                    {
                        pricingmodelveggiemaster.Veggie_Name = rows[key][0]; 
                        pricingmodelveggiemaster.Alias_Name = rows[key][1];  
                        await pricingmodelveggiemaster.save();
                    }
                    else
                    {
                        const newpricingmodelveggiemaster = 
                        {
                            Veggie_Name :rows[key][0],
                            Alias_Name: rows[key][1],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await PricingModelVeggieMaster.create(newpricingmodelveggiemaster)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}