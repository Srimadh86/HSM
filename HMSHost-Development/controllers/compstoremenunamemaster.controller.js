const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const StoreRestaurantMasters = db.storerestaurantmasters;
const CompStoreMenuNameMaster = db.storemenumaster;
exports.list = async(req,res)=>{
    const storemenumasters = await CompStoreMenuNameMaster.findAll({include: ["restaurant"],order: [['Comp_Store_Menu_Name_ID', 'DESC']]});
    if(storemenumasters)
    {        
        if(storemenumasters != [])
        {    
            var array = [];
            for (var key in storemenumasters) 
            {
                
                array.push({
                    Comp_Store_Menu_Name_ID:storemenumasters[key]['Comp_Store_Menu_Name_ID'],  
                    Comp_Store_Menu_Name:storemenumasters[key]['Comp_Store_Menu_Name'],  
                    Comp_Store_Restaurant_Name:storemenumasters[key]['restaurant']['Comp_Store_Restaurant_name'],
                    Description:storemenumasters[key]['Description'],
                    status:storemenumasters[key]['status'],
                    ipAddress:storemenumasters[key]['ipAddress'],
                    Comp_Store_Menu_Object_key:storemenumasters[key]['Comp_Store_Menu_Object_key'],
                });
            }
        }
        res.json({"status":"Success","message":"storemenumasters List",'data':array});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{ 
    console.log(req.body);
    var storemenumaster = await CompStoreMenuNameMaster.findOne({where:{Comp_Store_Menu_Name:req.body.Comp_Store_Menu_Name}});    
    if(!storemenumaster)  {
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    var addstatus = CompStoreMenuNameMaster.create(req.body);
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
    res.json({"status":"Fail","message":"Could not save record. Record already available"});
}
}
exports.view = async (req,res)=>
{
    const storemenumasters = await CompStoreMenuNameMaster.findAll({include: ["restaurant"],where:{Comp_Store_Menu_Name_ID:req.params.id}})    
    if(storemenumasters)
    {
        if(storemenumasters != [])
        {    
            var array = [];
            for (var key in storemenumasters) 
            {
                
                array.push({
                    Comp_Store_Menu_Name_ID:storemenumasters[key]['Comp_Store_Menu_Name_ID'],  
                    Comp_Store_Menu_Name:storemenumasters[key]['Comp_Store_Menu_Name'],  
                    Comp_Store_Restaurant_Name:storemenumasters[key]['restaurant']['Comp_Store_Restaurant_Name'],
                    Description:storemenumasters[key]['Description'],
                    status:storemenumasters[key]['status'],
                    ipAddress:storemenumasters[key]['ipAddress'],
                    Comp_Store_Menu_Object_key:storemenumasters[key]['Comp_Store_Menu_Object_key'],
                });
            }
        }
        res.json({"status":"Success","message":"storemenumasters view",'data':array});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    var storemenumaster = await CompStoreMenuNameMaster.findOne({where:{Comp_Store_Menu_Name_ID:req.params.id}});    
    storemenumaster.Comp_Store_Menu_Name = req.body.Comp_Store_Menu_Name;     
    storemenumaster.Description = req.body.Description;
    storemenumaster.Comp_Store_Restaurant_ID = req.body.Comp_Store_Restaurant_ID;
    storemenumaster.Comp_Store_Menu_Object_key = req.body.Comp_Store_Menu_Object_key;
    storemenumaster.status = "Active";
    var addstatus = await storemenumaster.save();
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
    var storemenumaster = await CompStoreMenuNameMaster.findOne({where:{Comp_Store_Menu_Name_ID:req.params.id}});    
    storemenumaster.status = 'In-active';
    var addstatus = await storemenumaster.save();
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