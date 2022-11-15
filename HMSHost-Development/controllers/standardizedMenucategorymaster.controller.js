const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const FamilyGroupMaster = db.familygroupmasters;
const StandardizedMenuCategoryMaster = db.standardmenucategorymaster;
exports.list = async(req,res)=>{
    const standardmenucategorymasters = await StandardizedMenuCategoryMaster.findAll({include: ["familygroups"],order: [['HMSHost_Standardized_Menu_Category_ID', 'DESC']]});
    if(standardmenucategorymasters)
    {        
        if(standardmenucategorymasters != [])
        {    
            var array = [];
            for (var key in standardmenucategorymasters) 
            {
                
                array.push({
                    HMSHost_Standardized_Menu_Category_ID:standardmenucategorymasters[key]['HMSHost_Standardized_Menu_Category_ID'],  
                    HMSHost_Standardized_Menu_Category_name:standardmenucategorymasters[key]['HMSHost_Standardized_Menu_Category_name'],  
                    HMSHost_Standardized_Menu_Category_Description:standardmenucategorymasters[key]['HMSHost_Standardized_Menu_Category_Description'],
                    Family_Group_Category_Name:standardmenucategorymasters[key]['familygroups']['Family_Group_Category_Name'],
                    ipAddress:standardmenucategorymasters[key]['ipAddress'],
                    status:standardmenucategorymasters[key]['status'],
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
    var standardmenucategorymaster = await StandardizedMenuCategoryMaster.findOne({where:{HMSHost_Standardized_Menu_Category_name:req.body.HMSHost_Standardized_Menu_Category_name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!standardmenucategorymaster)
    {
    var addstatus = StandardizedMenuCategoryMaster.create(req.body);
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
    const standardmenucategorymasters = await StandardizedMenuCategoryMaster.findAll({include: ["familygroups"],where:{HMSHost_Standardized_Menu_Category_ID:req.params.id}})    
    if(standardmenucategorymasters)
    {
        if(standardmenucategorymasters != [])
        {    
            var array = [];
            for (var key in standardmenucategorymasters) 
            {
                
                array.push({
                    HMSHost_Standardized_Menu_Category_ID:standardmenucategorymasters[key]['HMSHost_Standardized_Menu_Category_ID'],  
                    HMSHost_Standardized_Menu_Category_name:standardmenucategorymasters[key]['HMSHost_Standardized_Menu_Category_name'],  
                    HMSHost_Standardized_Menu_Category_Description:standardmenucategorymasters[key]['HMSHost_Standardized_Menu_Category_Description'],
                    Family_Group_Category_Name:standardmenucategorymasters[key]['familygroups']['Family_Group_Category_Name'],
                    ipAddress:standardmenucategorymasters[key]['ipAddress'],
                    status:standardmenucategorymasters[key]['status'],
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
    var standardmenucategorymasters = await StandardizedMenuCategoryMaster.findOne({where:{HMSHost_Standardized_Menu_Category_ID:req.params.id}});    
    standardmenucategorymasters.HMSHost_Standardized_Menu_Category_name = req.body.ProduHMSHost_Standardized_Menu_Category_namect_Group_Name;     
    standardmenucategorymasters.HMSHost_Standardized_Menu_Category_Description = req.body.HMSHost_Standardized_Menu_Category_Description;
    standardmenucategorymasters.Family_Group_ID = req.body.Family_Group_ID;
    standardmenucategorymasters.status = req.body.status
    var addstatus = await standardmenucategorymasters.save();
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
    var standardmenucategorymasters = await StandardizedMenuCategoryMaster.findOne({where:{HMSHost_Standardized_Menu_Category_ID:req.params.id}});    
    standardmenucategorymasters.status = 'In-active';
    var addstatus = await standardmenucategorymasters.save();
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
                    var familygroupmaster = await FamilyGroupMaster.findOne({where:{Family_Group_Category_Name:rows[key][2]}});                                       
                    var standardmenucategorymaster = await StandardizedMenuCategoryMaster.findOne({where:{HMSHost_Standardized_Menu_Category_name:rows[key][0]}});                             
                    if(standardmenucategorymaster)
                    {
                        standardmenucategorymaster.HMSHost_Standardized_Menu_Category_name = rows[key][0];                         
                        standardmenucategorymaster.HMSHost_Standardized_Menu_Category_Description = rows[key][1]; 
                        standardmenucategorymaster.Family_Group_ID = familygroupmaster.Family_Group_ID; 
                        await standardmenucategorymaster.save();
                    }
                    else
                    {
                        const newstandardmenucategorymaster = 
                        {
                            HMSHost_Standardized_Menu_Category_name :rows[key][0],
                            HMSHost_Standardized_Menu_Category_Description : rows[key][1],  
                            Family_Group_ID : familygroupmaster.Family_Group_ID,                       
                            ipAddress:clientIp,
                            status:"Active"
                        }
                      var status =   await StandardizedMenuCategoryMaster.create(newstandardmenucategorymaster);
                      console.log(status);                
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}