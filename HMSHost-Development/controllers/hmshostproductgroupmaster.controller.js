const request = require('express');
var requestIp = require('request-ip');
const readXlsxFile = require("read-excel-file/node");
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const MajorGroupMaster = db.majorgroupmasters;
const FamilyGroupMaster = db.familygroupmasters;
const ProductGroupMaster = db.productgroupmasters;
exports.list = async(req,res)=>{
    const productgroupmasters = await ProductGroupMaster.findAll({include: ["majorgroups","familygroups"],order: [['Product_Group_ID', 'DESC']]});
    if(productgroupmasters)
    {
        
        if(productgroupmasters != [])
        {    
            var array = [];
            for (var key in productgroupmasters) 
            {
                
                array.push({
                    Product_Group_ID:productgroupmasters[key]['Product_Group_ID'],  
                    Product_Group_Name:productgroupmasters[key]['Product_Group_Name'],  
                    Major_Group_Name:productgroupmasters[key]['majorgroups']['Major_Group_Name'],
                    Family_Group_Category_Name:productgroupmasters[key]['familygroups']['Family_Group_Category_Name'],
                    ipAddress:productgroupmasters[key]['ipAddress'],
                    status:productgroupmasters[key]['status'],
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
    var productgroupmaster = await ProductGroupMaster.findOne({where:{Product_Group_Name:req.body.Product_Group_Name}})
    req.body.status = 'Active';
    req.body.ipAddress = requestIp.getClientIp(req);    
    if(!productgroupmaster)
    {
    var addstatus = ProductGroupMaster.create(req.body);
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
    const productgroupmasters = await ProductGroupMaster.findAll({include: ["majorgroups","familygroups"],where:{Product_Group_ID:req.params.id}})    
    if(productgroupmasters)
    {
        if(productgroupmasters != [])
        {    
            var array = [];
            for (var key in productgroupmasters) 
            {
                
                array.push({
                    Product_Group_ID:productgroupmasters[key]['Product_Group_ID'],  
                    Product_Group_Name:productgroupmasters[key]['Product_Group_Name'],  
                    Major_Group_Name:productgroupmasters[key]['majorgroups']['Major_Group_Name'],
                    Family_Group_Category_Name:productgroupmasters[key]['familygroups']['Family_Group_Category_Name'],
                    ipAddress:productgroupmasters[key]['ipAddress'],
                    status:productgroupmasters[key]['status'],
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
    var productgroupmaster = await ProductGroupMaster.findOne({where:{Product_Group_ID:req.params.id}});    
    productgroupmaster.Product_Group_Name = req.body.Product_Group_Name;     
    productgroupmaster.Major_Group_ID = req.body.Major_Group_ID;
    productgroupmaster.Family_Group_ID = req.body.Family_Group_ID;
    productgroupmaster.status = req.body.status
    var addstatus = await productgroupmaster.save();
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
    var productgroupmaster = await ProductGroupMaster.findOne({where:{Product_Group_ID:req.params.id}});    
    productgroupmaster.status = 'In-active';
    var addstatus = await productgroupmaster.save();
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
                    var productgroupmaster = await ProductGroupMaster.findOne({where:{Product_Group_Name:rows[key][0]}})
                    var familygroupmaster = await FamilyGroupMaster.findOne({where:{Family_Group_Category_Name:rows[key][1]}});                                       
                    var majorgroupmaster = await MajorGroupMaster.findOne({where:{Major_Group_Name:rows[key][2]}});                             
                    if(productgroupmaster)
                    {
                        productgroupmaster.Product_Group_Name = rows[key][0];                         
                        productgroupmaster.Major_Group_ID = majorgroupmaster.Major_Group_ID; 
                        productgroupmaster.Family_Group_ID = familygroupmaster.Family_Group_ID; 
                        await productgroupmaster.save();
                    }
                    else
                    {
                        const newproductgroupmaster = 
                        {
                            Product_Group_Name :rows[key][0],
                            Major_Group_ID : majorgroupmaster.Major_Group_ID,  
                            Family_Group_ID : familygroupmaster.Family_Group_ID,                       
                            ipAddress:clientIp,
                            status:"Active"
                        }
                      var status =   await ProductGroupMaster.create(newproductgroupmaster);
                      console.log(status);                
                    }
                }
            }
            res.json({"Status":"Success","message":"Uploaded the file successfully: " + req.file.originalname});
        })       
    }    
           
}