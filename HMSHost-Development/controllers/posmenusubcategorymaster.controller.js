const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const Menucategory = db.menucategory;
const POSMenuSubCategory = db.menusubcategories;
exports.list = async(req,res)=>{
    const menusubcategories = await POSMenuSubCategory.findAll({include: ["poscategory"],order: [['POS_Subcategory_ID', 'DESC']]});
    if(menusubcategories)
    {
        
        if(menusubcategories != [])
        {    
            var array = [];
            for (var key in menusubcategories) 
            {
                
                array.push({
                    POS_Subcategory_ID:menusubcategories[key]['POS_Subcategory_ID'],  
                    POS_Subcategory_Name:menusubcategories[key]['POS_Subcategory_Name'],  
                    POS_Category_Name:menusubcategories[key]['poscategory']['POS_Category_Name'],
                    ipAddress:menusubcategories[key]['ipAddress'],
                    status:menusubcategories[key]['status'],
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
    var menusubcategories = await POSMenuSubCategory.findOne({where:{POS_Subcategory_Name:req.body.POS_Subcategory_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!menusubcategories)
    {
    var addstatus = POSMenuSubCategory.create(req.body);
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
    const menusubcategories = await POSMenuSubCategory.findAll({include: ["poscategory"],where:{POS_Subcategory_ID:req.params.id}})    
    if(menusubcategories)
    {
        if(menusubcategories != [])
        {    
            var array = [];
            for (var key in menusubcategories) 
            {
                
                array.push({
                    POS_Subcategory_ID:menusubcategories[key]['POS_Subcategory_ID'],  
                    POS_Subcategory_Name:menusubcategories[key]['POS_Subcategory_Name'],  
                    POS_Category_Name:menusubcategories[key]['poscategory']['POS_Category_Name'],
                    ipAddress:menusubcategories[key]['ipAddress'],
                    status:menusubcategories[key]['status'],
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
    var menusubcategories = await POSMenuSubCategory.findOne({where:{POS_Subcategory_ID:req.params.id}});    
    menusubcategories.POS_Subcategory_Name = req.body.POS_Subcategory_Name;     
    menusubcategories.POS_Category_ID = req.body.POS_Category_ID;
    menusubcategories.status = req.body.status
    var addstatus = await menusubcategories.save();
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
    var menusubcategories = await POSMenuSubCategory.findOne({where:{POS_Subcategory_ID:req.params.id}});    
    menusubcategories.status = 'In-active';
    var addstatus = await menusubcategories.save();
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
                    var menucategory = await Menucategory.findOne({where:{POS_Category_Name:rows[key][1]}})
                    var menusubcategories = await POSMenuSubCategory.findOne({where:{POS_Subcategory_Name:rows[key][0]}})
                    if(menusubcategories)
                    {
                        menusubcategories.POS_Subcategory_Name = rows[key][0];                         
                        menusubcategories.POS_Category_ID = menucategory.POS_Category_ID;                        
                        await menusubcategories.save();
                    }
                    else
                    {
                        const newmenusubcategories = 
                        {
                            POS_Subcategory_Name :rows[key][0],
                            POS_Category_ID : menucategory.POS_Category_ID,                       
                            ipAddress:clientIp,
                            status:"Active"
                        }
                      var status =   await POSMenuSubCategory.create(newmenusubcategories);
                      console.log(status);                
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}