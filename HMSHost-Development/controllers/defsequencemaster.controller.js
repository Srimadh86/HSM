const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const DefSeqMaster = db.desseqmasters;
exports.list = async(req,res)=>{
    const defseqmasters = await DefSeqMaster.findAll({order: [['Def_Sequence_ID', 'DESC']]});
    if(defseqmasters)
    {
        res.json({"status":"Success","message":"defseqmasters List",'data':defseqmasters});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var depseqmaster = await DefSeqMaster.findOne({where:{Def_Sequence_Description:req.body.Def_Sequence_Description}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);
    
    if(!depseqmaster)
    {
    var addstatus = DefSeqMaster.create(req.body);
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
    const depseqmaster = await DefSeqMaster.findOne({where:{Def_Sequence_ID:req.params.id}})
    if(depseqmaster)
    {        
        res.json({"status":"Success","message":"depseqmaster view",'data':depseqmaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    var defseqmaster = await DefSeqMaster.findOne({where:{Def_Sequence_ID:req.params.id}});
    console.log(req.params.id);
    defseqmaster.Def_Sequence_Value = req.body.Def_Sequence_Value; 
    defseqmaster.Def_Sequence_Description = req.body.Def_Sequence_Description;
    defseqmaster.status = req.body.status
    var addstatus = await defseqmaster.save();
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
    const defseqmaster = await DefSeqMaster.findOne({where:{Def_Sequence_ID:req.params.id}});
    defseqmaster.status = 'In-active';
    var addstatus = await defseqmaster.save();
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
                    var defseqmaster = await DefSeqMaster.findOne({where:{Def_Sequence_Description:rows[key][0]}});
                    if(defseqmaster)
                    {
                        defseqmaster.Def_Sequence_Value = rows[key][0]; 
                        defseqmaster.Def_Sequence_Description = rows[key][1];  
                        await defseqmaster.save();
                    }
                    else
                    {
                        const newdefseqmaster = 
                        {
                            Def_Sequence_Value :rows[key][0],
                            Def_Sequence_Description: rows[key][1],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await DefSeqMaster.create(newdefseqmaster)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}
exports.HMSHost_Def_Sequence_Master=async(rows,clientIp)=>{
    for(var key in rows)
            {
                if(rows[key] != [])
                {
                    var defseqmaster = await DefSeqMaster.findOne({where:{Def_Sequence_Value:rows[key]['Def_Sequence_Value']}});
                    if(defseqmaster)
                    {
                        defseqmaster.Def_Sequence_Value = rows[key]['Def_Sequence_Value']; 
                        defseqmaster.Def_Sequence_Description = rows[key]['Def_Sequence_Description'];  
                        await defseqmaster.save();
                    }
                    else
                    {
                        const newdefseqmaster = 
                        {
                            Def_Sequence_Value :rows[key]['Def_Sequence_Value'],
                            Def_Sequence_Description: rows[key]['Def_Sequence_Description'],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await DefSeqMaster.create(newdefseqmaster)                    
                    }
                }
            }
}