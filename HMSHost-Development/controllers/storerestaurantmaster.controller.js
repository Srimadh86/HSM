const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const StoreRestMaster = db.storerestaurantmasters;
exports.list = async(req,res)=>{
    const storerestaurantmasters = await StoreRestMaster.findAll({order: [['Comp_Store_Restaurant_ID', 'DESC']]});
    if(storerestaurantmasters)
    {
        res.json({"status":"Success","message":"storerestaurantmasters List",'data':storerestaurantmasters});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var storerestaurantmaster = await StoreRestMaster.findOne({where:{Comp_Store_Restaurant_name:req.body.Comp_Store_Restaurant_name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!storerestaurantmaster)
    {
    var addstatus = storerestaurantmaster.create(req.body);
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
    const storerestaurantmaster = await StoreRestMaster.findOne({where:{Comp_Store_Restaurant_ID:req.params.id}})
    if(storerestaurantmaster)
    {        
        res.json({"status":"Success","message":"storecatersmaster view",'data':storerestaurantmaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    const storerestaurantmaster = await StoreRestMaster.findOne({where:{Comp_Store_Restaurant_ID:req.params.id}})
    storerestaurantmaster.Comp_Store_Restaurant_Object_Key = req.body.Comp_Store_Restaurant_Object_Key; 
    storerestaurantmaster.Comp_Store_Restaurant_name = req.body.Comp_Store_Restaurant_name;
    storerestaurantmaster.Address = req.body.Address;
    storerestaurantmaster.Restaurant_URL = req.body.Restaurant_URL; 
    storerestaurantmaster.Phone_Number = req.body.Phone_Number;
    storerestaurantmaster.status = req.body.status;
    var addstatus = await storerestaurantmaster.save();
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
    const storerestaurantmaster = await StoreRestMaster.findOne({where:{Comp_Store_Restaurant_ID:req.params.id}})
    storerestaurantmaster.status = 'In-active';
    var addstatus = await storerestaurantmaster.save();
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
                    var storerestaurantmaster = await StoreRestMaster.findOne({where:{Comp_Store_Restaurant_name:rows[key][0]}});
                    if(storerestaurantmaster)
                    {
                       
                        storerestaurantmaster.Comp_Store_Restaurant_Object_Key = rows[key][1]; 
                        storerestaurantmaster.Comp_Store_Restaurant_name = rows[key][0]; 
                        storerestaurantmaster.Address = rows[key][2]; 
                        storerestaurantmaster.Restaurant_URL = rows[key][3]; 
                        storerestaurantmaster.Phone_Number = rows[key][4]; 
                        await storerestaurantmaster.save();
                    }
                    else
                    {
                        const newstorerestmaster = 
                        {
                           
                            
                            Comp_Store_Restaurant_Object_Key : rows[key][1], 
                            Comp_Store_Restaurant_name : rows[key][0], 
                            Address : rows[key][2],
                            Restaurant_URL : rows[key][3], 
                            Phone_Number : rows[key][4],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await StoreRestMaster.create(newstorerestmaster)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}