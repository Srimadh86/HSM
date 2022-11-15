module.exports = (sequelize, Sequelize) => {
    const ProductGroupMaster = sequelize.define("HMSHost_Product_Group_Master", { 
        Product_Group_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        }, 
        Major_Group_ID:{
            type: Sequelize.INTEGER,
        },
        Family_Group_ID:{
            type: Sequelize.INTEGER,
        },
        Product_Group_Name: 
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
    return ProductGroupMaster; 
}