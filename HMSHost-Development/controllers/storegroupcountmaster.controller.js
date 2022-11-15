const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const StoreGroupCountMaster = db.storegroupcountmaster;
exports.list = async(req,res)=>{
    const storegroupcountmasters = await StoreGroupCountMaster.findAll({order: [['Comp_Store_Group_ID', 'DESC']]});
    if(storegroupcountmasters)
    {
        res.json({"status":"Success","message":"storegroupcountmasters List",'data':storegroupcountmasters});
    }
    else
    {
        
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);   
    var addstatus = StoreGroupCountMaster.create(req.body);
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
    const storegroupcountmaster = await StoreGroupCountMaster.findOne({where:{Comp_Store_Group_ID:req.params.id}})
    if(storegroupcountmaster)
    {        
        res.json({"status":"Success","message":"storegroupcountmaster view",'data':storegroupcountmaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    const storegroupcountmaster = await StoreGroupCountMaster.findOne({where:{Comp_Store_Group_ID:req.params.id}})
    storegroupcountmaster.Comp_Store_Starting_Group_Number = req.body.Comp_Store_Starting_Group_Number; 
    storegroupcountmaster.Comp_Store_Ending_Group_Number = req.body.Comp_Store_Ending_Group_Number;
    storegroupcountmaster.status = req.body.status
    var addstatus = await storegroupcountmaster.save();
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
    const storegroupcountmaster = await StoreGroupCountMaster.findOne({where:{Comp_Store_Group_ID:req.params.id}})
    storegroupcountmaster.status = 'In-active';
    var addstatus = await storegroupcountmaster.save();
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
                        const newstoregroupcountmaster = 
                        {
                            Comp_Store_Starting_Group_Number :rows[key][0],
                            Comp_Store_Ending_Group_Number: rows[key][1],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await StoreGroupCountMaster.create(newstoregroupcountmaster)                    
                    
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}