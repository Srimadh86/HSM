module.exports = (sequelize, Sequelize) => {
    const BusinessUnit = sequelize.define("HMSHost_Business_Unit", { 
        Business_Unit_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        }, 
        Rounding_ID:{
            type: Sequelize.INTEGER,
        }, 
        Markup_ID:{
            type: Sequelize.INTEGER,
        },        
        Business_Unit_Code: 
        {    
            type: Sequelize.STRING    
        }, 
        Business_Unit_Name: 
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
    return BusinessUnit; 
}