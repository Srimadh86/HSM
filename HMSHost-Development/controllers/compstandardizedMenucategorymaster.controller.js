const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const StoreSectionMasters = db.storesectionmaster;
const CompStandardizedMenuCategoryMaster = db.compstandardmenucategorymaster;
exports.list = async(req,res)=>{
    const compstandardmenucategorymasters = await CompStandardizedMenuCategoryMaster.findAll({include: ["storesections"],order: [['Comp_Store_Standardized_Menu_Category_ID', 'DESC']]});
    if(compstandardmenucategorymasters)
    {        
        if(compstandardmenucategorymasters != [])
        {    
            var array = [];
            for (var key in compstandardmenucategorymasters) 
            {                
                array.push({
                    Comp_Store_Standardized_Menu_Category_ID:compstandardmenucategorymasters[key]['Comp_Store_Standardized_Menu_Category_ID'],  
                    Comp_Store_Standardized_Menu_Categories_Lookup:compstandardmenucategorymasters[key]['Comp_Store_Standardized_Menu_Categories_Lookup'],  
                    Comp_Store_Section_Name:compstandardmenucategorymasters[key]['storesections']['Comp_Store_Section_Name'],
                    ipAddress:compstandardmenucategorymasters[key]['ipAddress'],
                    status:compstandardmenucategorymasters[key]['status'],
                });
            }
        }
        res.json({"status":"Success","message":"Store Masters List",'data':array});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{    
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    var addstatus = CompStandardizedMenuCategoryMaster.create(req.body);
    if(addstatus)
    {
        res.json({"status":"Success","message":"Success"});
    }
    else
    {
        res.json({"status":"Fail","message":"Could not save record. Please try again"});
    }
    
}
exports.view = async (req,res)=>
{
    const compstandardmenucategorymasters = await CompStandardizedMenuCategoryMaster.findAll({include: ["storesections"],where:{Comp_Store_Standardized_Menu_Category_ID:req.params.id}})    
    if(compstandardmenucategorymasters)
    {
        if(compstandardmenucategorymasters != [])
        {    
            var array = [];
            for (var key in compstandardmenucategorymasters) 
            {                
                array.push({
                    Comp_Store_Standardized_Menu_Category_ID:compstandardmenucategorymasters[key]['Comp_Store_Standardized_Menu_Category_ID'],  
                    Comp_Store_Standardized_Menu_Categories_Lookup:compstandardmenucategorymasters[key]['Comp_Store_Standardized_Menu_Categories_Lookup'],  
                    Comp_Store_Section_Name:compstandardmenucategorymasters[key]['storesections']['Comp_Store_Section_Name'],
                    ipAddress:compstandardmenucategorymasters[key]['ipAddress'],
                    status:compstandardmenucategorymasters[key]['status'],
                });
            }
        }
        res.json({"status":"Success","message":"city view",'data':array});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    var compstandardmenucategorymaster = await CompStandardizedMenuCategoryMaster.findOne({where:{Comp_Store_Standardized_Menu_Category_ID:req.params.id}});    
    compstandardmenucategorymaster.Comp_Store_Standardized_Menu_Categories_Lookup = req.body.Comp_Store_Standardized_Menu_Categories_Lookup;     
    compstandardmenucategorymaster.Comp_Store_Section_ID = req.body.Comp_Store_Section_ID;
    compstandardmenucategorymaster.status = req.body.status
    var addstatus = await compstandardmenucategorymaster.save();
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
    var compstandardmenucategorymaster = await CompStandardizedMenuCategoryMaster.findOne({where:{Comp_Store_Standardized_Menu_Category_ID:req.params.id}});    
    compstandardmenucategorymaster.status = 'In-active';
    var addstatus = await compstandardmenucategorymaster.save();
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
    console.log('hello world');
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
                    var storesectionmaster = await StoreSectionMasters.findOne({where:{Comp_Store_Section_Name:rows[key][1]}});                                       
                    console.log(storesectionmaster);
                    var compstandardmenucategorymaster = await CompStandardizedMenuCategoryMaster.findOne({where:{Comp_Store_Standardized_Menu_Categories_Lookup:rows[key][0]}});                             
                    if(compstandardmenucategorymaster)
                    {
                        compstandardmenucategorymaster.Comp_Store_Standardized_Menu_Categories_Lookup = rows[key][0];                         
                        compstandardmenucategorymaster.Comp_Store_Section_ID = storesectionmaster.Comp_Store_Section_ID; 
                        await compstandardmenucategorymaster.save();
                    }
                    else
                    {
                        const compstandardmenucategorymaster = 
                        {
                               Comp_Store_Standardized_Menu_Categories_Lookup :rows[key][0],
                               Comp_Store_Section_ID : storesectionmaster.Comp_Store_Section_ID,                       
                                ipAddress:clientIp,
                                status:"Active"
                        }
                        var status =   await CompStandardizedMenuCategoryMaster.create(compstandardmenucategorymaster);
                                        
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}