const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const PricingModelProteinMaster = db.pricingmodelproteinmaster;
exports.list = async(req,res)=>{
    const pricingmodelproteinmasters = await PricingModelProteinMaster.findAll({order: [['Protein_ID', 'DESC']]});
    if(pricingmodelproteinmasters)
    {
        res.json({"status":"Success","message":"pricingmodelproteinmasters List",'data':pricingmodelproteinmasters});
    }
    else
    {
        
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var pricingmodelproteinmaster = await PricingModelProteinMaster.findOne({where:{Protein_Name:req.body.Protein_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!pricingmodelproteinmaster)
    {
    var addstatus = PricingModelProteinMaster.create(req.body);
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
    const pricingmodelproteinmaster = await PricingModelProteinMaster.findOne({where:{Protein_ID:req.params.id}})
    if(pricingmodelproteinmaster)
    {        
        res.json({"status":"Success","message":"pricingmodelproteinmaster view",'data':pricingmodelproteinmaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    const pricingmodelproteinmaster = await PricingModelProteinMaster.findOne({where:{Protein_ID:req.params.id}})
    pricingmodelproteinmaster.Protein_Name = req.body.Protein_Name; 
    pricingmodelproteinmaster.Alias_Name = req.body.Alias_Name;
    pricingmodelproteinmaster.status = req.body.status
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
    const pricingmodelproteinmaster = await PricingModelProteinMaster.findOne({where:{Protein_ID:req.params.id}})
    pricingmodelproteinmaster.status = 'In-active';
    var addstatus = await pricingmodelproteinmaster.save();
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
                    var pricingmodelproteinmaster = await PricingModelProteinMaster.findOne({where:{Protein_Name:rows[key][0]}});
                    if(pricingmodelproteinmaster)
                    {
                        pricingmodelproteinmaster.Protein_Name = rows[key][0]; 
                        pricingmodelproteinmaster.Alias_Name = rows[key][1];  
                        await pricingmodelproteinmaster.save();
                    }
                    else
                    {
                        const newpricingmodelproteinmaster = 
                        {
                            Protein_Name :rows[key][0],
                            Alias_Name: rows[key][1],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await PricingModelProteinMaster.create(newpricingmodelproteinmaster)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}