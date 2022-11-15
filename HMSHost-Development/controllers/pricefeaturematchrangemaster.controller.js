const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const PriceFeatureMatchRangeMaster = db.pricefeaturematchrangemaster;
exports.list = async(req,res)=>{
    const pricefeaturematchrangemasters = await PriceFeatureMatchRangeMaster.findAll({order: [['Feature_Match_ID', 'DESC']]});
    if(pricefeaturematchrangemasters)
    {
        res.json({"status":"Success","message":"pricefeaturematchrangemasters List",'data':pricefeaturematchrangemasters});
    }
    else
    {
        
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var pricefeaturematchrangemaster = await PriceFeatureMatchRangeMaster.findOne({where:{Feature_Match_Description:req.body.Feature_Match_Description}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);
    if(!pricefeaturematchrangemaster)
    {
    var addstatus = PriceFeatureMatchRangeMaster.create(req.body);
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
    const priceFeaturematchrangemaster = await PriceIngredientMatchRangeMaster.findOne({where:{Ingredient_Match_ID:req.params.id}})
    if(priceFeaturematchrangemaster)
    {        
        res.json({"status":"Success","message":"priceFeaturematchrangemaster view",'data':priceFeaturematchrangemaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    const priceFeaturematchrangemaster = await PriceIngredientMatchRangeMaster.findOne({where:{Feature_Match_ID:req.params.id}})
    priceFeaturematchrangemaster.Feature_Match_Description = req.body.Feature_Match_Description; 
    priceFeaturematchrangemaster.Feature_Match_Percentage = req.body.Feature_Match_Percentage;
    priceFeaturematchrangemaster.Feature_Weightage_Percentage = req.body.Feature_Weightage_Percentage;
    priceFeaturematchrangemaster.status = req.body.status
    var addstatus = await priceFeaturematchrangemaster.save();
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
    const priceFeaturematchrangemaster = await PriceFeatureMatchRangeMaster.findOne({where:{Feature_Match_ID:req.params.id}})
    priceFeaturematchrangemaster.status = 'In-active';
    var addstatus = await priceFeaturematchrangemaster.save();
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
                    var priceFeaturematchrangemaster = await PriceFeatureMatchRangeMaster.findOne({where:{Feature_Match_Description:rows[key][0]}});
                    if(priceFeaturematchrangemaster)
                    {
                        priceFeaturematchrangemaster.Feature_Match_Description = rows[key][0]; 
                        priceFeaturematchrangemaster.Feature_Match_Percentage = rows[key][1]; 
                        priceFeaturematchrangemaster.Feature_Weightage_Percentage = rows[key][2];  
                        await priceFeaturematchrangemaster.save();
                    }
                    else
                    {
                        const newpriceFeaturematchrangemaster = 
                        {
                            Feature_Match_Description :rows[key][0],
                            Feature_Match_Percentage: rows[key][1],
                            Feature_Weightage_Percentage: rows[key][2],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await PriceFeatureMatchRangeMaster.create(newpriceFeaturematchrangemaster)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}