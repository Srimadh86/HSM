module.exports = (sequelize, Sequelize) => {
    const StoreStandardizedMenuCategoryMaster = sequelize.define("Comp_Store_Standardized_Menu_Category", { 
        Comp_Store_Standardized_Menu_Category_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },
        Comp_Store_Section_ID:{
            type: Sequelize.INTEGER,
        },
        Family_Group_ID:{
            type: Sequelize.INTEGER,
        }, 
        Comp_Store_Standardized_Menu_Categories_Lookup:{
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
    return StoreStandardizedMenuCategoryMaster; 
}