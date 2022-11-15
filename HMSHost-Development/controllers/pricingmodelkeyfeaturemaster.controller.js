const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const PricingModelKey_FeatureMaster = db.pricingmodelkeyfeaturemaster;
exports.list = async(req,res)=>{
    const pricingmodelKey_Featuremasters = await PricingModelKey_FeatureMaster.findAll({order: [['Key_Feature_ID', 'DESC']]});
    if(pricingmodelKey_Featuremasters)
    {
        res.json({"status":"Success","message":"pricingmodelKey_Featuremasters List",'data':pricingmodelKey_Featuremasters});
    }
    else
    {
        
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var pricingmodelKey_Featuremaster = await PricingModelKey_FeatureMaster.findOne({where:{Key_Feature_Name:req.body.Key_Feature_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!pricingmodelKey_Featuremaster)
    {
    var addstatus = PricingModelKey_FeatureMaster.create(req.body);
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
    const pricingmodelKey_Featuremaster = await PricingModelKey_FeatureMaster.findOne({where:{Key_Feature_ID:req.params.id}})
    if(pricingmodelKey_Featuremaster)
    {        
        res.json({"status":"Success","message":"pricingmodelKey_Featuremaster view",'data':pricingmodelKey_Featuremaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    const pricingmodelKey_Featuremaster = await PricingModelKey_FeatureMaster.findOne({where:{Key_Feature_ID:req.params.id}})
    pricingmodelKey_Featuremaster.Key_Feature_Name = req.body.Key_Feature_Name; 
    pricingmodelKey_Featuremaster.Alias_Name = req.body.Alias_Name;
    pricingmodelKey_Featuremaster.status = req.body.status
    var addstatus = await pricingmodelKey_Featuremaster.save();
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
    const pricingmodelKey_Featuremaster = await PricingModelKey_FeatureMaster.findOne({where:{Key_Feature_ID:req.params.id}})
    pricingmodelKey_Featuremaster.status = 'In-active';
    var addstatus = await pricingmodelKey_Featuremaster.save();
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
                    var pricingmodelKey_Featuremaster = await PricingModelKey_FeatureMaster.findOne({where:{Key_Feature_Name:rows[key][0]}});
                    if(pricingmodelKey_Featuremaster)
                    {
                        pricingmodelKey_Featuremaster.Key_Feature_Name = rows[key][0]; 
                        pricingmodelKey_Featuremaster.Alias_Name = rows[key][1];  
                        await pricingmodelKey_Featuremaster.save();
                    }
                    else
                    {
                        const newpricingmodelKey_Featuremaster = 
                        {
                            Key_Feature_Name :rows[key][0],
                            Alias_Name: rows[key][1],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await PricingModelKey_FeatureMaster.create(newpricingmodelKey_Featuremaster)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}