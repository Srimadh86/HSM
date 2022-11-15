const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const Pricelevel = db.pricelevel;
exports.list = async(req,res)=>{
    const pricelevels = await Pricelevel.findAll({order: [['Price_Level_ID', 'DESC']]});
    if(pricelevels)
    {
        res.json({"status":"Success","message":"pricelevels List",'data':pricelevels});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var pricelevel = await Pricelevel.findOne({where:{Price_Level_Description:req.body.Price_Level_Description}})
    req.body.status = 'Active';
    req.body.created_date = Date.now();
    req.body.updated_date = Date.now();
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!pricelevel)
    {
    var addstatus = Pricelevel.create(req.body);
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
    const pricelevel = await Pricelevel.findOne({where:{Price_Level_ID:req.params.id}})
    if(pricelevel)
    {        
        res.json({"status":"Success","message":"pricelevel view",'data':pricelevel});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    var pricelevel = await Pricelevel.findOne({where:{Price_Level_ID:req.params.id}});
    pricelevel.Price_Level_Value = req.body.Price_Level_Value; 
    pricelevel.Price_Level_Description = req.body.Price_Level_Description;
    pricelevel.status = req.body.status
    var addstatus = await pricelevel.save();
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
    const pricelevel = await Pricelevel.findOne({where:{Price_Level_ID:req.params.id}});
    pricelevel.status = 'In-active';
    var addstatus = await pricelevel.save();
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
                    var pricelevel = await Pricelevel.findOne({where:{Price_Level_Description:rows[key][1]}});
                    if(pricelevel)
                    {
                        pricelevel.Price_Level_Value = rows[key][0]; 
                        pricelevel.Price_Level_Description = rows[key][1];  
                        await pricelevel.save();
                    }
                    else
                    {
                        const newpricelevel = 
                        {
                            Price_Level_Value :rows[key][0],
                            Price_Level_Description: rows[key][1],
                            created_date:Date.now(),
                            updated_date:Date.now(),
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await Pricelevel.create(newpricelevel)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}
exports.HMSHost_Price_Level_Master=async(rows,clientIp)=>{
    for(var key in rows)
    {
        if(rows[key] != [])
        {
            var pricelevel = await Pricelevel.findOne({where:{Price_Level_Value:rows[key]['Price_Level_Value']}});
            if(pricelevel)
            {
                pricelevel.Price_Level_Value = rows[key]['Price_Level_Value']; 
                pricelevel.Price_Level_Description = rows[key]['Price_Level_Description'];  
                await pricelevel.save();
            }
            else
            {
                const newpricelevel = 
                {
                    Price_Level_Value :rows[key]['Price_Level_Value'],
                    Price_Level_Description: rows[key]['Price_Level_Description'],
                    created_date:Date.now(),
                    updated_date:Date.now(),
                    ipAddress:clientIp,
                    status:"Active"
                }
                await Pricelevel.create(newpricelevel)                    
            }
        }
    }
}