module.exports = (sequelize, Sequelize) => {
    const StandardizedMenuCategoryMaster = sequelize.define("HMSHost_Standardized_Menu_Category_Master", { 
        HMSHost_Standardized_Menu_Category_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },
        Family_Group_ID:{
            type: Sequelize.INTEGER,
        }, 
        HMSHost_Standardized_Menu_Category_Description:{
            type: Sequelize.STRING,
        },       
        HMSHost_Standardized_Menu_Category_name: 
        {    
            type: Sequelize.STRING    
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
    return StandardizedMenuCategoryMaster; 
}