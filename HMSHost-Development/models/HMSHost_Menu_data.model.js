module.exports = (sequelize, Sequelize) => {
    const MenuData = sequelize.define("HMSHost_Menu_data", { 
        HSM_HMD_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },
        Batch_ID:{
            type: Sequelize.INTEGER,
        }, 
        Transaction_ID:{
            type: Sequelize.INTEGER,
        }, 
        Airport_Location_ID:{
            type: Sequelize.INTEGER,
        }, 
        Department_ID:{
            type: Sequelize.INTEGER,
        }, 
        HMSHost_Store_ID:{
            type: Sequelize.INTEGER,
        }, 
        Micro_Location_ID:{
            type: Sequelize.INTEGER,
        },
        POS_Menu_Item_ID:{
            type: Sequelize.INTEGER,
        },
        Def_Sequence_ID:{
            type: Sequelize.INTEGER,
        }, 
        POS_Price:{
            type: Sequelize.INTEGER,
        },       
        POS_Category_ID: 
        {    
            type: Sequelize.INTEGER    
        },
        POS_Subcategory_ID:{
            type: Sequelize.INTEGER,
        },       
        Calories: 
        {    
            type: Sequelize.STRING    
        },
        Note:{
            type: Sequelize.STRING,
        },       
        HMSHost_Standardized_Menu_Category_ID: 
        {    
            type: Sequelize.INTEGER    
        },
        HMSHost_Menu_Item_ID:{
            type: Sequelize.INTEGER,
        },       
        HMSHost_Current_Price: 
        {    
            type: Sequelize.INTEGER    
        },
        Annualized_QTY_Sold: 
        {    
            type: Sequelize.INTEGER    
        },
        Lookup_Value: 
        {    
            type: Sequelize.STRING    
        },
        ipAddress: 
        {    
            type: Sequelize.STRING    
        },     
        Status:
        {
            type:Sequelize.DataTypes.ENUM('Active', 'In-active') 
        }
    });
    return MenuData; 
}