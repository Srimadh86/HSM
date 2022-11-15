const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const PricingModelKey_IngredientMaster = db.pricingmodelkeyingredientmaster;
exports.list = async(req,res)=>{
    const pricingmodelKey_Ingredientmasters = await PricingModelKey_IngredientMaster.findAll({order: [['Key_Ingredient_ID', 'DESC']]});
    if(pricingmodelKey_Ingredientmasters)
    {
        res.json({"status":"Success","message":"pricingmodelKey_Ingredientmasters List",'data':pricingmodelKey_Ingredientmasters});
    }
    else
    {
        
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var pricingmodelKey_Ingredientmaster = await PricingModelKey_IngredientMaster.findOne({where:{Key_Ingredient_Name:req.body.Key_Ingredient_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!pricingmodelKey_Ingredientmaster)
    {
    var addstatus = PricingModelKey_IngredientMaster.create(req.body);
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
    const pricingmodelKey_Ingredientmaster = await PricingModelKey_IngredientMaster.findOne({where:{Key_Ingredient_ID:req.params.id}})
    if(pricingmodelKey_Ingredientmaster)
    {        
        res.json({"status":"Success","message":"pricingmodelKey_Ingredientmaster view",'data':pricingmodelKey_Ingredientmaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    const pricingmodelKey_Ingredientmaster = await PricingModelKey_IngredientMaster.findOne({where:{Key_Ingredient_ID:req.params.id}})
    pricingmodelKey_Ingredientmaster.Key_Ingredient_Name = req.body.Key_Ingredient_Name; 
    pricingmodelKey_Ingredientmaster.Alias_Name = req.body.Alias_Name;
    pricingmodelKey_Ingredientmaster.status = req.body.status
    var addstatus = await pricingmodelKey_Ingredientmaster.save();
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
    const pricingmodelKey_Ingredientmaster = await PricingModelKey_IngredientMaster.findOne({where:{Key_Ingredient_ID:req.params.id}})
    pricingmodelKey_Ingredientmaster.status = 'In-active';
    var addstatus = await pricingmodelKey_Ingredientmaster.save();
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
                    var pricingmodelKey_Ingredientmaster = await PricingModelKey_IngredientMaster.findOne({where:{Key_Ingredient_Name:rows[key][0]}});
                    if(pricingmodelKey_Ingredientmaster)
                    {
                        pricingmodelKey_Ingredientmaster.Key_Ingredient_Name = rows[key][0]; 
                        pricingmodelKey_Ingredientmaster.Alias_Name = rows[key][1];  
                        await pricingmodelKey_Ingredientmaster.save();
                    }
                    else
                    {
                        const newpricingmodelKey_Ingredientmaster = 
                        {
                            Key_Ingredient_Name :rows[key][0],
                            Alias_Name: rows[key][1],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await PricingModelKey_IngredientMaster.create(newpricingmodelKey_Ingredientmaster)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}