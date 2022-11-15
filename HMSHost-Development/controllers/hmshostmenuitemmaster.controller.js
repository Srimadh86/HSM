const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const FamilyGroupMaster = db.familygroupmasters;
const Pricelevel = db.pricelevel;
const Pricenumber = db.pricenumber;
const MenuItemMaster = db.menuitemmaster;
exports.list = async(req,res)=>{
    const menuitemmasters = await MenuItemMaster.findAll({include: ["familygroups","pricelevel","pricenumber"],order: [['HMSHost_Menu_Item_ID', 'DESC']]});
    if(menuitemmasters)
    {        
        if(menuitemmasters != [])
        {    
            var array = [];
            for (var key in menuitemmasters) 
            {
                
                array.push({
                    HMSHost_Menu_Item_ID:menuitemmasters[key]['HMSHost_Menu_Item_ID'],  
                    HMSHost_Menu_Item_Name:menuitemmasters[key]['HMSHost_Menu_Item_Name'],  
                    HMSHost_Menu_Item_Description:menuitemmasters[key]['HMSHost_Menu_Item_Description'],
                    HMSHost_Recipe_Name:menuitemmasters[key]['HMSHost_Recipe_Name'],  
                    Total_Calories:menuitemmasters[key]['Total_Calories'],
                    Family_Group_Category_Name:menuitemmasters[key]['familygroups']['Family_Group_Category_Name'],
                    Price_Level_Value:menuitemmasters[key]['pricelevel']['Price_Level_Value'],
                    Price_Number_Value:menuitemmasters[key]['pricenumber']['Price_Number_Value'],
                    ipAddress:menuitemmasters[key]['ipAddress'],
                    status:menuitemmasters[key]['status'],
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
    var menuitemmaster = await MenuItemMaster.findOne({where:{HMSHost_Menu_Item_Name:req.body.HMSHost_Menu_Item_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!menuitemmaster)
    {
    var addstatus = MenuItemMaster.create(req.body);
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
    const menuitemmasters = await MenuItemMaster.findAll({include: ["familygroups","pricelevel","pricenumber"],where:{HMSHost_Menu_Item_ID:req.params.id}})    
    if(menuitemmasters)
    {
        if(menuitemmasters != [])
        {    
            var array = [];
            for (var key in menuitemmasters) 
            {
                
                array.push({
                    HMSHost_Menu_Item_ID:menuitemmasters[key]['HMSHost_Menu_Item_ID'],  
                    HMSHost_Menu_Item_Name:menuitemmasters[key]['HMSHost_Menu_Item_Name'],  
                    HMSHost_Menu_Item_Description:menuitemmasters[key]['HMSHost_Menu_Item_Description'],
                    HMSHost_Recipe_Name:menuitemmasters[key]['HMSHost_Recipe_Name'],  
                    Total_Calories:menuitemmasters[key]['Total_Calories'],
                    Family_Group_Category_Name:menuitemmasters[key]['familygroups']['Family_Group_Category_Name'],
                    Price_Level_Value:menuitemmasters[key]['pricelevel']['Price_Level_Value'],
                    Price_Number_Value:menuitemmasters[key]['pricenumber']['Price_Number_Value'],
                    ipAddress:menuitemmasters[key]['ipAddress'],
                    status:menuitemmasters[key]['status'],
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
    var menuitemmaster = await MenuItemMaster.findOne({where:{HMSHost_Menu_Item_ID:req.params.id}});    
    menuitemmaster.HMSHost_Menu_Item_Name = req.body.HMSHost_Menu_Item_Name;     
    menuitemmaster.HMSHost_Menu_Item_Description = req.body.HMSHost_Menu_Item_Description;
    menuitemmaster.HMSHost_Recipe_Name = req.body.HMSHost_Recipe_Name;
    menuitemmaster.Total_Calories = req.body.Total_Calories;     
    menuitemmaster.Family_Group_ID = req.body.Family_Group_ID;
    menuitemmaster.Price_Level_ID = req.body.Price_Level_ID;
    menuitemmaster.Price_Number_ID = req.body.Price_Number_ID;
    menuitemmaster.status = req.body.status
    var addstatus = await menuitemmaster.save();
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
    var menuitemmaster = await MenuItemMaster.findOne({where:{HMSHost_Menu_Item_ID:req.params.id}});    
    menuitemmaster.status = 'In-active';
    var addstatus = await menuitemmaster.save();
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
                    var familygroupmaster = await FamilyGroupMaster.findOne({where:{Family_Group_Category_Name:rows[key][4]}});                                       
                    var pricelevel = await Pricelevel.findOne({where:{Price_Level_Description:rows[key][5]}});                                       
                    var pricenumber = await Pricenumber.findOne({where:{Price_Number_Description:rows[key][6]}});                                       
                    var menuitemmaster = await MenuItemMaster.findOne({where:{HMSHost_Menu_Item_Name:rows[key][0]}});                             
                    if(menuitemmaster)
                    {
                        menuitemmaster.HMSHost_Menu_Item_Name = rows[key][0];                         
                        menuitemmaster.HMSHost_Menu_Item_Description = rows[key][1]; 
                        menuitemmaster.HMSHost_Recipe_Name = rows[key][2];                         
                        menuitemmaster.Total_Calories = rows[key][3]; 
                        menuitemmaster.Family_Group_ID = familygroupmaster.Family_Group_ID; 
                        menuitemmaster.Price_Level_ID = pricelevel.Price_Level_ID; 
                        menuitemmaster.Price_Number_ID = pricenumber.Price_Number_ID; 
                        await menuitemmaster.save();
                    }
                    else
                    {
                        const newmenuitemmaster = 
                        {
                            HMSHost_Menu_Item_Name :rows[key][0],
                            HMSHost_Menu_Item_Description : rows[key][1],  
                            HMSHost_Recipe_Name :rows[key][2],
                            Total_Calories : rows[key][3],
                            Family_Group_ID : familygroupmaster.Family_Group_ID,
                            Price_Level_ID : pricelevel.Price_Level_ID, 
                            Price_Number_ID : pricenumber.Price_Number_ID,                     
                            ipAddress:clientIp,
                            status:"Active"
                        }
                      var status =   await MenuItemMaster.create(newmenuitemmaster);
                      console.log(status);                
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }               
}