const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const ProductGroupMaster = db.productgroupmasters;
const Menu1GroupMaster = db.menu1groupmasters;
exports.list = async(req,res)=>{
    const menu1groupmasters = await Menu1GroupMaster.findAll({include: ["productgroups"],order: [['Menu_Group1_ID', 'DESC']]});
    if(menu1groupmasters)
    {
        
        if(menu1groupmasters != [])
        {    
            var array = [];
            for (var key in menu1groupmasters) 
            {
                
                array.push({
                    Menu_Group1_ID:menu1groupmasters[key]['Menu_Group1_ID'],  
                    Menu_Group1_Name:menu1groupmasters[key]['Menu_Group1_Name'],  
                    Product_Group_Name:menu1groupmasters[key]['productgroups']['Product_Group_Name'],
                    ipAddress:menu1groupmasters[key]['ipAddress'],
                    status:menu1groupmasters[key]['status'],
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
    var menu1groupmaster = await Menu1GroupMaster.findOne({where:{Menu_Group1_Name:req.body.Menu_Group1_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!menu1groupmaster)
    {
    var addstatus = Menu1GroupMaster.create(req.body);
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
    const menu1groupmasters = await Menu1GroupMaster.findAll({include: ["productgroups"],where:{Menu_Group1_ID:req.params.id}})    
    if(menu1groupmasters)
    {
        if(menu1groupmasters != [])
        {    
            var array = [];
            for (var key in menu1groupmasters) 
            {
                
                array.push({
                    Menu_Group1_ID:menu1groupmasters[key]['Menu_Group1_ID'],  
                    Menu_Group1_Name:menu1groupmasters[key]['Menu_Group1_Name'],  
                    Product_Group_Name:menu1groupmasters[key]['productgroups']['Product_Group_Name'],
                    ipAddress:menu1groupmasters[key]['ipAddress'],
                    status:menu1groupmasters[key]['status'],
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
    var menu1groupmaster = await Menu1GroupMaster.findOne({where:{Menu_Group1_ID:req.params.id}});    
    menu1groupmaster.Menu_Group1_Name = req.body.Menu_Group1_Name;     
    menu1groupmaster.Product_Group_ID = req.body.Product_Group_ID;
    menu1groupmaster.status = req.body.status
    var addstatus = await menu1groupmaster.save();
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
    var menu1groupmaster = await Menu1GroupMaster.findOne({where:{Menu_Group1_ID:req.params.id}});    
    menu1groupmaster.status = 'In-active';
    var addstatus = await menu1groupmaster.save();
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
                    var menu1groupmaster = await Menu1GroupMaster.findOne({where:{Menu_Group1_Name:rows[key][0]}})
                    var productgroupmaster = await ProductGroupMaster.findOne({where:{Product_Group_Name:rows[key][1]}})
                    if(menu1groupmaster)
                    {
                        menu1groupmaster.Menu_Group1_Name = rows[key][0];                         
                        menu1groupmaster.Product_Group_ID = productgroupmaster.Product_Group_ID;                        
                        await menu1groupmaster.save();
                    }
                    else
                    {
                        const newmenu1groupmaster = 
                        {
                            Menu_Group1_Name :rows[key][0],
                            Product_Group_ID : productgroupmaster.Product_Group_ID,                       
                            ipAddress:clientIp,
                            status:"Active"
                        }
                      var status =   await Menu1GroupMaster.create(newmenu1groupmaster);
                      console.log(status);                
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}