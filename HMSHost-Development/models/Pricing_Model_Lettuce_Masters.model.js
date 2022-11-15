module.exports = (sequelize, Sequelize) => {
    const PricingModelLettuceMaster = sequelize.define("Pricing_Model_Lettuce_Master", { 
        Lettuce_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Lettuce_Name: 
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
    return PricingModelLettuceMaster; 
}