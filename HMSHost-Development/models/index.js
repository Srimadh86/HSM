const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize')
const { pool } = require('../config/db.config')
const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,
{
        host:dbConfig.HOST,
        port:dbConfig.port,
        dialect:dbConfig.dialect,
        operatorsAliases: false,
        define: 
        {
            freezeTableName: true
        },
        pool:
        {
            max:pool.max,
            min:pool.min,
            acquire:pool.acquire,
            idle:pool.idle
        }
})
const db={};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.countries = require('./Country.model')(sequelize,Sequelize);
db.states = require('./State.model')(sequelize,Sequelize);
db.regions = require('./Region.model')(sequelize,Sequelize);
db.regions.belongsTo(db.countries, {
    foreignKey: "Country_ID",
    as: "country",
  });
db.states.belongsTo(db.regions,{
    foreignKey: "Region_ID",
    as: "region",
})
db.conceptmasters = require('./HMS_Host_Concepet.model')(sequelize,Sequelize);
db.revenuemasters = require('./HMS_Host_Revenue_Type.model')(sequelize,Sequelize);
db.desseqmasters = require('./HMSHost_Def_Sequence_Masters.model')(sequelize,Sequelize);
db.majorgroupmasters = require('./HMSHost_Major_Group_Masters.model')(sequelize,Sequelize);
db.pricelevel = require('./HMSHost_Price_Level.model')(sequelize,Sequelize);
db.pricenumber = require('./HMSHost_Price_Number.model')(sequelize,Sequelize);
db.menucategory = require('./HMSHost_POS_Menu_Category.model')(sequelize,Sequelize);
db.roundingmaster = require('./Pricing_Model_Rounding_Masters.model')(sequelize,Sequelize);
db.storestylemasters = require('./Comp_Store_Style_Masters.model')(sequelize,Sequelize);
db.storealcoholstatusmasters = require('./Comp_Store_Alcohol_status_Masters.model')(sequelize,Sequelize);
db.storetakeoutmasters = require('./Comp_Store_Takeout_Masters.model')(sequelize,Sequelize);
db.storewaiterservicemasters = require('./Comp_Store_Waiter_service_Masters.model')(sequelize,Sequelize);
db.storecatersmasters = require('./Comp_Store_Caters_Masters.model')(sequelize,Sequelize);
db.storerestaurantmasters = require('./Comp_Store_Restaurant_Masters.model')(sequelize,Sequelize);
db.storesectionmaster = require('./Comp_Store_Section_Masters.model')(sequelize,Sequelize);
db.storegroupcountmaster = require('./Comp_Store_Grouping_Count_Masters.model')(sequelize,Sequelize);
db.storeratingrangemaster = require('./Comp_Store_Rating_Range_Masters.model')(sequelize,Sequelize);
db.storepricesegmentmaster = require('./Comp_Store_Price_Segment_Masters.model')(sequelize,Sequelize);
db.pricenamematchrangemaster = require('./Pricing_Model_Name_Match_Range_Masters.model')(sequelize,Sequelize);
db.priceingredientmatchrangemaster = require('./Pricing_Model_Ingredient_Match_Range_Masters.model')(sequelize,Sequelize);
db.pricefeaturematchrangemaster = require('./Pricing_Model_Feature_Match_Range_Masters.model')(sequelize,Sequelize);
db.menuitemscorebreakdownmaster = require('./Pricing_Model_Menu_Item_Score_Breakdown_Masters.model')(sequelize,Sequelize);
db.pricingmodelmatchqualityscoremaster = require('./Pricing_Model_Match_Quality_Score_Masters.model')(sequelize,Sequelize);
db.pricingmodelproteinmaster = require('./Pricing_Model_Protein_Masters.model')(sequelize,Sequelize);
db.pricingmodelveggiemaster = require('./Pricing_Model_Veggie_Masters.model')(sequelize,Sequelize);
db.pricingmodelcheesemaster = require('./Pricing_Model_Cheese_Masters.model')(sequelize,Sequelize);
db.pricingmodellettucemaster = require('./Pricing_Model_Lettuce_Masters.model')(sequelize,Sequelize);
db.pricingmodelkeyingredientmaster = require('./Pricing_Model_Key_Ingredient_Masters.model')(sequelize,Sequelize);
db.pricingmodelkeyfeaturemaster = require('./Pricing_Model_Key_Feature_Masters.model')(sequelize,Sequelize);
db.hostbatchmasters = require('./HMSHost_Batch_Masters.model')(sequelize,Sequelize);
db.cities = require('./Global_City_Masters.model')(sequelize,Sequelize);
db.cities.belongsTo(db.states,{
    foreignKey: "State_ID",
    as: "state",
});
db.cities.belongsTo(db.regions,{
    foreignKey: "Region_ID",
    as: "region",
});
db.zipcodes = require('./Global_Zip_Code_Masters.model')(sequelize,Sequelize);

