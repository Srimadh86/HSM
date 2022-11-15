module.exports = (sequelize, Sequelize) => {
    const MenuItemMaster = sequelize.define("HMSHost_Menu_Item_Master", { 
        HMSHost_Menu_Item_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },
        Family_Group_ID:{
            type: Sequelize.INTEGER,
        }, 
        Price_Level_ID:{
            type: Sequelize.INTEGER,
        }, 
        Price_Number_ID:{
            type: Sequelize.INTEGER,
        }, 
        HMSHost_Menu_Item_Name:{
            type: Sequelize.STRING,
        },       
        HMSHost_Menu_Item_Description: 
        {    
            type: Sequelize.STRING    
        },
        HMSHost_Recipe_Name:{
            type: Sequelize.STRING,
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
    return MenuItemMaster; 
}