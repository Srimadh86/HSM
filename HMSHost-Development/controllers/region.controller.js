const request = require('express');
var requestIp = require('request-ip');
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const Region = db.regions;
const Country = db.countries;
exports.list = async(req,res)=>{
    const regions = await Region.findAll({include: ["country"],order: [['Region_ID', 'DESC']]});
    if(regions)
    {
        if(regions != [])
        {    
            var array = [];
            for (var key in regions) 
            {
                
                array.push({
                    Region_ID:regions[key]['Region_ID'],
                    Region_Name:regions[key]['Region_Name'],
                    Country_Name:regions[key]['country']['Country_Name'],
                    created_date:regions[key]['created_date'],
                    updated_date:regions[key]['updated_date'],
                    ipAddress:regions[key]['ipAddress'],
                    status:regions[key]['status'],
                });
            }
        }
        res.json({"status":"Success","message":"regions List",'data':array});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
  //  console.log(req.body);
    var region = await Region.findOne({where:{Region_Name:req.body.Region_Name}});
    req.body.status = 'Active';
    req.body.created_date = Date.now();
    req.body.updated_date = Date.now();
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!region)
    {
    var addstatus = Region.create(req.body);
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
    const region = await Region.findAll({include: ["country"],where:{Region_ID:req.params.id}})
    if(region)
    {
        if(region != [])
        {    
            var array = [];
            for (var key in region) 
            {
                
                array.push({
                    Region_ID:region[key]['Region_ID'],
                    Region_Name:region[key]['Region_Name'],
                    Country_Name:region[key]['country']['Country_Name'],
                    created_date:region[key]['created_date'],
                    updated_date:region[key]['updated_date'],
                    ipAddress:region[key]['ipAddress'],
                    status:region[key]['status'],
                });
            }
        }
        res.json({"status":"Success","message":"regions List",'data':array});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    }
}
exports.edit = async(req,res)=>{   
    var region = await Region.findOne({where:{Region_ID:req.params.id}});
    console.log(req.params.id);
        region.Country_ID = req.body.Country_ID; 
        region.Region_Name = req.body.Region_Name;
        region.status = req.body.status
    var addstatus = await region.save();
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
    const region = await Region.findOne({where:{Region_ID:req.params.id}});
    region.status = 'In-active';
    var addstatus = await region.save();
    if(addstatus)
    {
        res.json({"status":"Success","message":"Success"});
    }
    else
    {
        res.json({"status":"Fail","message":"Could not Delete. Please try again"});
    } 
}
exports.listbycountry = async(req,res)=>{
    const regions = await Region.findAll({where: {Country_ID:req.params.id}});
    if(regions)
    {
        if(regions != [])
        {    
            var array = [];
            for (var key in regions) 
            {
                
                array.push({
                    Region_ID:regions[key]['Region_ID'],
                    Region_Name:regions[key]['Region_Name'],
                    created_date:regions[key]['created_date'],
                    updated_date:regions[key]['updated_date'],
                    ipAddress:regions[key]['ipAddress'],
                    status:regions[key]['status'],
                });
            }
        }
        res.json({"status":"Success","message":"regions List",'data':array});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.GlobalRegionMasterModel = async(rows,clientIp)=>{
    for(var key in rows)
            {
                if(rows[key] != [])
                {
                    var country = await Country.findOne({where:{Country_Name:rows[key]['Country_ID']}})
                    var region = await Region.findOne({where:{Region_Name:rows[key]['Region_Name'],Country_ID:country.Country_ID}});
                    if(region)
                    {
                        region.Country_ID = country.Country_ID; 
                        region.Region_Name = rows[key]['Region_Name'];  
                        await region.save();
                    }
                    else
                    {
                        const newregion = 
                        {
                            Country_ID : country.Country_ID,
                            Region_Name: rows[key]['Region_Name'],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await Region.create(newregion)                    
                    }
                }
            }
}
