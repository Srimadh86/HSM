const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const BusinessUnit = db.businessunits;
const ConceptMaster = db.conceptmasters;
const DepartmentMaster = db.departmentmaster;
exports.list = async(req,res)=>{
    const departmentmasters = await DepartmentMaster.findAll({include: ["business","concepts"],order: [['Department_ID', 'DESC']]});
    if(departmentmasters)
    {
        
        if(departmentmasters != [])
        {    
            var array = [];
            for (var key in departmentmasters) 
            {
                
                array.push({
                    Department_ID:departmentmasters[key]['Department_ID'],  
                    Department_Value:departmentmasters[key]['Department_Value'],  
                    Business_Unit_Name:departmentmasters[key]['business']['Business_Unit_Name'],
                    Concept_Name:departmentmasters[key]['concepts']['Concept_Name'],
                    ipAddress:departmentmasters[key]['ipAddress'],
                    status:departmentmasters[key]['status'],
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
    var departmentmaster = await DepartmentMaster.findOne({where:{Department_Value:req.body.Department_Value}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!departmentmaster)
    {
    var addstatus = DepartmentMaster.create(req.body);
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
    const departmentmasters = await DepartmentMaster.findAll({include: ["business","concepts"],where:{Department_ID:req.params.id}})    
    if(departmentmasters)
    {
        if(departmentmasters != [])
        {    
            var array = [];
            for (var key in departmentmasters) 
            {
                
                array.push({
                    Department_ID:departmentmasters[key]['Department_ID'],  
                    Department_Value:departmentmasters[key]['Department_Value'],  
                    Business_Unit_Name:departmentmasters[key]['business']['Business_Unit_Name'],
                    Concept_Name:departmentmasters[key]['concepts']['Concept_Name'],
                    ipAddress:departmentmasters[key]['ipAddress'],
                    status:departmentmasters[key]['status'],
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
    var departmentmaster = await DepartmentMaster.findOne({where:{Department_ID:req.params.id}});    
    departmentmaster.Department_Value = req.body.Department_Value;     
    departmentmaster.Business_Unit_ID = req.body.Business_Unit_ID;
    departmentmaster.Concept_ID = req.body.Concept_ID; 
    departmentmaster.status = req.body.status
    var addstatus = await departmentmaster.save();
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
    var departmentmaster = await DepartmentMaster.findOne({where:{Department_ID:req.params.id}});     
    departmentmaster.status = 'In-active';
    var addstatus = await departmentmaster.save();
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
                    
                    var departmentmaster = await DepartmentMaster.findOne({where:{Department_Value:rows[key][0]}});                                       
                    var businessUnit = await BusinessUnit.findOne({where:{Business_Unit_Name:rows[key][1]}});                    
                    var conceptmaster = await ConceptMaster.findOne({where:{Concept_Name:rows[key][2]}});                    
                    if(departmentmaster)
                    {
                        departmentmaster.Department_Value = rows[key][0];                         
                        departmentmaster.Business_Unit_ID = businessUnit.Business_Unit_ID; 
                        departmentmaster.Concept_ID = conceptmaster.Concept_ID;                                               
                        await departmentmaster.save();
                    }
                    else
                    {
                        const newdepartmentmaster = 
                        {
                            Department_Value :rows[key][0],
                            Business_Unit_ID : businessUnit.Business_Unit_ID,
                            Concept_ID : conceptmaster.Concept_ID,                           
                            ipAddress:clientIp,
                            status:"Active"
                        }
                      var status =   await DepartmentMaster.create(newdepartmentmaster);
                      console.log(status);                
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}
exports.HMSHostDepartmentMaster = async(rows,clientIp) =>{
    for(var key in rows)
    {
        if(rows[key] != [])
        {
            if(rows[key]['Concept_ID'] == undefined)
            {
                rows[key]['Concept_ID'] = "Null";
            }
            if(rows[key]['Business_Unit_ID'] == undefined)
            {
                rows[key]['Business_Unit_ID'] = "Null";
            }
            var conceptmaster = await ConceptMaster.findOne({where:{Concept_Name:rows[key]['Concept_ID']}});
            var businessunit = await BusinessUnit.findOne({where:{Business_Unit_Name:rows[key]['Business_Unit_ID']}})
            
            var departmentmaster = await DepartmentMaster.findOne({where:{Department_Value:rows[key]['Department_Value'],Concept_ID:conceptmaster.Concept_ID,Business_Unit_ID:businessunit.Business_Unit_ID}});
            if(departmentmaster)
            {
                departmentmaster.Department_Value = rows[key]['Department_Value'];
                departmentmaster.Business_Unit_ID = businessunit.Business_Unit_ID; 
                departmentmaster.Concept_ID = conceptmaster.Concept_ID; 
                await departmentmaster.save();
            }
            else
            {
                const newdepartmentmaster = 
                {
                    Department_Value :rows[key]['Department_Value'],
                    Business_Unit_ID :businessunit.Business_Unit_ID,
                    Concept_ID :conceptmaster.Concept_ID,
                    ipAddress:clientIp,
                    status:"Active"
                }
                await DepartmentMaster.create(newdepartmentmaster)                    
            }
        }
    }
}