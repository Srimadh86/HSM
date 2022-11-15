const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const MajorGroupMaster = db.majorgroupmasters;
exports.list = async(req,res)=>{
    const majorgroupmasters = await MajorGroupMaster.findAll({order: [['Major_Group_ID', 'DESC']]});
    if(majorgroupmasters)
    {
        res.json({"status":"Success","message":"majorgroupmasters List",'data':majorgroupmasters});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var majorgroupmaster = await MajorGroupMaster.findOne({where:{Major_Group_Name:req.body.Major_Group_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);
    
    if(!majorgroupmaster)
    {
    var addstatus = MajorGroupMaster.create(req.body);
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
    const majorgroupmaster = await MajorGroupMaster.findOne({where:{Major_Group_ID:req.params.id}})
    if(majorgroupmaster)
    {        
        res.json({"status":"Success","message":"majorgroupmaster view",'data':majorgroupmaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    var majorgroupmaster = await MajorGroupMaster.findOne({where:{Major_Group_ID:req.params.id}});
    majorgroupmaster.Major_Group_Name = req.body.Major_Group_Name; 
    majorgroupmaster.status = req.body.status
    var addstatus = await majorgroupmaster.save();
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
    const majorgroupmaster = await MajorGroupMaster.findOne({where:{Major_Group_ID:req.params.id}});
    majorgroupmaster.status = 'In-active';
    var addstatus = await majorgroupmaster.save();
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
    console.log('hello');
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
            console.log(rows);
            for(var key in rows)
            {
                if(rows[key] != [])
                {
                    var majorgroupmaster = await MajorGroupMaster.findOne({where:{Major_Group_Name:rows[key][0]}});
                    if(majorgroupmaster)
                    {
                        majorgroupmaster.Major_Group_Name = rows[key][0];  
                        await majorgroupmaster.save();
                    }
                    else
                    {
                        const newrmajorgroupname = 
                        {
                            Major_Group_Name: rows[key][0],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await MajorGroupMaster.create(newrmajorgroupname)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}
exports.HMSHost_Major_Group_Master=async(rows,clientIp)=>{
    for(var key in rows)
    {
        if(rows[key] != [])
        {
            var majorgroupmaster = await MajorGroupMaster.findOne({where:{Major_Group_Name:rows[key]['Major_Group_Name']}});
            if(majorgroupmaster)
            {
                majorgroupmaster.Major_Group_Name = rows[key]['Major_Group_Name']; 
                majorgroupmaster.Major_Group_Description = rows[key]['Major_Group_Description'];  
                await majorgroupmaster.save();
            }
            else
            {
                const newrmajorgroupname = 
                {
                    Major_Group_Name: rows[key]['Major_Group_Name'],
                    Major_Group_Description:rows[key]['Major_Group_Description'],
                    ipAddress:clientIp,
                    status:"Active"
                }
                await MajorGroupMaster.create(newrmajorgroupname)                    
            }
        }
    }
}