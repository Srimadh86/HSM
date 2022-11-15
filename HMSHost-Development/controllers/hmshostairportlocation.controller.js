const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const City = db.cities;
const BusinessUnit = db.businessunits;
const StoreMaster = db.storemasters;
const Zip_Code = db.zipcodes;
const Airlocation = db.airportlocations;
exports.list = async(req,res)=>{
    const airportlocations = await Airlocation.findAll({include: ["city","storemaster","business","zipcodes"],order: [['Airport_Location_ID', 'DESC']]});
    console.log(airportlocations);
    if(airportlocations)
    {
        
        if(airportlocations != [])
        {    
            var array = [];
            for (var key in airportlocations) 
            {                
                array.push({                   
                    Airport_Location_ID:airportlocations[key]['Airport_Location_ID'],
                    Airport_Name:airportlocations[key]['Airport_Name'],
                    Airport_Short_Name:airportlocations[key]['Airport_Short_Name'],
                    Address:airportlocations[key]['Address'],
                    Latitude:airportlocations[key]['Latitude'],
                    Longitude:airportlocations[key]['Longitude'],
                    Owner_Name:airportlocations[key]['Owner_Name'],
                    Owner_Phone_number:airportlocations[key]['Owner_Phone_number'],
                    City_Name:airportlocations[key]['city']['City_Name'],
                    Store_Name:airportlocations[key]['storemaster']['Store_Name'],
                    Business_Unit_Name:airportlocations[key]['business']['Business_Unit_Name'],
                    Zip_Code_ID:airportlocations[key]['zipcodes']['Zip_Code_Value'],
                    ipAddress:airportlocations[key]['ipAddress'],
                    status:airportlocations[key]['status'],
                });
            }
        }
        res.json({"status":"Success","message":"zipcodes List",'data':array});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{    
    var airportlocation = await Airlocation.findOne({where:{Airport_Name:req.body.Airport_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!airportlocation)
    {
    var addstatus = Airlocation.create(req.body);
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
    const airportlocations = await Airlocation.findAll({include:  ["city","storemaster","business","zipcodes"],where:{Airport_Location_ID:req.params.id}})    
    
    if(airportlocations)
    {
        if(airportlocations != [])
        {    
            var array = [];
            for (var key in airportlocations) 
            {
                
                array.push({
                    Airport_Location_ID:airportlocations[key]['Airport_Location_ID'],
                    Airport_Name:airportlocations[key]['Airport_Name'],
                    Airport_Short_Name:airportlocations[key]['Airport_Short_Name'],
                    Address:airportlocations[key]['Address'],
                    Latitude:airportlocations[key]['Latitude'],
                    Longitude:airportlocations[key]['Longitude'],
                    Owner_Name:airportlocations[key]['Owner_Name'],
                    Owner_Phone_number:airportlocations[key]['Owner_Phone_number'],
                    City_Name:airportlocations[key]['city']['City_Name'],
                    Store_Name:airportlocations[key]['storemaster']['Store_Name'],
                    Business_Unit_Name:airportlocations[key]['business']['Business_Unit_Name'],
                    Zip_Code:airportlocations[key]['zipcodes']['Zip_Code_Value'],
                    ipAddress:airportlocations[key]['ipAddress'],
                    status:airportlocations[key]['status'],
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
    var airportlocation = await Airlocation.findOne({where:{Airport_Location_ID:req.params.id}});    
    airportlocation.Airport_Name = req.body.Airport_Name; 
    airportlocation.Airport_Short_Name = req.body.Airport_Short_Name;
    airportlocation.Address = req.body.Address; 
    airportlocation.Latitude = req.body.Latitude;
    airportlocation.Longitude = req.body.Longitude; 
    airportlocation.Owner_Name = req.body.Owner_Name;
    airportlocation.Owner_Phone_number = req.body.Owner_Phone_number; 
    airportlocation.City_ID = req.body.City_ID;
    airportlocation.Store_ID = req.body.Store_ID;
    airportlocation.Business_Unit_ID = req.body.Business_Unit_ID; 
    airportlocation.Zip_Code_Value = req.body.Zip_Code_Value;
    airportlocation.status = req.body.status
    var addstatus = await airportlocation.save();
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
    var airportlocation = await Airlocation.findOne({where:{Airport_Location_ID:req.params.id}});    
    airportlocation.status = 'In-active';
    var addstatus = await airportlocation.save();
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
                    
                    var airportlocation = await Airlocation.findOne({where:{Airport_Name:rows[key][0]}});
                    var city = await City.findOne({where:{City_Name:rows[key][7]}}); 
                    var store = await StoreMaster.findOne({where:{Store_Name:rows[key][8]}});                                      
                    var businessUnit = await BusinessUnit.findOne({where:{Business_Unit_Name:rows[key][9]}});                    
                    var zipcode = await Zip_Code.findOne({where:{Zip_Code_ID:rows[key][10]}});                    
                    if(airportlocation)
                    {
                        airportlocation.Airport_Name = rows[key][0]; 
                        airportlocation.Airport_Short_Name = rows[key][1]; 
                        airportlocation.Address = rows[key][2]; 
                        airportlocation.Latitude = rows[key][3]; 
                        airportlocation.Longitude = rows[key][4]; 
                        airportlocation.Owner_Name = rows[key][5];
                        airportlocation.Owner_Phone_number = rows[key][6];  
                        airportlocation.City_ID = city.City_ID;  
                        airportlocation.Store_ID = store.Store_ID;     
                        airportlocation.Business_Unit_ID = businessUnit.Business_Unit_ID;  
                        airportlocation.Zip_Code_ID = zipcode.Zip_Code_Value;                 
                        await airportlocation.save();
                    }
                    else
                    {
                        const newairportlocation = 
                        {
                            Airport_Name :rows[key][0],
                            Airport_Short_Name: rows[key][1],
                            Address :rows[key][2],
                            Latitude :rows[key][3],
                            Longitude: rows[key][4],
                            Owner_Name :rows[key][5],
                            Owner_Phone_number:rows[key][6],
                            City_ID : city.City_ID,
                            Store_ID : store.Store_ID,
                            Business_Unit_ID : businessUnit.Business_Unit_ID,
                            Zip_Code_ID : zipcode.Zip_Code_Value,
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await Airlocation.create(newairportlocation)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}
exports.HMSHostAirportLocationMaster=async(rows,clientIp)=>{
    for(var key in rows)
    {
        if(rows[key] != [])
        {
            if(rows[key]['Business_Unit_Name'] == undefined){
                rows[key]['Business_Unit_Name'] = null;
            }
            if(rows[key]['Store_Name'] == undefined){
                rows[key]['Store_Name'] = null;
            }
            if(rows[key]['City_ID'] == undefined){
                rows[key]['City_ID'] = null;
            }
            var city = await City.findOne({where:{City_Name:rows[key]['City_ID']}});            
            var businessunit = await BusinessUnit.findOne({where:{Business_Unit_Name:rows[key]['Business_Unit_Name']}})
            var storeasmaster = await StoreMaster.findOne({where:{Store_Name:rows[key]['Store_Name']}});
            var zipcode = await ZipCode.findOne({where:{Zip_Code_Value:rows[key]['Zip_Code_ID']}});
            var airlocation = await Airlocation.findOne({where:{Airport_Name:rows[key]['Airport_Name']}});
            if(businessunit === null)
            {
                    var Business_Unit_ID = null;
            }
            else
            {
                    var Business_Unit_ID = businessunit.Business_Unit_ID;
            }
            if(city === null)
            {
                    var City_ID = null;
            }
            else
            {
                    var City_ID = city.City_ID;
            }
            if(storeasmaster === null)
            {
                    var Store_ID = null;
            }
            else
            {
                    var Store_ID = storeasmaster.Store_ID;
            }
            if(airlocation)
            {
                airlocation.Airport_Name = rows[key]['Airport_Name'];
                airlocation.Airport_Short_Name = rows[key]['Airport_Short_Name']; 
                airlocation.Address = rows[key]['Address']; 
                airlocation.Latitude = rows[key]['Latitude'];
                airlocation.Longitude = rows[key]['Longitude']; 
                airlocation.Owner_Name = rows[key]['Owner_Name'];
                airlocation.Owner_Phone_number = rows[key]['Owner_Phone_number']; 
                airlocation.City_ID = City_ID;
                airlocation.Store_ID = Store_ID; 
                airlocation.Business_Unit_ID = Business_Unit_ID;
                airlocation.Zip_Code_ID = zipcode.Zip_Code_ID; 
                await airlocation.save();
            }
            else
            {
                const newairlocation = 
                {
                    Airport_Name :rows[key]['Airport_Name'],
                    Airport_Short_Name :rows[key]['Airport_Short_Name'],
                    Address :rows[key]['Address'],
                    Latitude :rows[key]['Latitude'],
                    Longitude :rows[key]['Longitude'],
                    Owner_Name :rows[key]['Owner_Name'],
                    Owner_Phone_number :rows[key]['Owner_Phone_number'],
                    City_ID :City_ID,
                    Store_ID :Store_ID,
                    Business_Unit_ID :Business_Unit_ID,
                    Zip_Code_ID :zipcode.Zip_Code_ID,
                    ipAddress:clientIp,
                    status:"Active"
                }
                await Airlocation.create(newairlocation)                    
            }
        }
    }
}