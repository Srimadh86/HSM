const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const PriceMenuItemScoreBreakDownMaster = db.menuitemscorebreakdownmaster;
exports.list = async(req,res)=>{
    const menuitemscorebreakdownmasters = await PriceMenuItemScoreBreakDownMaster.findAll({order: [['Menu_Item_Breakdown_ID', 'DESC']]});
    if(menuitemscorebreakdownmasters)
    {
        res.json({"status":"Success","message":"menuitemscorebreakdownmasters List",'data':menuitemscorebreakdownmasters});
    }
    else
    {
        
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    var menuitemscorebreakdownmaster = await PriceMenuItemScoreBreakDownMaster.findOne({where:{Menu_Item_Breakdown_Name:req.body.Menu_Item_Breakdown_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);
    if(!menuitemscorebreakdownmaster)
    {
    var addstatus = PriceMenuItemScoreBreakDownMaster.create(req.body);
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
    const menuitemscorebreakdownmaster = await PriceMenuItemScoreBreakDownMaster.findOne({where:{Menu_Item_Breakdown_ID:req.params.id}})
    if(menuitemscorebreakdownmaster)
    {        
        res.json({"status":"Success","message":"menuitemscorebreakdownmaster view",'data':menuitemscorebreakdownmaster});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    const menuitemscorebreakdownmaster = await PriceMenuItemScoreBreakDownMaster.findOne({where:{Menu_Item_Breakdown_ID:req.params.id}})
    menuitemscorebreakdownmaster.Menu_Item_Breakdown_Name = req.body.Menu_Item_Breakdown_Name; 
    menuitemscorebreakdownmaster.Menu_Item_position_Value = req.body.Menu_Item_position_Value;
    menuitemscorebreakdownmaster.Breakdown_score = req.body.Breakdown_score;
    menuitemscorebreakdownmaster.Breakdown_description = req.body.Breakdown_description;
    menuitemscorebreakdownmaster.status = req.body.status
    var addstatus = await menuitemscorebreakdownmaster.save();
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
    const menuitemscorebreakdownmaster = await PriceMenuItemScoreBreakDownMaster.findOne({where:{Menu_Item_Breakdown_ID:req.params.id}})
    menuitemscorebreakdownmaster.status = 'In-active';
    var addstatus = await menuitemscorebreakdownmaster.save();
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
                    var menuitemscorebreakdownmaster = await PriceMenuItemScoreBreakDownMaster.findOne({where:{Menu_Item_Breakdown_Name:rows[key][0]}});
                    if(menuitemscorebreakdownmaster)
                    {
                        menuitemscorebreakdownmaster.Menu_Item_Breakdown_Name = rows[key][0]; 
                        menuitemscorebreakdownmaster.Menu_Item_position_Value = rows[key][1]; 
                        menuitemscorebreakdownmaster.Breakdown_score = rows[key][2];  
                        menuitemscorebreakdownmaster.Breakdown_description = rows[key][3];  
                        await menuitemscorebreakdownmaster.save();
                    }
                    else
                    {
                        const newmenuitemscorebreakdownmaster = 
                        {
                            Menu_Item_Breakdown_Name :rows[key][0],
                            Menu_Item_position_Value: rows[key][1],
                            Breakdown_score: rows[key][2],
                            Breakdown_description: rows[key][3],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await PriceMenuItemScoreBreakDownMaster.create(newmenuitemscorebreakdownmaster)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}