const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const Rounding = db.roundingmaster;
const BusinessUnit = db.businessunits;
exports.list = async(req,res)=>{
    const businessunits = await BusinessUnit.findAll({include: ["rounding"],order: [['Business_Unit_ID', 'DESC']]});
    if(businessunits)
    {
        
        if(businessunits != [])
        {    
            var array = [];
            for (var key in businessunits) 
            {
                
                array.push({                   
                    
                    Business_Unit_ID:businessunits[key]['Business_Unit_ID'],
                    Business_Unit_Name:businessunits[key]['Business_Unit_Name'],
                    Business_Unit_Code:businessunits[key]['Business_Unit_Code'],
                    Markup_ID:businessunits[key]['Markup_ID'],
                    Rounding_Value:businessunits[key]['rounding']['Rounding_Value'],
                    ipAddress:businessunits[key]['ipAddress'],
                    status:businessunits[key]['status'],
                });
            }
        }
        res.json({"status":"Success","message":"zipcodes List",'data':array});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    
    var businessUnit = await BusinessUnit.findOne({where:{Business_Unit_Name:req.body.Business_Unit_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!businessUnit)
    {
    var addstatus = BusinessUnit.create(req.body);
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
    const businessUnit = await BusinessUnit.findAll({include: ["rounding"],where:{Business_Unit_ID:req.params.id}})    
    if(businessUnit)
    {
        if(businessUnit != [])
        {    
            var array = [];
            for (var key in businessUnit) 
            {                
                array.push({                    
                    Business_Unit_ID:businessUnit[key]['Business_Unit_ID'],
                    Business_Unit_Name:businessUnit[key]['Business_Unit_Name'],
                    Business_Unit_Code:businessUnit[key]['Business_Unit_Code'],
                    Markup_ID:businessUnit[key]['Markup_ID'],
                    Rounding_Value:businessUnit[key]['rounding']['Rounding_Value'],
                    ipAddress:businessUnit[key]['ipAddress'],
                    status:businessUnit[key]['status'],
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
    var businessUnit = await BusinessUnit.findOne({where:{Business_Unit_ID:req.params.id}});    
    businessUnit.Business_Unit_Name = req.body.Business_Unit_Name; 
    businessUnit.Business_Unit_Code = req.body.Business_Unit_Code;
    businessUnit.Markup_ID = req.body.Markup_ID; 
    businessUnit.Rounding_ID = req.body.Rounding_ID;
    businessUnit.status = req.body.status
    var addstatus = await businessUnit.save();
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
    var businessUnit = await BusinessUnit.findOne({where:{Business_Unit_ID:req.params.id}});   
    businessUnit.status = 'In-active';
    var addstatus = await businessUnit.save();
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
                    
                    var businessUnit = await BusinessUnit.findOne({where:{Business_Unit_Name:rows[key][0]}});
                    var rounding = await Rounding.findOne({where:{Rounding_ID:rows[key][3]}});                    
                    console.log(rows[key]);
                    console.log(rounding);
                    if(businessUnit)
                    {
                        businessUnit.Business_Unit_Name = rows[key][0]; 
                        businessUnit.Business_Unit_Code = rows[key][1]; 
                        businessUnit.Markup_ID = rows[key][2]; 
                        businessUnit.Rounding_ID = rounding.Rounding_ID;                      
                        await businessUnit.save();
                    }
                    else
                    {
                        const newbusinessUnit = 
                        {
                            Business_Unit_Name :rows[key][0],
                            Business_Unit_Code: rows[key][1],
                            Markup_ID :rows[key][2],
                            Rounding_ID: rounding.Rounding_ID,
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await BusinessUnit.create(newbusinessUnit)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}
exports.HMSHostBusinessUnit = async(rows,clientIp)=>{
    for(var key in rows)
    {
        if(rows[key] != [])
        {
            if(rows[key]['Rounding_ID'] == undefined)
            {
                rows[key]['Rounding_ID'] = 0;
               // console.log(rows[key]['Rounding_ID']);
            }
            console.log(rows[key]['Rounding_ID']);
            var rounding = await RoundingMaster.findOne({where:{Rounding_Value:rows[key]['Rounding_ID'] }})
            var businessunit = await BusinessUnit.findOne({where:{Business_Unit_Name:rows[key]['Business_Unit_Name'],Rounding_ID:rounding.Rounding_ID}});
            if(businessunit)
            {
                businessunit.Business_Unit_Name = rows[key]['Business_Unit_Name'];
                businessunit.Business_Unit_Code = rows[key]['Business_Unit_Code']; 
                businessunit.Markup_ID = rows[key]['Markup_ID'];
                businessunit.Rounding_ID = rounding.Rounding_ID; 
                await businessunit.save();
            }
            else
            {
                const newbusinessunit = 
                {
                    Business_Unit_Name :rows[key]['Business_Unit_Name'],
                    Business_Unit_Code :rows[key]['Business_Unit_Code'],
                    Markup_ID :rows[key]['Markup_ID'],
                    Rounding_ID :rounding.Rounding_ID,
                    ipAddress:clientIp,
                    status:"Active"
                }
                await BusinessUnit.create(newbusinessunit)                    
            }
        }
    }
}