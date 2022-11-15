module.exports = (sequelize, Sequelize) => {
    const PricingModelKey_FeatureMaster = sequelize.define("Pricing_Model_Key_Feature_Master", { 
        Key_Feature_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Key_Feature_Name: 
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
    return PricingModelKey_FeatureMaster; 
}