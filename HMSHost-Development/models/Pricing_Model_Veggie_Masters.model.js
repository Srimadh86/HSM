module.exports = (sequelize, Sequelize) => {
    const PricingModelVeggieMaster = sequelize.define("Pricing_Model_Veggie_Master", { 
        Veggie_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Veggie_Name: 
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
    return PricingModelVeggieMaster; 
}