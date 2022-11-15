const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const StoreRatingRangeMaster = db.storeratingrangemaster;
exports.list = async(req,res)=>{
    const storeratingrangemasters = await StoreRatingRangeMaster.findAll({order: [['Comp_Store_Rating_Range_ID', 'DESC']]});
    if(storeratingrangemasters)
    {
        res.json({"status":"Success","message":"storeratingrangemasters List",'data':storeratingrangemasters});
    }
    else
    {
        
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);   
    var addstatus = StoreRatingRangeMaster.create(req.body);
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
    const storeratingrangemaster = await StoreRatingRangeMaster.findOne({where:{Comp_Store_Rating_Range_ID:req.params.id}})
    if(storeratingrangemaster)
    {        
        res.json({"status":"Success","message":"storeratingrangemaster view",'data':storeratingrangemaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    const storeratingrangemaster = await StoreRatingRangeMaster.findOne({where:{Comp_Store_Rating_Range_ID:req.params.id}})
    storeratingrangemaster.Comp_Store_Rating_Range_start_value = req.body.Comp_Store_Rating_Range_start_value; 
    storeratingrangemaster.Comp_Store_Rating_Range_End_Value = req.body.Comp_Store_Rating_Range_End_Value;
    storeratingrangemaster.status = req.body.status
    var addstatus = await storeratingrangemaster.save();
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
    const storeratingrangemaster = await StoreRatingRangeMaster.findOne({where:{Comp_Store_Rating_Range_ID:req.params.id}})
    storeratingrangemaster.status = 'In-active';
    var addstatus = await storeratingrangemaster.save();
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
                        const newstoreratingrangemaster = 
                        {
                            Comp_Store_Rating_Range_start_value :rows[key][0],
                            Comp_Store_Rating_Range_End_Value: rows[key][1],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await StoreRatingRangeMaster.create(newstoreratingrangemaster)                    
                    
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}