db.businessunits = require('./HMSHost_Business_Unit.model')(sequelize,Sequelize);
db.businessunits.belongsTo(db.roundingmaster,{
    foreignKey: "Rounding_ID",
    as: "rounding",
})
db.storemasters = require('./HMSHost_Store_Master.model')(sequelize,Sequelize);
db.storemasters.belongsTo(db.revenuemasters,{
    foreignKey: "Revenue_Type_ID",
    as: "revenue",
});
db.storemasters.belongsTo(db.cities,{
    foreignKey: "City_ID",
    as: "city",
});
db.storemasters.belongsTo(db.businessunits,{
    foreignKey: "Business_Unit_ID",
    as: "business",
});
db.storemasters.belongsTo(db.conceptmasters,{
    foreignKey: "Concept_ID",
    as: "concepts",
})
db.storemasters.belongsTo(db.desseqmasters,{
    foreignKey: "Def_Sequence_ID",
    as: "defsequence",
});
db.storemasters.belongsTo(db.roundingmaster,{
    foreignKey: "Rounding_ID",
    as: "rounding",
})
db.microlocationmaster = require('./HMSHost_Micro_Location_Master.model')(sequelize,Sequelize);
db.microlocationmaster.belongsTo(db.storemasters,{
    foreignKey: "Store_ID",
    as: "storemaster",
});
db.microlocationmaster.belongsTo(db.revenuemasters,{
    foreignKey: "Revenue_Type_ID",
    as: "revenue",
});
db.airportlocations = require('./HMSHost_Airport_Location_Master.model')(sequelize,Sequelize);
db.airportlocations.belongsTo(db.cities,{
    foreignKey: "City_ID",
    as: "city",
})
db.airportlocations.belongsTo(db.storemasters,{
    foreignKey: "Store_ID",
    as: "storemaster",
})
db.airportlocations.belongsTo(db.businessunits,{
    foreignKey: "Business_Unit_ID",
    as: "business",
})
db.airportlocations.belongsTo(db.zipcodes,{
    foreignKey: "Zip_Code_ID",
    as: "zipcodes",
})
db.departmentmaster = require('./HMSHost_Department_Master.model')(sequelize,Sequelize);
db.departmentmaster.belongsTo(db.businessunits,{
    foreignKey: "Business_Unit_ID",
    as: "business",
})
db.departmentmaster.belongsTo(db.conceptmasters,{
    foreignKey: "Concept_ID",
    as: "concepts",
})
db.familygroupmasters = require('./HMSHost_Family_Group_Master.model')(sequelize,Sequelize)

