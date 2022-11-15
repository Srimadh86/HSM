const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const City = db.cities;
const State = db.states;
const Region = db.regions;
exports.list = async(req,res)=>{
    const cities = await City.findAll({include: ["region","state"],order: [['City_ID', 'DESC']]});
    if(cities)
    {
        
        if(cities != [])
        {    
            var array = [];
            for (var key in cities) 
            {
                
                array.push({
                    City_ID:cities[key]['City_ID'],
                    City_Name:cities[key]['City_Name'],
                    Region_Name:cities[key]['region']['Region_Name'],
                    State_Name:cities[key]['state']['State_Name'],
                    created_date:cities[key]['created_date'],
                    updated_date:cities[key]['updated_date'],
                    ipAddress:cities[key]['ipAddress'],
                    status:cities[key]['status'],
                });
            }
        }
        res.json({"status":"Success","message":"Cities List",'data':array});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{
    console.log(req.body);
    var city = await City.findOne({where:{City_Name:req.body.City_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);
    
    if(!city)
    {
    var addstatus = City.create(req.body);
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
    const city = await City.findAll({include: ["region","state"],where:{City_ID:req.params.id}})    
    if(city)
    {
        if(city != [])
        {    
            var array = [];
            for (var key in city) 
            {
                
                array.push({
                    City_ID:city[key]['City_ID'],
                    City_Name:city[key]['City_Name'],
                    Region_Name:city[key]['region']['Region_Name'],
                    State_Name:city[key]['state']['State_Name'],
                    created_date:city[key]['created_date'],
                    updated_date:city[key]['updated_date'],
                    ipAddress:city[key]['ipAddress'],
                    status:city[key]['status'],
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
    var city = await City.findOne({where:{City_ID:req.params.id}});
       
    city.Region_ID = req.body.Region_ID; 
    city.State_ID = req.body.State_ID; 
    city.City_Name = req.body.City_Name;
    city.status = req.body.status
    var addstatus = await city.save();
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
    const city = await City.findOne({where:{City_ID:req.params.id}});
    city.status = 'In-active';
    var addstatus = await city.save();
    if(addstatus)
    {
        res.json({"status":"Success","message":"Success"});
    }
    else
    {
        res.json({"status":"Fail","message":"Could not Delete. Please try again"});
    } 
}
exports.uploadCityExcel = async(req,res)=>
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
                    
                    var city = await City.findOne({where:{City_Name:rows[key][0]}});
                    var state = await State.findOne({where:{State_Name:rows[key][1]}});
                    var region = await Region.findOne({where:{Region_Name:rows[key][2]}});
                    console.log(rows[key]);
                    console.log(region);
                    if(city)
                    {
                        city.City_Name = rows[key][0]; 
                        city.State_ID = state.State_ID;  
                        city.Region_ID = region.Region_ID;  
                        await region.save();
                    }
                    else
                    {
                        const newcity = 
                        {
                            City_Name :rows[key][0],
                            State_ID: state.State_ID,
                            Region_ID: region.Region_ID,
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await City.create(newcity)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}
exports.GlobalCityMaster = async(rows,clientIp)=>{
    for(var key in rows)
    {
        
        if(rows[key] != [])
        {
            if(rows[key]['Region_ID'] == undefined){
                rows[key]['Region_ID'] = 'Null';
            }
            if(rows[key]['State_ID'] == undefined){
                rows[key]['State_ID'] = 'Null';
            }
            var region = await Region.findOne({where:{Region_Name:rows[key]['Region_ID']}});
            var state = await State.findOne({where:{State_Name:rows[key]['State_ID']}});            
            var city = await City.findOne({where:{City_Name:rows[key]['City_Name'],State_ID:state.State_ID,Region_ID:region.Region_ID}});
            if(city)
            {
                city.Region_ID = region.Region_ID;
                city.State_ID = state.State_ID; 
                city.City_Name = rows[key]['City_Name'];  
                await city.save();
            }
            else
            {
                const newcity = 
                {
                    Region_ID :region.Region_ID,
                    State_ID :state.State_ID,
                    City_Name: rows[key]['City_Name'],
                    ipAddress:clientIp,
                    status:"Active"
                }
                await City.create(newcity)                    
            }
        }
    }
}