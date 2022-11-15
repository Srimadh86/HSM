const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const PriceIngredientMatchRangeMaster = db.priceingredientmatchrangemaster;
exports.list = async(req,res)=>{
    const priceingredientmatchrangemasters = await PriceIngredientMatchRangeMaster.findAll({order: [['Ingredient_Match_ID', 'DESC']]});
    if(priceingredientmatchrangemasters)
    {
        res.json({"status":"Success","message":"priceingredientmatchrangemasters List",'data':priceingredientmatchrangemasters});
    }
    else
    {
        
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var priceingredientmatchrangemaster = await PriceIngredientMatchRangeMaster.findOne({where:{Ingredient_Match_Description:req.body.Ingredient_Match_Description}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);
    if(!priceingredientmatchrangemaster)
    {
    var addstatus = PriceIngredientMatchRangeMaster.create(req.body);
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
    const priceingredientmatchrangemaster = await PriceIngredientMatchRangeMaster.findOne({where:{Ingredient_Match_ID:req.params.id}})
    if(priceingredientmatchrangemaster)
    {        
        res.json({"status":"Success","message":"priceingredientmatchrangemaster view",'data':priceingredientmatchrangemaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    const priceingredientmatchrangemaster = await PriceIngredientMatchRangeMaster.findOne({where:{Ingredient_Match_ID:req.params.id}})
    priceingredientmatchrangemaster.Ingredient_Match_Description = req.body.Ingredient_Match_Description; 
    priceingredientmatchrangemaster.Ingredient_Match_Percentage = req.body.Ingredient_Match_Percentage;
    priceingredientmatchrangemaster.Ingredient_Weightage_Percentage = req.body.Ingredient_Weightage_Percentage;
    priceingredientmatchrangemaster.status = req.body.status
    var addstatus = await priceingredientmatchrangemaster.save();
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
    const priceingredientmatchrangemaster = await PriceIngredientMatchRangeMaster.findOne({where:{Ingredient_Match_ID:req.params.id}})
    priceingredientmatchrangemaster.status = 'In-active';
    var addstatus = await priceingredientmatchrangemaster.save();
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
                    var priceingredientmatchrangemaster = await PriceIngredientMatchRangeMaster.findOne({where:{Ingredient_Match_Description:rows[key][0]}});
                    if(priceingredientmatchrangemaster)
                    {
                        priceingredientmatchrangemaster.Ingredient_Match_Description = rows[key][0]; 
                        priceingredientmatchrangemaster.Ingredient_Match_Percentage = rows[key][1]; 
                        priceingredientmatchrangemaster.Ingredient_Weightage_Percentage = rows[key][2];  
                        await priceingredientmatchrangemaster.save();
                    }
                    else
                    {
                        const newpriceingredientmatchrangemaster = 
                        {
                            Ingredient_Match_Description :rows[key][0],
                            Ingredient_Match_Percentage: rows[key][1],
                            Ingredient_Weightage_Percentage: rows[key][1],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await PriceIngredientMatchRangeMaster.create(newpriceingredientmatchrangemaster)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}