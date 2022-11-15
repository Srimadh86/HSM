const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const Pricenumber = db.pricenumber;
exports.list = async(req,res)=>{
    const pricenumbers = await Pricenumber.findAll({order: [['Price_Number_ID', 'DESC']]});
    if(pricenumbers)
    {
        res.json({"status":"Success","message":"pricenumbers List",'data':pricenumbers});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var pricenumber = await Pricenumber.findOne({where:{Price_Number_Description:req.body.Price_Number_Description}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!pricenumber)
    {
    var addstatus = Pricenumber.create(req.body);
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
    const pricenumber = await Pricenumber.findOne({where:{Price_Number_ID:req.params.id}})
    if(pricenumber)
    {        
        res.json({"status":"Success","message":"pricenumber view",'data':pricenumber});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    var pricenumber= await Pricenumber.findOne({where:{Price_Number_ID:req.params.id}});
    pricenumber.Price_Number_Description = req.body.Price_Number_Description; 
    pricenumber.Price_Number_Value = req.body.Price_Number_Value;
    pricenumber.status = req.body.status
    var addstatus = await pricenumber.save();
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
    const pricenumber = await Pricenumber.findOne({where:{Price_Number_ID:req.params.id}});
    pricenumber.status = 'In-active';
    var addstatus = await pricenumber.save();
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
                    var pricenumber = await Pricenumber.findOne({where:{Price_Number_Description:rows[key][1]}});
                    if(pricenumber)
                    {
                        pricenumber.Price_Number_Value = rows[key][0]; 
                        pricenumber.Price_Number_Description = rows[key][1];  
                        await pricenumber.save();
                    }
                    else
                    {
                        const newpricenumber = 
                        {
                            Price_Number_Value :rows[key][0],
                            Price_Number_Description: rows[key][1],
                            created_date:Date.now(),
                            updated_date:Date.now(),
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await Pricenumber.create(newpricenumber)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}
exports.HMSHost_Price_Number = async(rows,clientIp)=>{
    for(var key in rows)
    {
        if(rows[key] != [])
        {
            var pricenumber = await Pricenumber.findOne({where:{Price_Number_Value:rows[key]['Price_Number_Value']}});
            if(pricenumber)
            {
                pricenumber.Price_Number_Value = rows[key]['Price_Number_Value']; 
                pricenumber.Price_Number_Description = rows[key]['Price_Number_Description'];  
                await pricenumber.save();
            }
            else
            {
                const newpricenumber = 
                {
                    Price_Number_Value :rows[key]['Price_Number_Value'],
                    Price_Number_Description: rows[key]['Price_Number_Description'],
                    created_date:Date.now(),
                    updated_date:Date.now(),
                    ipAddress:clientIp,
                    status:"Active"
                }
                await Pricenumber.create(newpricenumber)                    
            }
        }
    }
}