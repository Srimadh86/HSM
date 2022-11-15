const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const StorePriceSegmentMaster = db.storepricesegmentmaster;
exports.list = async(req,res)=>{
    const storepricesegmentmasters = await StorePriceSegmentMaster.findAll({order: [['Comp_Store_Price_Segment_ID', 'DESC']]});
    if(storepricesegmentmasters)
    {
        res.json({"status":"Success","message":"storepricesegmentmasters List",'data':storepricesegmentmasters});
    }
    else
    {
        
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var storepricesegmentmaster = await StorePriceSegmentMaster.findOne({where:{Comp_Store_Price_Segment_Value:req.body.Comp_Store_Price_Segment_Value}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);
    if(!storepricesegmentmaster)
    {
    var addstatus = StorePriceSegmentMaster.create(req.body);
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
    const storepricesegmentmaster = await StorePriceSegmentMaster.findOne({where:{Comp_Store_Price_Segment_ID:req.params.id}})
    if(storepricesegmentmaster)
    {        
        res.json({"status":"Success","message":"storesectionmaster view",'data':storepricesegmentmaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    const storepricesegmentmaster = await StorePriceSegmentMaster.findOne({where:{Comp_Store_Price_Segment_ID:req.params.id}})
    storepricesegmentmaster.Comp_Store_Price_Segment_Value = req.body.Comp_Store_Price_Segment_Value; 
    storepricesegmentmaster.Comp_Store_Price_Segment_description = req.body.Comp_Store_Price_Segment_description;
    storepricesegmentmaster.status = req.body.status
    var addstatus = await storepricesegmentmaster.save();
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
    const storepricesegmentmaster = await StorePriceSegmentMaster.findOne({where:{Comp_Store_Price_Segment_ID:req.params.id}})
    storepricesegmentmaster.status = 'In-active';
    var addstatus = await storepricesegmentmaster.save();
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
                    var storepricesegmentmaster = await StorePriceSegmentMaster.findOne({where:{Comp_Store_Price_Segment_Value:rows[key][0]}});
                    if(storepricesegmentmaster)
                    {
                        storepricesegmentmaster.Comp_Store_Price_Segment_Value = rows[key][0]; 
                        storepricesegmentmaster.Comp_Store_Price_Segment_description = rows[key][1];  
                        await storepricesegmentmaster.save();
                    }
                    else
                    {
                        const newstorepricesegmentmaster = 
                        {
                            Comp_Store_Price_Segment_Value :rows[key][0],
                            Comp_Store_Price_Segment_description: rows[key][1],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await StorePriceSegmentMaster.create(newstorepricesegmentmaster)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}