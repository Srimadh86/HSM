module.exports = (sequelize, Sequelize) => {
    const POSMenuItemMaster = sequelize.define("HMSHost_POS_Menu_Item_Master", { 
        HMSHost_POS_Menu_Item_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },
        POS_Category_ID:{
            type: Sequelize.INTEGER,
        }, 
        HMSHost_Store_ID:{
            type: Sequelize.INTEGER,
        }, 
        HMSHost_Def_Sequence_ID:{
            type: Sequelize.INTEGER,
        }, 
        HMSHost_POS_Menu_Item_Name:{
            type: Sequelize.STRING,
        },       
        HMSHost_POS_Menu_Item_Description: 
        {    
            type: Sequelize.STRING    
        },
         
        Total_Calories: 
        {    
            type: Sequelize.INTEGER    
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
    return POSMenuItemMaster; 
}