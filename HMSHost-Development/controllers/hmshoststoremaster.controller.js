const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const Rounding = db.roundingmaster;
const BusinessUnit = db.businessunits;
const City = db.cities;
const ConceptMaster = db.conceptmasters;
const RevenueTypeMaster = db.revenuemasters;
const DefSeqMaster = db.desseqmasters;
const StoreMaster = db.storemasters;
exports.list = async(req,res)=>{
    const storemasters = await StoreMaster.findAll({include: ["rounding","city","revenue","business","concepts","defsequence"],order: [['Store_ID', 'DESC']]});
    if(storemasters)
    {
        
        if(storemasters != [])
        {    
            var array = [];
            for (var key in storemasters) 
            {
                
                array.push({
                    Store_ID:storemasters[key]['Store_ID'],  
                    Store_Name:storemasters[key]['Store_Name'],  
                    RVC_Number:storemasters[key]['RVC_Number'],  
                    RVC_Description:storemasters[key]['RVC_Description'],                 
                    Rounding_Value:storemasters[key]['rounding']['Rounding_Value'],                 
                    City_Name:storemasters[key]['city']['City_Name'],
                    Revenue_Type_Value:storemasters[key]['revenue']['Revenue_Type_Value'],
                    Business_Unit_Name:storemasters[key]['business']['Business_Unit_Name'],
                    Concept_Name:storemasters[key]['concepts']['Concept_Name'],
                    Def_Sequence_Value:storemasters[key]['defsequence']['Def_Sequence_Value'],
                    ipAddress:storemasters[key]['ipAddress'],
                    status:storemasters[key]['status'],
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
    var storemaster = await StoreMaster.findOne({where:{Store_Name:req.body.Store_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!storemaster)
    {
    var addstatus = StoreMaster.create(req.body);
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
    const storemasters = await StoreMaster.findAll({include: ["rounding","city","revenue","business","concepts","defsequence"],where:{Store_ID:req.params.id}})    
    if(storemasters)
    {
        if(storemasters != [])
        {    
            var array = [];
            for (var key in storemasters) 
            {
                
                array.push({
                    Store_Name:storemasters[key]['Store_Name'],  
                    RVC_Number:storemasters[key]['RVC_Number'],  
                    RVC_Description:storemasters[key]['RVC_Description'],                 
                    Rounding_Value:storemasters[key]['rounding']['Rounding_Value'],                 
                    City_Name:storemasters[key]['city']['City_Name'],
                    Revenue_Type_Value:storemasters[key]['revenue']['Revenue_Type_Value'],
                    Business_Unit_Name:storemasters[key]['business']['Business_Unit_Name'],
                    Concept_Name:storemasters[key]['concepts']['Concept_Name'],
                    Def_Sequence_Value:storemasters[key]['defsequence']['Def_Sequence_Value'],
                    ipAddress:storemasters[key]['ipAddress'],
                    status:storemasters[key]['status'],
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
    var storemaster = await StoreMaster.findOne({where:{Store_ID:req.params.id}});    
    storemaster.Store_Name = req.body.Store_Name; 
    storemaster.RVC_Number = req.body.RVC_Number;
    storemaster.RVC_Description = req.body.RVC_Description; 
    storemaster.Revenue_Type_ID = req.body.Revenue_Type_ID;
    storemaster.City_ID = req.body.City_ID; 
    storemaster.Business_Unit_ID = req.body.Business_Unit_ID;
    storemaster.Concept_ID = req.body.Concept_ID; 
    storemaster.Def_Sequence_ID = req.body.Def_Sequence_ID;
    storemaster.Rounding_ID = req.body.Rounding_ID;
    storemaster.status = req.body.status
    var addstatus = await storemaster.save();
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
    var storemaster = await StoreMaster.findOne({where:{Store_ID:req.params.id}});   
    storemaster.status = 'In-active';
    var addstatus = await storemaster.save();
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
                    
                    var store = await StoreMaster.findOne({where:{Store_Name:rows[key][0]}});
                    var rounding = await Rounding.findOne({where:{Rounding_Value:rows[key][8]}});                    
                    var revenue = await RevenueTypeMaster.findOne({where:{Revenue_Type_Value:rows[key][3]}});
                    var city = await City.findOne({where:{City_Name:rows[key][4]}});                    
                    var businessUnit = await BusinessUnit.findOne({where:{Business_Unit_Name:rows[key][5]}});                    
                    var conceptmaster = await ConceptMaster.findOne({where:{Concept_Name:rows[key][6]}});                    
                    var defsequence = await DefSeqMaster.findOne({where:{Def_Sequence_Value:rows[key][7]}});
                    console.log(store);
                    if(store)
                    {
                        store.Store_Name = rows[key][0]; 
                        store.RVC_Number = rows[key][1]; 
                        store.RVC_Description = rows[key][2]; 
                        store.Rounding_ID = rounding.Rounding_ID; 
                        store.Revenue_Type_ID = revenue.Revenue_Type_ID;
                        store.City_ID = city.City_ID; 
                        store.Business_Unit_ID = businessUnit.Business_Unit_ID; 
                        store.Concept_ID = conceptmaster.Concept_ID; 
                        store.Def_Sequence_ID = defsequence.Def_Sequence_ID;                       
                        await store.save();
                    }
                    else
                    {
                        const newstore = 
                        {
                            Store_Name :rows[key][0],
                            RVC_Number: rows[key][1],
                            RVC_Description :rows[key][2],
                            Rounding_ID: rounding.Rounding_ID,
                            Revenue_Type_ID : revenue.Revenue_Type_ID,
                            City_ID : city.City_ID,
                            Business_Unit_ID : businessUnit.Business_Unit_ID,
                            Concept_ID : conceptmaster.Concept_ID,
                            Def_Sequence_ID : defsequence.Def_Sequence_ID,
                            ipAddress:clientIp,
                            status:"Active"
                        }
                      var status =   await StoreMaster.create(newstore);
                      console.log(status);                
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}
exports.HMSHostStoreMaster = async(rows,clientIp)=>{
    for(var key in rows)
    {
        if(rows[key] != [])
        {
            if(rows[key]['Revenue_Type_ID'] == undefined){
                rows[key]['Revenue_Type_ID'] = 0;
            }
            if(rows[key]['Def_Sequence_Value'] == undefined){
                rows[key]['Def_Sequence_Value'] = '';
            }
            if(rows[key]['Rounding_ID'] == undefined){
                rows[key]['Rounding_ID'] = "Null";
            }
            var revenuemaster = await RevenueTypeMaster.findOne({where:{Revenue_Type_Value:rows[key]['Revenue_Type_ID']}});
            var city = await City.findOne({where:{City_Name:rows[key]['City_ID']}});
            var businessunit = await BusinessUnit.findOne({where:{Business_Unit_Name:rows[key]['Business_Unit_ID']}})
            var conceptmaster = await ConceptMaster.findOne({where:{Concept_Name:rows[key]['Concept_ID']}});
            var defseqmaster = await DefSeqMaster.findOne({where:{Def_Sequence_Value:rows[key]['Def_Sequence_Value']}});
            var roundingmaster = await RoundingMaster.findOne({where:{Rounding_Value:rows[key]['Rounding_ID']}})
            var storeasmaster = await StoreMaster.findOne({where:{Store_Name:rows[key]['Store_Name']}});
           // console.log(revenuemaster);
           if(revenuemaster === null)
           {
                 var Revenue_Type_ID = null;
           }
           else
           {
                   var Revenue_Type_ID = revenuemaster.Revenue_Type_ID;
           }
           if(defseqmaster === null)
           {
                 var Def_Sequence_ID = null;
           }
           else
           {
                   var Def_Sequence_ID = defseqmaster.Def_Sequence_ID;
           }
           if(roundingmaster === null)
           {
                 var Rounding_ID = null;
           }
           else
           {
                   var Rounding_ID = roundingmaster.Rounding_ID;
           }
           
            if(storeasmaster)
            {
                storeasmaster.Store_Name = rows[key]['Store_Name'];
                storeasmaster.RVC_Number = rows[key]['RVC_Number']; 
                storeasmaster.RVC_Description = rows[key]['RVC_Description']; 
                storeasmaster.Revenue_Type_ID = Revenue_Type_ID;
                storeasmaster.City_ID = city.City_ID; 
                storeasmaster.Business_Unit_ID = businessunit.Business_Unit_ID;
                storeasmaster.Concept_ID = conceptmaster.Concept_ID; 
                storeasmaster.Def_Sequence_ID = Def_Sequence_ID;
                storeasmaster.Rounding_ID = Rounding_ID; 
                await storeasmaster.save();
            }
            else
            {
                const newstoreasmaster = 
                {
                    Store_Name :rows[key]['Store_Name'],
                    RVC_Number :rows[key]['RVC_Number'],
                    RVC_Description :rows[key]['RVC_Description'],
                    Revenue_Type_ID :Revenue_Type_ID,
                    City_ID :city.City_ID,
                    Business_Unit_ID :businessunit.Business_Unit_ID,
                    Concept_ID :conceptmaster.Concept_ID,
                    Def_Sequence_ID : Def_Sequence_ID,
                    Rounding_ID :Rounding_ID,
                    ipAddress:clientIp,
                    status:"Active"
                }
                await StoreMaster.create(newstoreasmaster)                    
            }
        }
    }
}
