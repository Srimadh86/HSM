const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const ConceptMaster = db.conceptmasters;
exports.list = async(req,res)=>{
    const conceptmasters = await ConceptMaster.findAll({order: [['Concept_ID', 'DESC']]});
    if(conceptmasters)
    {
        res.json({"status":"Success","message":"conceptmasters List",'data':conceptmasters});
    }
    else
    {
        
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var conceptmaster = await ConceptMaster.findOne({where:{Concept_Name:req.body.Concept_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);
    
    if(!conceptmaster)
    {
    var addstatus = ConceptMaster.create(req.body);
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
    const conceptmaster = await ConceptMaster.findOne({where:{Concept_ID:req.params.id}})
    if(conceptmaster)
    {        
        res.json({"status":"Success","message":"conceptmaster view",'data':conceptmaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    var conceptmaster = await ConceptMaster.findOne({where:{Concept_ID:req.params.id}});
    console.log(req.params.id);
    conceptmaster.Concept_Name = req.body.Concept_Name; 
    conceptmaster.Concept_Description = req.body.Concept_Description;
    conceptmaster.status = req.body.status
    var addstatus = await conceptmaster.save();
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
    const conceptmaster = await ConceptMaster.findOne({where:{Concept_ID:req.params.id}});
    conceptmaster.status = 'In-active';
    var addstatus = await conceptmaster.save();
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
                    var conceptmaster = await ConceptMaster.findOne({where:{Concept_Name:rows[key][0]}});
                    if(conceptmaster)
                    {
                        conceptmaster.Concept_Name = rows[key][0]; 
                        conceptmaster.Concept_Description = rows[key][1];  
                        await conceptmaster.save();
                    }
                    else
                    {
                        const newconceptmaster = 
                        {
                            Concept_Name :rows[key][0],
                            Concept_Description: rows[key][1],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await ConceptMaster.create(newconceptmaster)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}
exports.HMSHost_Concept_Master=async(rows,clientIp)=>{
    for(var key in rows)
            {
                if(rows[key] != [])
                {
                    var conceptmaster = await ConceptMaster.findOne({where:{Concept_Name:rows[key]['Concept_Name']}});
                    if(conceptmaster)
                    {
                        conceptmaster.Concept_Name = rows[key]['Concept_Name']; 
                        conceptmaster.Concept_Description = rows[key]['Concept_Description'];  
                        await conceptmaster.save();
                    }
                    else
                    {
                        const newconceptmaster = 
                        {
                            Concept_Name :rows[key]['Concept_Name'],
                            Concept_Description: rows[key]['Concept_Description'],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await ConceptMaster.create(newconceptmaster)                    
                    }
                }
            }
}