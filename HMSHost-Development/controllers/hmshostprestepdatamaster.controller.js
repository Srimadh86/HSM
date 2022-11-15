const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const Prestepdata = db.prestepdata;
const Airlocation = db.airportlocations;
const MicroLocation = db.microlocationmaster;
const City = db.cities;
const BusinessUnit = db.businessunits;
const StoreMaster = db.storemasters;
const ConceptMaster = db.conceptmasters;
const DefSeqMaster = db.desseqmasters;
const Pricelevel = db.pricelevel;
const Pricenumber = db.pricenumber;
const RevenueTypeMaster = db.revenuemasters;
exports.list = async(req,res)=>{
    const prestepdata = await Prestepdata.findAll({include: ["airportlocation","batchmaster","bussinessunit","conceptmasters","desseqmasters","menuitemmaster","microlocationmaster","revenuemasters","storemasters"],order: [['Transaction_ID', 'DESC']]});
   // console.log(prestepdata);
    if(prestepdata)
    {
        
        if(prestepdata != [])
        {    
            var array = [];
            for (var key in prestepdata) 
            {             
                var editable = [];   
                editable.push({
                    HMSHost_Store_Qty_Sold:prestepdata[key]['HMSHost_Store_Qty_Sold'],
                    HMSHost_Store_Price:prestepdata[key]['HMSHost_Store_Price'],
                    HMSHost_Store_Discount_total:prestepdata[key]['HMSHost_Store_Discount_total'],
                    HMSHost_Store_Sales_total:prestepdata[key]['HMSHost_Store_Sales_total'],
                    HMSHost_Store_Net_Sales:prestepdata[key]['HMSHost_Store_Net_Sales'],
                    HMSHost_Store_Theoretical_Cost:prestepdata[key]['HMSHost_Store_Theoretical_Cost'],
                })
                if(prestepdata[key]['Batch_ID'] == null)
                {
                    var Batch_ID =  null;
                }
                else
                {
                    var Batch_ID =  prestepdata[key]['batchmaster']['Batch_ID'];
                }
                if(prestepdata[key]['Def_Sequence_ID'] == null)
                {
                    var Def_Sequence_Value =  null;
                }
                else
                {
                    var Def_Sequence_Value =  prestepdata[key]['desseqmasters']['Def_Sequence_Value'];
                }
                array.push({  
                    Transaction_ID:prestepdata[key]['Transaction_ID'],                 
                    Transaction_ID:prestepdata[key]['Transaction_ID'],
                    Airport_Name:prestepdata[key]['airportlocation']['Airport_Name'],
                    Batch_ID:Batch_ID,
                    Business_Unit_ID:prestepdata[key]['bussinessunit']['Business_Unit_Name'],
                    Micro_Location_Value:prestepdata[key]['microlocationmaster']['Micro_Location_Value'],
                    HMSHost_Menu_Item_ID:prestepdata[key]['HMSHost_Menu_Item_ID'],
                    Def_Sequence_Value:Def_Sequence_Value,
                    Concept_Name:prestepdata[key]['conceptmasters']['Concept_Name'],
                    Revenue_Type_Value:prestepdata[key]['revenuemasters']['Revenue_Type_Value'],
                    Store_Name:prestepdata[key]['storemasters']['Store_Name'],                   
                    Ro_Show_Anyway:prestepdata[key]['Ro_Show_Anyway'],
                    ipAddress:prestepdata[key]['ipAddress'],
                    status:prestepdata[key]['status'],
                    editable:editable
                });
            }
        }
        res.json({"status":"Success","message":"Extract Data",'data':array});
    }
    else
    {
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.add = async(req,res)=>{    
    
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);   
    var addstatus = Prestepdata.create(req.body);
    if(addstatus)
    {
        res.json({"status":"Success","message":"Success"});
    }
    else
    {
        res.json({"status":"Fail","message":"Could not save record. Please try again"});
    }
    
}
exports.view = async (req,res)=>
{
    const prestepdata = await Prestepdata.findAll({include:  ["airportlocation","batchmaster","bussinessunit","conceptmasters","desseqmasters","menuitemmaster","microlocationmaster","revenuemasters","storemasters"],where:{Transaction_ID:req.params.id}})    
    
    if(prestepdata)
    {
        if(prestepdata != [])
        {    
            var array = [];
            for (var key in prestepdata) 
            {                
                array.push({                   
                    Transaction_ID:prestepdata[key]['Transaction_ID'],
                    Airport_Name:prestepdata[key]['airportlocation']['Airport_Name'],
                    Batch_ID:prestepdata[key]['batchmaster']['Batch_ID'],
                    Business_Unit_ID:prestepdata[key]['bussinessunit']['Business_Unit_Name'],
                    Micro_Location_Value:prestepdata[key]['microlocationmaster']['Micro_Location_Value'],
                    HMSHost_Menu_Item_ID:prestepdata[key]['HMSHost_Menu_Item_ID'],
                    Def_Sequence_Value:prestepdata[key]['desseqmasters']['Def_Sequence_Value'],
                    Concept_Name:prestepdata[key]['conceptmasters']['Concept_Name'],
                    Revenue_Type_Value:prestepdata[key]['revenuemasters']['Revenue_Type_Value'],
                    Store_Name:prestepdata[key]['storemasters']['Store_Name'],
                    HMSHost_Store_Qty_Sold:prestepdata[key]['HMSHost_Store_Qty_Sold'],
                    HMSHost_Store_Price:prestepdata[key]['HMSHost_Store_Price'],
                    HMSHost_Store_Discount_total:prestepdata[key]['HMSHost_Store_Discount_total'],
                    HMSHost_Store_Sales_total:prestepdata[key]['HMSHost_Store_Sales_total'],
                    HMSHost_Store_Net_Sales:prestepdata[key]['HMSHost_Store_Net_Sales'],
                    HMSHost_Store_Theoretical_Cost:prestepdata[key]['HMSHost_Store_Theoretical_Cost'],
                    Ro_Show_Anyway:prestepdata[key]['Ro_Show_Anyway'],
                    ipAddress:prestepdata[key]['ipAddress'],
                    status:prestepdata[key]['status'],
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
    var prestepdata = await Prestepdata.findOne({where:{Transaction_ID:req.params.id}});    
    prestepdata.status = 'In-active';
    var addstatus = await prestepdata.save();
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
async function HMSHost_Pre_Step_Data(rows,clientIp){
    for(var key in rows)
    {
        if(rows[key] != [])
                {
                    if(rows[key]['Airport_Location_ID'] == undefined)
                    {
                        rows[key]['Airport_Location_ID'] = null;
                    }
                    if(rows[key]['Batch_ID'] == undefined)
                    {
                        rows[key]['Batch_ID'] = null;
                    }
                    if(rows[key]['Business_Unit_ID'] == undefined)
                    {
                        rows[key]['Business_Unit_ID'] = null;
                    }
                    if(rows[key]['Micros_Location_Number_ID'] == undefined)
                    {
                        rows[key]['Micros_Location_Number_ID'] = null;
                    }
                    if(rows[key]['Def_Sequence_Value'] == undefined)
                    {
                        rows[key]['Def_Sequence_Value'] = null;
                    }
                    if(rows[key]['Concept_ID'] == undefined)
                    {
                        rows[key]['Concept_ID'] = null;
                    }
                    if(rows[key]['HMSHost_Store_ID'] == undefined)
                    {
                        rows[key]['HMSHost_Store_ID'] = null;
                    }
                    if(rows[key]['HMSHost_Revenue_Type_ID'] == undefined)
                    {
                        rows[key]['HMSHost_Revenue_Type_ID'] = null;
                    }
                    if(rows[key]['Price_Level_ID'] == undefined)
                    {
                        rows[key]['Price_Level_ID'] = null;
                    }
                    var airlocation = await Airlocation.findOne({where:{Airport_Name:rows[key]['Airport_Location_ID']}});
                    if(airlocation === null){
                       var Airport_Location_ID = null;
                    }
                    else
                    {
                        var Airport_Location_ID = airlocation.Airport_Location_ID;
                    }
                    var businessUnit = await BusinessUnit.findOne({where:{Business_Unit_Name:rows[key]['Business_Unit_ID']}})
                    if(businessUnit === null){
                        var Business_Unit_ID = null;
                     }
                     else
                     {
                         var Business_Unit_ID = businessUnit.Business_Unit_ID;
                     }
                     var microlocation = await MicroLocation.findOne({where:{Micro_Location_Value:rows[key]['Micros_Location_Number_ID']}})
                     if(microlocation === null){
                        var Micros_Location_Number_ID = null;
                     }
                     else
                     {
                         var Micros_Location_Number_ID = microlocation.Micro_Location_ID;
                     }
                     var defseqmaster = await DefSeqMaster.findOne({where:{Def_Sequence_Value:rows[key]['Def_Sequence_Value']}});
                     if(defseqmaster === null){
                        var Def_Sequence_ID = null;
                     }
                     else
                     {
                         var Def_Sequence_ID = defseqmaster.Def_Sequence_ID;
                     }
                     var conceptmaster = await ConceptMaster.findOne({where:{Concept_Name:rows[key]['Concept_ID']}});
                     if(conceptmaster === null){
                        var Concept_ID = null;
                     }
                     else
                     {
                         var Concept_ID = conceptmaster.Concept_ID;
                     }
                     var storemaster = await StoreMaster.findOne({where:{Store_Name:rows[key]['HMSHost_Store_ID']}});
                     if(storemaster === null){
                        var HMSHost_Store_ID = null;
                     }
                     else
                     {
                         var HMSHost_Store_ID = storemaster.Store_ID;
                     }
                     var revenuemaster = await RevenueTypeMaster.findOne({where:{Revenue_Type_Value:rows[key]['HMSHost_Revenue_Type_ID']}})
                     if(revenuemaster === null){
                        var HMSHost_Revenue_Type_ID = null;
                     }
                     else
                     {
                         var HMSHost_Revenue_Type_ID = revenuemaster.Revenue_Type_ID;
                     }
                   var pricelevel = await Pricelevel.findOne({where:{Price_Level_Value:rows[key]['Price_Level_ID']}})
                   if(pricelevel === null){
                    var Price_Level_ID = null;
                 }
                 else
                 {
                     var Price_Level_ID = pricelevel.Price_Level_ID;
                 }
                 /*var prestepdata = await Prestepdata.findOne({while:{Lookup_Value:rows[key]['lookup_Value']}})
                 if(prestepdata)
                 {
                    prestepdata.Lookup_Value = rows[key]['lookup_Value'];
                    prestepdata.Batch_ID = rows[key]['Batch_ID'];
                    prestepdata.Airport_Location_ID = Airport_Location_ID;
                    prestepdata.Business_Unit_ID = Business_Unit_ID;
                    prestepdata.Micros_Location_Number_ID = Micros_Location_Number_ID;
                    prestepdata.HMSHost_Menu_Item_ID = rows[key]['HMSHost_Menu_Item_ID'];
                    prestepdata.Def_Sequence_ID = Def_Sequence_ID;
                    prestepdata.Concept_ID=Concept_ID;
                    prestepdata.HMSHost_Store_ID = HMSHost_Store_ID;
                    prestepdata.HMSHost_Revenue_Type_ID=HMSHost_Revenue_Type_ID;
                    prestepdata.HMSHost_Store_Qty_Sold=rows[key]['HMSHost_Store_Qty_Sold'];
                    prestepdata.HMSHost_Store_Price=rows[key]['HMSHost_Store_Price'];
                    prestepdata.HMSHost_Store_Discount_total=rows[key]['HMSHost_Store_Discount_total'];
                    prestepdata.HMSHost_Store_Sales_total = rows[key]['HMSHost_Store_Sales_total'];
                    prestepdata.HMSHost_Store_Theoretical_Cost = rows[key]['HMSHost_Store_Theoretical_Cost'],
                    prestepdata.Ro_Show_Anyway = rows[key]['Ro_Show_Anyway'];
                    prestepdata.Price_Level_ID = Price_Level_ID;
                    prestepdata.save();
                 }
                 else
                 {*/
                    const newprestepdata =
                    {
                        Lookup_Value:rows[key]['lookup_Value'],
                        Batch_ID:rows[key]['Batch_ID'],
                        Airport_Location_ID:Airport_Location_ID,
                        Business_Unit_ID:Business_Unit_ID,
                        Micros_Location_Number_ID:Micros_Location_Number_ID,
                        HMSHost_Menu_Item_ID:rows[key]['HMSHost_Menu_Item_ID'],
                        Def_Sequence_ID:Def_Sequence_ID,
                        Concept_ID:Concept_ID,
                        HMSHost_Store_ID:HMSHost_Store_ID,
                        HMSHost_Revenue_Type_ID:HMSHost_Revenue_Type_ID,
                        HMSHost_Store_Qty_Sold:rows[key]['HMSHost_Store_Qty_Sold'],
                        HMSHost_Store_Price:rows[key]['HMSHost_Store_Price'],
                        HMSHost_Store_Discount_total:rows[key]['HMSHost_Store_Discount_total'],
                        HMSHost_Store_Sales_total:rows[key]['HMSHost_Store_Sales_total'],
                        HMSHost_Store_Theoretical_Cost:rows[key]['HMSHost_Store_Theoretical_Cost'],
                        Ro_Show_Anyway:rows[key]['Ro_Show_Anyway'],
                        Price_Level_ID:Price_Level_ID,
                        ipAddress:clientIp,
                        status:"Active"
                    }
                    await Prestepdata.create(newprestepdata) 
                // }
        }
    }
}