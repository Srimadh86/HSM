const request = require('express');
var requestIp = require('request-ip');
const db = require('../models/index');
const readXlsxFile = require("read-excel-file/node");
const bcrypt = require("bcryptjs");
const reader = require('xlsx');
const { array } = require('../middleware/upload');
const PricingModelProteinMaster = db.pricingmodelproteinmaster;
const PricingModelCheeseMaster = db.pricingmodelcheesemaster;
const PricingModelLettuceMaster = db.pricingmodellettucemaster;
const PricingModelKey_IngredientMaster = db.pricingmodelkeyingredientmaster; 
const PricingModelKey_FeatureMaster = db.pricingmodelkeyfeaturemaster;
const StoreCatersMaster = db.storecatersmasters;
const StoreGroupCountMaster = db.storegroupcountmaster;
const StorePriceSegmentMaster = db.storepricesegmentmaster;
const PriceNameMatchRangeMaster = db.pricenamematchrangemaster;
const DefSeqMaster = db.desseqmasters;
const StoreRatingRangeMaster = db.storeratingrangemaster;
const StoreSectionMaster = db.storesectionmaster;
const StoreStyleMaster = db.storestylemasters;
const StoreTOMaster = db.storetakeoutmasters;
const StoreWSMaster = db.storewaiterservicemasters;
const Country = db.countries;
const BatchMasterNew = db.hostbatchmasters;
const ConceptMaster = db.conceptmasters;
const MajorGroupMaster = db.majorgroupmasters;
const POSmenucategory = db.menucategory;
const Pricelevel = db.pricelevel;
const Pricenumber = db.pricenumber;
const RevenueTypeMaster = db.revenuemasters;
const PriceFeatureMatchRangeMaster = db.pricefeaturematchrangemaster;
const PriceIngredientMatchRangeMaster = db.priceingredientmatchrangemaster;
const PricingModelMatchQualityScoreMaster = db.pricingmodelmatchqualityscoremaster;
const PriceMenuItemScoreBreakDownMaster = db.menuitemscorebreakdownmaster;
const RoundingMaster = db.roundingmaster;
const PricingModelVeggieMaster = db.pricingmodelveggiemaster;
const StoreRestMaster = db.storerestaurantmasters;
const StoreASMaster = db.storealcoholstatusmasters;
const Region = db.regions;
const State = db.states;
const City = db.cities;
const ZipCode = db.zipcodes;
const BusinessUnit = db.businessunits;
const StoreMaster = db.storemasters;
const Airlocation = db.airportlocations;
const MicroLocation = db.microlocationmaster;
const DepartmentMaster = db.departmentmaster;
const FamilyGroupMaster = db.familygroupmasters;
const ProductGroupMaster = db.productgroupmasters;
const Menu1GroupMaster = db.menu1groupmasters;
const Menu2GroupMaster = db.menu2groupmasters;
const QualityGroupMaster = db.qualitygroupmasters;
const POSMenuSubCategory = db.menusubcategories;
const StandardizedMenuCategoryMaster = db.standardmenucategorymaster;
const MenuItemMaster = db.menuitemmaster;
const PosMenuItemMaster = db.posmenuitemmaster;
const CompStoreMenuNameMaster = db.storemenumaster;
const CompStandardizedMenuCategoryMaster = db.compstandardmenucategorymaster;
const Prestepdata = db.prestepdata;
const MenuData =db.menudata;
const CompRestData = db.comstorerestdata;
const CompMenudata = db.menustoredata;
exports.list = async(req,res)=>{
    var masters = [];
    masters.push({
        SNO:1,
        name:'Global Country Master',
        urlhint:'countries',
    });
    masters.push({
        SNO:2,
        name:' HMSHost Concept Master',
        urlhint:'conceptmasters',
    });
    masters.push({
        SNO:3,
        name:'HMSHost Revenue Type Master',
        urlhint:'revenuetypemasters',
    });
    masters.push({
        SNO:4,
        name:' HMSHost Def. Sequence Master',
        urlhint:'defseqmasters',
    });
    masters.push({
        SNO:5,
        name:'HMSHost Major Group Master',
        urlhint:'majorgroupmasters',
    });
    masters.push({
        SNO:6,
        name:'HMSHost Price Level',
        urlhint:'pricelevelmasters',
    });
    masters.push({
        SNO:7,
        name:'HMSHost Price Number',
        urlhint:'pricenumbermasters',
    });
    masters.push({
        SNO:8,
        name:'HMSHost POS Menu Category',
        urlhint:'menucategories',
    });
    masters.push({
        SNO:9,
        name:'Comp Store Style Master',
        urlhint:'storestylemasters',
    });
    masters.push({
        SNO:10,
        name:'Comp Store Alcohol status Master',
        urlhint:'storeasmasters',
    });
    masters.push({
        SNO:11,
        name:'Comp Store Takeout Master',
        urlhint:'storetakeoutmasters',
    });
    masters.push({
        SNO:12,
        name:'Comp Store Waiter service Master',
        urlhint:'storewaiterservicemasters',
    });
    masters.push({
        SNO:13,
        name:'Comp Store Caters Master',
        urlhint:'storecatermasters',
    });
    masters.push({
        SNO:14,
        name:' Comp Store Restaurant Master',
        urlhint:'storerestmasters',
    });
    masters.push({
        SNO:15,
        name:'Comp Store Section Master',
        urlhint:'storesectionmasters',
    });
    masters.push({
        SNO:16,
        name:' Comp Store Grouping Count Master',
        urlhint:'storegroupcountmasters',
    });
    masters.push({
        SNO:17,
        name:'Comp Store Rating Range Master',
        urlhint:'storeratingrangemasters',
    });
    masters.push({
        SNO:18,
        name:'Comp Store Price Segment Master',
        urlhint:'storepricesegmentmasters',
    });
    masters.push({
        SNO:19,
        name:'Pricing Model Name Match Range Master',
        urlhint:'pricenamematchrangemasters',
    });
    masters.push({
        SNO:20,
        name:' Pricing Model Ingredient Match Range Master',
        urlhint:'priceingredientmatchrangemasters',
    });
    masters.push({
        SNO:21,
        name:'Pricing Model Feature Match Range Master',
        urlhint:'pricefeaturematchrangemasters',
    });
    masters.push({
        SNO:22,
        name:' Pricing Model Menu Item Score Breakdown Master',
        urlhint:'pricemenuitemscorebreakdownmasters',
    });
    masters.push({
        SNO:23,
        name:' Pricing Model Match Quality Score Master',
        urlhint:'pricemodelmatchqualityscoremasters',
    });
    masters.push({
        SNO:24,
        name:' Pricing Model Protein Master',
        urlhint:'pricemodelproteinmasters',
    });
    masters.push({
        SNO:25,
        name:' Pricing Model Veggie Master',
        urlhint:'pricemodelveggiemasters',
    });
    masters.push({
        SNO:26,
        name:' Pricing Model Cheese Master',
        urlhint:'pricemodelcheesemasters',
    });
    masters.push({
        SNO:27,
        name:' Pricing Model Lettuce Master',
        urlhint:'pricemodellettucemasters',
    });
    masters.push({
        SNO:28,
        name:' Pricing Model Key Ingredient Master',
        urlhint:'pricemodelkeyingredientmasters',
    });
    masters.push({
        SNO:29,
        name:' Pricing Model Key Feature Master',
        urlhint:'pricemodelkeyfeaturemasters',
    });
    masters.push({
        SNO:30,
        name:' Pricing Model Rounding Master',
        urlhint:'roundingmasters',
    });
    masters.push({
        SNO:31,
        name:' HMSHost Batch Master',
        urlhint:'hmshostbatchmaster',
    });
    masters.push({
        SNO:32,
        name:' Global Region Master',
        urlhint:'regions',
    });
    masters.push({
        SNO:33,
        name:' Global State Master',
        urlhint:'states',
    });
    masters.push({
        SNO:34,
        name:' Global City Master',
        urlhint:'cities',
    });
    masters.push({
        SNO:35,
        name:' Global Zip Code Master',
        urlhint:'zipcodes',
    });
    masters.push({
        SNO:36,
        name:' HMSHost Business Unit',
        urlhint:'businessunit',
    });
    masters.push({
        SNO:37,
        name:' HMSHost Store Master',
        urlhint:'storemasters',
    });
    masters.push({
        SNO:38,
        name:' HMSHost Airport Location Table',
        urlhint:'airlocations',
    });
    masters.push({
        SNO:39,
        name:' HMSHost Micro Location Master',
        urlhint:'microLocations',
    });
    masters.push({
        SNO:40,
        name:' HMSHost Department Master',
        urlhint:'departmentmasters',
    });
    masters.push({
        SNO:41,
        name:' HMSHost Family Group Master',
        urlhint:'familygroupmasters',
    });
    masters.push({
        SNO:42,
        name:' HMSHost Product Group Master',
        urlhint:'productgroupmasters',
    });
    masters.push({
        SNO:43,
        name:' HMSHost Menu Group1',
        urlhint:'menu1groupmasters',
    });
    masters.push({
        SNO:44,
        name:' HMSHost Menu Group2',
        urlhint:'menu2groupmasters',
    });
    masters.push({
        SNO:45,
        name:' HMSHost Quality Group',
        urlhint:'qualitygroupmasters',
    });
    masters.push({
        SNO:46,
        name:' HMSHost POS Menu Sub-Category',
        urlhint:'posmenusubcategories',
    });
    masters.push({
        SNO:47,
        name:' HMSHost Standardized Menu Category Master',
        urlhint:'standardizedmenucategorymaster',
    });
    masters.push({
        SNO:48,
        name:' HMSHost Menu Item Master',
        urlhint:'menuitemmaster',
    });
    masters.push({
        SNO:49,
        name:' HMSHost POS Menu Item Master',
        urlhint:'posmenuitemmaster',
    });
    masters.push({
        SNO:50,
        name:' Comp Store Standardized Menu Category',
        urlhint:'compstandardizedmenucategorymaster',
    });
    masters.push({
        SNO:51,
        name:' Comp Store Menu Name Master',
        urlhint:'storemenunamemaster',
    });
    if(masters)
    {
        res.json({"status":"Success","message":"masters List",'data':masters});
    }
    else
    {
        
        res.json({"status":"Fail","message":"Empty"});
    } 
}
exports.uploadExcel = async(req,res)=>
{   
    var clientIp = requestIp.getClientIp(req); 
    if (req.file == undefined) 
    {
       res.json({"Status":"Fail","message":"Please upload an excel file!"});
    }
    else
    {
        let path = 'uploads/'+req.file.filename;
        var data = [];
        var file = reader.readFile(path);
        const sheets = file.SheetNames
        //console.log(sheets);
        for(let i = 0; i < sheets.length; i++)
        {
            const temp = reader.utils.sheet_to_json(
                    file.Sheets[file.SheetNames[i]])
            
            if(file.SheetNames[i] == 'Comp_Store_Style_Master')
            {
                //CompStoreStyleMastersModel(temp,clientIp);
            }
            else if(file.SheetNames[i] == 'HMSHost_Concept_Master')
            {
                //HMSHost_Concept_Master(temp,clientIp);
            }
            else if(file.SheetNames[i] == 'Global_Country_Master')
            {
                //GlobalCountryMaster(temp,clientIp);
            }
            else if(file.SheetNames[i] == 'Comp_Store_Takeout_Master'){
                //CompStoreTakeoutMastersModel(temp,clientIp);
            } 
            else if(file.SheetNames[i] == 'Comp_Store_Waiter_service_Maste'){
                //CompStoreWaiterserviceMastersModel(temp,clientIp);
            } 
            
            else if(file.SheetNames[i] == 'HMSHost_Major_Group_Master'){
                //HMSHost_Major_Group_Master(temp,clientIp);
            } 
            else if(file.SheetNames[i] == 'HMSHost_POS_Menu_Category_Maste'){
                //HMSHost_POS_Menu_Category_Maste(temp,clientIp);
            } 
            else if(file.SheetNames[i] == 'HMSHost_Price_Level_Master'){
                //HMSHost_Price_Level_Master(temp,clientIp);
            } 
            else if(file.SheetNames[i] == 'Comp_Store_Restaurant_Master'){
             //   Comp_Store_Restaurant_Master(temp,clientIp);
            } 
            else if(file.SheetNames[i] == 'HMSHost_Price_Number'){
               // HMSHost_Price_Number(temp,clientIp);
            }
            else if(file.SheetNames[i] == 'HMSHost_Revenue_Type_Master'){
                //HMSHost_Revenue_Type_Master(temp,clientIp);
            }
            else if(file.SheetNames[i] == 'Pricing_Model_Feature_Match_Ran'){
                //Pricing_Model_Feature_Match_Ran(temp,clientIp);
            }
            else if(file.SheetNames[i] == 'Pricing_Model_Match_Quality_Sco'){
                //Pricing_Model_Match_Quality_Sco(temp,clientIp);
            }
            else if(file.SheetNames[i] == 'Pricing_Model_Ingredient_Match_'){
                //Pricing_Model_Ingredient_Match_(temp,clientIp);
            }
            else if(file.SheetNames[i] == 'Pricing_Model_Menu_Item_Score_B'){
                //Pricing_Model_Menu_Item_Score_B(temp,clientIp);
            }
            else if(file.SheetNames[i] == 'Pricing_Model_Rounding_Master'){
                //console.log('hello');
                Pricing_Model_Rounding_Maste(temp,clientIp);
            }
            else if(file.SheetNames[i] == 'Pricing_Model_Veggie_Master'){
                //Pricing_Model_Veggie_Master(temp,clientIp);
            }
            else if(file.SheetNames[i] == 'Pricing_Model_Name_Match_Range'){
                //Pricing_Model_Name_Match_Range(temp,clientIp);
            }
            else if(file.SheetNames[i] == 'HMSHost_Def_Sequence_Master'){
                //HMSHost_Def_Sequence_Master(temp,clientIp);
            }
            else if(file.SheetNames[i] == 'HMSHost_Batch_Master'){
                //HMSHostBatchMaster(temp,clientIp);
            }        
            else if(file.SheetNames[i] == 'Comp_Store_Section_Master'){
               // CompStoreSectionMastersModel(temp,clientIp);
            }
            else if(file.SheetNames[i] == 'Comp_Store_Rating_Range_Master_'){
                //CompStoreStoreRatingRangeMastersModel(temp,clientIp);
            }
            else if(file.SheetNames[i] == 'Comp_Store_Price_Segment_Master'){
                //CompStorePriceSegmentMastersModel(temp,clientIp);
            }
            else if(file.SheetNames[i] == 'Comp_Store_Caters_Master'){
               // CompStoreCatersMastersModel(temp,clientIp);
            }
            else if(file.SheetNames[i] == 'Comp_Store_Grouping_Count_Maste'){
                //CompStoreGroupingCountMastersModel(temp,clientIp);
            }
            else if(file.SheetNames[i] == 'Pricing_Model_Protein_Master')
            {
                //ProteinMastersModel(temp,clientIp);
            }
            else if(file.SheetNames[i] == 'Pricing_Model_Cheese_Master')
            {
                //CheeseMastersModel(temp,clientIp);
            }
            else if(file.SheetNames[i] == 'Pricing_Model_Lettuce_Master')
            {
                //LettuceMastersModel(temp,clientIp);
            }
            else if(file.SheetNames[i] == 'Pricing_Model_Key_Ingredient_Ma')
            {
                //ModelKeyIngredientMastersModel(temp,clientIp);
            } 
            else if(file.SheetNames[i] == 'Pricing_Model_Key_Feature_Maste')
            {
                //ModelKeyFeatureMastersModel(temp,clientIp);
            }  
            else if(file.SheetNames[i] == 'Global_Region_Master')
            {
                //GlobalRegionMasterModel(temp,clientIp);
            } 
            else if(file.SheetNames[i] == 'Global_State_Master')
            {
                //GlobalStateMaster(temp,clientIp);
            }  
            else if(file.SheetNames[i] == 'Global_City_Master')
            {
                //GlobalCityMaster(temp,clientIp);
            } 
            else if(file.SheetNames[i] == 'Global_Zip_Code_Master')
            {
                //GlobalZipCodeMaster(temp,clientIp);
            } 
            else if(file.SheetNames[i] == 'HMSHost_Business_Unit')
            {
                HMSHostBusinessUnit(temp,clientIp);
            } 
            else if(file.SheetNames[i] == 'HMSHost_Store_Master')
            {
                //HMSHostStoreMaster(temp,clientIp);
            } 
            else if(file.SheetNames[i] == 'HMSHost_Airport_Location_Master')
            {
               //HMSHostAirportLocationMaster(temp,clientIp);
            } 
            else if(file.SheetNames[i] == 'HMSHost_Micro_Location_Master')
            {
                //HMSHostMicroLocationMaster(temp,clientIp);
            }  
            else if(file.SheetNames[i] == 'HMSHost_Department_Master')
            {
                //HMSHostDepartmentMaster(temp,clientIp);
            } 
            else if(file.SheetNames[i] == 'HMSHost_Family_Group_Master')
            {
                //HMSHostFamilyGroupMaster(temp,clientIp);
            } 
            else if(file.SheetNames[i] == 'HMSHost_Product_Group_Master')
            {
                //HMSHostProductGroupMaster(temp,clientIp);
            }  
            else if(file.SheetNames[i] == 'HMSHost_Menu_Group1_Master')
            {
                //HMSHostMenuGroup1Master(temp,clientIp);
            } 
            else if(file.SheetNames[i] == 'HMSHost_Menu_Group2_Master')
            {
                //HMSHostMenuGroup2Master(temp,clientIp);
            }  
            else if(file.SheetNames[i] == 'HMSHost_Quality_Group_Master')
            {
                //HMSHostQualityGroupMaster(temp,clientIp);
            }   
            else if(file.SheetNames[i] == 'HMSHost_POS_Menu_Sub_Category')
            {
                //HMSHostPOSMenuSubCategory(temp,clientIp);
            } 
            else if(file.SheetNames[i] == 'HMSHost_Standardized_Menu_Categ')
            {
               // HMSHostStandardizedMenuCateg(temp,clientIp);
            } 
            else if(file.SheetNames[i] == 'HMSHost_Menu_Item_Master')
            {
                //HMSHostMenuItemMaster(temp,clientIp);
            } 
            else if(file.SheetNames[i] == 'HMSHost_POS_Menu_Item_Master')
            {
               // HMSHostPOSMenuItemMaster(temp,clientIp);
            } 
            else if(file.SheetNames[i] == 'Comp_Store_Menu_Name_Master')
            {
                //CompStoreMenuNameMasterModel(temp,clientIp);
            } 
            else if(file.SheetNames[i] == 'Comp_Store_Standardized_Menu_Ca')
            {
                //CompStoreStandardizedMenu_Ca(temp,clientIp);
            }      
        }
        res.json({"status":"Success","message":"masters List"});     
    }               
}
exports.MasterUploadExcel = async(req,res)=>{
    var clientIp = requestIp.getClientIp(req); 
    if (req.file == undefined) 
    {
       res.json({"Status":"Fail","message":"Please upload an excel file!"});
    }
    else
    {
        let path = 'uploads/'+req.file.filename;
        var data = [];
        var file = reader.readFile(path);
        const sheets = file.SheetNames
        //console.log(sheets);
        
        for(let i = 0; i < sheets.length; i++)
        {
            var rows = reader.utils.sheet_to_json(
                    file.Sheets[file.SheetNames[i]])
            if(file.SheetNames[i] == 'Global_Country_Master')
            {
                //country.GlobalCountryMaster(rows,clientIp);
                for(var key in rows)
                {
                    if(rows[key] != [])
                    {
                        var country = await Country.findOne({where:{Country_Name:rows[key]['Country_Name']}});
                        if(country)
                        {
                            country.Country_Name = rows[key]['Country_Name']; 
                            country.Country_Short_Name = rows[key]['Country_Short_Name'];  
                            country.Currency = rows[key]['Currency']; 
                            country.Currency_Symbol = rows[key]['Currency_Symbol']; 
                            await country.save();
                        }
                        else
                        {
                            const newcountry = 
                            {
                                Country_Name :rows[key]['Country_Name'],
                                Country_Short_Name: rows[key]['Country_Short_Name'],
                                Currency :rows[key]['Currency'],
                                Currency_Symbol: rows[key]['Currency_Symbol'],
                                ipAddress:clientIp,
                                status:"Active"
                            }
                            await Country.create(newcountry)                    
                        }
                    }
                }
            }
            else if(file.SheetNames[i] == 'Global_Region_Master')
            {
               //region.GlobalRegionMasterModel(rows,clientIp);
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
            else if(file.SheetNames[i] == 'Global_State_Master')
            {
                //state.GlobalStateMaster(temp,clientIp);
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
            else if(file.SheetNames[i] == 'Global_Zip_Code_Master')
            {
                //zipcode.GlobalZipCodeMaster(temp,clientIp);
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
            else if(file.SheetNames[i] == 'Global_City_Master')
            {
               // city.GlobalCityMaster(temp,clientIp);
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
            else if(file.SheetNames[i] == 'Pricing_Model_Rounding_Master')
            {
                //rounding.Pricing_Model_Rounding_Maste(temp,clientIp);
                for(var key in rows)
                {
                    if(rows[key] != [])
                    {
                        var roundingmaster = await RoundingMaster.findOne({where:{Rounding_Value:rows[key]['Rounding_Value']}});
                        if(roundingmaster)
                        {
                            roundingmaster.Rounding_Value = rows[key]['Rounding_Value']; 
                            roundingmaster.Rounding_Rule_Description = rows[key]['Rounding_Rule_description'];  
                            await roundingmaster.save();
                        }
                        else
                        {
                            const newrounding = 
                            {
                                Rounding_Value :rows[key]['Rounding_Value'],
                                Rounding_Rule_Description: rows[key]['Rounding_Rule_description'],
                                ipAddress:clientIp,
                                status:"Active"
                            }
                            await RoundingMaster.create(newrounding)                    
                        }
                    }
                }
            }  
            else if(file.SheetNames[i] == 'HMSHost_Concept_Master')
            {
                //conceptmaster.HMSHost_Concept_Master(temp,clientIp);
                for(var key in rows)
                {
                    if(rows[key] != [])
                    {
                        var conceptmaster = await ConceptMaster.findOne({where:{Concept_Name:rows[key]['Concept_Name']}});
                        if(conceptmaster)
                        {
                            conceptmaster.Concept_Name = rows[key]['Concept_Name']; 
                            conceptmaster.Concept_Description = rows[key]['Concept_Description'];  
                            await conceptmaster.save();
                        }
                        else
                        {
                            const newconceptmaster = 
                            {
                                Concept_Name :rows[key]['Concept_Name'],
                                Concept_Description: rows[key]['Concept_Description'],
                                ipAddress:clientIp,
                                status:"Active"
                            }
                            await ConceptMaster.create(newconceptmaster)                    
                        }
                    }
                }
            }
            else if(file.SheetNames[i] == 'HMSHost_Def_Sequence_Master')
            {
                //defseqmaster.HMSHost_Def_Sequence_Master(temp,clientIp);
                for(var key in rows)
                {
                    if(rows[key] != [])
                    {
                        var defseqmaster = await DefSeqMaster.findOne({where:{Def_Sequence_Value:rows[key]['Def_Sequence_Value']}});
                        if(defseqmaster)
                        {
                            defseqmaster.Def_Sequence_Value = rows[key]['Def_Sequence_Value']; 
                            defseqmaster.Def_Sequence_Description = rows[key]['Def_Sequence_Description'];  
                            await defseqmaster.save();
                        }
                        else
                        {
                            const newdefseqmaster = 
                            {
                                Def_Sequence_Value :rows[key]['Def_Sequence_Value'],
                                Def_Sequence_Description: rows[key]['Def_Sequence_Description'],
                                ipAddress:clientIp,
                                status:"Active"
                            }
                            await DefSeqMaster.create(newdefseqmaster)                    
                        }
                    }
                }
            }
            else if(file.SheetNames[i] == 'HMSHost_Price_Level_Master')
            {
                //pricelevel.HMSHost_Price_Level_Master(temp,clientIp);
                for(var key in rows)
                {
                    if(rows[key] != [])
                    {
                        var pricelevel = await Pricelevel.findOne({where:{Price_Level_Value:rows[key]['Price_Level_Value']}});
                        if(pricelevel)
                        {
                            pricelevel.Price_Level_Value = rows[key]['Price_Level_Value']; 
                            pricelevel.Price_Level_Description = rows[key]['Price_Level_Description'];  
                            await pricelevel.save();
                        }
                        else
                        {
                            const newpricelevel = 
                            {
                                Price_Level_Value :rows[key]['Price_Level_Value'],
                                Price_Level_Description: rows[key]['Price_Level_Description'],
                                created_date:Date.now(),
                                updated_date:Date.now(),
                                ipAddress:clientIp,
                                status:"Active"
                            }
                            await Pricelevel.create(newpricelevel)                    
                        }
                    }
                }
            } 
            else if(file.SheetNames[i] == 'HMSHost_Price_Number'){
               // pricenumber.HMSHost_Price_Number(temp,clientIp);
               for(var key in rows)
                {
                    if(rows[key] != [])
                    {
                        var pricenumber = await Pricenumber.findOne({where:{Price_Number_Value:rows[key]['Price_Number_Value']}});
                        if(pricenumber)
                        {
                            pricenumber.Price_Number_Value = rows[key]['Price_Number_Value']; 
                            pricenumber.Price_Number_Description = rows[key]['Price_Number_Description'];  
                            await pricenumber.save();
                        }
                        else
                        {
                            const newpricenumber = 
                            {
                                Price_Number_Value :rows[key]['Price_Number_Value'],
                                Price_Number_Description: rows[key]['Price_Number_Description'],
                                created_date:Date.now(),
                                updated_date:Date.now(),
                                ipAddress:clientIp,
                                status:"Active"
                            }
                            await Pricenumber.create(newpricenumber)                    
                        }
                    }
                }
            }
            else if(file.SheetNames[i] == 'HMSHost_Revenue_Type_Master'){
                //revenuemaster.HMSHost_Revenue_Type_Master(temp,clientIp);
                for(var key in rows)
                {
                    if(rows[key] != [])
                    {
                        var revenuemaster = await RevenueTypeMaster.findOne({where:{Revenue_Type_Value:rows[key]['Revenue_Type_Value']}});
                        if(revenuemaster)
                        {
                            revenuemaster.Revenue_Type_Description = rows[key]['Revenue_Type_Description'];
                            revenuemaster.Revenue_Type_Value = rows[key]['Revenue_Type_Value'];  
                            await revenuemaster.save();
                        }
                        else
                        {
                            const newrevenuemaster = 
                            {
                                Revenue_Type_Description: rows[key]['Revenue_Type_Description'],
                                Revenue_Type_Value:rows[key]['Revenue_Type_Value'],
                                ipAddress:clientIp,
                                status:"Active"
                            }
                            await RevenueTypeMaster.create(newrevenuemaster)                    
                        }
                    }
                }
            }
            else if(file.SheetNames[i] == 'HMSHost_Business_Unit')
            {
               // businessUnit.HMSHostBusinessUnit(temp,clientIp);
               for(var key in rows)
                {
                    if(rows[key] != [])
                    {
                        if(rows[key]['Rounding_ID'] == undefined)
                        {
                            rows[key]['Rounding_ID'] = 0;
                        // console.log(rows[key]['Rounding_ID']);
                        }
                        console.log(rows[key]['Rounding_ID']);
                        var rounding = await RoundingMaster.findOne({where:{Rounding_Value:rows[key]['Rounding_ID'] }})
                        var businessunit = await BusinessUnit.findOne({where:{Business_Unit_Name:rows[key]['Business_Unit_Name'],Rounding_ID:rounding.Rounding_ID}});
                        if(businessunit)
                        {
                            businessunit.Business_Unit_Name = rows[key]['Business_Unit_Name'];
                            businessunit.Business_Unit_Code = rows[key]['Business_Unit_Code']; 
                            businessunit.Markup_ID = rows[key]['Markup_ID'];
                            businessunit.Rounding_ID = rounding.Rounding_ID; 
                            await businessunit.save();
                        }
                        else
                        {
                            const newbusinessunit = 
                            {
                                Business_Unit_Name :rows[key]['Business_Unit_Name'],
                                Business_Unit_Code :rows[key]['Business_Unit_Code'],
                                Markup_ID :rows[key]['Markup_ID'],
                                Rounding_ID :rounding.Rounding_ID,
                                ipAddress:clientIp,
                                status:"Active"
                            }
                            await BusinessUnit.create(newbusinessunit)                    
                        }
                    }
                }
            }
            else if(file.SheetNames[i] == 'HMSHost_Department_Master')
            {
                //departmentmaster.HMSHostDepartmentMaster(temp,clientIp);
                for(var key in rows)
                {
                    if(rows[key] != [])
                    {
                        if(rows[key]['Concept_ID'] == undefined)
                        {
                            rows[key]['Concept_ID'] = "Null";
                        }
                        if(rows[key]['Business_Unit_ID'] == undefined)
                        {
                            rows[key]['Business_Unit_ID'] = "Null";
                        }
                        var conceptmaster = await ConceptMaster.findOne({where:{Concept_Name:rows[key]['Concept_ID']}});
                        var businessunit = await BusinessUnit.findOne({where:{Business_Unit_Name:rows[key]['Business_Unit_ID']}})
                        
                        var departmentmaster = await DepartmentMaster.findOne({where:{Department_Value:rows[key]['Department_Value'],Concept_ID:conceptmaster.Concept_ID,Business_Unit_ID:businessunit.Business_Unit_ID}});
                        if(departmentmaster)
                        {
                            departmentmaster.Department_Value = rows[key]['Department_Value'];
                            departmentmaster.Business_Unit_ID = businessunit.Business_Unit_ID; 
                            departmentmaster.Concept_ID = conceptmaster.Concept_ID; 
                            await departmentmaster.save();
                        }
                        else
                        {
                            const newdepartmentmaster = 
                            {
                                Department_Value :rows[key]['Department_Value'],
                                Business_Unit_ID :businessunit.Business_Unit_ID,
                                Concept_ID :conceptmaster.Concept_ID,
                                ipAddress:clientIp,
                                status:"Active"
                            }
                            await DepartmentMaster.create(newdepartmentmaster)                    
                        }
                    }
                }
            }
            else if(file.SheetNames[i] == 'HMSHost_Major_Group_Master'){
                //majorgroupmaster.HMSHost_Major_Group_Master(temp,clientIp);
                for(var key in rows)
                {
                    if(rows[key] != [])
                    {
                        var majorgroupmaster = await MajorGroupMaster.findOne({where:{Major_Group_Name:rows[key]['Major_Group_Name']}});
                        if(majorgroupmaster)
                        {
                            majorgroupmaster.Major_Group_Name = rows[key]['Major_Group_Name']; 
                            majorgroupmaster.Major_Group_Description = rows[key]['Major_Group_Description'];  
                            await majorgroupmaster.save();
                        }
                        else
                        {
                            const newrmajorgroupname = 
                            {
                                Major_Group_Name: rows[key]['Major_Group_Name'],
                                Major_Group_Description:rows[key]['Major_Group_Description'],
                                ipAddress:clientIp,
                                status:"Active"
                            }
                            await MajorGroupMaster.create(newrmajorgroupname)                    
                        }
                    }
                }
            } 
            else if(file.SheetNames[i] == 'HMSHost_Family_Group_Master')
            {
               // familygroupmaster.HMSHostFamilyGroupMaster(temp,clientIp);
               for(var key in rows)
                {
                    if(rows[key] != [])
                    {
                        var familygroupmaster = await FamilyGroupMaster.findOne({where:{Family_Group_Category_Name:rows[key]['Family_Group_Category_Name']}});
                        if(familygroupmaster)
                        {
                            familygroupmaster.Family_Group_Category_Name = rows[key]['Family_Group_Category_Name'];              
                            await familygroupmaster.save();
                        }
                        else
                        {
                            const newfamilygroupmaster = 
                            {
                                Family_Group_Category_Name :rows[key]['Family_Group_Category_Name'],                   
                                ipAddress:clientIp,
                                status:"Active"
                            }
                            await FamilyGroupMaster.create(newfamilygroupmaster)                    
                        }
                    }
                }
            } 
            else if(file.SheetNames[i] == 'HMSHost_Store_Master')
            {
                //storemaster.HMSHostStoreMaster(temp,clientIp);
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
            else if(file.SheetNames[i] == 'HMSHost_Airport_Location_Master')
            {
                //airlocation.HMSHostAirportLocationMaster(temp,clientIp);
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
            else if(file.SheetNames[i] == 'HMSHost_Micro_Location_Master')
            {
                //microlocation.HMSHostMicroLocationMaster(temp,clientIp);
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
            else if(file.SheetNames[i] == 'HMSHost_Menu_Item_Master')
            {
                //menuitemmaster.HMSHostMenuItemMaster(temp,clientIp);
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
            else if(file.SheetNames[i] == 'HMSHost_Pre_Step_Data'){
                //prestepdata.HMSHost_Pre_Step_Data(temp,clientIp);
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
        }
        res.json({"status":"Success","message":"masters List"});
    }
}
exports.SecondTransactionTable = async(req,res)=>{
    var clientIp = requestIp.getClientIp(req); 
    if (req.file == undefined) 
    {
       res.json({"Status":"Fail","message":"Please upload an excel file!"});
    }
    else
    {
        let path = 'uploads/'+req.file.filename;
        var data = [];
        var file = reader.readFile(path);
        const sheets = file.SheetNames
        //console.log(sheets);
        
        for(let i = 0; i < sheets.length; i++)
        {
            var rows = reader.utils.sheet_to_json(
                    file.Sheets[file.SheetNames[i]])
            if(file.SheetNames[i] == 'HMSHost_POS_Menu_Category_Maste')
            {
                //country.GlobalCountryMaster(rows,clientIp);
                for(var key in rows)
                {
                    if(rows[key] != [])
                    {
                        var menucategory = await POSmenucategory.findOne({where:{POS_Category_Name:rows[key]['POS_Category_Name']}});
                        if(menucategory)
                        {
                            menucategory.POS_Category_Name = rows[key]['POS_Category_Name'];  
                            await menucategory.save();
                        }
                        else
                        {
                            const newmenucategory = 
                            {
                                POS_Category_Name: rows[key]['POS_Category_Name'],
                                ipAddress:clientIp,
                                status:"Active"
                            }
                            await POSmenucategory.create(newmenucategory)                    
                        }
                    }
                }
            }
            else if(file.SheetNames[i] == 'HMSHost_POS_Menu_Sub_Category')
            {
               //region.GlobalRegionMasterModel(rows,clientIp);
               for(var key in rows)
               {
                   if(rows[key] != [])
                   {
                       var menucategory = await POSmenucategory.findOne({where:{POS_Category_Name:rows[key]['POS_Category_ID']}})
                       var posmenusubcategories = await POSMenuSubCategory.findOne({where:{POS_Subcategory_Name:rows[key]['POS_Subcategory_Name'],POS_Category_ID:menucategory.POS_Category_ID}});
                       if(posmenusubcategories)
                       {
                           posmenusubcategories.POS_Subcategory_Name = rows[key]['POS_Subcategory_Name']; 
                           posmenusubcategories.POS_Subcategory_Description = rows[key]['POS_Subcategory_Description'];
                           posmenusubcategories.POS_Category_ID = menucategory.POS_Category_ID;  
                           await posmenusubcategories.save();
                       }
                       else
                       {
                           const newposmenusubcategories = 
                           {
                               POS_Subcategory_Name :rows[key]['POS_Subcategory_Name'],
                               POS_Category_ID :menucategory.POS_Category_ID,
                               POS_Subcategory_Description: menucategory.POS_Category_ID,
                               ipAddress:clientIp,
                               status:"Active"
                           }
                           await POSMenuSubCategory.create(newposmenusubcategories)                    
                       }
                   }
               }
            }
            else if(file.SheetNames[i] == 'HMSHost_POS_Menu_Item_Master')
            {
                for(var key in rows)
                {
                    if(rows[key]['HMSHost_Def_Sequence_ID'] == undefined)
                    {
                        rows[key]['HMSHost_Def_Sequence_ID'] = null;
                    }

                    if(rows[key] != [])
                            {
                                var menucategory = await POSmenucategory.findOne({where:{POS_Category_Name:rows[key]['POS_Category_ID']}});
                                var storemaster = await StoreMaster.findOne({where:{Store_Name:rows[key]['HMSHost_Store_ID']}});
                                var defseqmaster = await DefSeqMaster.findOne({where:{Def_Sequence_Value:rows[key]['HMSHost_Def_Sequence_ID']}})
                                var posmenuitemmaster = await PosMenuItemMaster.findOne({where:{HMSHost_POS_Menu_Item_ID:rows[key]['HMSHost_POS_Menu_Item_ID']}});
                                if(defseqmaster === null){
                                    var Def_Sequence_ID = null;
                                }
                                else
                                {
                                    var Def_Sequence_ID = defseqmaster.Def_Sequence_ID;
                                }
                                if(posmenuitemmaster)
                                {
                                    posmenuitemmaster.HMSHost_POS_Menu_Item_ID = rows[key]['HMSHost_POS_Menu_Item_ID'];                        
                                    posmenuitemmaster.HMSHost_POS_Menu_Item_Name = rows[key]['HMSHost_POS_Menu_Item_Name']; 
                                    posmenuitemmaster.HMSHost_POS_Menu_Item_Description = rows[key]['HMSHost_POS_Menu_Item_Description'];
                                    posmenuitemmaster.Total_Calories = rows[key]['Total_Calories'];
                                    posmenuitemmaster.POS_Category_ID = menucategory.POS_Category_ID;   
                                    posmenuitemmaster.HMSHost_Store_ID = storemaster.Store_ID;
                                    posmenuitemmaster.HMSHost_Def_Sequence_ID = Def_Sequence_ID; 
                                    await posmenuitemmaster.save();
                                }
                                else
                                {
                                    const newposmenuitemmaster = 
                                    {
                                        HMSHost_POS_Menu_Item_ID :rows[key]['HMSHost_POS_Menu_Item_ID'],
                                        HMSHost_POS_Menu_Item_Name :rows[key]['HMSHost_POS_Menu_Item_Name'],
                                        HMSHost_POS_Menu_Item_Description :rows[key]['HMSHost_POS_Menu_Item_Description'],
                                        Total_Calories :rows[key]['Total_Calories'],
                                        POS_Category_ID :menucategory.POS_Category_ID,
                                        HMSHost_Store_ID: storemaster.Store_ID,
                                        HMSHost_Def_Sequence_ID :Def_Sequence_ID,
                                        ipAddress:clientIp,
                                        status:"Active"
                                    }
                                    await PosMenuItemMaster.create(newposmenuitemmaster)                    
                                }
                    }
                }
            } 
            else if(file.SheetNames[i] == 'HMSHost_Standardized_Menu_Categ')
            {
                //zipcode.GlobalZipCodeMaster(temp,clientIp);
                for(var key in rows)
                {
                    if(rows[key] != [])
                            {
                                var familygroupmaster = await FamilyGroupMaster.findOne({where:{Family_Group_Category_Name:rows[key]['Family_Group_ID']}});
                                var standardizedmenucategorymaster = await StandardizedMenuCategoryMaster.findOne({where:{HMSHost_Standardized_Menu_Category_name:rows[key]['HMSHost_Standardized_Menu_Category_name'],Family_Group_ID:familygroupmaster.Family_Group_ID}});
                                if(standardizedmenucategorymaster)
                                {
                                    standardizedmenucategorymaster.HMSHost_Standardized_Menu_Category_name = rows[key]['POS_Subcategory_Name']; 
                                    standardizedmenucategorymaster.Family_Group_ID = familygroupmaster.Family_Group_ID;
                                    standardizedmenucategorymaster.HMSHost_Standardized_Menu_Category_Description = rows[key]['HMSHost_Standardized_Menu_Category_Description'];  
                                    await standardizedmenucategorymaster.save();
                                }
                                else
                                {
                                    const newstandardizedmenucategorymaster = 
                                    {
                                        HMSHost_Standardized_Menu_Category_name :rows[key]['HMSHost_Standardized_Menu_Category_name'],
                                        Family_Group_ID :familygroupmaster.Family_Group_ID,
                                        HMSHost_Standardized_Menu_Category_Description: rows[key]['HMSHost_Standardized_Menu_Category_Description'],
                                        ipAddress:clientIp,
                                        status:"Active"
                                    }
                                    await StandardizedMenuCategoryMaster.create(newstandardizedmenucategorymaster)                    
                                }
                    }
                }
            }  
            else if(file.SheetNames[i] == 'HMSHost_Menu_data')
            {
                for(var key in rows)
                {
                    if(rows[key] != [])
                            {
                if(rows[key]['Batch_ID'] == undefined)
                {
                    rows[key]['Batch_ID'] = null;
                }
                if(rows[key]['Transaction_ID'] == undefined)
                {
                    rows[key]['Transaction_ID'] = null;
                }
                if(rows[key]['Airport_Name'] == undefined)
                {
                    rows[key]['Airport_Name'] = null;
                }
                if(rows[key]['Department_ID'] == undefined)
                {
                    rows[key]['Department_ID'] = null;
                }
                if(rows[key]['HMSHost_Store_ID'] == undefined)
                {
                    rows[key]['HMSHost_Store_ID'] = null;
                }
                if(rows[key]['Micro_Location_ID'] == undefined)
                {
                    rows[key]['Micro_Location_ID'] = null;
                }
                if(rows[key]['POS_Menu_Item_ID'] == undefined)
                {
                    rows[key]['POS_Menu_Item_ID'] = null;
                }
                if(rows[key]['Def_Sequence_ID'] == undefined)
                {
                    rows[key]['Def_Sequence_ID'] = null;
                }
                if(rows[key]['POS_Category_ID'] == undefined)
                {
                    rows[key]['POS_Category_ID'] = null;
                }
                if(rows[key]['POS_Subcategory_ID'] == undefined)
                {
                    rows[key]['POS_Subcategory_ID'] = null;
                }
                if(rows[key]['HMSHost_Menu_Item_ID'] == undefined)
                {
                    rows[key]['HMSHost_Menu_Item_ID'] = null;
                }
                if(rows[key]['HMSHost_Standardized_Menu_Category_ID'] == undefined)
                {
                    rows[key]['HMSHost_Standardized_Menu_Category_ID'] = null;
                }
                var airlocation = await Airlocation.findOne({where:{Airport_Name:rows[key]['Airport_Name']}});
                if(airlocation === null){
                     var Airport_Location_ID = null;
                }
                else
                {
                    var Airport_Location_ID = airlocation.Airport_Location_ID;
                }
                var departmentmaster = await DepartmentMaster.findOne({where:{Department_Value:rows[key]['Department_ID']}})
                if(departmentmaster === null)
                {
                    var Department_ID = null;
               }
               else
               {
                   var Department_ID = departmentmaster.Department_ID;
               }
               var microlocation = await MicroLocation.findOne({where:{Micro_Location_Value:rows[key]['Micro_Location_ID']}})
               if(microlocation === null){
                    var Micro_Location_ID = null;
               }
               else
               {
                     var Micro_Location_ID = microlocation.Micro_Location_ID;
               }
               var defseqmaster = await DefSeqMaster.findOne({where:{Def_Sequence_Value:rows[key]['Def_Sequence_ID']}});
               if(defseqmaster === null){
                   var Def_Sequence_ID = null;
               }
               else
               {
                   var Def_Sequence_ID = defseqmaster.Def_Sequence_ID;
               }
               var storemaster = await StoreMaster.findOne({where:{Store_Name:rows[key]['HMSHost_Store_ID']}});
               if(storemaster === null){
                   var HMSHost_Store_ID = null;
                }
                else
                {
                    var HMSHost_Store_ID = storemaster.Store_ID;
                }
                var menucategory = await POSmenucategory.findOne({where:{POS_Category_Name:rows[key]['POS_Category_ID']}});
                if(menucategory === null){
                    var POS_Category_ID = null;
                 }
                 else
                 {
                     var POS_Category_ID = menucategory.POS_Category_ID;
                 }
                 var subcategory = await POSMenuSubCategory.findOne({where:{POS_Subcategory_Name:rows[key]['POS_Subcategory_ID']}})
                 if(subcategory === null){
                    var POS_Subcategory_ID = null;
                 }
                 else
                 {
                     var POS_Subcategory_ID = subcategory.POS_Subcategory_ID;
                 }
                 var standardizedMenucategorymaster = await StandardizedMenuCategoryMaster.findOne({where:{HMSHost_Standardized_Menu_Category_name:rows[key]['HMSHost_Standardized_Menu_Category_ID']}})
                 if(standardizedMenucategorymaster === null){
                    var HMSHost_Standardized_Menu_Category_ID = null;
                 }
                 else
                 {
                     var HMSHost_Standardized_Menu_Category_ID = standardizedMenucategorymaster.HMSHost_Standardized_Menu_Category_ID;
                 }
                                const newmenudata =
                {
                                    Lookup_Value:rows[key]['Lookup_Value'],                                   
                                    Batch_ID:rows[key]['Batch_ID'],
                                    Transaction_ID:rows[key]['Transaction_ID'],
                                    Airport_Location_ID:Airport_Location_ID,
                                    Department_ID:Department_ID,
                                    HMSHost_Store_ID:HMSHost_Store_ID,
                                    Micro_Location_ID:Micro_Location_ID,
                                    POS_Menu_Item_ID:rows[key]['POS_Menu_Item_ID'],
                                    Def_Sequence_ID:Def_Sequence_ID,
                                    POS_Price:rows[key]['POS_Price'],                                    
                                    POS_Category_ID:POS_Category_ID,
                                    POS_Subcategory_ID:POS_Subcategory_ID,
                                    Calories:rows[key]['Calories'],
                                    Note:rows[key]['Note'],
                                    HMSHost_Menu_Item_ID:rows[key]['HMSHost_Menu_Item_ID'],
                                    HMSHost_Current_Price:rows[key]['HMSHost_Current_Price'],
                                    HMSHost_Standardized_Menu_Category_ID:HMSHost_Standardized_Menu_Category_ID,
                                    Annualized_QTY_Sold:rows[key]['Annualized_QTY_Sold'],
                                    ipAddress:clientIp,
                                    Status:"Active"
                                }
                                await MenuData.create(newmenudata) 
                    }
                }          
            }     
            
        }
        res.json({"status":"Success","message":"masters List"});
    }
}
exports.ThirdTransactionTable = async(req,res)=>{
    var clientIp = requestIp.getClientIp(req); 
    if (req.file == undefined) 
    {
       res.json({"Status":"Fail","message":"Please upload an excel file!"});
    }
    else
    {
        let path = 'uploads/'+req.file.filename;
        var data = [];
        var file = reader.readFile(path);
        const sheets = file.SheetNames
        //console.log(sheets);
        
        for(let i = 0; i < sheets.length; i++)
        {
            var rows = reader.utils.sheet_to_json(
                    file.Sheets[file.SheetNames[i]])
           if(file.SheetNames[i] == 'Global_Zip_Code_Master')
          {
                        //zipcode.GlobalZipCodeMaster(temp,clientIp);
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
           else  if(file.SheetNames[i] == 'Global_City_Master')
                    {
                       // city.GlobalCityMaster(temp,clientIp);
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
            else if(file.SheetNames[i] == 'Comp_Store_Alcohol_status_Maste')
            {
                for(var key in rows)
                    {
                        if(rows[key] != [])
                        {
                            var storeasmasters = await StoreASMaster.findOne({where:{Alcohol_status:rows[key]['Alcohol_status']}});
                            if(storeasmasters)
                            {
                                storeasmasters.Alcohol_status = rows[key]['Alcohol_status']; 
                                storeasmasters.Alcohol_status_value = rows[key]['Alcohol_status_value'];  
                                await storeasmasters.save();
                            }
                            else
                            {
                                const newstoreasmasters = 
                                {
                                    Alcohol_status :rows[key]['Alcohol_status'],
                                    Alcohol_status_value: rows[key]['Alcohol_status_value'],
                                    ipAddress:clientIp,
                                    status:"Active"
                                }
                                await StoreASMaster.create(newstoreasmasters)                    
                            }
                        }
                }
            }
            else if(file.SheetNames[i] == 'Comp_Store_Waiter_service_Maste'){
                for(var key in rows)
                   {
                       if(rows[key] != [])
                       {
                           var storewaiterservicemaster = await StoreWSMaster.findOne({where:{Waiter_service_status:rows[key]['Waiter_service_status']}});
                           if(storewaiterservicemaster)
                           {
                               storewaiterservicemaster.Waiter_service_status = rows[key]['Waiter_service_status']; 
                               storewaiterservicemaster.Waiter_service_Value = rows[key]['Waiter_service_Value'];  
                               await storewaiterservicemaster.save();
                           }
                           else
                           {
                               const newstorewaitermaster = 
                               {
                                   Waiter_service_status :rows[key]['Waiter_service_status'],
                                   Waiter_service_Value: rows[key]['Waiter_service_Value'],
                                   ipAddress:clientIp,
                                   status:"Active"
                               }
                               await StoreWSMaster.create(newstorewaitermaster)                    
                           }
                       }
                   }

            } 
            else if(file.SheetNames[i] == 'Comp_Store_Takeout_Master'){
            for(var key in rows)
            {
                if(rows[key] != [])
                {
                    var storetakeoutmaster = await StoreTOMaster.findOne({where:{Takeout_status:rows[key]['Takeout_status']}});
                    if(storetakeoutmaster)
                    {
                        storetakeoutmaster.Takeout_status = rows[key]['Takeout_status']; 
                        storetakeoutmaster.Takeout_value = rows[key]['Takeout_value'];  
                        await storetakeoutmaster.save();
                    }
                    else
                    {
                        const newtakeoutmaster = 
                        {
                            Takeout_status :rows[key]['Takeout_status'],
                            Takeout_value: rows[key]['Takeout_value'],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await StoreTOMaster.create(newtakeoutmaster)                    
                    }
                }
            }
            } 
            else if(file.SheetNames[i] == 'Comp_Store_Style_Master'){
                for(var key in rows)
                {
                    if(rows[key] != [])
                    {
                        var storestylemaster = await StoreStyleMaster.findOne({where:{Comp_Store_Style_Name:rows[key]['Comp_Store_Style_Name']}});
                        if(storestylemaster)
                        {
                            storestylemaster.Comp_Store_Style_Name = rows[key]['Comp_Store_Style_Name']; 
                            storestylemaster.Comp_Store_Style_Description = rows[key]['Comp_Store_Style_Description'];  
                            await storestylemaster.save();
                        }
                        else
                        {
                            const newstorestylemaster = 
                            {
                                Comp_Store_Style_Name :rows[key]['Comp_Store_Style_Name'],
                                Comp_Store_Style_Description: rows[key]['Comp_Store_Style_Description'],
                                ipAddress:clientIp,
                                status:"Active"
                            }
                            await StoreStyleMaster.create(newstorestylemaster)                    
                        }
                    }
                }
            }
            else if(file.SheetNames[i] == 'Comp_Store_Price_Segment_Master'){
                for(var key in rows)
                {
                    if(rows[key] != [])
                    {
                        var storepricesegmentmaster = await StorePriceSegmentMaster.findOne({where:{Comp_Store_Price_Segment_Value:rows[key]['Comp_Store_Price_Segment_Value']}});
                        if(storepricesegmentmaster)
                        {
                            storepricesegmentmaster.Comp_Store_Price_Segment_Value = rows[key]['Comp_Store_Price_Segment_Value']; 
                            storepricesegmentmaster.Comp_Store_Price_Segment_description = rows[key]['Comp_Store_Price_Segment_Value'];  
                            await storepricesegmentmaster.save();
                        }
                        else
                        {
                            const newstorepricesegmentmaster = 
                            {
                                Comp_Store_Price_Segment_Value :rows[key]['Comp_Store_Price_Segment_Value'],
                                Comp_Store_Price_Segment_description: rows[key]['Comp_Store_Price_Segment_Value'],
                                ipAddress:clientIp,
                                status:"Active"
                            }
                            await StorePriceSegmentMaster.create(newstorepricesegmentmaster)                    
                        }
                    }
                }
            }
            else if (file.SheetNames[i] == 'Comp_Store_Caters_Master'){
                for(var key in rows)
                {
                    if(rows[key] != [])
                    {
                        var storecatersmaster = await StoreCatersMaster.findOne({where:{Caters_status:rows[key]['Caters_status']}});
                        if(storecatersmaster)
                        {
                            storecatersmaster.Caters_status = rows[key]['Caters_status']; 
                            storecatersmaster.Caters_Value = rows[key]['Caters_Value']; 
                            await storecatersmaster.save();
                        }
                        else
                        {
                            const newstorecatermaster = 
                            {
                                Caters_status : rows[key]['Caters_status'],
                                Caters_Value : rows[key]['Caters_Value'],
                                ipAddress:clientIp,
                                status:"Active"
                            }
                            await StoreCatersMaster.create(newstorecatermaster)                    
                        }
                    }
                }
            }            
            else if(file.SheetNames[i] == 'Comp_Store_Restaurant_Master'){
                for(var key in rows)
                {
                    if(rows[key] != [])
                    {
                        var storerestaurantmaster = await StoreRestMaster.findOne({where:{Comp_Store_Restaurant_Object_Key:rows[key]['Comp_Store_Restaurant_Object_Key']}});
                        if(storerestaurantmaster)
                        {
                           
                            storerestaurantmaster.Comp_Store_Restaurant_Object_Key = rows[key]['Comp_Store_Restaurant_Object_Key']; 
                            storerestaurantmaster.Comp_Store_Restaurant_name = rows[key]['Comp_Store_Restaurant_name']; 
                            storerestaurantmaster.Address = rows[key]['Address']; 
                            storerestaurantmaster.Restaurant_URL = rows[key]['Restaurant_URL']; 
                            storerestaurantmaster.Phone_Number = rows[key]['Phone_Number']; 
                            await storerestaurantmaster.save();
                        }
                        else
                        {
                            const newstorerestmaster = 
                            {                           
                                Comp_Store_Restaurant_Object_Key : rows[key]['Comp_Store_Restaurant_Object_Key'], 
                                Comp_Store_Restaurant_name : rows[key]['Comp_Store_Restaurant_name'], 
                                Address : rows[key]['Address'],
                                Restaurant_URL : rows[key]['Restaurant_URL'], 
                                Phone_Number : rows[key]['Phone_Number'],
                                ipAddress:clientIp,
                                status:"Active"
                            }
                            await StoreRestMaster.create(newstorerestmaster)                    
                        }
                    }
                }
            }
            else if (file.SheetNames[i] == 'Comp_Store_Menu_Name_Master'){
                for(var key in rows)
                {
                    if(rows[key] != [])
                            {
                                if(rows[key]['Comp_Store_Restaurant_ID'] == undefined){
                                    rows[key]['Comp_Store_Restaurant_ID'] = null;
                                }
                                var storerestaurantmaster = await StoreRestMaster.findOne({where:{Comp_Store_Restaurant_name:rows[key]['Comp_Store_Restaurant_ID']}});
                                if(storerestaurantmaster == null){
                                    var Comp_Store_Restaurant_ID = null;
                                }
                                else{
                                    var Comp_Store_Restaurant_ID = storerestaurantmaster.Comp_Store_Restaurant_ID
                                }
                                var compstoremenunamemaster = await CompStoreMenuNameMaster.findOne({where:{Comp_Store_Menu_Object_key:rows[key]['Comp_Store_Menu_Object_key']}});
                                
                                if(compstoremenunamemaster)
                                {
                                    compstoremenunamemaster.Comp_Store_Restaurant_ID = Comp_Store_Restaurant_ID;                        
                                    compstoremenunamemaster.Comp_Store_Menu_Name = rows[key]['Comp_Store_Menu_Name']; 
                                    compstoremenunamemaster.Description = rows[key]['Description'];
                                    compstoremenunamemaster.Comp_Store_Menu_Object_key = rows[key]['Comp_Store_Menu_Object_key'];
                                    await compstoremenunamemaster.save();
                                }
                                else
                                {
                                    const newcompstoremenunamemaster = 
                                    {
                                        Comp_Store_Restaurant_ID :Comp_Store_Restaurant_ID,
                                        Comp_Store_Menu_Name :rows[key]['Comp_Store_Menu_Name'],
                                        Description :rows[key]['Description'],
                                        Comp_Store_Menu_Object_key :rows[key]['Comp_Store_Menu_Object_key'],
                                        ipAddress:clientIp,
                                        status:"Active"
                                    }
                                    await CompStoreMenuNameMaster.create(newcompstoremenunamemaster)                    
                                }
                    }
                }
            }           
            else if(file.SheetNames[i] == 'Comp_Store_Section_Master'){
                for(var key in rows)
                {
                    if(rows[key] != [])
                    {
                        var storesectionmaster = await StoreSectionMaster.findOne({where:{Comp_Store_Section_Name:rows[key]['Comp_Store_Section_Name']}});
                        if(storesectionmaster)
                        {
                            storesectionmaster.Comp_Store_Section_Name = rows[key]['Comp_Store_Section_Name']; 
                            storesectionmaster.Comp_Store_Section_Description = rows[key]['Comp_Store_Section_Description'];  
                            await storesectionmaster.save();
                        }
                        else
                        {
                            const newstoresectionmaster = 
                            {
                                Comp_Store_Section_Name :rows[key]['Comp_Store_Section_Name'],
                                Comp_Store_Section_Description: rows[key]['Comp_Store_Section_Description'],
                                ipAddress:clientIp,
                                status:"Active"
                            }
                            await StoreSectionMaster.create(newstoresectionmaster)                    
                        }
                    }
                }
            }
            else if(file.SheetNames[i] == 'Comp_Store_Standardized_Menu_Ca')
            {
                for(var key in rows)
                {
                    if(rows[key] != [])
                            {
                                if(rows[key]['Family_Group_ID'] == undefined){
                                    rows[key]['Family_Group_ID'] = null;
                                }

                                var familygroupmaster = await FamilyGroupMaster.findOne({where:{Family_Group_Category_Name:rows[key]['Family_Group_ID']}})
                                if(familygroupmaster == null){
                                    var Family_Group_ID = null;
                                }
                                else
                                {
                                    var Family_Group_ID = familygroupmaster.Family_Group_ID;
                                }
                                console.log(Family_Group_ID);
                                if(rows[key]['Comp_Store_Section_ID'] == undefined){
                                    rows[key]['Comp_Store_Section_ID'] = null;
                                }
                                var storesectionmaster = await StoreSectionMaster.findOne({where:{Comp_Store_Section_Name:rows[key]['Comp_Store_Section_ID']}});
                                
                                if(storesectionmaster == null){
                                    var Comp_Store_Section_ID = null;
                                }
                                else
                                {
                                    var Comp_Store_Section_ID = storesectionmaster.Comp_Store_Section_ID;
                                }
                                var compstandardmenucategorymaster = await CompStandardizedMenuCategoryMaster.findOne({where:{Comp_Store_Standardized_Menu_Categories_Lookup:rows[key]['Comp_Store_Standardized_Menu_Categories_Lookup']}});
                                if(compstandardmenucategorymaster)
                                {
                                    compstandardmenucategorymaster.Family_Group_ID = Family_Group_ID;                        
                                    compstandardmenucategorymaster.Comp_Store_Standardized_Menu_Categories_Lookup = rows[key]['Comp_Store_Standardized_Menu_Categories_Lookup']; 
                                    compstandardmenucategorymaster.Comp_Store_Section_ID = Comp_Store_Section_ID;
                                    await compstandardmenucategorymaster.save();
                                }
                                else
                                {
                                    const newcompstandardmenucategorymaster = 
                                    {
                                        Family_Group_ID :Family_Group_ID,
                                        Comp_Store_Standardized_Menu_Categories_Lookup :rows[key]['Comp_Store_Standardized_Menu_Categories_Lookup'],
                                        Comp_Store_Section_ID :Comp_Store_Section_ID,
                                        ipAddress:clientIp,
                                        status:"Active"
                                    }
                                    await CompStandardizedMenuCategoryMaster.create(newcompstandardmenucategorymaster)                    
                                }
                    }
                }
            } 
            else if(file.SheetNames[i] == 'Comp_Store_Restaurant_Data'){
                for(var key in rows){
                    if(rows[key] != []){
                        if(rows[key]['Airport_Location_ID'] == undefined)
                                {
                                    rows[key]['Airport_Location_ID'] = null;
                                }
                                if(rows[key]['Comp_Store_Restaurant_ID'] == undefined)
                                {
                                    rows[key]['Comp_Store_Restaurant_ID'] = null;
                                }
                                if(rows[key]['City_ID'] == undefined)
                                {
                                    rows[key]['City_ID'] = null;
                                }
                                if(rows[key]['State_ID'] == undefined)
                                {
                                    rows[key]['State_ID'] = null;
                                }
                                if(rows[key]['Zip_Code_ID'] == undefined)
                                {
                                    rows[key]['Zip_Code_ID'] = null;
                                }
                                if(rows[key]['Comp_Store_Style_ID'] == undefined)
                                {
                                    rows[key]['Comp_Store_Style_ID'] = null;
                                }
                                if(rows[key]['Comp_Store_Price_Segment_ID'] == undefined)
                                {
                                    rows[key]['Comp_Store_Price_Segment_ID'] = null;
                                }
                                if(rows[key]['Alcohol_Status_ID'] == undefined)
                                {
                                    rows[key]['Alcohol_Status_ID'] = null;
                                }
                                if(rows[key]['Takeout_ID'] == undefined)
                                {
                                    rows[key]['Takeout_ID'] = null;
                                }
                                if(rows[key]['Waiter_service_ID'] == undefined)
                                {
                                    rows[key]['Waiter_service_ID'] = null;
                                }
                                if(rows[key]['Caters_ID'] == undefined)
                                {
                                    rows[key]['Caters_ID'] = null;
                                }
                                var airlocation = await Airlocation.findOne({where:{Airport_Name:rows[key]['Airport_Location_ID']}});
                                if(airlocation === null){
                                     var Airport_Location_ID = null;
                                }
                                else
                                {
                                    var Airport_Location_ID = airlocation.Airport_Location_ID;
                                }     
                                var restaurant = await StoreRestMaster.findOne({where:{Comp_Store_Restaurant_name:rows[key]['Comp_Store_Restaurant_ID']}})
                                if(restaurant == null){
                                    var newComp_Store_Restaurant_ID = null;
                                }
                                else
                                {
                                    var newComp_Store_Restaurant_ID = restaurant.Comp_Store_Restaurant_ID;
                                }
                                var city = await City.findOne({where:{City_Name:rows[key]['City_ID']}});
                                if(city == null){
                                    var City_ID = null;
                                }
                                else{
                                    var City_ID = city.City_ID;
                                }
                                var state = await State.findOne({where:{State_Name:rows[key]['State_ID']}});
                                if(state == null){
                                    var State_ID = null;
                                }
                                else
                                {
                                    var State_ID = state.State_ID;
                                }
                                var zipcode = await ZipCode.findOne({where:{Zip_Code_Value:rows[key]['Zip_Code_ID']}});
                                if(zipcode == null){
                                    var Zip_Code_ID = null;
                                }
                                else
                                {
                                    var Zip_Code_ID = zipcode.Zip_Code_ID;
                                }
                                var storestyle = await StoreStyleMaster.findOne({where:{Comp_Store_Style_Name:rows[key]['Comp_Store_Style_ID']}});
                                if(storestyle == null){
                                    var Comp_Store_Style_ID = null;
                                }
                                else{
                                    var  Comp_Store_Style_ID = storestyle.Comp_Store_Style_ID;
                                }
                                var pricesegment = await StorePriceSegmentMaster.findOne({where:{Comp_Store_Price_Segment_Value:rows[key]['Comp_Store_Price_Segment_ID']}});
                                if(pricesegment == null){
                                   var Comp_Store_Price_Segment_ID = null;
                                }
                                else{
                                   var Comp_Store_Price_Segment_ID = pricesegment.Comp_Store_Price_Segment_ID;
                                }
                                var alcoholstatus = await StoreASMaster.findOne({where:{Alcohol_status:rows[key]['Alcohol_Status_ID']}});
                                if(alcoholstatus == null){
                                   var  Alcohol_Status_ID = null;
                                }
                                else{
                                    var Alcohol_Status_ID = alcoholstatus.Alcohol_Status_ID;
                                }
                                var takeoutstatus = await StoreTOMaster.findOne({where:{Takeout_status:rows[key]['Takeout_ID']}});
                                if(takeoutstatus == null){
                                    var  Takeout_ID = null;
                                 }
                                 else{
                                     var Takeout_ID = takeoutstatus.Alcohol_Status_ID;
                                 }
                                 var waiterservice = await StoreWSMaster.findOne({where:{Waiter_service_status:rows[key]['Waiter_service_ID']}});
                                 if(waiterservice == null){
                                    var  Waiter_service_ID = null;
                                 }
                                 else{
                                     var Waiter_service_ID = waiterservice.Alcohol_Status_ID;
                                 }
                                 var caters = await StoreCatersMaster.findOne({where:{Caters_status:rows[key]['Caters_ID']}});
                                 if(caters == null){
                                    var  Caters_ID = null;
                                 }
                                 else{
                                     var Caters_ID = caters.Caters_ID;
                                 }
                                
                                 const newrestdata =
                                 {
                                                     Airport_Location_ID:Airport_Location_ID,
                                                     Comp_Store_Restaurant_ID:newComp_Store_Restaurant_ID,
                                                     City_ID:City_ID,
                                                     State_ID:State_ID,
                                                     Zip_Code_ID:Zip_Code_ID,
                                                     Comp_Store_Style_ID:Comp_Store_Style_ID,
                                                     Comp_Store_Price_Segment_ID:Comp_Store_Price_Segment_ID,                                    
                                                     Alcohol_Status_ID:Alcohol_Status_ID,
                                                     Takeout_ID:Takeout_ID,
                                                     Waiter_service_ID:Waiter_service_ID,
                                                     Caters_ID:Caters_ID,
                                                     Rating_Value:rows[key]['Rating_Value'],
                                                     Review_Count:rows[key]['Review_Count'],
                                                     Max_Rating_Value:rows[key]['Max_Rating_Value'],                                                    
                                                     Restaurant_Robot_Name:rows[key]['Restaurant_Robot_Name'],
                                                     Restaurant_Execution_Id:rows[key]['Restaurant_Execution_Id'],
                                                     Restaurant_First_Extracted:rows[key]['Restaurant_First_Extracted'],
                                                     Restaurant_Last_Extracted:rows[key]['Restaurant_Last_Extracted'],                                                    
                                                     Restaurant_Extracted_In_Last_Run:rows[key]['Restaurant_Extracted_In_Last_Run'],
                                                     Restaurant_Last_Updated:rows[key]['Restaurant_Last_Updated'],                                                    
                                                     Mileage_Calculation:rows[key]['Mileage_Calculation'],                                                     
                                                     ipAddress:clientIp,
                                                     Status:"Active"
                                                 }
                                                 await CompRestData.create(newrestdata) 
                   
                    }
                }
            }   
        }
        res.json({"status":"Success","message":"masters List"});
    }
}
exports.LastTransactionTable = async(req,res)=>{
    var clientIp = requestIp.getClientIp(req); 
    if (req.file == undefined) 
    {
       res.json({"Status":"Fail","message":"Please upload an excel file!"});
    }
    else
    {
        let path = 'uploads/'+req.file.filename;
        var data = [];
        var file = reader.readFile(path);
        const sheets = file.SheetNames
        //console.log(sheets);
        
        for(let i = 0; i < sheets.length; i++)
        {
            var rows = reader.utils.sheet_to_json(
                    file.Sheets[file.SheetNames[i]])
            if(file.SheetNames[i] == 'Comp_Store_Menu_Data'){
                var alldata = [];
                for(var key in rows){
                            if(rows[key] != []){
                                if(rows[key]['Airport_Location_ID'] == undefined)
                                        {
                                            rows[key]['Airport_Location_ID'] = null;
                                        }
                                        if(rows[key]['Comp_Store_Restaurant_ID'] == undefined)
                                        {
                                            rows[key]['Comp_Store_Restaurant_ID'] = null;
                                        }
                                        if(rows[key]['Comp_Store_menu_Object_key'] == undefined)
                                        {
                                            rows[key]['Comp_Store_menu_Object_key'] = null;
                                        }
                                       
                                        if(rows[key]['Comp_Store_Section_ID'] == undefined)
                                        {
                                            rows[key]['Comp_Store_Section_ID'] = null;
                                        }
                                        if(rows[key]['Comp_Store_Menu_Item_ID'] == undefined)
                                        {
                                            rows[key]['Comp_Store_Menu_Item_ID'] = null;
                                        }
                                        if(rows[key]['Comp_Store_Standardized_Menu_Category_ID'] == undefined)
                                        {
                                            rows[key]['Comp_Store_Standardized_Menu_Category_ID'] = null;
                                        }
                                        var airlocation = await Airlocation.findOne({where:{Airport_Name:rows[key]['Airport_Location_ID']}});
                                        if(airlocation === null){
                                             var Airport_Location_ID = null;
                                        }
                                        else
                                        {
                                            var Airport_Location_ID = airlocation.Airport_Location_ID;
                                        }     
                                        var restaurant = await StoreRestMaster.findOne({where:{Comp_Store_Restaurant_name:rows[key]['Comp_Store_Restaurant_ID']}})
                                        if(restaurant == null){
                                            var newComp_Store_Restaurant_ID = null;
                                        }
                                        else
                                        {
                                            var newComp_Store_Restaurant_ID = restaurant.Comp_Store_Restaurant_ID;
                                        }
                                        var compstoremenunamemaster = await CompStoreMenuNameMaster.findOne({where:{Comp_Store_Menu_Object_key:rows[key]['Comp_Store_menu_Object_key']}})
                                        //console.log(compstoremenunamemaster);                                        
                                        if(compstoremenunamemaster == null){
                                            var Comp_Store_Menu_Name_ID = null;
                                        }
                                        else
                                        {
                                            var Comp_Store_Menu_Name_ID = compstoremenunamemaster.Comp_Store_Menu_Name_ID;
                                        }
                                        var storesectionmaster = await StoreSectionMaster.findOne({where:{Comp_Store_Section_Name:rows[key]['Comp_Store_Section_ID']}});
                                        if(storesectionmaster == null){
                                            var Comp_Store_Section_ID = null;
                                        }
                                        else
                                        {
                                            var Comp_Store_Section_ID = storesectionmaster.Comp_Store_Section_ID;
                                        }                                        
                                        var comstorestanmenucategories = await CompStandardizedMenuCategoryMaster.findOne({where:{Comp_Store_Standardized_Menu_Categories_Lookup:rows[key]['Comp_Store_Standardized_Menu_Category_ID']}})
                                        if(comstorestanmenucategories == null){
                                            var Comp_Store_Standardized_Menu_Category_ID = null;
                                        }
                                        else
                                        {
                                            var Comp_Store_Standardized_Menu_Category_ID = comstorestanmenucategories.Comp_Store_Standardized_Menu_Category_ID;
                                        }
                                        const newrestdata =
                                         {
                                                             Airport_Location_ID:Airport_Location_ID,
                                                             Comp_Store_Restaurant_ID:newComp_Store_Restaurant_ID,
                                                             Comp_Store_Menu_Name_ID:Comp_Store_Menu_Name_ID,
                                                             Comp_Store_Section_ID:Comp_Store_Section_ID,
                                                             Comp_Store_Standardized_Menu_Category_ID:Comp_Store_Standardized_Menu_Category_ID,
                                                             Comp_Store_Menu_Item_ID:rows[key]['Comp_Store_Menu_Item_ID'],
                                                             Comp_Store_Menu_Item_Name:rows[key]['Comp_Store_Menu_Item_Name'],
                                                             Comp_Store_Menu_Item_Description:rows[key]['Comp_Store_Menu_Item_Description'],                                                    
                                                             Comp_Store_Price:rows[key]['Comp_Store_Price'],                              
                                                             ipAddress:clientIp,
                                                             Status:"Active"
                                    }
                                    alldata.push(newrestdata)
                                                         
                            }
                }
                await CompMenudata.bulkCreate(alldata);                          
            }      
        }
        res.json({"status":"Success","message":"masters List"});
    }
}
async function Pricing_Model_Name_Match_Range(rows,clientIp){
    for(var key in rows)
    {
        if(rows[key] != [])
        {
           
                const newpricenamematchrangemaster = 
                {
                    Name_Match_Description :rows[key]['Name_Match_Description'],
                    Name_Match_Percentage: rows[key]['Name_Match_Percentage'],
                    Name_Weightage_Percentage: rows[key]['Name_Weightage_Percentage'],
                    ipAddress:clientIp,
                    status:"Active"
                }
                await PriceNameMatchRangeMaster.create(newpricenamematchrangemaster)                    
            
        }
    }
}
async function Pricing_Model_Veggie_Master(rows,clientIp){
    for(var key in rows)
    {
        if(rows[key] != [])
        {
            var pricingmodelveggiemaster = await PricingModelVeggieMaster.findOne({where:{Veggie_Name:rows[key]['Veggie_Name']}});
            if(pricingmodelveggiemaster)
            {
                pricingmodelveggiemaster.Veggie_Name = rows[key]['Veggie_Name']; 
                pricingmodelveggiemaster.Alias_Name = rows[key]['Alias_Name'];  
                await pricingmodelveggiemaster.save();
            }
            else
            {
                const newpricingmodelveggiemaster = 
                {
                    Veggie_Name :rows[key]['Veggie_Name'],
                    Alias_Name: rows[key]['Alias_Name'],
                    ipAddress:clientIp,
                    status:"Active"
                }
                await PricingModelVeggieMaster.create(newpricingmodelveggiemaster)                    
            }
        }
    }
}

async function Pricing_Model_Menu_Item_Score_B(rows,clientIp){
    for(var key in rows)
    {
        if(rows[key] != [])
        {
            
                const newmenuitemscorebreakdownmaster = 
                {
                    Menu_Item_Breakdown_Name :rows[key]['Menu_Item_Breakdown_Name'],
                    Menu_Item_position_Value: rows[key]['Menu_Item_position_Value'],
                    Breakdown_score: rows[key]['Breakdown_score'],
                    Breakdown_description: rows[key]['Breakdown_description'],
                    ipAddress:clientIp,
                    status:"Active"
                }
                await PriceMenuItemScoreBreakDownMaster.create(newmenuitemscorebreakdownmaster)                    
            
        }
    }
}
async function Pricing_Model_Match_Quality_Sco(rows,clientIp){
    for(var key in rows)
    {
        if(rows[key] != [])
        {
            var pricingmodelmatchqualityscoremaster = await PricingModelMatchQualityScoreMaster.findOne({where:{Match_Quality_Score_Name:rows[key]['Match_Quality_Score_Name']}});
            if(pricingmodelmatchqualityscoremaster)
            {
                pricingmodelmatchqualityscoremaster.Match_Quality_Score_Name = rows[key]['Match_Quality_Score_Name']; 
                pricingmodelmatchqualityscoremaster.Match_Quality_Score_value = rows[key]['Match_Quality_Score_value'];  
                await pricingmodelmatchqualityscoremaster.save();
            }
            else
            {
                const newpricingmodelmatchqualityscoremaster = 
                {
                    Match_Quality_Score_Name :rows[key]['Match_Quality_Score_Name'],
                    Match_Quality_Score_value: rows[key]['Match_Quality_Score_value'],
                    ipAddress:clientIp,
                    status:"Active"
                }
                await PricingModelMatchQualityScoreMaster.create(newpricingmodelmatchqualityscoremaster)                    
            }
        }
    }
}
async function Pricing_Model_Ingredient_Match_(rows,clientIp){
    for(var key in rows)
    {
        if(rows[key] != [])
        {
            
                const newpriceingredientmatchrangemaster = 
                {
                    Ingredient_Match_Description :rows[key]['Ingredient_Match_Description'],
                    Ingredient_Match_Percentage: rows[key]['Ingredient_Match_Percentage'],
                    Ingredient_Match_Weightage_Percentage: rows[key]['Ingredient_Match_Weightage_Percentage'],
                    ipAddress:clientIp,
                    status:"Active"
                }
                await PriceIngredientMatchRangeMaster.create(newpriceingredientmatchrangemaster)                    
            
        }
    }
}
async function Pricing_Model_Feature_Match_Ran(rows,clientIp){
   // console.log(rows)
    for(var key in rows)
    {
        if(rows[key] != [])
        {
            
                const newpriceFeaturematchrangemaster = 
                {
                    Feature_Match_Description :rows[key]['Feature_Match_Description'],
                    Feature_Match_Percentage: rows[key]['Feature_Match_Percentage'],
                    Feature_Match_Weightage_Percentage: rows[key]['Feature_Match_Weightage_Percentage'],
                    ipAddress:clientIp,
                    status:"Active"
                }
               // console.log(newpriceFeaturematchrangemaster)
                await PriceFeatureMatchRangeMaster.create(newpriceFeaturematchrangemaster)                    
            
        }
    }
}
async function HMSHostBatchMaster(rows,clientIp){
    //console.log(rows)
    for(var key in rows)
    {
        if(rows[key] != [])
        {
                const newbatchMaster = 
                {
                    Batch_directory_address :rows[key]['Batch_directory_address'],
                    Transaction_Start_Date: Date.now(),
                    Transaction_End_Date:Date.now(),
                    Uploaded_Date:Date.now(),
                    ipAddress:clientIp,
                    status:"Active"
                }
                //console.log(newbatchMaster);
                await BatchMasterNew.create(newbatchMaster);            
        }
    }
}

async function CompStoreStoreRatingRangeMastersModel(rows,clientIp) {
    //console.log(rows);
    for(var key in rows)
            {
                if(rows[key] != [])
                {                   
                        const newstoreratingrangemaster = 
                        {
                            Comp_Store_Rating_Range_start_value :rows[key]['Comp_Store_Rating_Range_start_value'],
                            Comp_Store_Rating_Range_End_Value: rows[key]['Comp_Store_Rating_Range_End_Value'],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await StoreRatingRangeMaster.create(newstoreratingrangemaster)                    
                    
                }
            }
}

async function CompStoreGroupingCountMastersModel(rows,clientIp) {
    //console.log(rows);
    for(var key in rows)
    {
        for(var key in rows)
            {
                if(rows[key] != [])
                {                   
                        const newstoregroupcountmaster = 
                        {
                            Comp_Store_Starting_Group_Number :rows[key]['Comp_Store_Starting_Group_Number'],
                            Comp_Store_Ending_Group_Number: rows[key]['Comp_Store_Ending_Group_Number'],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await StoreGroupCountMaster.create(newstoregroupcountmaster)                    
                    
                }
            }
    }
}
async function ProteinMastersModel(temp,clientIp) {

    
    for(var key in temp)
    {
        if(temp[key] != [])
        {
            var pricingmodelproteinmaster = await PricingModelProteinMaster.findOne({where:{Protein_Name:temp[key]['Protein_Name']}});
            if(pricingmodelproteinmaster)
            {
                pricingmodelproteinmaster.Protein_Name = temp[key]['Protein_Name']; 
                pricingmodelproteinmaster.Alias_Name = temp[key]['Protein_Name'];  
                await pricingmodelproteinmaster.save();
            }
            else
            {
                const newpricingmodelproteinmaster = 
                {
                    Protein_Name :temp[key]['Protein_Name'],
                    Alias_Name: temp[key]['Protein_Name'],
                    ipAddress:clientIp,
                    status:"Active"
                }
                await PricingModelProteinMaster.create(newpricingmodelproteinmaster)                    
            }
        }
    }
}
async function CheeseMastersModel(rows,clientIp) {
    for(var key in rows)
            {
                if(rows[key] != [])
                {
                    var pricingmodelcheesemaster = await PricingModelCheeseMaster.findOne({where:{Cheese_Name:rows[key]['Cheese_Name']}});
                    if(pricingmodelcheesemaster)
                    {
                        pricingmodelcheesemaster.Cheese_Name = rows[key]['Cheese_Name']; 
                        pricingmodelcheesemaster.Alias_Name = rows[key]['Cheese_Name'];  
                        await pricingmodelcheesemaster.save();
                    }
                    else
                    {
                        const newpricingmodelcheesemaster = 
                        {
                            Cheese_Name :rows[key]['Cheese_Name'],
                            Alias_Name: rows[key]['Cheese_Name'],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await PricingModelCheeseMaster.create(newpricingmodelcheesemaster)                    
                    }
                }
            }
}
async function LettuceMastersModel(rows,clientIp) {
    for(var key in rows)
            {
                if(rows[key] != [])
                {
                    var pricingmodelLettucemaster = await PricingModelLettuceMaster.findOne({where:{Lettuce_Name:rows[key]['Lettuce_Name']}});
                    if(pricingmodelLettucemaster)
                    {
                        pricingmodelLettucemaster.Lettuce_Name = rows[key]['Lettuce_Name']; 
                        pricingmodelLettucemaster.Alias_Name = rows[key]['Lettuce_Name'];  
                        await pricingmodelLettucemaster.save();
                    }
                    else
                    {
                        const newpricingmodelLettucemaster = 
                        {
                            Lettuce_Name :rows[key]['Lettuce_Name'],
                            Alias_Name: rows[key]['Lettuce_Name'],
                            ipAddress:clientIp,
                            status:"Active"
                        }
                        await PricingModelLettuceMaster.create(newpricingmodelLettucemaster)                    
                    }
                }
            }
}
async function ModelKeyIngredientMastersModel(rows,clientIp) {
    for(var key in rows)
    {
        if(rows[key] != [])
        {
            var pricingmodelKey_Ingredientmaster = await PricingModelKey_IngredientMaster.findOne({where:{Key_Ingredient_Name:rows[key]['Key_Ingredient_Name']}});
            if(pricingmodelKey_Ingredientmaster)
            {
                pricingmodelKey_Ingredientmaster.Key_Ingredient_Name = rows[key]['Key_Ingredient_Name']; 
                pricingmodelKey_Ingredientmaster.Alias_Name = rows[key]['Key_Ingredient_Name'];  
                await pricingmodelKey_Ingredientmaster.save();
            }
            else
            {
                const newpricingmodelKey_Ingredientmaster = 
                {
                    Key_Ingredient_Name :rows[key]['Key_Ingredient_Name'],
                    Alias_Name: rows[key]['Key_Ingredient_Name'],
                    ipAddress:clientIp,
                    status:"Active"
                }
                await PricingModelKey_IngredientMaster.create(newpricingmodelKey_Ingredientmaster)                    
            }
        }
    }
}

async function ModelKeyFeatureMastersModel(rows,clientIp) {
    for(var key in rows)
    {
        if(rows[key] != [])
        {
            var pricingmodelKey_Featuremaster = await PricingModelKey_FeatureMaster.findOne({where:{Key_Feature_Name:rows[key]['Key_Feature_Name']}});
            if(pricingmodelKey_Featuremaster)
            {
                pricingmodelKey_Featuremaster.Key_Feature_Name = rows[key]['Key_Feature_Name']; 
                pricingmodelKey_Featuremaster.Alias_Name = rows[key]['Key_Feature_Name'];  
                await pricingmodelKey_Featuremaster.save();
            }
            else
            {
                const newpricingmodelKey_Featuremaster = 
                {
                    Key_Feature_Name :rows[key]['Key_Feature_Name'],
                    Alias_Name: rows[key]['Key_Feature_Name'],
                    ipAddress:clientIp,
                    status:"Active"
                }
                await PricingModelKey_FeatureMaster.create(newpricingmodelKey_Featuremaster)                    
            }
        }
    }
}
async function HMSHostProductGroupMaster(rows,clientIp){
    console.log(rows);
    for(var key in rows)
    {
        if(rows[key] != [])
        {
            var productgroupmaster = await ProductGroupMaster.findOne({where:{Product_Group_Name:rows[key]['Product_Group_Name'],Family_Group_ID:rows[key]['Family_Group_ID']}});
            if(productgroupmaster)
            {
                productgroupmaster.Product_Group_Name = rows[key]['Product_Group_Name'];
                productgroupmaster.Family_Group_ID = rows[key]['Family_Group_ID']; 
                productgroupmaster.Major_Group_ID = rows[key]['Major_Group_ID']; 
                await productgroupmaster.save();
            }
            else
            {
                const newproductgroupmaster = 
                {
                    Product_Group_Name :rows[key]['Product_Group_Name'],
                    Family_Group_ID :rows[key]['Family_Group_ID'],
                    Major_Group_ID :rows[key]['Major_Group_ID'],
                    ipAddress:clientIp,
                    status:"Active"
                }
                await ProductGroupMaster.create(newproductgroupmaster)                    
            }
        }
    }
}
async function HMSHostMenuGroup1Master(rows,clientIp){
    for(var key in rows)
    {
        if(rows[key] != [])
        {
            var menu1groupmaster = await Menu1GroupMaster.findOne({where:{Menu_Group1_Name:rows[key]['Menu_Group1_Name'],Product_Group_ID:rows[key]['Product_Group_ID']}});
            if(menu1groupmaster)
            {
                menu1groupmaster.Menu_Group1_Name = rows[key]['Menu_Group1_Name'];
                menu1groupmaster.Product_Group_ID = rows[key]['Product_Group_ID']; 
                await menu1groupmaster.save();
            }
            else
            {
                const newmenu1groupmaster = 
                {
                    Menu_Group1_Name :rows[key]['Menu_Group1_Name'],
                    Product_Group_ID :rows[key]['Product_Group_ID'],
                    ipAddress:clientIp,
                    status:"Active"
                }
                await Menu1GroupMaster.create(newmenu1groupmaster)                    
            }
        }
    }
}
async function HMSHostMenuGroup2Master(rows,clientIp){
    for(var key in rows)
    {
        if(rows[key] != [])
        {
            var menu2groupmaster = await Menu2GroupMaster.findOne({where:{Menu_Group2_Name:rows[key]['Menu_Group2_Name'],Menu_Group1_ID:rows[key]['Menu_Group1_ID']}});
            if(menu2groupmaster)
            {
                menu2groupmaster.Menu_Group2_Name = rows[key]['Menu_Group2_Name'];
                menu2groupmaster.Menu_Group1_ID = rows[key]['Menu_Group1_ID']; 
                await menu2groupmaster.save();
            }
            else
            {
                const newmenu2groupmaster = 
                {
                    Menu_Group2_Name :rows[key]['Menu_Group2_Name'],
                    Menu_Group1_ID :rows[key]['Menu_Group1_ID'],
                    ipAddress:clientIp,
                    status:"Active"
                }
                await Menu2GroupMaster.create(newmenu2groupmaster);                   
            }
        }
    }
}
async function HMSHostQualityGroupMaster(rows,clientIp){
    for(var key in rows)
    {
        if(rows[key] != [])
        {
            var qualitygroupmaster = await QualityGroupMaster.findOne({where:{Quality_Group_Name:rows[key]['Quality_Group_Name'],Menu_Group2_ID:rows[key]['Menu_Group2_ID']}});
            if(qualitygroupmaster)
            {
                qualitygroupmaster.Quality_Group_Name = rows[key]['Quality_Group_Name'];
                qualitygroupmaster.Menu_Group2_ID = rows[key]['Menu_Group2_ID']; 
                await qualitygroupmaster.save();
            }
            else
            {
                const newqualitygroupmaster = 
                {
                    Quality_Group_Name :rows[key]['Quality_Group_Name'],
                    Menu_Group2_ID :rows[key]['Menu_Group2_ID'],
                    ipAddress:clientIp,
                    status:"Active"
                }
                await QualityGroupMaster.create(newqualitygroupmaster);                   
            }
        }
    }
}


