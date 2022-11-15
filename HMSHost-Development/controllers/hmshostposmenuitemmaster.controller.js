const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const StoreMaster = db.storemasters;
const DefSeqMaster = db.desseqmasters;
const Menucategory = db.menucategory;
const PosMenuItemMaster = db.posmenuitemmaster;
exports.list = async(req,res)=>{
    const posmenuitemmasters = await PosMenuItemMaster.findAll({include: ["poscategory","defsequencemaster","storemaster"],order: [['HMSHost_POS_Menu_Item_ID', 'DESC']]});
    if(posmenuitemmasters)
    {        
        if(posmenuitemmasters != [])
        {    
            var array = [];
            for (var key in posmenuitemmasters) 
            {
                
                array.push({
                    HMSHost_POS_Menu_Item_ID:posmenuitemmasters[key]['HMSHost_POS_Menu_Item_ID'],  
                    HMSHost_POS_Menu_Item_Name:posmenuitemmasters[key]['HMSHost_POS_Menu_Item_Name'],  
                    HMSHost_POS_Menu_Item_Description:posmenuitemmasters[key]['HMSHost_POS_Menu_Item_Description'],
                    Total_Calories:posmenuitemmasters[key]['Total_Calories'],
                    POS_Category_Name:posmenuitemmasters[key]['poscategory']['POS_Category_Name'],
                    Def_Sequence_Value:posmenuitemmasters[key]['defsequencemaster']['Def_Sequence_Value'],
                    Store_Name:posmenuitemmasters[key]['storemaster']['Store_Name'],
                    ipAddress:posmenuitemmasters[key]['ipAddress'],
                    status:posmenuitemmasters[key]['status'],
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
    var posmenuitemmaster = await PosMenuItemMaster.findOne({where:{HMSHost_POS_Menu_Item_Name:req.body.HMSHost_POS_Menu_Item_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!posmenuitemmaster)
    {
    var addstatus = PosMenuItemMaster.create(req.body);
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
    const posmenuitemmasters = await PosMenuItemMaster.findAll({include: ["poscategory","defsequencemaster","storemaster"],where:{HMSHost_POS_Menu_Item_ID:req.params.id}})    
    if(posmenuitemmasters)
    {
        if(posmenuitemmasters != [])
        {    
            var array = [];
            for (var key in posmenuitemmasters) 
            {
                
                array.push({
                    HMSHost_POS_Menu_Item_ID:posmenuitemmasters[key]['HMSHost_POS_Menu_Item_ID'],  
                    HMSHost_POS_Menu_Item_Name:posmenuitemmasters[key]['HMSHost_POS_Menu_Item_Name'],  
                    HMSHost_POS_Menu_Item_Description:posmenuitemmasters[key]['HMSHost_POS_Menu_Item_Description'],
                    Total_Calories:posmenuitemmasters[key]['Total_Calories'],
                    POS_Category_Name:posmenuitemmasters[key]['poscategory']['POS_Category_Name'],
                    Def_Sequence_Value:posmenuitemmasters[key]['defsequencemaster']['Def_Sequence_Value'],
                    Store_Name:posmenuitemmasters[key]['storemaster']['Store_Name'],
                    ipAddress:posmenuitemmasters[key]['ipAddress'],
                    status:posmenuitemmasters[key]['status'],

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
    var posmenuitemmaster = await PosMenuItemMaster.findOne({where:{HMSHost_POS_Menu_Item_ID:req.params.id}});    
    posmenuitemmaster.HMSHost_POS_Menu_Item_Name = req.body.HMSHost_POS_Menu_Item_Name;     
    posmenuitemmaster.HMSHost_POS_Menu_Item_Description = req.body.HMSHost_POS_Menu_Item_Description;
    posmenuitemmaster.Total_Calories = req.body.Total_Calories;     
    posmenuitemmaster.POS_Category_ID = req.body.POS_Category_ID;
    posmenuitemmaster.HMSHost_Store_ID = req.body.HMSHost_Store_ID;
    posmenuitemmaster.HMSHost_Def_Sequence_ID = req.body.HMSHost_Def_Sequence_ID;
    posmenuitemmaster.status = req.body.status
    var addstatus = await posmenuitemmaster.save();
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
    var posmenuitemmaster = await PosMenuItemMaster.findOne({where:{HMSHost_POS_Menu_Item_ID:req.params.id}});    
    posmenuitemmaster.status = 'In-active';
    var addstatus = await posmenuitemmaster.save();
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
exports.HMSHostMenuItemMaster=async(rows,clientIp)=>{
    for(var key in rows)
    {
        if(rows[key] != [])
                {
                    if(rows[key]['Family_Group_Id'] == undefined){
                        rows[key]['Family_Group_Id'] = null;
                    }
                    if(rows[key]['Price_Level_ID'] == undefined){
                        rows[key]['Price_Level_ID'] = null;
                    }
                    if(rows[key]['Price_Number_ID'] == undefined){
                        rows[key]['Price_Number_ID'] = null;
                    }
                    var pricenumber = await Pricenumber.findOne({where:{Price_Number_Value:rows[key]['Price_Number_ID']}});
                    var pricelevel = await Pricelevel.findOne({where:{Price_Level_Value:rows[key]['Price_Level_ID']}})
                    var familygroupmaster = await FamilyGroupMaster.findOne({where:{Family_Group_Category_Name:rows[key]['Family_Group_Id']}})
                    var menuitemmaster = await MenuItemMaster.findOne({where:{HMSHost_Menu_Item_ID:rows[key]['HMSHost_Menu_Item_ID']}});
                    if(pricenumber === null)
                    {
                       var  Price_Number_ID = null;
                    }
                    else
                    {
                      var  Price_Number_ID = pricenumber.Price_Number_ID;
                    }
                    if(pricelevel === null)
                    {
                       var  Price_Level_ID = null;
                    }
                    else
                    {
                      var  Price_Level_ID = pricelevel.Price_Level_ID;
                    }
                    if(familygroupmaster === null)
                    {
                       var  Family_Group_ID = null;
                    }
                    else
                    {
                      var  Family_Group_ID = familygroupmaster.Family_Group_ID;
                    }
                    
                    
                    if(menuitemmaster)
                    {
                        menuitemmaster.HMSHost_Menu_Item_ID = rows[key]['HMSHost_Menu_Item_ID'];                        
                        menuitemmaster.HMSHost_Menu_Item_Name = rows[key]['HMSHost_Menu_Item_Name']; 
                        menuitemmaster.HMSHost_Menu_Item_Description = rows[key]['HMSHost_Menu_Item_Description'];
                        menuitemmaster.HMSHost_Recipe_Name = rows[key]['HMSHost_Recipe_Name']; 
                        menuitemmaster.Total_Calories = rows[key]['Total_Calories'];
                        menuitemmaster.Family_Group_ID = Family_Group_ID;   
                        menuitemmaster.Price_Level_ID = Price_Level_ID;
                        menuitemmaster.Price_Number_ID = Price_Number_ID;                        
                        await menuitemmaster.save();
                    }
                    else
                    {
                        const newmenuitemmaster = 
                        {
                            HMSHost_Menu_Item_ID :rows[key]['HMSHost_Menu_Item_ID'],
                            HMSHost_Menu_Item_Name :rows[key]['HMSHost_Menu_Item_Name'],
                            HMSHost_Menu_Item_Description :rows[key]['HMSHost_Menu_Item_Description'],
                            HMSHost_Recipe_Name: rows[key]['HMSHost_Recipe_Name'],
                            Total_Calories :rows[key]['Total_Calories'],
                            Family_Group_ID :Family_Group_ID,
                            Price_Level_ID: Price_Level_ID,
                            Price_Number_ID :Price_Number_ID,                           
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await MenuItemMaster.create(newmenuitemmaster)                    
                    }
        }
    }
}