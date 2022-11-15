const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const PricingModelLettuceMaster = db.pricingmodellettucemaster;
exports.list = async(req,res)=>{
    const pricingmodelLettucemasters = await PricingModelLettuceMaster.findAll({order: [['Lettuce_ID', 'DESC']]});
    if(pricingmodelLettucemasters)
    {
        res.json({"status":"Success","message":"pricingmodelLettucemasters List",'data':pricingmodelLettucemasters});
    }
    else
    {
        
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var pricingmodelLettucemaster = await PricingModelLettuceMaster.findOne({where:{Lettuce_Name:req.body.Lettuce_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!pricingmodelLettucemaster)
    {
    var addstatus = PricingModelLettuceMaster.create(req.body);
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
    const pricingmodelLettucemaster = await PricingModelLettuceMaster.findOne({where:{Lettuce_ID:req.params.id}})
    if(pricingmodelLettucemaster)
    {        
        res.json({"status":"Success","message":"pricingmodelLettucemaster view",'data':pricingmodelLettucemaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    const pricingmodelLettucemaster = await PricingModelLettuceMaster.findOne({where:{Lettuce_ID:req.params.id}})
    pricingmodelLettucemaster.Lettuce_Name = req.body.Lettuce_Name; 
    pricingmodelLettucemaster.Alias_Name = req.body.Alias_Name;
    pricingmodelLettucemaster.status = req.body.status
    var addstatus = await pricingmodelLettucemaster.save();
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
    const pricingmodelLettucemaster = await PricingModelLettuceMaster.findOne({where:{Lettuce_ID:req.params.id}})
    pricingmodelLettucemaster.status = 'In-active';
    var addstatus = await pricingmodelLettucemaster.save();
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
                    var pricingmodelLettucemaster = await PricingModelLettuceMaster.findOne({where:{Lettuce_Name:rows[key][0]}});
                    if(pricingmodelLettucemaster)
                    {
                        pricingmodelLettucemaster.Lettuce_Name = rows[key][0]; 
                        pricingmodelLettucemaster.Alias_Name = rows[key][1];  
                        await pricingmodelLettucemaster.save();
                    }
                    else
                    {
                        const newpricingmodelLettucemaster = 
                        {
                            Lettuce_Name :rows[key][0],
                            Alias_Name: rows[key][1],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await PricingModelLettuceMaster.create(newpricingmodelLettucemaster)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}