module.exports = (sequelize, Sequelize) => {
    const PreStepData = sequelize.define("HMSHost_Pre_Step_Data", { 
        Transaction_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },
        Batch_ID:{
            type: Sequelize.INTEGER,
        }, 
        Airport_Location_ID:{
            type: Sequelize.INTEGER,
        }, 
        Business_Unit_ID:{
            type: Sequelize.INTEGER,
        },
        Micros_Location_Number_ID:{
            type: Sequelize.INTEGER,
        }, 
        HMSHost_Menu_Item_ID:{
            type: Sequelize.INTEGER,
        },       
        Def_Sequence_ID: 
        {    
            type: Sequelize.INTEGER    
        },
        Concept_ID:{
            type: Sequelize.INTEGER,
        },       
        HMSHost_Store_ID: 
        {    
            type: Sequelize.INTEGER    
        },
        HMSHost_Revenue_Type_ID:{
            type: Sequelize.INTEGER,
        },       
        HMSHost_Store_Qty_Sold: 
        {    
            type: Sequelize.INTEGER    
        },
        HMSHost_Store_Price:{
            type: Sequelize.INTEGER,
        },       
        HMSHost_Store_Discount_total: 
        {    
            type: Sequelize.INTEGER    
        },
        HMSHost_Store_Sales_total:{
            type: Sequelize.INTEGER,
        },       
        HMSHost_Store_Net_Sales: 
        {    
            type: Sequelize.INTEGER    
        },
        HMSHost_Store_Theoretical_Cost: 
        {    
            type: Sequelize.INTEGER    
        },
        
        Ro_Show_Anyway:{
            type: Sequelize.STRING,
        }, 
        Price_Level_ID: 
        {    
            type: Sequelize.INTEGER    
        },        
        Lookup_Value:{
            type: Sequelize.STRING,
        },       
              
        ipAddress: 
        {    
            type: Sequelize.STRING    
        },     
        status:
        {
            type:Sequelize.DataTypes.ENUM('Active', 'In-active') 
        }
    });
    return PreStepData; 
}