db.productgroupmasters = require('./HMSHost_Product_Group_Master.model')(sequelize,Sequelize);
db.productgroupmasters.belongsTo(db.majorgroupmasters,{
    foreignKey: "Major_Group_ID",
    as: "majorgroups",
});
db.productgroupmasters.belongsTo(db.familygroupmasters,{
    foreignKey: "Family_Group_ID",
    as: "familygroups",
})
db.menu1groupmasters = require('./HMSHost_Menu_Group1_Master.model')(sequelize,Sequelize);
db.menu1groupmasters.belongsTo(db.productgroupmasters,{
    foreignKey: "Product_Group_ID",
    as: "productgroups",
})
db.menu2groupmasters = require('./HMSHost_Menu_Group2_Master.model')(sequelize,Sequelize);
db.menu2groupmasters.belongsTo(db.menu1groupmasters,{
    foreignKey: "Menu_Group1_ID",
    as: "menu1groups",
})
db.qualitygroupmasters = require('./HMSHost_Quality_Group_Master.model')(sequelize,Sequelize);
db.qualitygroupmasters.belongsTo(db.menu2groupmasters,{
    foreignKey: "Menu_Group2_ID",
    as: "menu2groups",
})
db.menusubcategories = require('./HMSHost_POS_Menu_Sub_Category.model')(sequelize,Sequelize);
db.menusubcategories.belongsTo(db.menucategory,{
    foreignKey: "POS_Category_ID",
    as: "poscategory",
})
db.standardmenucategorymaster = require('./HMSHost_Standardized_Menu_Category_Master.model')(sequelize,Sequelize);
db.standardmenucategorymaster.belongsTo(db.familygroupmasters,{
    foreignKey: "Family_Group_ID",
    as: "familygroups",
})
db.compstandardmenucategorymaster = require('./Comp_Store_Standardized_Menu_Category.model')(sequelize,Sequelize);
db.compstandardmenucategorymaster.belongsTo(db.storesectionmaster,{
    foreignKey: "Comp_Store_Section_ID",
    as: "storesections",
})
db.menuitemmaster = require('./HMSHost_Menu_Item_Master.model')(sequelize,Sequelize);
db.menuitemmaster.belongsTo(db.familygroupmasters,{
    foreignKey: "Family_Group_ID",
    as: "familygroups",
});
db.menuitemmaster.belongsTo(db.pricelevel,{
    foreignKey: "Price_Level_ID",
    as: "pricelevel",
})
db.menuitemmaster.belongsTo(db.pricenumber,{
    foreignKey: "Price_Number_ID",
    as: "pricenumber",
})
db.posmenuitemmaster = require('./HMSHost_POS_Menu_Item_Master.model')(sequelize,Sequelize);
db.posmenuitemmaster.belongsTo(db.menucategory,{
    foreignKey: "POS_Category_ID",
    as: "poscategory",
})
db.posmenuitemmaster.belongsTo(db.desseqmasters,{
    foreignKey: "HMSHost_Def_Sequence_ID",
    as: "defsequencemaster",
})
db.posmenuitemmaster.belongsTo(db.storemasters,{
    foreignKey: "HMSHost_Store_ID",
    as: "storemaster",
})

db.storemenumaster = require('./Comp_Store_Menu_Name_Master.model')(sequelize,Sequelize);
db.storemenumaster.belongsTo(db.storerestaurantmasters,{
    foreignKey: "Comp_Store_Restaurant_ID",
    as: "restaurant",
})

