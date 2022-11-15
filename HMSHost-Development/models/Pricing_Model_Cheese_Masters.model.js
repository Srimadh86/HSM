module.exports = (sequelize, Sequelize) => {
    const PricingModelCheeseMaster = sequelize.define("Pricing_Model_Cheese_Master", { 
        Cheese_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Cheese_Name: 
        {    
            type: Sequelize.STRING    
        },
        Alias_Name: 
        {    
            type: Sequelize.STRING    
        },
        ipAddress: 
        {    
            type: Sequelize.STRING    
        },     
        status:{
            type:Sequelize.DataTypes.ENUM('Active', 'In-active') 
        }
    });
    return PricingModelCheeseMaster; 
}