const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const RevenueTypeMaster = db.revenuemasters;
const StoreMaster = db.storemasters;
const MicroLocation = db.microlocationmaster;
exports.list = async(req,res)=>{
    const  microlocationmasters= await MicroLocation.findAll({include: ["revenue","storemaster"],order: [['Micro_Location_ID', 'DESC']]});
    if(microlocationmasters)
    {
        
        if(microlocationmasters != [])
        {    
            var array = [];
            for (var key in microlocationmasters) 
            {
                
                array.push({
                    Micro_Location_ID:microlocationmasters[key]['Micro_Location_ID'],
                    Micro_Location_Description:microlocationmasters[key]['Micro_Location_Description'],  
                    Micro_RVC_Number:microlocationmasters[key]['Micro_RVC_Number'],  
                    Micro_Location_Value:microlocationmasters[key]['Micro_Location_Value'],                 
                    Revenue_Type_Value:microlocationmasters[key]['revenue']['Revenue_Type_Value'],
                    Store_Name:microlocationmasters[key]['storemaster']['Store_Name'],
                    ipAddress:microlocationmasters[key]['ipAddress'],
                    status:microlocationmasters[key]['status'],
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
    var microlocation = await MicroLocation.findOne({where:{Micro_Location_Description:req.body.Micro_Location_Description}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!microlocation)
    {
    var addstatus = MicroLocation.create(req.body);
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
    const microlocationmasters = await MicroLocation.findAll({include: ["revenue","storemaster"],where:{Micro_Location_ID:req.params.id}})    
    if(microlocationmasters)
    {
        if(microlocationmasters != [])
        {    
            var array = [];
            for (var key in microlocationmasters) 
            {
                
                array.push({
                    Micro_Location_ID:microlocationmasters[key]['Micro_Location_ID'],
                    Micro_Location_Description:microlocationmasters[key]['Micro_Location_Description'],  
                    Micro_RVC_Number:microlocationmasters[key]['Micro_RVC_Number'],  
                    Micro_Location_Value:microlocationmasters[key]['Micro_Location_Value'],                 
                    Revenue_Type_Value:microlocationmasters[key]['revenue']['Revenue_Type_Value'],
                    Store_Name:microlocationmasters[key]['storemaster']['Store_Name'],
                    ipAddress:microlocationmasters[key]['ipAddress'],
                    status:microlocationmasters[key]['status'],
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
    var microlocationmaster = await MicroLocation.findOne({where:{Micro_Location_ID:req.params.id}});    
    microlocationmaster.Micro_Location_Description = req.body.Micro_Location_Description; 
    microlocationmaster.Micro_RVC_Number = req.body.Micro_RVC_Number;
    microlocationmaster.RVC_Description = req.body.RVC_Description; 
    microlocationmaster.Store_ID = req.body.Store_ID;
    microlocationmaster.Revenue_Type_ID = req.body.Revenue_Type_ID; 
    microlocationmaster.Micro_Location_Value = req.body.Micro_Location_Value;
    microlocationmaster.status = req.body.status
    var addstatus = await microlocationmaster.save();
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
    var microlocationmaster = await MicroLocation.findOne({where:{Micro_Location_ID:req.params.id}});    
    microlocationmaster.status = 'In-active';
    var addstatus = await microlocationmaster.save();
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
                    
                    var microlocation = await MicroLocation.findOne({where:{Micro_Location_Description:rows[key][0]}});
                    var store = await StoreMaster.findOne({where:{Store_Name:rows[key][3]}});                    
                    var revenue = await RevenueTypeMaster.findOne({where:{Revenue_Type_Value:rows[key][4]}});
                    if(microlocation)
                    {
                        microlocation.Micro_Location_Description = rows[key][0]; 
                        microlocation.Micro_RVC_Number = rows[key][1]; 
                        microlocation.Micro_Location_Value = rows[key][2]; 
                        microlocation.Store_ID = store.Store_ID; 
                        microlocation.Revenue_Type_ID = revenue.Revenue_Type_ID;
                        microlocation.City_ID = city.City_ID; 
                        microlocation.Business_Unit_ID = businessUnit.Business_Unit_ID; 
                        microlocation.Concept_ID = conceptmaster.Concept_ID; 
                        microlocation.Def_Sequence_ID = defsequence.Def_Sequence_ID;                       
                        await microlocation.save();
                    }
                    else
                    {
                        const newmicrolocation = 
                        {
                            Micro_Location_Description :rows[key][0],
                            Micro_RVC_Number: rows[key][1],
                            Micro_Location_Value :rows[key][2],
                            Store_ID: store.Store_ID,
                            Revenue_Type_ID : revenue.Revenue_Type_ID,
                            ipAddress:clientIp,
                            status:"Active"
                        }
                      var status =   await MicroLocation.create(newmicrolocation);
                      console.log(status);                
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}
exports.HMSHostMicroLocationMaster=async(rows,clientIp)=>{
    for(var key in rows)
    {
        if(rows[key] != [])
        {
            var storeasmaster = await StoreMaster.findOne({where:{Store_Name:rows[key]['Store_ID']}});
            var revenuemaster = await RevenueTypeMaster.findOne({where:{Revenue_Type_Value:rows[key]['Revenue_Type_ID']}});
            var microlocation = await MicroLocation.findOne({where:{Micro_Location_Value:rows[key]['Micro_Location_Value']}});
            if(microlocation)
            {
                microlocation.Micro_Location_Value = rows[key]['Micro_Location_Value'];
                microlocation.Micro_Location_Description = rows[key]['Micro_Location_Description']; 
                microlocation.Micro_RVC_Number = rows[key]['Micro_RVC_Number']; 
                microlocation.Store_ID = storeasmaster.Store_ID;
                microlocation.Revenue_Type_ID =revenuemaster.Revenue_Type_ID; 
                await microlocation.save();
            }
            else
            {
                const newmicrolocation = 
                {
                    Micro_Location_Value :rows[key]['Micro_Location_Value'],
                    Micro_Location_Description :rows[key]['Micro_Location_Description'],
                    Micro_RVC_Number :rows[key]['Micro_RVC_Number'],
                    Store_ID :storeasmaster.Store_ID,
                    Revenue_Type_ID :revenuemaster.Revenue_Type_ID,
                    ipAddress:clientIp,
                    status:"Active"
                }
                await MicroLocation.create(newmicrolocation)                    
            }
        }
    }
}