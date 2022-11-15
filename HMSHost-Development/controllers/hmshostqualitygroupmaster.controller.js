const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const QualityGroupMaster = db.qualitygroupmasters;
const Menu2GroupMaster = db.menu2groupmasters;
exports.list = async(req,res)=>{
    const qualitygroupmasters = await QualityGroupMaster.findAll({include: ["menu2groups"],order: [['Quality_Group_ID', 'DESC']]});
    if(qualitygroupmasters)
    {
        
        if(qualitygroupmasters != [])
        {    
            var array = [];
            for (var key in qualitygroupmasters) 
            {
                
                array.push({
                    Quality_Group_ID:qualitygroupmasters[key]['Quality_Group_ID'],  
                    Quality_Group_Name:qualitygroupmasters[key]['Quality_Group_Name'],  
                    Menu_Group2_Name:qualitygroupmasters[key]['menu2groups']['Menu_Group2_Name'],
                    ipAddress:qualitygroupmasters[key]['ipAddress'],
                    status:qualitygroupmasters[key]['status'],
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
    var qualitygroupmaster = await QualityGroupMaster.findOne({where:{Quality_Group_Name:req.body.Quality_Group_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!qualitygroupmaster)
    {
    var addstatus = QualityGroupMaster.create(req.body);
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
    const qualitygroupmasters = await QualityGroupMaster.findAll({include: ["menu2groups"],where:{Quality_Group_ID:req.params.id}})    
    if(qualitygroupmasters)
    {
        if(qualitygroupmasters != [])
        {    
            var array = [];
            for (var key in qualitygroupmasters) 
            {
                
                array.push({
                    Quality_Group_ID:qualitygroupmasters[key]['Quality_Group_ID'],  
                    Quality_Group_Name:qualitygroupmasters[key]['Quality_Group_Name'],  
                    Menu_Group2_Name:qualitygroupmasters[key]['menu2groups']['Menu_Group2_Name'],
                    ipAddress:qualitygroupmasters[key]['ipAddress'],
                    status:qualitygroupmasters[key]['status'],
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
    var qualitygroupmaster = await QualityGroupMaster.findOne({where:{Quality_Group_ID:req.params.id}});    
    qualitygroupmaster.Quality_Group_Name = req.body.Quality_Group_Name;     
    qualitygroupmaster.Menu_Group2_ID = req.body.Menu_Group2_ID;
    qualitygroupmaster.status = req.body.status
    var addstatus = await qualitygroupmaster.save();
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
    var qualitygroupmaster = await QualityGroupMaster.findOne({where:{Quality_Group_ID:req.params.id}});    
    qualitygroupmaster.status = 'In-active';
    var addstatus = await qualitygroupmaster.save();
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
                    var menu2groupmaster = await Menu2GroupMaster.findOne({where:{Menu_Group2_Name:rows[key][1]}})
                    var qualitygroupmaster = await QualityGroupMaster.findOne({where:{Quality_Group_Name:rows[key][0]}})
                    if(qualitygroupmaster)
                    {
                        qualitygroupmaster.Quality_Group_Name = rows[key][0];                         
                        qualitygroupmaster.Menu_Group2_ID = menu2groupmaster.Menu_Group2_ID;                        
                        await qualitygroupmaster.save();
                    }
                    else
                    {
                        const newqualitygroupmaster = 
                        {
                            Quality_Group_Name :rows[key][0],
                            Menu_Group2_ID : menu2groupmaster.Menu_Group1_ID,                       
                            ipAddress:clientIp,
                            status:"Active"
                        }
                      var status =   await QualityGroupMaster.create(newqualitygroupmaster);
                      console.log(status);                
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}