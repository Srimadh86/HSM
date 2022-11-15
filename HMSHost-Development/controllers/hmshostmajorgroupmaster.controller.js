const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const MajorGroupMaster = db.majorgroupmasters;
const FamilyGroupMaster = db.familygroupmasters;
exports.list = async(req,res)=>{
    const familygroupmasters = await FamilyGroupMaster.findAll({order: [['Family_Group_ID', 'DESC']]});
    if(familygroupmasters)
    {
        
        if(familygroupmasters != [])
        {    
            var array = [];
            for (var key in familygroupmasters) 
            {
                
                array.push({
                    Family_Group_ID:familygroupmasters[key]['Family_Group_ID'],  
                    Family_Group_Category_Name:familygroupmasters[key]['Family_Group_Category_Name'],  
                    ipAddress:familygroupmasters[key]['ipAddress'],
                    status:familygroupmasters[key]['status'],
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
    var familygroupmaster = await FamilyGroupMaster.findOne({where:{Family_Group_Category_Name:req.body.Family_Group_Category_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!familygroupmaster)
    {
    var addstatus = FamilyGroupMaster.create(req.body);
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
    const familygroupmasters = await FamilyGroupMaster.findAll({where:{Family_Group_ID:req.params.id}})    
    if(familygroupmasters)
    {
        if(familygroupmasters != [])
        {    
            var array = [];
            for (var key in familygroupmasters) 
            {
                
                array.push({
                    Family_Group_ID:familygroupmasters[key]['Family_Group_ID'],  
                    Family_Group_Category_Name:familygroupmasters[key]['Family_Group_Category_Name'],  
                    ipAddress:familygroupmasters[key]['ipAddress'],
                    status:familygroupmasters[key]['status'],
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
    var familygroupmaster = await FamilyGroupMaster.findOne({where:{Family_Group_ID:req.params.id}});    
    familygroupmaster.Family_Group_Category_Name = req.body.Family_Group_Category_Name;     
    familygroupmaster.Major_Group_ID = req.body.Major_Group_ID;
    familygroupmaster.status = req.body.status
    var addstatus = await familygroupmaster.save();
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
    var familygroupmaster = await FamilyGroupMaster.findOne({where:{Family_Group_ID:req.params.id}});     
    familygroupmaster.status = 'In-active';
    var addstatus = await familygroupmaster.save();
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
                    
                    var familygroupmaster = await FamilyGroupMaster.findOne({where:{Family_Group_Category_Name:rows[key][0]}});                                       
                    var majorgroupmaster = await MajorGroupMaster.findOne({where:{Major_Group_Name:rows[key][1]}});                             
                    if(familygroupmaster)
                    {
                        familygroupmaster.Family_Group_Category_Name = rows[key][0];                         
                        familygroupmaster.Major_Group_ID = majorgroupmaster.Major_Group_ID; 
                        await familygroupmaster.save();
                    }
                    else
                    {
                        const newfamilygroupmaster = 
                        {
                            Family_Group_Category_Name :rows[key][0],
                            Major_Group_ID : majorgroupmaster.Major_Group_ID,                        
                            ipAddress:clientIp,
                            status:"Active"
                        }
                      var status =   await FamilyGroupMaster.create(newfamilygroupmaster);
                      console.log(status);                
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}
exports.HMSHostFamilyGroupMaster= async(rows,clientIp)=>{
    for(var key in rows)
    {
        if(rows[key] != [])
        {
            var familygroupmaster = await FamilyGroupMaster.findOne({where:{Family_Group_Category_Name:rows[key]['Family_Group_Category_Name']}});
            if(familygroupmaster)
            {
                familygroupmaster.Family_Group_Category_Name = rows[key]['Family_Group_Category_Name'];              
                await familygroupmaster.save();
            }
            else
            {
                const newfamilygroupmaster = 
                {
                    Family_Group_Category_Name :rows[key]['Family_Group_Category_Name'],                   
                    ipAddress:clientIp,
                    status:"Active"
                }
                await FamilyGroupMaster.create(newfamilygroupmaster)                    
            }
        }
    }
}