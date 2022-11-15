module.exports = (sequelize, Sequelize) => {
    const POSMenuSubCategory = sequelize.define("HMSHost_POS_Menu_Sub_Category", { 
        POS_Subcategory_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        }, 
        POS_Category_ID:{
            type: Sequelize.INTEGER,
        },
        POS_Subcategory_Name: 
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
    return POSMenuSubCategory; 
}