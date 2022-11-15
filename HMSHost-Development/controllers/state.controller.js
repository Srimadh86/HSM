const request = require('express');
var requestIp = require('request-ip');
const db = require('../models/index');
const bcrypt = require("bcryptjs");
const State = db.states;
const Region = db.regions;
exports.list = async(req,res)=>{
    const states = await State.findAll({include: ["region"],order: [['State_ID', 'DESC']]});
    if(states)
    {
        
        if(states != [])
        {    
            var array = [];
            for (var key in states) 
            {
                
                array.push({
                    State_ID:states[key]['State_ID'],
                    State_Name:states[key]['State_Name'],
                    Region_Name:states[key]['region']['Region_Name'],
                    created_date:states[key]['created_date'],
                    updated_date:states[key]['updated_date'],
                    ipAddress:states[key]['ipAddress'],
                    status:states[key]['status'],
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
    console.log(req.body);
    var state = await State.findOne({where:{State_Name:req.body.State_Name}})
    req.body.status = 'Active';
    req.body.created_date = Date.now();
    req.body.updated_date = Date.now();
    req.body.ipAddress = requestIp.getClientIp(req);
    
    if(!state)
    {
    var addstatus = State.create(req.body);
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
    const state = await State.findAll({include: ["region"],where:{State_ID:req.params.id}})    
    if(state)
    {
        if(state != [])
        {    
            var array = [];
            for (var key in state) 
            {
                
                array.push({
                    State_ID:state[key]['State_ID'],
                    State_Name:state[key]['State_Name'],
                    Region_Name:state[key]['region']['Region_Name'],
                    created_date:state[key]['created_date'],
                    updated_date:state[key]['updated_date'],
                    ipAddress:state[key]['ipAddress'],
                    status:state[key]['status'],
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
    var state = await State.findOne({where:{State_ID:req.params.id}});
    //console.log(state);    
    state.Region_ID = req.body.Region_ID; 
    state.State_Name = req.body.State_Name;
    state.status = req.body.status
    var addstatus = await state.save();
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
    const state = await State.findOne({where:{State_ID:req.params.id}});
    state.status = 'In-active';
    var addstatus = await state.save();
    if(addstatus)
    {
        res.json({"status":"Success","message":"Success"});
    }
    else
    {
        res.json({"status":"Fail","message":"Could not Delete. Please try again"});
    } 
}
exports.listbyregion = async(req,res)=>{
    const states = await State.findAll({where: {Region_ID:req.params.id}});
    if(states)
    {
        if(states != [])
        {    
            var array = [];
            for (var key in states) 
            {
                
                array.push({
                    State_ID:states[key]['State_ID'],
                    State_Name:states[key]['State_Name'],
                    created_date:states[key]['created_date'],
                    updated_date:states[key]['updated_date'],
                    ipAddress:states[key]['ipAddress'],
                    status:states[key]['status'],
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
exports.GlobalStateMaster = async(rows,clientIp)=>
{
    
    for(var key in rows)
    {
        if(rows[key] != [])
        {
            if(rows[key]['Region_ID'] == undefined){
                rows[key]['Region_ID'] = Null;
            }
            var region = await Region.findOne({where:{Region_Name:rows[key]['Region_ID']}});
            var state = await State.findOne({where:{State_Name:rows[key]['State_Name'],Region_ID:region.Region_ID}});
            if(state)
            {
                state.Region_ID = region.Region_ID; 
                state.State_Name = rows[key]['State_Name'];
                state.State_code = rows[key]['State_code'];  
                await state.save();
            }
            else
            {
                
                const newstate = 
                {
                    Region_ID :region.Region_ID,
                    State_Name: rows[key]['State_Name'],
                    State_code:rows[key]['State_code'],
                    ipAddress:clientIp,
                    status:"Active"
                }
              //  await State.create(newstate);
                await State.create(newstate);                  
            }
        }
    }
}