db.prestepdata = require('./HMSHost_Pre_Step_Data.model')(sequelize,Sequelize);
db.hostbatchmasters.belongsTo(db.airportlocations,{
    foreignKey: "Airport_Location_ID",
    as: "airportlocation",
});
db.prestepdata.belongsTo(db.airportlocations,{
    foreignKey: "Airport_Location_ID",
    as: "airportlocation",
});
db.prestepdata.belongsTo(db.hostbatchmasters,{
    foreignKey: "Batch_ID",
    as: "batchmaster",
})
db.prestepdata.belongsTo(db.businessunits,{
    foreignKey: "Business_Unit_ID",
    as: "bussinessunit",
})
db.prestepdata.belongsTo(db.conceptmasters,{
    foreignKey: "Concept_ID",
    as: "conceptmasters",
})
db.prestepdata.belongsTo(db.desseqmasters,{
    foreignKey: "Def_Sequence_ID",
    as: "desseqmasters",
})
db.prestepdata.belongsTo(db.menuitemmaster,{
    foreignKey: "HMSHost_Menu_Item_ID",
    as: "menuitemmaster",
})
db.prestepdata.belongsTo(db.microlocationmaster,{
    foreignKey: "Micros_Location_Number_ID",
    as: "microlocationmaster",
})
db.prestepdata.belongsTo(db.revenuemasters,{
    foreignKey: "HMSHost_Revenue_Type_ID",
    as: "revenuemasters",
})
db.prestepdata.belongsTo(db.storemasters,{
    foreignKey: "HMSHost_Store_ID",
    as: "storemasters",
})
db.menudata = require('./HMSHost_Menu_data.model')(sequelize,Sequelize);
db.menudata.belongsTo(db.airportlocations,{
    foreignKey: "Airport_Location_ID",
    as: "airportlocation",
})
db.menudata.belongsTo(db.hostbatchmasters,{
    foreignKey: "Batch_ID",
    as: "batchmaster",
})
db.menudata.belongsTo(db.desseqmasters,{
    foreignKey: "Def_Sequence_ID",
    as: "desseqmasters",
})
db.menudata.belongsTo(db.departmentmaster,{
    foreignKey: "Department_ID",
    as: "department",
})
db.menudata.belongsTo(db.storemasters,{
    foreignKey: "HMSHost_Store_ID",
    as: "storemaster",
})
db.menudata.belongsTo(db.menuitemmaster,{
    foreignKey: "HMSHost_Menu_Item_ID",
    as: "menuitemmaster",
})
db.menudata.belongsTo(db.microlocationmaster,{
    foreignKey: "Micro_Location_ID",
    as: "microlocationmaster",
})
db.menudata.belongsTo(db.menucategory,{
    foreignKey: "POS_Category_ID",
    as: "menucategory",
})
db.menudata.belongsTo(db.menusubcategories,{
    foreignKey: "POS_Subcategory_ID",
    as: "menusubcategories",
})
db.menudata.belongsTo(db.standardmenucategorymaster,{
    foreignKey: "HMSHost_Standardized_Menu_Category_ID",
    as: "standardmenucategorymaster",
})
db.comstorerestdata = require('./Comp_Store_Restaurant_Data.model')(sequelize,Sequelize);
db.comstorerestdata.belongsTo(db.airportlocations,{
    foreignKey: "Airport_Location_ID",
    as: "airportlocation",
})
db.comstorerestdata.belongsTo(db.hostbatchmasters,{
    foreignKey: "HMSHost_Batch_ID",
    as: "batchmaster",
})
db.comstorerestdata.belongsTo(db.storerestaurantmasters,{
    foreignKey: "Comp_Store_Restaurant_ID",
    as: "storerestaurantmasters",
})
db.comstorerestdata.belongsTo(db.cities,{
    foreignKey: "City_ID",
    as: "city",
})
db.comstorerestdata.belongsTo(db.states,{
    foreignKey: "State_ID",
    as: "state",
})
db.comstorerestdata.belongsTo(db.zipcodes,{
    foreignKey: "Zip_Code_ID",
    as: "zipcode",
})
db.comstorerestdata.belongsTo(db.storestylemasters,{
    foreignKey: "Comp_Store_Style_ID",
    as: "storestylemaster",
})
db.comstorerestdata.belongsTo(db.storepricesegmentmaster,{
    foreignKey: "Comp_Store_Price_Segment_ID",
    as: "storepricesegmentmaster",
})
db.comstorerestdata.belongsTo(db.storealcoholstatusmasters,{
    foreignKey: "Alcohol_Status_ID",
    as: "storealcoholstatusmaster",
})
db.comstorerestdata.belongsTo(db.storetakeoutmasters,{
    foreignKey: "Takeout_ID",
    as: "storetakeoutmaster",
})
db.comstorerestdata.belongsTo(db.storewaiterservicemasters,{
    foreignKey: "Waiter_service_ID",
    as: "storewaiterservicemaster",
})
db.comstorerestdata.belongsTo(db.storecatersmasters,{
    foreignKey: "Caters_ID",
    as: "storecatersmaster",
})
db.menustoredata = require('./Comp_Store_Menu_Data.model')(sequelize,Sequelize);
module.exports = db;