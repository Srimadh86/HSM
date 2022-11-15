const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const City = db.cities;
const ZipCode = db.zipcodes;
exports.list = async(req,res)=>{
    const zipcodes = await ZipCode.findAll({order: [['Zip_Code_ID', 'DESC']]});
    if(zipcodes)
    {
        
        if(zipcodes != [])
        {    
            var array = [];
            for (var key in zipcodes) 
            {
                
                array.push({                   
                    
                    Zip_Code_Value:zipcodes[key]['Zip_Code_Value'],
                    created_date:zipcodes[key]['created_date'],
                    updated_date:zipcodes[key]['updated_date'],
                    ipAddress:zipcodes[key]['ipAddress'],
                    status:zipcodes[key]['status'],
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
    
    var zipcode = await ZipCode.findOne({where:{Zip_Code_Value:req.body.Zip_Code_Value}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!zipcode)
    {
    var addstatus = ZipCode.create(req.body);
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
    const zipcode = await ZipCode.findAll({where:{Zip_Code_ID:req.params.id}})    
    if(zipcode)
    {
        if(zipcode != [])
        {    
            var array = [];
            for (var key in zipcode) 
            {
                
                array.push({
                    Zip_Code_Value:zipcode[key]['Zip_Code_Value'],
                    created_date:zipcode[key]['created_date'],
                    updated_date:zipcode[key]['updated_date'],
                    ipAddress:zipcode[key]['ipAddress'],
                    status:zipcode[key]['status'],
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
    var zipcode = await ZipCode.findOne({where:{Zip_Code_ID:req.params.id}});    
    zipcode.City_ID = req.body.City_ID; 
    zipcode.Zip_Code_Value = req.body.Zip_Code_Value;
    zipcode.status = req.body.status
    var addstatus = await zipcode.save();
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
    var zipcode = await ZipCode.findOne({where:{Zip_Code_ID:req.params.id}});   
    zipcode.status = 'In-active';
    var addstatus = await zipcode.save();
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
                    
                    var zipcode = await ZipCode.findOne({where:{Zip_Code_Value:rows[key][0]}});
                    var city = await City.findOne({where:{City_Name:rows[key][1]}});                    
                    console.log(rows[key]);
                    console.log(city);
                    if(zipcode)
                    {
                        zipcode.Zip_Code_Value = rows[key][0]; 
                        zipcode.City_ID = city.City_ID;                      
                        await zipcode.save();
                    }
                    else
                    {
                        const newzipcode = 
                        {
                            Zip_Code_Value :rows[key][0],
                            City_ID: city.City_ID,
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await ZipCode.create(newzipcode)                    
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}
exports.GlobalZipCodeMaster = async(rows,clientIp)=>{
    for(var key in rows)
    {
        if(rows[key] != [])
        {
            var zipcode = await ZipCode.findOne({where:{Zip_Code_Value:rows[key]['Zip_Code_Value']}});
            //console.log(zipcode);
            if(zipcode)
            {
                zipcode.Zip_Code_Value = rows[key]['Zip_Code_Value']; 
                await zipcode.save();
            }
            else
            {
                const newzipcode = 
                {
                    Zip_Code_Value :rows[key]['Zip_Code_Value'],
                    ipAddress:clientIp,
                    status:"Active"
                }
                await ZipCode.create(newzipcode)                    
            }
        }
    }
}