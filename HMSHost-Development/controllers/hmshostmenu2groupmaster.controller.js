const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");

const Menu1GroupMaster = db.menu1groupmasters;
const Menu2GroupMaster = db.menu2groupmasters;
exports.list = async(req,res)=>{
    const menu2groupmasters = await Menu2GroupMaster.findAll({include: ["menu1groups"],order: [['Menu_Group2_ID', 'DESC']]});
    if(menu2groupmasters)
    {
        
        if(menu2groupmasters != [])
        {    
            var array = [];
            for (var key in menu2groupmasters) 
            {
                
                array.push({
                    Menu_Group2_ID:menu2groupmasters[key]['Menu_Group2_ID'],  
                    Menu_Group2_Name:menu2groupmasters[key]['Menu_Group2_Name'],  
                    Menu_Group1_Name:menu2groupmasters[key]['menu1groups']['Menu_Group1_Name'],
                    ipAddress:menu2groupmasters[key]['ipAddress'],
                    status:menu2groupmasters[key]['status'],
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
    var menu2groupmaster = await Menu2GroupMaster.findOne({where:{Menu_Group2_Name:req.body.Menu_Group2_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!menu2groupmaster)
    {
    var addstatus = Menu2GroupMaster.create(req.body);
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
    const menu2groupmasters = await Menu2GroupMaster.findAll({include: ["menu1groups"],where:{Menu_Group2_ID:req.params.id}})    
    if(menu2groupmasters)
    {
        if(menu2groupmasters != [])
        {    
            var array = [];
            for (var key in menu2groupmasters) 
            {
                
                array.push({
                    Menu_Group2_ID:menu2groupmasters[key]['Menu_Group1_ID'],  
                    Menu_Group2_Name:menu2groupmasters[key]['Menu_Group2_Name'],  
                    Menu_Group1_Name:menu2groupmasters[key]['menu1groups']['Menu_Group1_Name'],
                    ipAddress:menu2groupmasters[key]['ipAddress'],
                    status:menu2groupmasters[key]['status'],
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
    var menu2groupmaster = await Menu2GroupMaster.findOne({where:{Menu_Group2_ID:req.params.id}});    
    menu2groupmaster.Menu_Group2_Name = req.body.Menu_Group2_Name;     
    menu2groupmaster.Menu_Group1_ID = req.body.Menu_Group1_ID;
    menu2groupmaster.status = req.body.status
    var addstatus = await menu2groupmaster.save();
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
    var menu2groupmaster = await Menu2GroupMaster.findOne({where:{Menu_Group2_ID:req.params.id}});    
    menu2groupmaster.status = 'In-active';
    var addstatus = await menu2groupmaster.save();
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
                    var menu1groupmaster = await Menu1GroupMaster.findOne({where:{Menu_Group1_Name:rows[key][1]}})
                    console.log(menu1groupmaster);
                    var menu2groupmaster = await Menu2GroupMaster.findOne({where:{Menu_Group2_Name:rows[key][0]}})
                    if(menu2groupmaster)
                    {
                        menu2groupmaster.Menu_Group2_Name = rows[key][0];                         
                        menu2groupmaster.Menu_Group1_ID = menu1groupmaster.Menu_Group1_ID;                        
                        await menu2groupmaster.save();
                    }
                    else
                    {
                        const newmenu2groupmaster = 
                        {
                            Menu_Group2_Name :rows[key][0],
                            Menu_Group1_ID : menu1groupmaster.Menu_Group1_ID,                       
                            ipAddress:clientIp,
                            status:"Active"
                        }
                      var status =   await Menu2GroupMaster.create(newmenu2groupmaster);
                      console.log(status);                
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}